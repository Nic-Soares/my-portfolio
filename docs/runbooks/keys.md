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

Written step by step when each one is created (EP-16, EP-18).

## Rotating a key

1. Create the new key with the same permissions.
2. Replace the secret in GitHub: repo **Settings → Secrets and variables →
   Actions**.
3. Run the workflow that uses it once (Actions → the workflow → Run
   workflow) and check it passes.
4. Revoke the old key where it was created.

If a key leaks: revoke it first, then create and store a new one.
