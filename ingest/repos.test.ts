// @vitest-environment node
import { describe, expect, it } from "vitest";
import { githubRepos } from "./repos.ts";

function fakeGitHub(routes: Record<string, unknown>) {
  const calls: string[] = [];
  const fetch = (async (input: string | URL | Request) => {
    const path = String(input).replace("https://api.github.com", "");
    calls.push(path);
    const body = Object.entries(routes).find(([prefix]) =>
      path.startsWith(prefix),
    )?.[1];
    return body === undefined
      ? new Response("not found", { status: 404 })
      : Response.json(body);
  }) as typeof globalThis.fetch;
  return { fetch, calls };
}

const repo = (name: string, extra: Record<string, unknown> = {}) => ({
  full_name: `nic/${name}`,
  fork: false,
  archived: false,
  owner: { login: "nic" },
  topics: ["portfolio"],
  default_branch: "main",
  ...extra,
});

describe("githubRepos", () => {
  it("lists only your own, non-fork repos with the topic, on the default branch", async () => {
    const { fetch, calls } = fakeGitHub({
      "/user/repos": [
        repo("mine"),
        repo("no-topic", { topics: [] }),
        repo("a-fork", { fork: true }),
        repo("archived", { archived: true }),
        repo("theirs", {
          full_name: "someone/theirs",
          owner: { login: "someone" },
        }),
      ],
      "/repos/nic/mine/commits": [{ sha: "abc123" }],
    });
    const snapshots = await githubRepos({
      token: "t",
      owner: "nic",
      fetch,
    }).list();
    expect(snapshots).toEqual([{ repo: "nic/mine", sha: "abc123" }]);
    expect(calls).toContain(
      "/repos/nic/mine/commits?sha=main&path=.portfolio&per_page=1",
    );
  });

  it("reads only the .portfolio/ files of that commit", async () => {
    const { fetch } = fakeGitHub({
      "/repos/nic/mine/git/trees/abc123": {
        truncated: false,
        tree: [
          { path: "README.md", type: "blob", sha: "r" },
          { path: ".portfolio/project.json", type: "blob", sha: "p" },
          { path: ".portfolio/images", type: "tree", sha: "t" },
        ],
      },
      "/repos/nic/mine/git/blobs/p": {
        content: btoa('{"a":1}'),
        encoding: "base64",
      },
    });
    const files = await githubRepos({ token: "t", owner: "nic", fetch }).files({
      repo: "nic/mine",
      sha: "abc123",
    });
    expect([...files.keys()]).toEqual(["project.json"]);
    expect(new TextDecoder().decode(files.get("project.json"))).toBe('{"a":1}');
  });
});
