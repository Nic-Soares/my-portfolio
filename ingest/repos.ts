import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import type { RepoSnapshot, RepoSource } from "./types.ts";

const PORTFOLIO = ".portfolio";

// Folders on disk, each with a .portfolio/ inside (server/fixtures/projects).
// The "commit" is a hash of the files, so unchanged folders are skipped too.
export function folderRepos(root: string): RepoSource {
  const readAll = async (dir: string) => {
    const files = new Map<string, Uint8Array>();
    const walk = async (current: string) => {
      for (const entry of await readdir(current, { withFileTypes: true })) {
        const full = join(current, entry.name);
        if (entry.isDirectory()) await walk(full);
        else
          files.set(relative(dir, full), new Uint8Array(await readFile(full)));
      }
    };
    await walk(dir);
    return files;
  };
  return {
    async list() {
      const snapshots: RepoSnapshot[] = [];
      for (const entry of await readdir(root, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const dir = join(root, entry.name, PORTFOLIO);
        const files = await readAll(dir).catch(() => null);
        if (!files) continue;
        const parts = [...files.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .flatMap(([path, body]) => [new TextEncoder().encode(path), body]);
        const joined = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
        let offset = 0;
        for (const part of parts) {
          joined.set(part, offset);
          offset += part.length;
        }
        const digest = await crypto.subtle.digest("SHA-256", joined);
        const sha = [...new Uint8Array(digest).slice(0, 10)]
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        snapshots.push({ repo: `local/${entry.name}`, sha });
      }
      return snapshots;
    },
    files: (snapshot) =>
      readAll(join(root, snapshot.repo.replace(/^local\//, ""), PORTFOLIO)),
  };
}

export interface GitHubConfig {
  token: string;
  // Whose repositories count; others' repos with the topic never do
  owner: string;
  topic?: string;
  fetch?: typeof fetch;
}

// Your repositories on GitHub (TK-15.3.4): owned by `owner`, with the
// `portfolio` topic, not forks, read on the default branch only
export function githubRepos({
  token,
  owner,
  topic = "portfolio",
  fetch: fetchImpl = fetch,
}: GitHubConfig): RepoSource {
  const api = async <T>(path: string): Promise<T> => {
    const response = await fetchImpl(`https://api.github.com${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "portfolio-ingest",
      },
    });
    if (!response.ok) {
      throw new Error(
        `GitHub ${path}: ${response.status} ${await response.text()}`,
      );
    }
    return response.json() as Promise<T>;
  };

  interface Repo {
    full_name: string;
    fork: boolean;
    archived: boolean;
    owner: { login: string };
    topics?: string[];
    default_branch: string;
  }

  return {
    async list() {
      const repos: Repo[] = [];
      for (let page = 1; ; page++) {
        const batch = await api<Repo[]>(
          `/user/repos?affiliation=owner&per_page=100&page=${page}`,
        );
        repos.push(...batch);
        if (batch.length < 100) break;
      }
      const chosen = repos.filter(
        (repo) =>
          repo.owner.login.toLowerCase() === owner.toLowerCase() &&
          !repo.fork &&
          !repo.archived &&
          repo.topics?.includes(topic),
      );
      const snapshots: RepoSnapshot[] = [];
      for (const repo of chosen) {
        const commits = await api<{ sha: string }[]>(
          `/repos/${repo.full_name}/commits?sha=${encodeURIComponent(repo.default_branch)}&path=${PORTFOLIO}&per_page=1`,
        );
        if (commits.length === 0) continue;
        snapshots.push({ repo: repo.full_name, sha: commits[0].sha });
      }
      return snapshots;
    },
    async files(snapshot) {
      const tree = await api<{
        tree: { path: string; type: string; sha: string }[];
        truncated: boolean;
      }>(`/repos/${snapshot.repo}/git/trees/${snapshot.sha}?recursive=1`);
      if (tree.truncated) {
        throw new Error(`${snapshot.repo}: repository tree too large to read`);
      }
      const files = new Map<string, Uint8Array>();
      for (const item of tree.tree) {
        if (item.type !== "blob" || !item.path.startsWith(`${PORTFOLIO}/`)) {
          continue;
        }
        const blob = await api<{ content: string; encoding: string }>(
          `/repos/${snapshot.repo}/git/blobs/${item.sha}`,
        );
        const bytes = Uint8Array.from(
          atob(blob.content.replace(/\n/g, "")),
          (c) => c.charCodeAt(0),
        );
        files.set(item.path.slice(PORTFOLIO.length + 1), bytes);
      }
      return files;
    },
  };
}
