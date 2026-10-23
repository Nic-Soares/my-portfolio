# Runbook — Dependency upgrades

Objective guide for keeping Node, the npm dependencies and Biome up to date
in this repository. `package.json` holds the ranges and the scripts;
`package-lock.json` pins the exact versions (ADR-006).

Dependabot opens weekly PRs for npm and GitHub Actions (minor and patch
grouped). This runbook covers the manual path and major bumps.

---

## 1. See what's outdated

```bash
npm outdated
```

Shows `Current` (installed), `Wanted` (the newest version the range in
`package.json` allows) and `Latest`.

## 2. Check for vulnerabilities

```bash
npm audit
```

CI fails on `high` or `critical` (`npm audit --audit-level=high`). Fix with
`npm audit fix` when the fix stays inside the declared ranges; otherwise
bump the package that pulls in the vulnerable one.

## 3. Routine update (within the declared ranges)

```bash
npm update
```

Updates `package-lock.json` only; `package.json` ranges stay as they are.

## 4. Major update

Edit the range in `package.json` (or `npm install <pkg>@latest`), then read
the package's changelog. Type errors from a major bump are caught by
`npm run typecheck` (`tsc` 7).

## 5. Update Node

The version lives in `.nvmrc` and in `engines` in `package.json` (Node 26).
CI reads `.nvmrc`. Locally, Node comes from Homebrew:

```bash
brew upgrade node
node --version
```

Moving to a new major means updating `.nvmrc`, `engines` and `@types/node`
together.

## 6. Update Biome

Biome is pinned to an exact version (`@biomejs/biome` in `devDependencies`)
because it adds rules and changes its config schema in minor releases:

1. `npm install --save-dev --save-exact @biomejs/biome@<version>`
2. Update `$schema` in `biome.json` to the same version.
3. Run `npm run check` and review the diff — new rules usually show up here.

## 7. Validate after any update

Run in this order, stopping at the first error:

```bash
npm run typecheck   # tsc 7
npm test            # vitest
npm run lint        # biome lint
npm run build       # typecheck + vite build (+ SEO pages)
npm run dev         # manual smoke test in the browser
```

During `npm run dev`, walk through the main routes (`/`, `/projects`,
`/projects/:slug`, `/about`) and check the browser console — Vite/React
bumps tend to produce warnings rather than build errors.

## 8. Commit

- Always commit `package.json` and `package-lock.json` together.
- Name what changed (e.g. `Bump vite to 9.x`) for an isolated major bump;
  routine `npm update` bumps can share one commit.

## 9. Rollback

```bash
git checkout -- package.json package-lock.json
npm ci
```

Never edit `package-lock.json` by hand — it's generated.
