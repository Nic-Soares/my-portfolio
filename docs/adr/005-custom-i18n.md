# ADR-005 — Custom typed i18n instead of a library

## Status
Accepted (2026-10-21)

## Context
The site needs English, Portuguese (Brazil) and Spanish, for both the UI and the
content (Home, About, project case studies). The site is small, has no
server-rendered translations, no plural-heavy copy and no translators working
outside the repo. Options evaluated: react-i18next (or a similar library) or a
small in-house layer.

## Decision
Use an in-house layer in `client/src/i18n`:

- Locales `en` (default, the language of the design), `pt` and `es`.
- First visit: the browser language (`navigator.languages`) when it is one of
  the three, otherwise English. The choice from the language menu is stored in
  `localStorage` and wins afterwards.
- UI strings live in typed catalogs, one object per locale with one namespace
  per feature. `en` is the source; `pt` and `es` are typed against it, so a
  missing or extra key breaks the typecheck. Strings with values are functions.
- Components read strings as plain properties (`t.layout.nav.home`), with no
  string keys to mistype.
- Content (Home, About, projects) is translated in the feature's data files,
  one set per locale with the same types.
- `<html lang>` follows the locale.

## Consequences
- No runtime dependency and no extra bundle weight beyond the catalogs.
- All three catalogs ship in the bundle; at this size that is cheaper than
  loading them on demand. Revisit if the content grows a lot.
- No plural or ICU support: copy with counts is written as functions.
- Adding a language means adding a catalog and the content files; the
  typecheck lists everything that is missing.
