# ADR-008 — Project content as JSON with a schema, text as minimal Markdown

## Status
Accepted (2026-10-23)

## Context
Project content moves from the bundled `data/projects/*.data.ts` files to each
project's repository (ADR-007). Today every locale repeats the shared fields
(slug, areas, images), and paragraphs, lists, table cells and captions are HTML
strings rendered with `dangerouslySetInnerHTML`. Content from other
repositories reaches the site without a build or a review, so raw HTML there
would let a text inject code into visitors' pages.

## Decision
- `.portfolio/project.json` holds what doesn't change with the language (slug,
  areas, order, draft, hero image, links); `content.<locale>.json` holds the
  text and blocks. `content.en.json` is required; a missing `pt`/`es` falls
  back to English.
- One Zod schema in `shared/` is the source of the types, of the validation in
  ingestion and in the API, and of the published JSON Schema that each file
  points at with `$schema` (editor autocomplete and errors while writing).
- Text uses a minimal Markdown (`**bold**`, `*italic*`, `` `code` ``,
  `[link](https://…)`, lists) rendered to React elements by a small in-house
  converter. `dangerouslySetInnerHTML` leaves the codebase; the schema rejects
  tags and non-`https` links; the free-HTML `content-group` block leaves the
  public format.
- The server sends a CSP that only allows the site's own scripts, as a second
  layer.

## Consequences
- The bundled content (`<strong>` ×33, `<p>` ×21, `<li>` ×6, `<ol>` ×3,
  `<a>` ×3 today) is migrated to Markdown.
- A test fails if `dangerouslySetInnerHTML` comes back in `client/src`.
- Markdown with front matter was considered: nicer for prose, but columns,
  tables and galleries don't map to it cleanly.
