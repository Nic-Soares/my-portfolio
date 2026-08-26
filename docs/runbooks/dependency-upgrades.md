# Runbook — Dependency and Toolchain Upgrades

Objective guide for keeping Deno, `npm:` dependencies, and Biome up to
date in this repository. `deno.json` is the single manifest (import map +
tasks + compilerOptions) — there is no `package.json`.

---

## 1. Check what's outdated

```bash
deno outdated
```

Shows `Current` (installed) vs `Update` (compatible with the `deno.json`
range) vs `Latest` (latest published version, may break the range).

---

## 2. Update within the semver range (routine, low risk)

Updates only `deno.lock`, without touching the ranges in `deno.json`:

```bash
deno outdated --update
```

Equivalent to `npm update`. Do this periodically (e.g. once per sprint)
without much thought — it's the lowest-risk path.

---

## 3. Update to the latest version (major/minor bump)

Edits the ranges in `deno.json` and `deno.lock`:

```bash
# everything
deno outdated --update --latest

# a specific package (uses the import map alias, not the package name)
deno outdated --update --latest "react*"
deno outdated --update --latest vite
```

After a major bump (React, Vite, react-router), read the package's
changelog before moving on to validation — breaking changes aren't
caught by `deno check`.

---

## 4. Update Deno itself

```bash
deno --version          # check current version
```

`deno upgrade` only works on a Deno binary built with the upgrade
feature (the official install script / `deno_install`). On this
machine Deno is installed via Homebrew, which ships a build without
that feature — running `deno upgrade` fails with:

```
error: This deno was built without the "upgrade" feature. Please upgrade
using the installation method originally used to install Deno.
```

Update through Homebrew instead:

```bash
brew update
brew upgrade deno
deno --version           # confirm the new version
```

To pin a specific version through Homebrew, use `brew install deno@<version>`
if that formula exists, or the official install script in a throwaway
shell to check the version number first. Whichever method you used to
install Deno is the one you must use to upgrade it — check with
`which deno` if unsure (`/opt/homebrew/bin/deno` → Homebrew;
`~/.deno/bin/deno` → official install script, where `deno upgrade`
does work).

The pinned runtime is Deno 2.x (see `README.md`). If you move to a new
major, update the reference in `README.md` as well.

---

## 5. Update Biome

Biome isn't in the import map — it's invoked directly in the tasks via
`npm:@biomejs/biome@2` (see `deno.json`). To update it:

1. Change the pinned version in the three tasks (`lint`, `format`,
   `check`) in [`deno.json`](../../deno.json).
2. Update the `$schema` in [`biome.json`](../../biome.json) to the new
   version (e.g. `https://biomejs.dev/schemas/2.x.x/schema.json`).
3. Run `deno task check` and review the diff — Biome minor bumps often
   ship new rules enabled by default.

---

## 6. Validate after any update

Run in this order, stopping at the first error:

```bash
deno task typecheck   # deno check client/src/app/main.tsx
deno task lint         # biome lint
deno task build        # typecheck + vite build
deno task dev           # manual smoke test in the browser
```

During `deno task dev`, walk through the main routes (`/`, `/projects`,
`/projects/:slug`) and check the browser console — Vite/React bumps
tend to produce warnings rather than build errors.

---

## 7. Commit

- Always commit `deno.json` and `deno.lock` together.
- Write an objective message naming what changed (e.g. `Bump vite to
  8.x`), not a generic "update dependencies" when it's an isolated
  major bump.
- Routine `deno outdated --update` bumps across several packages can be
  grouped into a single commit.

## 8. Rollback

If something breaks after the bump:

```bash
git checkout -- deno.json deno.lock
deno install
```

Never edit `deno.lock` by hand — it's generated.
