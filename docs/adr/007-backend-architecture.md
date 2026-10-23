# ADR-007 — Backend: offline ingestion, read-only server, catalog in R2

## Status
Accepted (2026-10-23)

## Context
Projects should be added by writing a `.portfolio/` folder in each project's
own GitHub repository, not by editing the portfolio's code. The site also needs
per-route `<head>` tags (ST-12.3) for projects that appear after a build.
Traffic is a portfolio's: small, but every visit should be fast and the site
should stay up when GitHub or the content is broken. The full proposal, with
diagrams, flows, failure modes, keys and costs, was reviewed and approved:
https://claude.ai/artifact/S7nzn4A29CTYEGXcjrYgoW

## Decision
Two parts that never depend on each other live:

- **Ingestion** (GitHub Actions in the portfolio repo, hourly and manual):
  lists your own repos with the `portfolio` topic (no forks, default branch
  only), fetches `.portfolio/` with ETags, validates it against the schema,
  converts images with `sharp` (WebP 800/1600, a 1200×630 share image, file
  names by content hash) and writes them to Cloudflare R2. It publishes a new
  catalog version (`catalog/<version>.json`) and then points
  `catalog/current.json` at it. It writes only when something changed.
- **Server** (Hono on Cloudflare Workers, with the client build as static
  assets): reads the current catalog from R2 (cached in memory), fills each
  page's `<head>`, serves `/api/v1/projects`, `/api/v1/projects/:slug`,
  `sitemap.xml` and `robots.txt`. It never talks to GitHub and never writes.
- **No database.** The catalog is a small JSON file; a database comes in only
  when something needs queries or writes (analytics, for instance).
- The server depends on a `CatalogSource` interface: R2 in the Worker, a
  folder on disk locally and in tests.

## Consequences
- An invalid project keeps its last good version; a failed run leaves the site
  on the previous catalog; rolling back is pointing `current.json` back.
- A new project shows up within an hour, or right away from the Actions
  "Run workflow" button. No `repository_dispatch`: it would need a token with
  write access to the portfolio repo stored in every project repo.
- Keys: a read-only GitHub token and the R2 write key pair (Actions secrets),
  and a Cloudflare deploy token. The Worker's R2 binding is used for reads only.
- Cost: only the domain; Workers, R2 and Actions fit their free plans.
