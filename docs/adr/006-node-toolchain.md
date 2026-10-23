# ADR-006 — Move the toolchain from Deno to Node

## Status
Accepted (2026-10-23)

## Context
The repo runs on Deno 2: `deno.json` holds the dependencies, tasks and
compiler options, `deno check` type-checks, and Vite, Vitest and Biome run as
`npm:` packages under Deno. On 2026-10-09 Deno joined Cloudflare: Deno Deploy
shuts down in about six months and the runtime gets about a year of
maintenance before Deno-led development ends. The backend (ADR-007) has not
been written yet, so the repo is at its smallest.

## Decision
Move to Node before starting the backend (roadmap EP-14):

- Node 26 (LTS from late October 2026) and npm: `package.json` +
  `package-lock.json` replace `deno.json` + `deno.lock`; the scripts keep the
  task names (`dev`, `build`, `preview`, `typecheck`, `test`, `lint`,
  `format`, `check`).
- `tsconfig.json` replaces the `compilerOptions` in `deno.json`; type-checking
  uses `tsc` 7 (the native compiler).
- The two files that call Deno APIs (`client/vite.config.ts`,
  `client/seo.plugin.ts`) use Node's instead.
- CI uses `actions/setup-node`, runs `npm audit`, and Dependabot watches
  `package-lock.json`.
- New code (`shared/`, `server/`, `ingest/`) sticks to web-standard APIs, so
  it doesn't depend on the runtime either.

## Consequences
- The migration is done when the 82 tests, lint, typecheck and build pass and
  the build emits the same files as before.
- TypeScript 7 becomes available (Deno shipped TS 6).
- `deno audit` / `deno outdated` become `npm audit` / `npm outdated`; the
  dependency-upgrade runbook changes with them.
