# Development Roadmap — Portfolio

**Design source:** [Figma — Portfólio](https://www.figma.com/design/5Uw1Nxn0DgG9SU3z0Vb4vh/Portf%C3%B3lio)
**Repository:** `my-portfolio` (Deno 2 + Vite 7 + React 19 + react-router 7 + CSS Modules + Biome)
**Last updated:** 2026-10-18

---

## 0. Status board

| Epic | Status | Where the work lives |
|---|---|---|
| `EP-01` Baseline | ✅ Done — merged into `develop` (`4eca4d3`) | code |
| `EP-02` Design source | ✅ Done in Figma — code follow-ups moved to `EP-08`/`EP-09` | Figma (`Portfólio`) + this file |
| `EP-03` Tokens | ✅ Done — merged into `develop` 2026-10-18 | code |
| `EP-04` Components | ⏭️ **Next** | code |
| `EP-05`…`EP-12` | Not started | code |
| `EP-13` Backend | 🟡 Built, not merged — branch `feat/server-express-api` | code (`server/`) |

### Git workflow

- `main` = released code. `develop` = integration; every epic or story is merged into it with a `merge(<scope>): …` commit.
- One branch per epic/story, cut from `develop`: `<type>/ep-XX-<slug>` or `<type>/st-XX.Y-<slug>`, where `<type>` is the conventional-commit type (`feat`, `fix`, `chore`, `docs`, `test`, `ci`).
- Commits follow Conventional Commits (`feat(server): …`, `docs(roadmap): …`).
- Figma-only work (like `EP-02`) has no code to commit — the branch only carries the checklist updates in this file.

---

## 1. Assumptions

1. **No component library.** `@material/web` is out of date for what the frontend needs. Every Material Design 3 component will be implemented in-repo, in React + CSS Modules, consuming the `--md-sys-*` tokens. Figma remains a visual and variant reference — not a runtime dependency.
2. **Figma is the source of truth for layout and tokens.** Where the repo and Figma diverge, the repo adjusts — except when the divergence is a Figma bug (see `EP-02`).
3. **All product copy is in English.** Figma and the repo's UI copy and comments are normalized (`ST-01.3`). Only the case-study data files (`spotify-clone.data.ts`, `reference.data.ts`) are still in Portuguese — rewritten in `ST-09.1`.
4. **Four size classes, matching Figma:** Compact `< 600` (frame 402), Medium `600–1199` (frame 744), Large `1200–1599` (frame 1512), Extra-large `≥ 1600` (frame 1920). Frames are the reference width of each range; cut points follow M3 window size classes (`TK-03.1.1`).
5. **This backlog covers what's missing and what needs fixing.** What's already shipped is listed in §2.4 only to explain its absence from the backlog.
6. Epic order is execution order — `EP-03` and `EP-04` are prerequisites for every screen.

---

## 2. Figma → Repository mapping

### 2.1 Pages and routes

| Figma | Repo route | Current implementation | Status |
|---|---|---|---|
| Home (1920/1512/744/402) | `/` | `features/home` — Hero, ExpertiseCard, ExperienceSection, ProjectCarousel | **Fix** — hero missing decor, breakpoints misaligned |
| Projects — Index (1920/1512 + 744/402 × Search/Filter/Selector) | `/projects` | `features/work/ProjectList` — Hero, CardGrid, ProjectCard | **Fix** — filters and search don't filter; tablet/mobile views don't exist; tags clip on narrow cards |
| Project — Reference (4 bp, block template) + Project — Spotify W (3 tabs × 4 bp) | `/projects/:slug` | `features/work/ProjectDetail` — BlockRenderer (9 blocks), ContentLayout, SummaryNav, Hero | **Fix** — repo still renders the M3 doc placeholder; no facts, pager, or footer |
| About Me (4 bp) | — | — | **New** — entire feature |
| System — 404 | `/404` | `app/pages/NotFound` | **Fix** — align with Figma |
| System — Under Construction | `/coming-soon` | `app/pages/UnderConstruction` | **Fix** — align with Figma |
| System — Something Went Wrong (500) | — | — | **New** |
| System — Loading / Skeleton | — | — | **New** |
| System — No Projects Found (empty) | — | — | **New** |

### 2.2 Components

| Figma | Repo | Status |
|---|---|---|
| Navigation Rail (96px, 3 destinations + 2 actions) | `layout/navigation/NavigationRail` + `Sidebar` | **Fix** — 88px, 2 destinations, actions without handlers |
| TopAppBar (88px, tablet/mobile) | — | **New** |
| NavigationBar (88px, tablet/mobile) | — | **New** |
| Tab Bar (component set) | `layout/navigation/TabbedNavigation` | **OK** — parity done in `TK-04.6.4` |
| Button (Type × Size × Style × Width) | `ui/Button` | **OK** — variant matrix matches; review focus states |
| Icon button | `ui/IconButton` | **Check** parity |
| Input chip | — | **New** — used in filters, skills, and social |
| Connected button group | `ui/ConnectedButtonGroup` | **OK** |
| Search bar | `ui/SearchBar` | **OK** — needs wiring to the filter |
| Project Card (Size L/M/C) / Card grid | `work/ProjectCard`, `ProjectCardGrid`, `shared/MediaCard`, `shared/TitleCard` | **Fix** — tags must wrap on Medium/Compact (`EP-08`) |
| Summary + Summary Link | `ProjectDetail/SummaryNav` | **Check** parity (`EP-09`) |
| Project Hero (Size L/M/C) | `ProjectDetail` Hero | **Check** parity (`EP-09`) |
| Project Intro + Project Facts + Fact Row | — | **New** (`EP-09`) |
| Block / Header, Paragraph, List Item, Code, Table, Image, Video, Media Columns | `BlockRenderer/blocks/*` | **Fix** — list typography and image aspect ratio (`EP-09`) |
| Project Pager + Pager Card | — | **New** (`EP-09`) |
| Footer (Size L/M/C) + Footer Link Column | — | **New** (`EP-09`) |
| Carousel | `ui/Carousel` | **OK** |
| Linear / Circular progress indicator | — | **New** |
| Loading indicator (M3 Expressive) | — | **New** |
| Skeleton | — | **New** |
| Shape Set (35 M3 shapes) | `assets/images/forms.svg` (partial) | **New** — extract subset as a component |
| Hero decor (2 glows + clipped shape + ring) | — | **New** |
| Profile photo (blob) | `assets/images/person-popout.png` | **Check** |

### 2.3 Foundation

| Figma | Repo | Status |
|---|---|---|
| `material-theme` collection — Light/Dark + High/Medium contrast | `styles/themes/light.css`, `dark.css` (`body[data-theme=...]`) | **Fix** — no wired toggle; contrast variants missing |
| `Typescale` collection — Baseline/Expanded/Medium/Compact modes | `styles/typography.css` — `@media` at 1024/768/480 | **Fix** — breakpoints don't match 1512/744/402 |
| `Shape` collection — Corner/None…Full | scattered across CSS Modules | **New** — extract into tokens |
| Elevation (5 levels, Light/Dark) | `styles/elevation.css` | **OK** |
| Font theme (Roboto) | `global.css` uses `system-ui` as the first font | **Fix** — Roboto isn't the effective font |

### 2.4 Out of backlog (already shipped)

Client-side routing · `@/` and `@assets/` aliases · Vitest component testing (ADR-004) · CI on `main`/`develop` · SVG as component (svgr) · migration to Deno as the single manifest · Biome in place of ESLint · BlockRenderer with 9 block types (Code, Columns, ContentGroup, Header, Image, List, Paragraph, Table, Video) · typed project data layer · 3 ADRs · elevation tokens · Carousel · Card grid.

---

## 3. Execution order

```
EP-01 Baseline ──┬── EP-03 Tokens ── EP-04 Components ──┬── EP-06 Home
EP-02 Design ────┘                          │            ├── EP-07 About Me
                                            │            ├── EP-08 Projects Index
                                   EP-05 App Shell ──────┼── EP-09 Project Detail
                                                         └── EP-10 System States
                                                                  │
                                                    EP-11 i18n ───┴── EP-12 Quality

EP-13 Backend runs on its own track (no screen depends on it yet).
```

---

## EP-01 — Baseline and repository hygiene

**Goal:** get a clean tree with a safety net before touching product code.
**Dependencies:** none. **Size:** S.

### ST-01.0 — Run the dependency upgrade runbook

> **As a** dev, **I want** the toolchain up to date before starting any other work, **so that** the rest of the backlog is built on current dependencies instead of drifting further behind.

Context: this is the first thing to do, before `ST-01.1`. Follow [`docs/runbooks/dependency-upgrades.md`](../runbooks/dependency-upgrades.md) end to end, using Biome as the concrete walkthrough example (it's pinned via `npm:@biomejs/biome@2` in `deno.json`'s tasks, not through the import map, so it needs its own check).

- **TK-01.0.1** — Check and update dependencies
  - [x] `deno outdated` to see what's behind
  - [x] `deno outdated --update` for routine in-range bumps
  - [x] Evaluate `deno outdated --update --latest` for anything with a major available; read changelogs before applying
- **TK-01.0.2** — Update Biome (runbook §5, as the worked example)
  - [x] Confirm the version pinned in the `lint`/`format`/`check` tasks in `deno.json` against the latest on npm
  - [x] Bump the `$schema` in `biome.json` to match
  - [x] Run `deno task check` and review the diff — new rules enabled by default are expected on a minor bump
- **TK-01.0.3** — Update Deno itself
  - [x] `deno --version` to check the current version
  - [x] Upgrade through whichever method installed it (`brew upgrade deno` on this machine — see runbook §4, `deno upgrade` doesn't work on the Homebrew build)
- **TK-01.0.4** — Validate everything (runbook §6)
  - [x] `deno task typecheck`
  - [x] `deno task lint`
  - [x] `deno task build`
  - [x] `deno task dev` — manual smoke test across `/`, `/projects`, `/projects/:slug`
- **TK-01.0.5** — Commit
  - [x] `deno.json` and `deno.lock` together, per runbook §7

### ST-01.1 — Remove the Material Web Components dependency

> **As a** dev, **I want** the repo free of `@material/web`, **so that** we don't ship dead web components in the bundle and can own the component implementation.

Context: `client/src/app/main.tsx` imports 7 `@material/web` modules for their side effects. A search for `<md-*>` across `client/src` returns no matches — the lib is 100% dead weight, only adding to the bundle.

- **TK-01.1.1** — Remove the `@material/web` imports from `main.tsx`
  - [x] Delete the 7 import lines (`filled-button`, `icon-button`, `filled-icon-button`, `outlined-icon-button`, `outlined-button`, `checkbox`, `icon`)
  - [x] Remove `"@material/web/"` from the import map in `deno.json`
  - [x] Run `deno task build` and compare bundle size before/after (record it in the commit message)
- **TK-01.1.2** — Confirm nothing depended on the lib
  - [x] `grep -rn "md-" client/src` and review every hit
  - [x] Run `deno task typecheck` and `deno task lint`
  - [x] Manual smoke test across the 5 existing routes

### ST-01.3 — Move the repo's copy to English

> **As a** visitor, **I want** the whole site in a single language, **so that** I don't run into Portuguese in the middle of an English page.

Context: 13 files contain accented characters. It's not just comments — there's screen copy and project content too.

- **TK-01.3.1** — Interface copy
  - [x] `NotFound.tsx` — "404 — Página não encontrada", "Oops! A página que você procura não existe.", "Voltar para a página inicial" (the screen gets rebuilt in `EP-10`; translating now avoids shipping PT in production in the meantime)
  - [x] `MediaCard.tsx` — "Mídia indisponível", "Não foi possível carregar a mídia."
  - [x] `ProjectCarousel.tsx` — placeholder descriptions ("Outro conteúdo para segundo item.")
- **TK-01.3.2** — Comments and identifiers
  - [x] Comments in `Button.tsx`, `TitleCard.tsx`, `MediaCard.tsx`, `SummaryNav.tsx`, `ContentLayout.tsx`, `BlockWrapper.tsx`, `project-data.types.ts`
  - [x] Don't rename any exports in this step — renaming is `EP-04`
- **TK-01.3.3** — Set the standard
  - [x] Document in the README: code, copy, and comments in English; conversation and ADRs in Portuguese
  - [x] Add an accented-character review item for string literals (Biome has no scoped built-in rule)

> The content of `spotify-clone.data.ts` and `reference.data.ts` is entirely in Portuguese, but it's **case study content** — it gets rewritten together with `ST-09.1`, not here.

### ST-01.4 — Safety net: CI and tests

> **As a** dev, **I want** typecheck, lint, and build running on every push, **so that** I don't discover a break 10 commits later.

- **TK-01.4.1** — CI pipeline
  - [x] `.github/workflows/ci.yml` with `setup-deno`
  - [x] Jobs: `deno task typecheck`, `deno task lint`, `deno task build`
  - [x] Run on PRs and on pushes to `main` and `develop`
  - [x] Cache the Deno dependency directory
  - [x] Fix case-sensitive imports for `container` and `sidebar`; macOS resolves PascalCase paths locally, but the Linux CI runner does not
- **TK-01.4.2** — Choose and configure the test runner
  - [x] Decide between `deno test` + `@testing-library/react` or Vitest (record as ADR-004)
  - [x] Configure the DOM environment
  - [x] One smoke test (render `App` with no error) to validate the setup
  - [x] `deno task test` task and a CI job
- **TK-01.4.3** — Define the coverage bar
  - [x] Require a test for every new `ui/` component (that's where regressions hurt most)
  - [x] Document the bar in the README

### ST-01.5 — Loose lint findings with no other home

> **As a** dev, **I want** the handful of orphan Biome findings fixed, **so that** they don't sit in `deno task lint` output indefinitely with nowhere to go.

Context: running `deno task check` (as part of `ST-01.0`) surfaced 31 errors / 12 warnings / 16 infos of pre-existing lint debt — none of it caused by the dependency bump. Most of it isn't worth fixing here: the CSS specificity/`!important` findings in the navigation components are already going to be touched by `EP-04`/`EP-05` (see the note on `ST-04.6`), and the SVG accessibility findings belong to `EP-12`'s accessibility audit (see the note on `ST-12.1`). Fixing them now would mean redoing the same work twice. Only these two are truly standalone — small, one-off, and not touched by any planned epic:

- **TK-01.5.1** — Fix the two orphan findings
  - [x] `client/src/app/main.tsx:16` — `lint/style/noNonNullAssertion` on `document.getElementById("root")!`
  - [x] `client/src/components/layout/navigation/NavigationRail/NavItem.tsx:19` — `lint/a11y/useButtonType`, missing explicit `type` on `<button>`

---

## EP-02 — Close out design-source pending items

**Goal:** resolve, in Figma, the inconsistencies that would block implementation.
**Dependencies:** none. **Size:** S. **Owner:** design (Figma), not code. **Status:** ✅ done 2026-10-13.

### ST-02.1 — Normalize theme modes per page

> **As a** dev, **I want** a page's 4 breakpoints to show the same theme, **so that** I know what the default state to implement is.

- **TK-02.1.1** — Decide each page's default theme
  - [x] Define: everything in Light; Dark is a user choice through the theme toggle (`ST-03.4`) — decision 1 in §4
  - [x] Apply the chosen mode to all 4 frames of each page (`Projects — Index` 1920 was Dark)
  - [x] Pin the mode explicitly on every frame — 10 frames inherited the default (Home 744/402, all Projects — Index frames)

### ST-02.2 — Real content on Project — Detail

- **TK-02.2.1** — Replace the M3 documentation placeholder
  - [x] The body today is the M3 "Elevation" article (Availability & resources, Differences from M2, etc.)
  - [x] Write a real case study using the blocks `BlockRenderer` already supports
  - [x] Validate that every block used in the design has a matching type in the `blockRegistry` — Spotify (12 frames) uses header, paragraph, image, table, code, list; Reference adds columns (`Block / Media Columns`) and video; all registered. `Project Intro`/`Project Facts` are page-level, not blocks (see facts follow-up)
- **TK-02.2.2** — Tablet and mobile frames for the Spotify Web case study (Figma page `Project — Spotify W`, node `1407:1658`)
  - [x] Today only 1920 and 1512 exist, for each of the 3 tabs (Overview, Architecture, Repository)
  - [x] Create 744 (Medium) frames for the 3 tabs (section `Tablet`, built from the `Project — Reference` 744 shell)
  - [x] Create 402 (Compact) frames for the 3 tabs (section `Mobile`, built from the `Project — Reference` 402 shell)
  - [x] Design review: the request-flow diagram in the Architecture code block wraps awkwardly at 402 (rewritten vertically for 402)

> Code follow-ups found during this epic live where the code is built: tag wrapping in `TK-08.3.2`, facts/pager/footer/block parity in `ST-09.1`–`ST-09.4`.

### ST-02.3 — Consolidate the Figma Components page

- **TK-02.3.1** — Move the scattered components
  - [x] Today only Navigation Rail, Tab Bar, and Profile photo live there; Card and Card grid live on the Projects page — the 8 per-frame `Card` mains merged into one `Project Card` set on Components (Size=Large/Medium/Compact; Title + Subtitle props; Typescale mode per size), 109 instances migrated (Projects — Index + Backup), titles/tags preserved
  - [x] Publish as local components whatever the code is going to mirror — `Project Card` mirrors `ProjectCard`; `Card grid` stays a GRID layout frame per breakpoint (it is layout, like `ProjectCardGrid`'s CSS grid, not a reusable component)
- **TK-02.3.2** — Componentize the project page from `Project — Reference`
  - [x] `Summary` + `Summary Link` (State: Enabled/Hovered/Selected) — mirrors `SummaryNav`; swapped into Reference and Spotify (16 frames)
  - [x] `Project Hero` (Size: Large/Medium/Compact; Title + Description props; image overridden per project) — swapped into 16 frames
  - [x] `Project Pager` (Layout: Horizontal/Vertical) + `Pager Card` (Direction: Previous/Next) — swapped into 16 frames
  - [x] Content blocks mirroring `blockRegistry`: `Block / Header` (Level 1/2/3 = display-large / headline-large / headline-medium, as `typography.css`), `Block / Paragraph` (Large/Medium), `Block / List Item` (Bullet/Number × Large/Medium), `Block / Code`, `Block / Table` + `Block / Table Row` (2/3 columns), `Block / Image` (Ratio 16:9 / 3:2 / 4:3 / 1:1, aspect locked) — Spotify fully converted (12 frames); Reference headings, paragraph, list and table converted (4 frames)
  - [x] `Project Facts` + `Fact Row` (Role / Stack / Year / Type; label min 120px, value fills) — Spotify Overview intro, 4 breakpoints; intro paragraph now `Block / Paragraph`
  - [x] `Block / Media Columns` (Size=Large/Medium/Compact × Media=Single/Pair; text column + images) mirrors the `columns` block; `Block / Video` (Clip variants, aspect locked); `Block / Paragraph` Size=Small; `Block / Image` Ratio=5:2 — Reference has 0 loose texts left in its sections (4 frames)
  - [x] `Footer` rebuilt: one layer structure at every size (Divider / Content → Main: Brand + Links, Bottom Bar), Size=Large/Medium/Compact, links via `Footer Link Column` — 16 instances migrated, old set removed
  - [x] `Project Intro` (Size=Large side by side / Medium, Compact stacked) wraps `Project Facts` + `Block / Paragraph` — replaces the loose "Intro Table" frame in the 4 Overview frames

---

## EP-03 — Token foundation

**Goal:** a single token vocabulary, aligned with Figma, before writing any component.
**Dependencies:** `EP-02`. **Size:** M.

### ST-03.1 — Breakpoints aligned with Figma

> **As a** dev, **I want** breakpoints that match Figma's frames, **so that** I can check implementation against design without mental conversion.

Context: the CSS today breaks at 1024/768/480 (plus 640/600/520/1294/1295 scattered around). Figma breaks at 1920/1512/744/402.

- **TK-03.1.1** — Define the canonical scale
  - [x] Decide the cut points: M3 window size classes — Compact `< 600`, Medium `600–1199`, Large `1200–1599`, Extra-large `≥ 1600`. The Figma frames (402/744/1512/1920) are the reference width inside each range, not the cut points; cutting at the frame widths would put 1280–1440px laptops on the tablet layout (decided 2026-10-18)
  - [x] Declare as `@custom-media` in `client/src/styles/breakpoints.css` (`--compact`, `--medium`, `--large`, `--extra-large`)
  - [x] Enable Lightning CSS in `client/vite.config.ts` (`css.transformer: 'lightningcss'`, `drafts.customMedia`) — no new dependency. Biome doesn't know `@custom-media`: `noUnknownAtRules` ignores it and `noUnknownMediaFeatureName` is off
  - [x] Convert one module (`ColumnsBlock.module.css`) as proof and confirm the build output
  - [x] Document the scale in the README
- **TK-03.1.2** — Migrate existing media queries
  - [x] Inventory the distinct breakpoints in use today — 8 values (1024, 768, 480, 640, 600, 520, 1294, 1295) across 11 files
  - [x] Rewrite every CSS Module to the canonical scale — `min-width: 1294/1295` → `(--large), (--extra-large)`; `max-width: 1024` → `(--compact), (--medium)`; `max-width: 480–640` → `--compact`; `max-width: 768` → `(--compact), (--medium)` (it covered the 744 frame, so the rule belongs to Medium too)
    - [x] Project Detail: `ProjectDetail.page.module.css`, `ContentLayout.module.css`, `SummaryNav.module.css`
    - [x] Projects Index: `ProjectListHero`, `ProjectCardGrid`, `TitleCard`
    - [x] Home: `ExperienceSection`, `ProjectCarousel`
    - [x] Shared: `typography.css` (cut points only — values are `ST-03.2`), `CarouselSlide`
  - [x] Check every screen at the 4 breakpoints and log the breakages
    - Project Detail (checked at 402/744/1199/1200/1512 against the pre-migration build): the desktop layout now starts at 1200 instead of 1294; nothing new broke. Already broken before the migration, fixed in `EP-05`/`EP-09`: the summary column is clipped on the right at 1200–1512, and below 1200 the article sits under the Navigation Rail and is cut on the left
    - Projects Index (checked at 402/700/1199/1512 against the pre-migration build): filters and search now stack below 1200 instead of 1024 — intended. Already broken before, fixed in `EP-05`/`EP-08`: at 402 the page scrolls sideways (the rail stays on mobile and cards/filters overflow)
    - Home (checked at 402/744/1100/1512 against the pre-migration build): 402, 744 and 1512 unchanged. At 769–1199 Home now uses the tablet layout (scrolling project carousel, smaller logos grid) instead of the desktop one — intended. Already broken before, fixed in `EP-06`: at 402 the hero and carousel overflow sideways, and the hero decor overlaps the CTA buttons at every width
    - Shared (compiled CSS diffed before/after — only the media queries changed): the 48px display tier (old `max-width: 1024px`) is gone, so at 1024–1199 display/headline text uses the Medium sizes (display-large 40px) instead of the full ones. 402, 744 and 1512 unchanged
    - Headless Chrome won't go below a 500px viewport; check Compact at a true 402px through an iframe

### ST-03.2 — Responsive typescale mirroring the Figma collection

> **As a** dev, **I want** font size to change per breakpoint via token, **so that** I don't need to swap typography classes on every screen.

Context: in Figma the scale changes per **mode** of the `Typescale` collection (Expanded/Medium/Compact) — the same text style renders different sizes per frame. `typography.css` already attempts this with `@media` on `:root`, but at the wrong breakpoints.

- **TK-03.2.1** — Rewrite `typography.css` on the canonical scale
  - [x] Map the 15 roles (Display/Headline/Title/Label/Body × L/M/S) × 4 modes — Baseline and Expanded are identical; frames pin Expanded at 1920/1512, Medium at 744, Compact at 402. So Large/XL = the `:root` defaults and only `--medium`/`--compact` override
  - [x] Pull values from Figma's `Typescale` collection — don't estimate (read 2026-10-18; the Expanded values already matched, the Medium/Compact tiers were estimates and are now replaced)
  - [x] Include the extra roles the design uses: `Hero Display`, `Body Large Plus`, `Title Small Plus` — tokens plus `.hero-display`, `.body-large-plus(-emphasized)`, `.title-small-plus`; no component uses them yet
  - [x] Emphasized/prominent as a separate token (Figma has `-emphasized` on almost every role) — already `--*-emphasized-weight`; values match Figma (Bold = SemiBold 600)
- **TK-03.2.2** — Fix the effective font family
  - [x] `global.css` puts `system-ui` first — Roboto is never applied (body now uses `var(--font-roboto)`)
  - [x] Serve Roboto locally (weights 400/500/600) instead of from a CDN — one variable woff2 (Latin subset, weights 100–900, 43 KB) from `@fontsource-variable/roboto` 5.3.0 in `client/public/fonts/roboto/`, `@font-face` in `styles/fonts.css`. The Google Fonts link for Roboto and the unused Roboto Flex is gone; Material Symbols still comes from Google Fonts
  - [x] `font-display: swap` and preload the above-the-fold weight — the single variable file is preloaded in `index.html`

### ST-03.3 — Shape tokens

- **TK-03.3.1** — Extract the `Shape` collection into CSS
  - [x] `--md-sys-shape-corner-{none,extra-small,small,medium,large,large-increased,extra-large,extra-large-increased,extra-extra-large,full}` — in `styles/shape.css`: 0 / 4 / 8 / 12 / 16 / 20 / 28 / 32 / 48 / 1000px
  - [x] Replace literal `border-radius` values across CSS Modules — 22 modules, including `--btn-radius*`/`--icon-btn-radius` and the broken `var(--Corner-*, …)` fallbacks. `ConnectedButtonGroup` radii were half the height, so they became `full`. Off-scale values rounded to the nearest token (decided 2026-10-18): `Container` 24→28, carousel slide 10→12, tab bar 40→full, grouped button hover 10→12 and selected 24→28
  - [x] Check against the collection's values in Figma — read 2026-10-18; Home, Projects, Detail and 404 compared before/after at 744/1512, no visible change

### ST-03.4 — Working Light/Dark theme

> **As a** visitor, **I want** to toggle between light and dark, **so that** I can read the site the way I prefer.

Context: `light.css` and `dark.css` exist and match Figma's `material-theme`. The selector is `body[data-theme="Light"]`, but nothing writes that attribute — and the `dark_mode` `IconButton` in `Sidebar` has no `onClick`.

- **TK-03.4.1** — ThemeProvider
  - [x] Context with `theme`, `setTheme`, `resolvedTheme` — `app/theme/ThemeProvider.tsx` + `useTheme`, logic in `app/theme/theme.ts`, 4 tests
  - [x] Write `data-theme` on `<body>`
  - [x] Support `system` via `prefers-color-scheme` — the default until the visitor picks a theme (decision 1); follows live OS changes while no choice is saved
  - [x] Persist to `localStorage` (key `theme`; `system` clears it)
  - [x] Avoid a flash of the wrong theme on first paint (inline script in `index.html`) — verified it sets the theme with the app bundle removed
- **TK-03.4.2** — Wire up the rail toggle
  - [x] Connect the `dark_mode`/`light_mode` `IconButton` to the provider — the rail button is now controlled by `useTheme` instead of its own internal toggle state
  - [x] Reflect the actual state in the icon (moon in Light, sun in Dark, also on a system-driven first visit)
  - [x] `aria-pressed` and an accessible label — `IconButton` gained `ariaLabel`/`ariaPressed` props and `type="button"`; toggle labelled "Dark theme". Sidebar test covers the round trip
- **TK-03.4.3** — Audit both themes
  - [x] Walk through the 4 pages in Light and Dark — Home, Projects, Detail and 404 at 1512, before/after in both themes
  - [x] Hunt down hardcoded colors that don't switch with the theme — fixed: `body` had no text color (Detail article text was black on dark); `--M3-sys-light-*` names that don't exist, so their light fallbacks always won (Projects title, card title/subtitle); hero corner cover `#efeee2`; carousel slide `#333`/`#666`; logo wordmarks `#0A0D12` (now `currentColor`); black overlays on card press and tab hover (now `on-surface` via `color-mix`); carousel focus outline. Left as is: elevation shadows (black is correct in both themes) and `var(--md-sys-*, #fallback)` fallbacks (the token always exists). State layers in `Button`/`IconButton`/`TabItem` → `TK-04.6.5`
  - [x] Check the hero glows in Dark (container tokens change luminance) — the glows don't exist in code yet; check them when the hero decor is built (`ST-04.5`/`EP-06`)
  - [x] `dark.css` was missing `--md-sys-color-background` (page background transparent in Dark) — added Figma's `Schemes/Background` Dark, `rgb(19 20 13)`

---

## EP-04 — In-house component library

**Goal:** implement in React the M3 components the design uses, with no external lib.
**Dependencies:** `EP-03`. **Size:** L.

### ST-04.1 — Component gallery

> **As a** dev, **I want** an internal route that renders every component in every variant, **so that** I can compare against Figma without opening the whole application.

Rule (2026-10-18): every component in the gallery must exist in Figma — as a local component, or as the M3 library component the screens use. If it isn't in Figma, design it there first.

- **TK-04.1.1** — `/__gallery` route (dev only)
  - [x] Grid layout per component, each labeled with its Figma component name — `app/gallery/`; v1 covers Button, IconButton, ConnectedButtonGroup, SearchBar, TabbedNavigation (Tab Bar), ProjectCard, CompanyLogo
  - [x] Theme and breakpoint switcher on the page itself — components render in an iframe at exactly 1920/1512/744/402 so media queries apply; theme syncs to the iframe through a `storage` listener in `ThemeProvider` (also syncs across tabs)
  - [x] Excluded from the production build — lazy route behind `import.meta.env.DEV`; verified no gallery code in `dist/`
  - First things the gallery shows, to check in `ST-04.6`: in Dark, the Tab Bar's selected tab is darker than the unselected ones; `ProjectCard` has an empty band below its content

### ST-04.2 — Chip

> **As a** visitor, **I want** filter and skill chips, **so that** I can navigate and read the stack quickly.

- **TK-04.2.1** — `Chip` component
  - [x] Variants: `input` only — it's the only chip the design uses (Home skills, 20 instances of the M3 library `Input chip`); the Projects filters are a `Connected button group`. `assist`/`filter`/`suggestion` dropped 2026-10-18 — design them in Figma first if needed. `components/ui/Chip/`; static by default (Home skills), a toggle button with `onClick`
  - [x] States: enabled, hover, focus, pressed, selected, disabled — Kit opacities (8/10/8%), Kit focus ring, M3 disabled (On Surface 38% label, 12% border/container). The Kit's Dragged state is left out: nothing is draggable
  - [x] Optional left/right icon slots — Kit configurations: leading icon (18px, Primary), avatar (24px), closing icon as its own button (`onRemove`)
  - [x] `elevated` and `outlined` — dropped: the M3 Input chip has no elevated style; unselected is outlined, selected is filled
  - [x] Render test per variant — `Chip.test.tsx`; gallery specimen (light/dark checked against the Figma `SkillChipRow`)
- **TK-04.2.2** — `ChipRow` with wrap
  - [x] Wrap with token-based gap — 8px, as Figma `SkillChipRow`; a `<ul>` of chips
  - [ ] Carousel mode with horizontal scroll for the Projects Index — not needed yet: the Projects filters are a `Connected button group`
  - [ ] Keyboard navigation between chips (roving tabindex) — only matters once a row of interactive chips exists

### ST-04.3 — Progress feedback

Figma: `Linear Progress` (Type = Indeterminate / Determinate) on the Components page, section `Feedback` (created 2026-10-18 from the Loading screens). Circular progress and the M3 Expressive loading indicator are not in the design.

- **TK-04.3.1** — `LinearProgress`
  - [x] Determinate and indeterminate — `value` 0–100, omitted = indeterminate (as the Figma description says); 4px track in surface-container-highest, primary indicator, full corners; gallery specimen at the Figma 400px width
  - [x] Indeterminate animation in CSS, respecting `prefers-reduced-motion` — the Figma bar (38.7% of the track) sweeps across in 1.6s with the standard easing; under reduced motion it stands where Figma draws it (12.9%)
  - [x] `role="progressbar"` with `aria-valuenow`/`aria-valuetext` — only when determinate (clamped to 0–100); `aria-label` defaults to "Loading"
- ~~**TK-04.3.2** — `CircularProgress`~~ — dropped 2026-10-18: not in the design
- ~~**TK-04.3.3** — `LoadingIndicator` (M3 Expressive)~~ — dropped 2026-10-18: not in the design. Design it in Figma first if wanted

### ST-04.4 — Skeleton

Figma (Components page, section `Feedback`, created 2026-10-18): `Skeleton` (Shape = Pill / Rect × Tone = High / Highest), `Card Skeleton` and `Header Skeleton` (Size = Large / Medium / Compact). The 4 Loading screens now use these instances instead of loose rectangles.

- **TK-04.4.1** — `Skeleton` primitive
  - [x] `pill` and `rect` shapes (Figma `Shape`; a pill on a square box is a circle) and `high`/`highest` tones (Figma `Tone`) — pill = corner full, rect = corner large (16); `width`/`height` props; `aria-hidden` (the LinearProgress announces the loading); gallery specimen at the Figma sizes
  - [ ] Shimmer disabled under `prefers-reduced-motion` — not built: the Figma Skeleton is static and the Loading screens already show motion through the LinearProgress. Design a shimmer in Figma first if wanted (could go with the TK-12.1.2 motion pass)
  - [x] Colors in `surface-container-high`/`highest`, as in Figma
- **TK-04.4.2** — Skeleton compositions
  - [x] `ProjectCardSkeleton` mirroring Figma `Card Skeleton` — sizes by breakpoint in CSS (390 / 386 / 330 tall, checked against Figma); fills its grid column like the real card instead of the Figma fixed width
  - [x] `ProjectGridSkeleton` with count per breakpoint (4 col / 3 col / 2 col / 1 col) — reuses the card grid styles; 8 / 8 / 6 / 3 placeholders, as the Figma Loading screens. Not in the gallery (no Figma component; it's the Loading frame's grid)
  - [x] `ProjectsHeaderSkeleton` mirroring Figma `Header Skeleton` (title + chips + search) — 5 chips + search at Large, 3 chips at Medium, 2 smaller chips at Compact (88 / 72 / 64 tall)

### ST-04.5 — Decorative primitives

> **As a** visitor, **I want** a hero with depth, **so that** the page doesn't feel like a form.

Context: in Figma the decor is an absolutely positioned `HeroDecor` layer with two token-colored ellipses + Layer Blur, one clipped Shape Set shape, and an outline ring. Blur is applied over a solid token instead of a gradient because gradient stops don't accept variables — and a hardcoded gradient would break in dark mode. Worth keeping the same constraint in CSS.

- **TK-04.5.1** — `Shape` component
  - [x] Subset of the M3 Shape Set as SVG: Very sunny, Soft boom, Burst, 12-sided cookie, Gem, Diamond, Circle, Pill — paths exported from the Kit (`components/decor/Shape/shapePaths.ts`)
  - [x] Color via a prop mapped to a token, not hex — `color` takes a scheme role (`primary-container`, `tertiary`…) → `var(--md-sys-color-*)`
  - [x] Scale while preserving proportion (the silhouette occupies ~0.842 of the box in Figma) — the Kit's 380 viewBox is kept, so any `size` keeps it
- **TK-04.5.2** — `GlowBackdrop`
  - [x] Ellipse with `filter: blur()` and a token color — Figma Layer Blur N ≈ CSS `blur(N/2)`
  - [x] Props for size, position, and opacity — position and size come from the parent's class (`--size`, `--glow-blur`); color and opacity are props
  - [x] `will-change`/`contain` so it doesn't repaint the entire page — `will-change: transform` (own layer). `contain: paint` would clip the blur, so it isn't used
- **TK-04.5.3** — `HeroDecor`
  - [x] Compose glows + clipped shape + outline ring — Primary Container glow 80%, Tertiary Container glow 45%, Very sunny at 40%, 1.5px Outline Variant ring. The hero clips it
  - [x] Per-breakpoint geometry (in Figma it's hand-tuned, not scaled) — values from the four Home frames; left pieces keep their left offset, the primary glow and ring follow the middle, and on Medium/Compact they sit at the bottom with the photo. Compared against Figma at 1512/744/402
  - [x] `aria-hidden` and `pointer-events: none`
  - [x] Reduce or remove blur under `prefers-reduced-motion` — dropped: nothing in the decor moves, so reduced motion doesn't apply. Revisit if it gets animated

### ST-04.6 — Parity of existing components

- **TK-04.6.1** — Audit `Button` against Figma
  - [x] Check Type × Size × Style × Width against the component set — against the M3 Kit, for the combinations the design uses. Standalone buttons now use Kit sizes (XSmall/Small 32/40px in a 48px touch target, padding 12/16/24/48/64px), icon gaps 4/8/8/12/16px, Medium icon 20px, square L/XL press radius 16px (was 20px); Text and Elevated styles filled in; labels don't wrap. Grouped buttons unchanged → `TK-04.6.3`. Selected Button shapes still differ from the Kit (Kit: round→square, square→pill), left as is because the design doesn't use a selected standalone Button. Approved after a side-by-side test (2026-10-18)
  - [x] Visible focus ring (Figma has `Show focus indicator`) — Kit ring: 3px Secondary, 2px outside; square no longer turns into a pill on focus
  - [x] Translate the component's Portuguese comments
- **TK-04.6.2** — Audit `IconButton`
  - [x] Variants and the selected state — against the M3 Kit (design uses Medium Outline Default in the rail and Medium Outline Wide in the top app bar). Icons 20/24/24/32/40px (Material Symbols font-size = the Kit icon box), square radius 12/12/16/28/28, press radius 8/8/12/16/16, selected toggles morph (round → rounded square, square → pill), 2px outline from Large, `standard` styled (CSS used `text`; `text`/`elevated` placeholders removed), Kit focus ring, comments translated. Same icon-size fix applied to standalone `Button` icons (20/20/24/32/40). Approved after a side-by-side test (2026-10-18)
  - [x] Minimum 48px touch target
- **TK-04.6.3** — Audit `SearchBar` and `ConnectedButtonGroup`
  - [x] Focus and filled-value states — SearchBar: hover as an 8% layer, clear-icon hover fixed (was a solid fill), focus keeps the elevation-1 shadow (project choice; the Kit has no focused state). Group: hover/press/focus 12/16px, selected = Secondary pill, Kit focus ring
  - [x] Parity with the design — against the M3 Kit (design: Round Small tags/mobile filters, Round Medium desktop filters, Search bar 56px). Group: no default star icon (icons stay optional per option, with `selectedIcon`), inner corners 8px, Small 40px in a 48px touch target, Medium padding 24px, outer corners drawn per segment. SearchBar: no 360px minimum (was overflowing Compact), 48px icon slots, full-color placeholder, comments translated. Approved after a side-by-side test (2026-10-18)
- **TK-04.6.4** — Audit `TabbedNavigation`
  - [x] Variant parity against the Tab Bar component set (see §2.2) — Surface Variant bar, Primary labels, selected = Primary pill with On Primary label; tabs 96/56/48px by breakpoint (`buttonSize="responsive"`, the new default) with the matching typescale and 10px around the bar; while sticky, tabs switch to Small with a shadow (project choice; the shadow variable was undefined before). Added the missing `--md-sys-color-surface-variant` (Figma Light `227 228 211`, Dark `70 72 60`). Approved after a side-by-side test (2026-10-18)
  - [x] Clean up while touching the CSS: descending-specificity selectors and a duplicate `--btn-state-layer-bg` custom property in `TabbedNavigation.module.css`/`TabItem.module.css`, and the `!important` override in `TabItem.module.css:288` — removed with the class-substring selector hack
- **TK-04.6.5** — Theme-aware state layers (found in `TK-03.4.3`)
  - [x] `Button`, `IconButton` and `TabItem` hard-code `--*-state-layer-bg` as `rgba(0,0,0,…)`, `rgba(255,255,255,…)` and M3 baseline purples (`29,25,43` / `73,69,79`), so hover/press feedback is wrong or invisible in Dark
  - [x] Derive each from the content color at the M3 Kit opacities — hover 8%, focus 10%, pressed 8% (Kit `State Layers/*/Opacity-*`; pressed was 12%, aligned to the Kit 2026-10-18). Focus also gets the layer, not just the outline. Selected-tab fills left for `TK-04.6.4`. Approved after a side-by-side test in the gallery

---

## EP-05 — App shell and responsive navigation

**Goal:** a shell that switches navigation patterns per breakpoint, as in Figma.
**Dependencies:** `EP-04`. **Size:** M.

### ST-05.1 — Navigation Rail faithful to the design

> **As a** desktop visitor, **I want** the rail with all three destinations, **so that** I can reach any page in one click.

Context: `Sidebar` has 2 destinations (Home, Projects); Figma has 3 (Home, About Me, Projects). The `#root` grid reserves `88px`; Figma uses `96px`.

- **TK-05.1.1** — Fix the rail
  - [x] `#root` from `88px` to `96px` — Figma Home frames normalized to the 96px rail too (they used 80px), 2026-10-18
  - [x] Add the About Me destination with the design's icon — Figma uses a placeholder ⭐ for every destination, so the code keeps `home` / `person` / `folder`. `/about` shows Under Construction until `EP-07`. Destinations live in `layout/navigation/destinations.ts`, shared with the tablet/mobile bars
  - [x] Active indicator driven by route, including `/about` — `NavLink`, M3 nav item (56×32 Secondary Container pill, Secondary label)
  - [x] Footer actions: language and theme — language shown disabled ("Language (coming soon)") until `EP-11`; portfolio logo added at the top (theme colors)
- **TK-05.1.2** — Rail accessibility
  - [x] `<nav>` with `aria-label`
  - [x] `aria-current="page"` on the active destination
  - [x] Focus order and a skip link to the content — "Skip to content" is the first Tab stop and focuses `#main-content`
- **TK-05.1.3** — Clean up while touching the CSS
  - [x] Empty `.nav-item--selected` block and a descending-specificity selector in `NavItem.module.css` — `NavItem` rewritten

### ST-05.2 — TopAppBar and NavigationBar for tablet and mobile

> **As a** mobile visitor, **I want** navigation at the top and bottom, **so that** I can reach everything with my thumb.

- **TK-05.2.1** — `TopAppBar`
  - [x] 88px, logo + title + actions, as in Figma — Figma hides the title layer, so there is no title; language and theme as wide outline icon buttons
  - [x] Contextual title per route — dropped: no title in Figma (see above)
  - [x] Scroll behavior (elevation once it leaves the top) — `Elevation 2` shadow while `window.scrollY > 0`; the bar is already Surface Container, as in Figma
- **TK-05.2.2** — `NavigationBar`
  - [x] 88px, 3 destinations with icon and label — M3 nav items, same destinations as the rail
  - [x] Active indicator
  - [x] iOS gesture-bar safe area — `env(safe-area-inset-bottom)` with `viewport-fit=cover` instead of a drawn gesture bar
- **TK-05.2.3** — `AppShell` that picks the pattern
  - [x] Rail at Large and up (≥1200); TopAppBar + NavigationBar below 1200 (size classes from `ST-03.1`)
  - [x] A single source of truth for destinations, consumed by both patterns — `layout/navigation/destinations.ts`; rail actions moved to `NavActions.tsx`
  - [x] Confirm there's no layout jump when switching — the switch is CSS-only; also fixes the sideways scroll on Compact

### ST-05.3 — PageContent

- **TK-05.3.1** — Content container
  - [x] `surface-container-lowest` background, rounded corners only on the rail side (as in Figma) — 28px (`Corner/Extra-large`); Figma Home normalized to this on 2026-10-18 (it had 20px). Lives on `.main-content` in `global.css`; pages no longer draw their own background/corners. The shell behind it is Surface Container, as in Figma
  - [x] On tablet/mobile the rounding moves to the top — Figma Projects 402 frames normalized to top corners on 2026-10-18
  - [x] Token-based padding — 10px on every page (Figma Home normalized from 20–24px); page sections gap 24px
  - [x] Found while doing it: Project Detail scrolled inside its own 100vh box, so the top app bar never saw the scroll. Now the window scrolls; the sticky tabs sit under the top app bar (`--top-app-bar-height`) and their backdrop matches PageContent. Below Large the summary stacks above the content (it pushed the page to 792px wide on Compact). Home hero still overflows on Compact — `ST-06.3`

---

## EP-06 — Home: fixes

**Goal:** raise Home's fidelity to the current design.
**Dependencies:** `EP-05`. **Size:** M.

### ST-06.1 — Home hero

- **TK-06.1.1** — Apply `HeroDecor`
  - [x] Geometry for all 4 breakpoints per Figma — hero matches Figma at 1920 (1804×518) and 1512 (1396×469); Compact 604 vs 603
  - [x] Main glow behind the blob; on vertical layouts it moves down with the blob
- **TK-06.1.2** — Copy and chips
  - [x] Chips: `#Python`, `3+ Years in Data`, `Power BI · SQL`, `TypeScript`, `Applied AI`
  - [x] Swap for the `EP-04` `Chip` — static chips in a `ChipRow`; wrap and center on Compact
  - [x] Headline with the highlighted portion in a token color (not a `<span>` with hex) — Tertiary; Figma text styles per frame (Display Large/Medium Emphasized, Headline Large/Small Emphasized), eyebrow Title Medium / Title Small Emphasized
- **TK-06.1.3** — CTAs
  - [x] `See My Projects` (filled) and `Contact me` (tonal), Large size on desktop and Medium on mobile — as Figma: Round Large on desktop, Square Large on Medium, Square Small sharing the row on Compact. `Contact me` opens `/about` until the contact band exists (`EP-07`). Figma's Medium buttons override the label to a hardcoded 20px (84px tall); the code keeps the Kit Large (96px), so the Medium hero is 12px taller than the frame
  - Also: the old clover photo and the social icon buttons (not in Figma) are gone; the photo is the Figma `Profile photo` placeholder (Primary 12-sided cookie) until the real photo. Below Large the Home sections now stack at their own height — the rest of the responsive Home is `ST-06.3`

### ST-06.2 — Overview section

- **TK-06.2.1** — Service cards
  - [x] `Systems & Process Automation` and `Data Engineering & Analysis` in English (the supporting text was still in PT in Figma until now — verify the repo) — the repo had four old expertise cards (`ExperienceSection`/`ExpertiseCard`, removed); now `ServicesStack` + `ServiceCard` as Figma, sizes match the frames (1512: 686×172/172/93). Figma mixes hand-typed sizes here (18.5px, Regular vs Medium titles across frames); the code follows the 1512 frame on desktop (Body Large Plus title, Body Large text, 48px shapes) and uses Title Large Emphasized / Body Large below, which match Medium and Compact
  - [x] Illustration using the `Shape` component — three Shape Set shapes in the card's color role on a 6% tint, in place of the Figma placeholder image
- **TK-06.2.2** — TrustedCompaniesBar
  - [ ] Real logos instead of `CoreOS` repeated 4× — Pluxee plus Figma `Company logo` placeholders (Galileo, CoreOS, Lightspeed, AlphaWave, Boltshift; wordmarks now `currentColor`, so they follow Dark). Pluxee shows its name until its SVG is in `assets/logos/`. More real companies to come from Nicolas
  - [x] Scrollable row behavior on mobile — changed on request (2026-10-19): the logos drift slowly to the left in a loop on every size (~30px/s, pauses on hover, faded edges). Under `prefers-reduced-motion` they stand still in a wrapped, centered row. Not in Figma yet

- **TK-06.2.3** — ProjectsCarousel
  - [x] Card peek on the sides, as in the design — M3 Hero carousel as Figma: the current project is the large card, its neighbours are compressed to 56px (8px gaps, 28px corners). Sizes match the frames (1512: 56/558/56, 1920: 56/762/56). At either end the large card takes the missing neighbour's room (1512: 622/56), no empty slot
  - [x] Touch drag, arrows on desktop — revised 2026-10-19: no arrows; the compressed cards are the navigation (each is a button, "Show project NN"), and pressing one grows it to the middle (400ms, off under reduced motion). A sideways swipe also changes card on touch. A first version with scroll-snap and separate arrows misread the design and was replaced
  - [x] Cards sourced from the data layer, not hardcoded — `projectsData` (index, name and description, More → `/projects/:slug`). Card art is Shape Set placeholders, as the Figma image placeholder. Old `CarouselSlide` and `types/project.ts` removed

### ST-06.3 — Responsive Home

- **TK-06.3.1** — Check all 4 breakpoints
  - [x] 1920 and 1512 side by side; 744 and 402 stacked — checked 2026-10-19 against the Figma frames: 1920 and 1512 match to the pixel (hero 1804×518 / 1396×469, overview columns 890 / 686). Known, accepted differences below Large: the Medium hero is 12px taller (Kit Large buttons vs Figma's hand-typed 20px label), the first Medium service card is 156px (Figma clips its 3-line text at 141), the Compact hero is 604px (Figma 631 from a stretched frame), and the Compact logo bar is one drifting row (80px) instead of Figma's 2×2 grid
  - [x] No horizontal overflow on any of them — page width equals the viewport at 402/744/1512/1920

---

## EP-07 — About Me (new page)

**Goal:** ship the page that exists in Figma and not in code.
**Dependencies:** `EP-05`. **Size:** L.

### ST-07.1 — Route and data

> **As a** visitor, **I want** a page about Nicolas, **so that** I can understand who's behind the projects.

- **TK-07.1.1** — `/about` route
  - [x] Register in `App.tsx` — `AboutPage` replaces Under Construction
  - [x] Destination in the rail and navigation bar — already there since `ST-05.1`
  - [x] Title in the TopAppBar — dropped: Figma's top app bar has no title (`ST-05.2`)
- **TK-07.1.2** — Typed data layer
  - [x] `about.data.ts`: bio, quick facts, stack by category, education, languages, contact
  - [x] Types in `features/about/data/about.types.ts`
  - [ ] Flag Figma's fictional content as pending (Verde Analytics, Horizonte Tech, USP/Esalq, PUC Minas, `nicolas.soares@email.com`) — needs real data before publishing. Flagged in `aboutData.pending` (experience, education, email, social links, CV); waiting for Nicolas's real data

### ST-07.2 — Desktop two-column layout

Context: in Figma the 1920 fits **exactly** into 1080px, with no scroll. The height isn't a guessed fixed value: the frame is fixed, the hero and contact strip are `hug`, and the body absorbs the rest. Worth reproducing this with `grid-template-rows: auto 1fr auto` instead of a magic height.

- **TK-07.2.1** — Structure
  - [x] `100dvh` with hero + body + contact strip — no scroll on desktop (2026-10-19): the page needed 974px at 1512 (sidebar alone 804px), more than a MacBook browser shows. Reworked in Figma and code following M3: two stacked containers (on top, main pane beside the supporting pane; below, the full-width contact strip that closes the page — Nicolas's structure), tighter sidebar spacing (8px between cards, 4px label-to-text), Body Large (16/24) instead of the custom Body Large Plus (20/28) for body copy, Headline Small section titles, 16px card padding, Headline Medium email, and a hero photo that gives way (up to 420/330px) so the hero absorbs the height. Figma updated to the same structure and spacing. Measured Nicolas's real browser viewport (Arc 1492×889, Safari similar): the 1512 Figma frame now uses that 889px height instead of the full 982px screen, and Large gets a 520px sidebar and tighter vertical spacing to fit it. Job titles are Title Medium Emphasized (same as the degrees) and the certifications sit at the bottom of Education. Code and Figma match card for card; fits without scrolling at 1492×889 and 1920×1080 (minimum 882px at 1512)
  - [x] Two-column body: fluid main column, 520px sidebar (440px at 1512)
  - [x] Columns ending together — the hero (main) and Education (sidebar) absorb the height
- **TK-07.2.2** — Hero
  - [x] Eyebrow, headline, role/location
  - [x] 420px photo with `HeroDecor` (330px at 1512) — `HeroDecor variant="about"` with the About geometry plus its circle and pill; photo is the Profile photo placeholder until the real one
  - [x] No CTA in the hero (those live in the contact strip)
- **TK-07.2.3** — Main column
  - [x] About card
  - [x] Work Experience: cards with index, title, supporting text, and period chip
  - [x] Professional experience only — education goes in the sidebar
- **TK-07.2.4** — Sidebar
  - [x] Quick facts (tertiary container)
  - [x] Stack: chips grouped by work area
  - [x] Education: multiple entries with a divider — reworked 2026-10-19 (Figma first, then code): M3 list with a 40px leading school icon and inset dividers, rows packed at the top, plus a Certifications chip row (chosen over three other options reviewed in Figma). Certifications are placeholders (`aboutData.pending`). Sidebar spacing per frame: compact on Large, roomier on Extra-large (Body Large Plus lists, 20px padding)
  - [x] Speaks (secondary container)
  - [x] Distribution filling the height, without stretching a card and clipping content
- **TK-07.2.5** — Contact strip
  - [x] Primary container, email in Display, social chips + Download CV — email is a `mailto:` link; chips are links (`Chip` gained `href`)
  - [x] Horizontal on desktop, vertical on mobile

### ST-07.3 — About Me on tablet and mobile

- **TK-07.3.1** — Single column
  - [x] Sidebar moves below the main content
  - [x] Stacked hero: copy on top, photo below
  - [x] Scrollable page (doesn't lock to the viewport)
- **TK-07.3.2** — 402 adjustments
  - [x] Vertical experience cards: index + period on top, title and description below
  - [x] Contact email in a smaller scale step to fit on one line — Headline Small Emphasized
  - [x] Photo at 240px

---

## EP-08 — Projects Index: fixes

**Dependencies:** `EP-04`, `EP-05`. **Size:** M.

### ST-08.1 — Working filter and search

> **As a** visitor, **I want** to filter and search projects, **so that** I can find what interests me.

Context: the chips and `SearchBar` are designed and rendered, but filter nothing.

- **TK-08.1.1** — Filter state
  - [x] `useProjectFilters` hook with tags and search term — filters by work areas (`ProjectData.areas`, new; plus `context` for the card subtitle) and searches name, description and areas
  - [x] Reflect in the URL as a query string (shareable, survives reload) — `?area=data,frontend&q=spotify`
  - [x] Multi-select tags — `ConnectedButtonGroup` gained a configurable `selectionMode` (`"single"` default, `"multiple"` with `selectedIndices`), approved by Nicolas; grouped buttons now expose `aria-pressed`. The filter uses `multiple`: a project shows if it has any selected area (`?area=data,frontend`), and "All" clears the selection. Gallery specimen added
- **TK-08.1.2** — Wire up the UI
  - [x] Selectable chips with counts — "All · N" plus up to four areas with their counts, in the connected button group (Figma)
  - [x] Debounced search — 250ms, then the URL updates
  - [x] Clear filters button — in the empty state
- **TK-08.1.3** — Empty state
  - [x] Render `EP-10`'s `EmptyState` when the filter returns nothing — `NoProjectsFound` (TK-10.2.4) replaced the interim message
  - [ ] Actions: `Clear filters` and `View all projects`

### ST-08.2 — Tablet and mobile views

Context: Figma has three variations at 744 and 402 — Search view, Filter view, and Selector. Read 2026-10-19: they are three states of the header, not separate screens. "Selector" shows the title with a Filter / Search button pair; each opens its tool in place with a back button. There is no bottom sheet or card selection in Figma — the earlier tasks below were rewritten to match it.

- **TK-08.2.1** — Search view
  - [x] Expanded search filling the bar — back button + search bar beside the title on Medium; on Compact the title row keeps the back button and the bar takes its own row (as Figma)
  - [x] Auto-focus and Esc key to exit
- **TK-08.2.2** — Filter view
  - [x] The area filter beside a back button, scrolling sideways when it doesn't fit (Figma "Filter chips carousel")
  - [x] Back returns to the selector; the selector shows the active filter/search count ("Filter · 2", "Search · 1")
- **TK-08.2.3** — Selector
  - [x] Filter / Search button pair (Figma connected group with icons) beside the title
  - Back buttons follow Figma: tonal on Medium, outline on Compact. Desktop keeps filter and search side by side

### ST-08.3 — Responsive grid

- **TK-08.3.1** — Columns per breakpoint
  - [x] 4 / 3 / 2 / 1 per Figma — card widths 421 / 427 / 326 / 334 (Figma 420 / 433 / 326 / 334), every card 395px tall; rows no longer stretch to the page height
  - [x] Token-based gap — 24px (Figma uses 25)
  - [x] Skeleton with the same column count — `ProjectGridSkeleton` reuses the card grid (EP-10)
- **TK-08.3.2** — `ProjectCard` parity with Figma `Project Card` (Size L/M/C)
  - [x] Tags: `ConnectedButtonGroup` is `nowrap` + `overflow: hidden`, so 4 tags clip on 744/402 cards; Figma wraps them (Small size, 2px gap) — allow `flex-wrap` below 1512 — wraps below Large; rows are 48px apart (touch targets) vs Figma's 42
  - [x] Title `title-large`, subtitle `body-large`, sized by the responsive typescale (`ST-03.2`) — no per-breakpoint classes. The title was an unstyled `<h3>` (wrong class) and the subtitle hardcoded 16px. Also fixed the empty band below the card content noted in `ST-04.1`

---

## EP-09 — Project Detail: fixes

**Dependencies:** `EP-02` (real content — done), `EP-05`. **Size:** M.
**Design source:** Figma `Project — Spotify W` (content, 3 tabs × 4 breakpoints) and `Project — Reference` (every block type); components on the `Components` page.

### ST-09.1 — Real content

- **TK-09.1.1** — Replace the placeholder
  - [x] Port the Spotify Web case study from Figma into `spotify-clone.data.ts` (Overview, Architecture, Repository tabs), in English — copy verbatim from Figma; renamed "Clone do Spotify" → "Spotify Web" everywhere (slug kept); images exported from Figma as webp in `assets/images/projects/spotify-web/` (hero illustration, architecture diagram, and the 3 real screenshots that sat beside the frames fill the empty Screens slots — decided 2026-10-19); the Overview "Section 3" placeholder link dropped
  - [ ] PENDING (Nicolas): GitHub repository URL for "Source — GitHub repository" (the old data had `#`)
  - [ ] PENDING (Nicolas): the architecture diagram in Figma is titled "MY PORTFOLIO — ARCHITECTURE", not Spotify Web — confirm or replace
  - [x] Confirm every block in the design exists in the `blockRegistry` (done in `TK-02.2.1` — no missing block types)
- **TK-09.1.2** — Project facts and intro
  - [x] `ProjectData` has no facts field — add `facts: { label: string; value: string }[]` (Role / Stack / Year / Type) — `ProjectFact[]`, optional; filled for Spotify Web (rendered by `ProjectIntro`, next task)
  - [x] `ProjectIntro` mirroring Figma `Project Intro`: facts beside the intro paragraph at Large, stacked at Medium/Compact — new `intro` content block (the page renders it with the project's `facts`); facts as a `<dl>`; labels `headline-large-emphasized` in Roboto Condensed Medium Italic (decided 2026-10-19: self-hosted Roboto Italic with the width axis, +70 KB, not preloaded), values `headline-small`, paragraph `body-large-plus`. The Figma section "Icon Rail" is the existing copy-link button of `BlockWrapper`
- **TK-09.1.3** — Block parity with the Figma `Block / *` components
  - [x] List items: `ListBlock.module.css` uses `body-medium`, Figma uses `body/large-plus` — plus the Figma markers (• / "1.", 12px before the text) and 8px between items; paragraphs moved to `body-large-plus` too (Block / Paragraph Size=Large)
  - [x] Image block: lock a default aspect ratio (Figma ratios 16:9 / 3:2 / 4:3 / 1:1 / 5:2) — 16:9 unless the data sets one; secondary-container fill while loading, caption 8px below
  - [x] `columns` block matches `Block / Media Columns` (side by side at Large, stacked below) — refined from the Spotify frames: media-only rows (screens, code) stay side by side on Medium and stack on Compact; rows with text stack from Medium; 24px gutters
  - [x] Beyond the list (2026-10-19): `CodeBlock` was unstyled (empty CSS) — now Figma `Block / Code`; table cells on the body-medium tokens; block rhythm from the Figma frames (24px within a section, 96px before a level-2 header, rows of 76 + 20 + 996px at Large, 40 / 16px page margins below Large, copy-link rail hidden below Large). Measured against the Spotify frames at 1512 / 744 / 402: every block lands on the Figma y, x and width (the Overview intro section is 8px shorter than in Figma)
  - [x] Hero matches Figma `Hero` (2026-10-21): title on `display/hero` (96 / 57 / 45, was the global h1 `display-large`), description `title/large` 20px below; panels 580px tall at Large and 400px at Medium (text wider than the image, 10px apart, 30px padding), stacked on Compact with a 260px image; side margins on the Figma x at 744 / 402

### ST-09.2 — Footer

- **TK-09.2.1** — Footer component (Figma `Footer`, Size L/M/C + `Footer Link Column`)
  - [x] Navigation and Resources columns, Social, and the copyright line — `components/layout/Footer` with the Figma wave divider, logo and copyright icon as assets (divider and icon recolored from tokens for dark mode); the year comes from the clock; no fill of its own (transparent on the page container, decided 2026-10-21; Figma uses surface). Measured at 1512 / 744 / 402: 524 / 624 / 666px tall, as in Figma
  - [x] Labels in English (Navigation, About, Work, Contact, Resources, Résumé)
  - [x] Reusable across other pages — no props, content in `footer.data.ts`; on Project Detail for now
  - [ ] Pending (Nicolas): real URLs for GitHub, LinkedIn, Telegram, Email and Résumé (`#` for now); Contact points to `/about`; Figma "Project 1 / Project 2" became Spotify Web (the only public case study)

### ST-09.3 — SummaryNav and project-to-project navigation

- **TK-09.3.1** — Review SummaryNav
  - [ ] Sticky, with the active item tracking scroll position
  - [ ] Hide on mobile or turn into a selector
- **TK-09.3.2** — Previous/next (Figma `Project Pager`: Horizontal on desktop, Vertical on mobile)
  - Decided 2026-10-19: the pager goes to other **projects** (the Figma frames walk the tabs — update Figma first, then code)
  - [ ] Derive from the data layer's ordering
  - [ ] Edge state at the first and last item

---

## EP-10 — System states

**Goal:** cover the 5 designed states; only 2 exist today.
**Dependencies:** `EP-04`. **Size:** M.

### ST-10.1 — Base state component

> **As a** dev, **I want** a single state component, **so that** the 5 states don't diverge from each other.

Context: in Figma the 5 states share the same anatomy — shape illustration, headline, supporting text, and up to two actions.

- **TK-10.1.1** — `StateLayout`
  - [x] Props: illustration, headline, supporting text, actions — at most two actions (tuple type), the first filled and the second text; each one runs `onClick` or navigates with `to`; `headingLevel` h1/h2 (h2 when inline in a page that already has an h1)
  - [x] Centered in `PageContent`, filling the available height — fits the 1492×889 viewport without scrolling (content 756px)
  - [x] Illustration scale per breakpoint (340 / 340 / 260 / 200) — `StateIllustration` takes the decor in Figma px on the 340 box and positions it in %, so it scales with the box; the mark uses `hero-display`, whose token already scales 96 / 57 / 45
  - [x] Actions in a column on mobile — Button Large on Medium and up, Medium on Compact (`useSizeClass`)
  - Not in the gallery: it has no Figma component, only the `EmptyState / …` frames; it is reviewed on the state routes

### ST-10.2 — The five states

- **TK-10.2.1** — 404 (fix)
  - [x] Migrate `NotFound` to `StateLayout` — `NotFound.module.css` deleted (hand-typed sizes); unknown paths still redirect to `/404`, covered by `NotFound.test.tsx`
  - [x] "404" numeral over the Very sunny shape — Gem and Pill around it as in Figma; the illustration is `aria-hidden`, screen readers get "Page not found"
  - [x] `Back to home` (filled) and `View projects` (text)
- **TK-10.2.2** — Under Construction (fix)
  - [x] Migrate `UnderConstruction` to `StateLayout` — old CSS and 🚧 emoji removed; copy and actions (`Back to home`, `View projects`) from Figma
  - [x] Cone over Soft boom — Triangle added to `shapePaths.ts` (exported from the Kit Shape Set, shows in the gallery Shape row); `StateIllustration` `decor` now takes any number of shapes in Figma layer order, so the off-center cone (81,87 / 178) uses the same geometry as the corner shapes
  - [ ] Revisit the illustration (approved 2026-10-19 with a caveat): the cone over Soft boom doesn't blend well — redesign in Figma first, then update the `decor` numbers
- **TK-10.2.3** — Something Went Wrong / 500 (new)
  - [x] Burst in error-container with "!" — Diamond (error) and Circle (secondary-container) around it; `Shape` gained the `error` and `error-container` colors (also in the gallery Colors row)
  - [x] `Try again` and `Back to home` — `Try again` reloads the page by default; inside the boundary it re-renders instead
  - [x] Root `ErrorBoundary` falling into this screen — wraps the routes inside `PageContent`, so the rail and navigation bar stay usable; cleared by Try again or any navigation (`location.key`, so it also resets when the failing page is `/`)
  - [x] `/error` route for visual review — dev-only, like `/__gallery`
- **TK-10.2.4** — No Projects Found (new)
  - [x] Search icon over 12-sided cookie — surface-container-high, with 4-sided cookie (new in the Shape Set paths) and Circle; `Shape` gained `surface-container-high`; the Material Symbols icon scales with the illustration (132 / 101 / 78)
  - [x] Used inline by Projects Index, not as a route — decided 2026-10-19 and drawn in Figma first ("Projects — No results" 1512 / 744 / 402): the header stays, the state replaces the grid with an h2, one action (`Clear filters`; `View all projects` did the same thing), and `StateLayout inline` drops the vertical padding to 24px at Large and up so it fits under the header at 1492×889 without scrolling
- **TK-10.2.5** — Loading / Skeleton (new)
  - [x] Projects Index skeleton: header + linear indeterminate + grid — `ProjectListSkeleton`, spacing from the Figma Loading frames (10px stack, 16px above the grid; grid heights 1218 / 1206 / 1038 as in Figma)
  - [x] `Suspense` on routes with the matching skeleton — decided 2026-10-19: only `/projects` is code-split (`lazyWithFloor`), the only page with a designed loading state; the rest stays in the main bundle. `App` now imports `ProjectDetailPage` from its file so the barrel doesn't pull the list page back in
  - [x] Minimum duration floor to avoid flashing on fast connections — the skeleton appears only after 150ms (`DelayedFallback`) and, once shown, stays at least 400ms (`withFloor`); checked in the browser with the chunk delayed

### ST-10.3 — Integration

- **TK-10.3.1** — Wire up to real flows
  - [x] Nonexistent slug falls to 404 — `ProjectDetailPage` already rendered `NotFound`; now tested through `App`
  - [x] Data load failure falls to 500 — project data is static, so the failure that can happen is the code-split chunk failing; the root `ErrorBoundary` catches it (tested)
  - [x] Loading shows a skeleton, not a blank screen — blank only for the first 150ms, by design
  - [x] Test each path — `SystemStates.test.tsx` and `lazyRoute.test.tsx`

---

## EP-11 — Internationalization (pt/en)

**Goal:** wire up the rail's language action, which is already designed.
**Dependencies:** `EP-06`…`EP-10` (no point extracting strings from a screen that's about to change). **Size:** M.

### ST-11.1 — Infrastructure

- **TK-11.1.1** — Choose the approach
  - [ ] Lightweight custom solution vs. a library (record as an ADR)
  - [ ] English as the default language (the design is already entirely in English)
  - [ ] Detect via `navigator.language` and persist the choice
- **TK-11.1.2** — Catalog structure
  - [ ] Typed `locales/en.ts` and `locales/pt.ts`
  - [ ] A missing key breaks the typecheck
  - [ ] Namespaces per feature

### ST-11.2 — Extraction

- **TK-11.2.1** — Extract UI strings
  - [ ] One pass per feature: home, work, about, system, layout
  - [ ] Locale-aware date and number formatting
  - [ ] `lang` on `<html>` tracking the locale
- **TK-11.2.2** — Wire up the selector
  - [ ] Connect the rail's language `IconButton`
  - [ ] Visible current-language state

---

## EP-12 — Quality, accessibility, performance, and deploy

**Dependencies:** all of the above. **Size:** M.

### ST-12.1 — Accessibility

- **TK-12.1.1** — Audit
  - [ ] Keyboard-only navigation across the 4 pages
  - [ ] Visible focus on every interactive element
  - [ ] Contrast in both themes (watch text over light containers)
  - [ ] Screen reader across states and navigation
- **TK-12.1.2** — Motion
  - [ ] `prefers-reduced-motion` respected by decor, skeleton, progress, and carousel
  - [ ] Idea (2026-10-19, design in Figma first): animate the decor shapes site-wide — small shapes float a few px (~6s, staggered), main shape rotates very slowly; still under reduced motion. Goes into `StateIllustration` (all 4 states) and `HeroDecor` together
- **TK-12.1.3** — Decorative and brand SVGs
  - [ ] Add `<title>` (or `aria-hidden="true"` for purely decorative ones) to every SVG flagged by `deno task check`'s `lint/a11y/noSvgWithoutTitle`: favicon, icons (`dashboard`, `github`, `linkedin`, `telegram`), the M3 shape set (`forms.svg`), and the partner logos (`AlphaWave`, `Boltshift`, `CoreOS`, etc.) — pre-existing, unrelated to `ST-01.0`

### ST-12.2 — Performance

- **TK-12.2.1** — Cost of the decor
  - [ ] Measure the paint impact of the large `filter: blur()` uses
  - [ ] Consider pre-rendering as an image if the cost is high
- **TK-12.2.2** — Assets
  - [ ] Responsive photo and project media, in a modern format
  - [ ] Lazy load below the fold
  - [ ] Bundle budget and per-route code splitting
- **TK-12.2.3** — Lighthouse
  - [ ] Baseline across the 4 pages
  - [ ] Target and fixes

### ST-12.3 — SEO and metadata

- **TK-12.3.1** — Per-route meta
  - [ ] Title and description
  - [ ] Open Graph and Twitter card
  - [ ] `sitemap.xml` and `robots.txt`
  - [ ] `Person` JSON-LD

### ST-12.4 — Deploy

- **TK-12.4.1** — Pipeline
  - [ ] Choose the host (Deno Deploy is the natural fit for the runtime)
  - [ ] Automatic deploy on the main branch
  - [ ] Preview per PR
  - [ ] SPA fallback for client-side routes
- **TK-12.4.2** — Domain and observability
  - [ ] Custom domain and HTTPS
  - [ ] Privacy-respecting analytics
  - [ ] `ErrorBoundary` error reporting

---

## EP-13 — Backend API

**Goal:** the portfolio's own backend (`server/`, Express + MongoDB Atlas), kept healthy alongside the client.
**Dependencies:** none (independent track). **Size:** S. **Branch:** `feat/server-express-api`.

### ST-13.1 — Express API and static hosting

- **TK-13.1.1** — First version (built, waiting for merge)
  - [x] `GET /api/artists` and `GET /api/songs` from the `artists`/`songs` collections
  - [x] Serve the React build with an SPA refresh fallback
  - [x] `start`, `typecheck`, and `test` tasks cover `server/`; 2 `deno test` cases pass
  - [x] `.env.example` documented; local `.env*` ignored
  - [x] Biome now checks `server/**` (it was outside `files.includes`)
  - [ ] Commit on `feat/server-express-api` and merge into `develop`
- **TK-13.1.2** — Run it in CI
  - [ ] CI already runs `deno task typecheck`/`test`, which now include `server/` — confirm the job passes without MongoDB credentials
- **TK-13.1.3** — Fit with the deploy plan
  - [ ] Decide how the Express server relates to the `EP-12` host choice (decision 6)

---

## 4. Open decisions

| # | Question | Blocks |
|---|---|---|
| 1 | ~~Default theme per page~~ — **resolved 2026-10-13:** Light in every Figma frame. **Updated 2026-10-18:** on the site, the first visit follows the OS (`prefers-color-scheme`); the rail toggle overrides it and the choice is saved | ~~`EP-02`~~, `EP-03` |
| 2 | ~~Test runner~~ — **resolved:** Vitest (ADR-004) | ~~`EP-01`~~ |
| 3 | ~~Real content for Project — Detail~~ — **resolved:** Spotify Web case study in Figma | ~~`EP-09`~~ |
| 4 | Real About Me data — the two postgraduate degrees in Figma are fictional | `EP-07` |
| 5 | i18n with a library or a custom solution | `EP-11` |
| 6 | Deploy host — must also run the Express server (`EP-13`) | `EP-12`, `EP-13` |

## 5. Execution notes

- **`EP-01`, `EP-02` and `EP-03` are done.** Start `EP-04` from a fresh branch off `develop`.
- **`EP-03` is the real bottleneck.** Touching tokens after screens are written means revisiting all of them. Not worth getting ahead on `EP-06`+.
- **`EP-04` can be sliced by consumer:** Chip before `EP-08`, Skeleton and Progress before `EP-10`, decor before `EP-06`. No need to finish the whole library before starting a screen.
- **`EP-11` is last on purpose.** Extracting strings from a screen that's still going to change is guaranteed rework.
