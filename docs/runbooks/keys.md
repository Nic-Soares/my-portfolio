# Runbook — Keys

Every key the portfolio uses: what it allows, where it lives, how to create
and rotate it (ADR-007, roadmap TK-15.3.3). Three keys, four secret values.
None of them ever goes in the repository, a `.env` file that gets committed,
or a `.portfolio/` folder — secret scanning and push protection are on to
catch that.

| Key | Lives in | Allows | Needed from | Expires |
|---|---|---|---|---|
| `PORTFOLIO_GITHUB_TOKEN` | Actions secret, portfolio repo | Read Contents + Metadata of your repos | EP-16 | 1 year |
| `R2_ACCESS_KEY_ID` + `R2_SECRET_ACCESS_KEY` | Actions secrets, portfolio repo | Object Read & Write on the portfolio bucket only | EP-16 | No; rotate if leaked |
| `CLOUDFLARE_API_TOKEN` | Actions secret, portfolio repo | Workers Scripts: Edit | EP-18 | 1 year |

Not secret: `CLOUDFLARE_ACCOUNT_ID` and `R2_BUCKET` (Actions variables),
`VITE_SITE_URL` (client build). The Worker reads R2 through a binding in
`wrangler.toml`, not a key; the binding grants the whole bucket, so the
Worker code only reads.

## Creating each key

Locally the keys live in `.env` at the repo root (ignored by git; `npm run
ingest` reads it). In CI they live in the repo's Actions secrets (EP-18).

### `PORTFOLIO_GITHUB_TOKEN` (created 2026-10-23)

1. https://github.com/settings/personal-access-tokens/new (fine-grained, not
   classic).
2. Name `portfolio-ingest`; resource owner `Nic-Soares`; expiration: custom,
   one year.
3. Repository access: **All repositories** — a new project only needs the
   `portfolio` topic, no token change. The token still only reads.
4. Repository permissions: **Contents: Read-only**, **Metadata: Read-only**;
   nothing else.
5. Generate, copy (starts with `github_pat_`), paste after
   `PORTFOLIO_GITHUB_TOKEN=`.

Check: it authenticates as `Nic-Soares`, lists the repos, and a write (PUT
to contents) answers 403.

### `R2_ACCESS_KEY_ID` + `R2_SECRET_ACCESS_KEY` (created 2026-10-23)

1. Cloudflare dashboard → **R2 Object Storage** (the Account ID is on this
   page → `CLOUDFLARE_ACCOUNT_ID`).
2. **Manage API tokens → Create API token** (Account API token).
3. Name `portfolio-ingest-write`; permission **Object Read & Write**; **Apply
   to specific buckets only** → `portfolio-content`; TTL forever; no IP
   filter.
4. Copy **Access Key ID** and **Secret Access Key** (the secret is shown
   once) into `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`. The "Token
   value" and the S3 endpoint aren't needed.

Check: `npm run ingest` publishes; the same key against any other bucket
answers 403.

### `CLOUDFLARE_API_TOKEN`

Written when it's created (EP-18).

## Rotating a key

1. Create the new key with the same permissions.
2. Replace the secret in GitHub: repo **Settings → Secrets and variables →
   Actions**.
3. Run the workflow that uses it once (Actions → the workflow → Run
   workflow) and check it passes.
4. Revoke the old key where it was created.

If a key leaks: revoke it first, then create and store a new one.
