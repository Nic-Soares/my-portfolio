# ADR-009 — Visible e-mail with a copy button, no contact form

## Status
Accepted (2026-10-23)

## Context
The About "Say hi!" strip shows the e-mail with a `mailto:` link. A contact
form (an e-mail API, an anti-bot check, a rate-limited endpoint and two more
keys) was proposed to hide the address and to help visitors without a mail
app. The address has to be visible on the page anyway, since recruiters
expect to copy it, so a form would hide nothing. There is no form in Figma.

## Decision
No contact form. The address stays visible with its `mailto:` link, plus a
"Copy e-mail" icon button (designed in Figma first). The address is assembled
in JS at render time instead of shipping ready in the HTML, so scrapers that
don't run JS miss it.

## Consequences
- No e-mail provider, no Turnstile, no `POST /api/v1/contact`, two fewer keys.
- The JSON-LD and the static `<head>` never include the address.
