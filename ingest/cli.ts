// Runs one ingestion.
//   npm run ingest:local  → server/fixtures/projects into .data/store
//   GitHub Actions        → your GitHub repos into R2 (env below)
import { appendFile } from "node:fs/promises";
import { join } from "node:path";
import { folderRepos, githubRepos } from "./repos.ts";
import { type IngestReport, ingest } from "./run.ts";
import { folderStore, r2Store } from "./stores.ts";

const root = join(import.meta.dirname, "..");
const local = process.argv.includes("--local");

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

const options = local
  ? {
      repos: folderRepos(
        process.env.PROJECTS_DIR ?? join(root, "server/fixtures/projects"),
      ),
      store: folderStore(process.env.STORE_DIR ?? join(root, ".data/store")),
    }
  : {
      repos: githubRepos({
        token: required("PORTFOLIO_GITHUB_TOKEN"),
        owner: required("PORTFOLIO_OWNER"),
      }),
      store: r2Store({
        accountId: required("CLOUDFLARE_ACCOUNT_ID"),
        bucket: required("R2_BUCKET"),
        accessKeyId: required("R2_ACCESS_KEY_ID"),
        secretAccessKey: required("R2_SECRET_ACCESS_KEY"),
      }),
    };

function summary(report: IngestReport): string {
  const lines = [
    "## Portfolio ingestion",
    "",
    report.wrote
      ? `Published catalog \`${report.version}\`.`
      : `Nothing changed; catalog \`${report.version || "(none yet)"}\` stays.`,
    "",
    `- Updated: ${report.published.join(", ") || "none"}`,
    `- Unchanged: ${report.unchanged.join(", ") || "none"}`,
    `- Cleaned up: ${report.cleaned.versions.length} old catalog versions, ${report.cleaned.media.length} unused images`,
  ];
  for (const [slug, locales] of Object.entries(report.fallbacks)) {
    lines.push(`- ${slug} shows English for: ${locales.join(", ")}`);
  }
  for (const [repo, problems] of Object.entries(report.rejected)) {
    lines.push("", `### Rejected: ${repo} (its last good version stays)`, "");
    lines.push(...problems.map((problem) => `- ${problem}`));
  }
  return `${lines.join("\n")}\n`;
}

const report = await ingest({ ...options, mediaBase: "/media" });
const text = summary(report);
console.log(text);
if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, text);
}
// A rejected project doesn't fail the run (the others still publish), but it
// shows as a warning on the run
for (const [repo, problems] of Object.entries(report.rejected)) {
  console.log(`::warning title=Rejected ${repo}::${problems.join(" | ")}`);
}
