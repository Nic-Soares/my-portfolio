# Development Roadmap — Portfolio

**Design source:** [Figma — Portfólio](https://www.figma.com/design/5Uw1Nxn0DgG9SU3z0Vb4vh/Portf%C3%B3lio)
**Repository:** `my-portfolio` (Deno 2 + Vite 7 + React 19 + react-router 7 + CSS Modules + Biome)
**Last updated:** 2026-10-13

---

## 0. Status board

| Epic | Status | Where the work lives |
|---|---|---|
| `EP-01` Baseline | ✅ Done — merged into `develop` (`4eca4d3`) | code |
| `EP-02` Design source | ✅ Done in Figma — code follow-ups moved to `EP-08`/`EP-09` | Figma (`Portfólio`) + this file |
| `EP-03` Tokens | ⏭️ **Next** | code |
| `EP-04`…`EP-12` | Not started | code |
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
| Tab Bar (component set) | `layout/navigation/TabbedNavigation` | **Check** — exists, verify variant parity |
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
  - [ ] Rewrite every CSS Module to the canonical scale — `min-width: 1294/1295` → `(--large), (--extra-large)`; `max-width: 1024` → `(--compact), (--medium)`; `max-width: 480–640` → `--compact`; `768` decided per file
    - [x] Project Detail: `ProjectDetail.page.module.css`, `ContentLayout.module.css`, `SummaryNav.module.css`
    - [x] Projects Index: `ProjectListHero`, `ProjectCardGrid`, `TitleCard` (`ProjectListHero`'s 768/480 rules merged into one `--compact` block)
    - [ ] Home: `ExperienceSection`, `ProjectCarousel`
    - [ ] Shared: `typography.css` (cut points only — values are `ST-03.2`), `CarouselSlide`
  - [ ] Check every screen at the 4 breakpoints and log the breakages
    - Project Detail (checked at 402/744/1199/1200/1512 against the pre-migration build): the desktop layout now starts at 1200 instead of 1294; nothing new broke. Already broken before the migration, fixed in `EP-05`/`EP-09`: the summary column is clipped on the right at 1200–1512, and below 1200 the article sits under the Navigation Rail and is cut on the left
    - Projects Index (checked at 402/700/1199/1512 against the pre-migration build): filters and search now stack below 1200 instead of 1024 — intended. Already broken before, fixed in `EP-05`/`EP-08`: at 402 the page scrolls sideways (the rail stays on mobile and cards/filters overflow)

### ST-03.2 — Responsive typescale mirroring the Figma collection

> **As a** dev, **I want** font size to change per breakpoint via token, **so that** I don't need to swap typography classes on every screen.

Context: in Figma the scale changes per **mode** of the `Typescale` collection (Expanded/Medium/Compact) — the same text style renders different sizes per frame. `typography.css` already attempts this with `@media` on `:root`, but at the wrong breakpoints.

- **TK-03.2.1** — Rewrite `typography.css` on the canonical scale
  - [ ] Map the 15 roles (Display/Headline/Title/Label/Body × L/M/S) × 4 modes
  - [ ] Pull values from Figma's `Typescale` collection — don't estimate
  - [ ] Include the extra roles the design uses: `Hero Display`, `Body Large Plus`, `Title Small Plus`
  - [ ] Emphasized/prominent as a separate token (Figma has `-emphasized` on almost every role)
- **TK-03.2.2** — Fix the effective font family
  - [ ] `global.css` puts `system-ui` first — Roboto is never applied
  - [ ] Serve Roboto locally (weights 400/500/600) instead of from a CDN
  - [ ] `font-display: swap` and preload the above-the-fold weight

### ST-03.3 — Shape tokens

- **TK-03.3.1** — Extract the `Shape` collection into CSS
  - [ ] `--md-sys-shape-corner-{none,extra-small,small,medium,large,large-increased,extra-large,extra-large-increased,extra-extra-large,full}`
  - [ ] Replace literal `border-radius` values across CSS Modules
  - [ ] Check against the collection's values in Figma

### ST-03.4 — Working Light/Dark theme

> **As a** visitor, **I want** to toggle between light and dark, **so that** I can read the site the way I prefer.

Context: `light.css` and `dark.css` exist and match Figma's `material-theme`. The selector is `body[data-theme="Light"]`, but nothing writes that attribute — and the `dark_mode` `IconButton` in `Sidebar` has no `onClick`.

- **TK-03.4.1** — ThemeProvider
  - [ ] Context with `theme`, `setTheme`, `resolvedTheme`
  - [ ] Write `data-theme` on `<body>`
  - [ ] Support `system` via `prefers-color-scheme`
  - [ ] Persist to `localStorage`
  - [ ] Avoid a flash of the wrong theme on first paint (inline script in `index.html`)
- **TK-03.4.2** — Wire up the rail toggle
  - [ ] Connect the `dark_mode`/`light_mode` `IconButton` to the provider
  - [ ] Reflect the actual state in the icon
  - [ ] `aria-pressed` and an accessible label
- **TK-03.4.3** — Audit both themes
  - [ ] Walk through the 4 pages in Light and Dark
  - [ ] Hunt down hardcoded colors that don't switch with the theme
  - [ ] Check the hero glows in Dark (container tokens change luminance)

---

## EP-04 — In-house component library

**Goal:** implement in React the M3 components the design uses, with no external lib.
**Dependencies:** `EP-03`. **Size:** L.

### ST-04.1 — Component gallery

> **As a** dev, **I want** an internal route that renders every component in every variant, **so that** I can compare against Figma without opening the whole application.

- **TK-04.1.1** — `/__gallery` route (dev only)
  - [ ] Grid layout per component
  - [ ] Theme and breakpoint switcher on the page itself
  - [ ] Excluded from the production build

### ST-04.2 — Chip

> **As a** visitor, **I want** filter and skill chips, **so that** I can navigate and read the stack quickly.

- **TK-04.2.1** — `Chip` component
  - [ ] Variants: `assist`, `filter`, `input`, `suggestion`
  - [ ] States: enabled, hover, focus, pressed, selected, disabled
  - [ ] Optional left/right icon slots
  - [ ] `elevated` and `outlined`
  - [ ] Render test per variant
- **TK-04.2.2** — `ChipRow` with wrap
  - [ ] Wrap with token-based gap
  - [ ] Carousel mode with horizontal scroll for the Projects Index
  - [ ] Keyboard navigation between chips (roving tabindex)

### ST-04.3 — Progress feedback

- **TK-04.3.1** — `LinearProgress`
  - [ ] Determinate and indeterminate
  - [ ] Indeterminate animation in CSS, respecting `prefers-reduced-motion`
  - [ ] `role="progressbar"` with `aria-valuenow`/`aria-valuetext`
- **TK-04.3.2** — `CircularProgress`
  - [ ] Determinate and indeterminate
  - [ ] Token-based sizes
- **TK-04.3.3** — `LoadingIndicator` (M3 Expressive)
  - [ ] Shape morphing between Shape Set shapes
  - [ ] Fallback to `CircularProgress` under `prefers-reduced-motion`

### ST-04.4 — Skeleton

- **TK-04.4.1** — `Skeleton` primitive
  - [ ] `text`, `rect`, `circle` shapes
  - [ ] Shimmer disabled under `prefers-reduced-motion`
  - [ ] Colors in `surface-container-high`/`highest`, as in Figma
- **TK-04.4.2** — Skeleton compositions
  - [ ] `ProjectCardSkeleton` mirroring `ProjectCard`
  - [ ] `ProjectGridSkeleton` with count per breakpoint (4 col / 3 col / 2 col / 1 col)
  - [ ] Header skeleton (title + chips + search)

### ST-04.5 — Decorative primitives

> **As a** visitor, **I want** a hero with depth, **so that** the page doesn't feel like a form.

Context: in Figma the decor is an absolutely positioned `HeroDecor` layer with two token-colored ellipses + Layer Blur, one clipped Shape Set shape, and an outline ring. Blur is applied over a solid token instead of a gradient because gradient stops don't accept variables — and a hardcoded gradient would break in dark mode. Worth keeping the same constraint in CSS.

- **TK-04.5.1** — `Shape` component
  - [ ] Subset of the M3 Shape Set as SVG: Very sunny, Soft boom, Burst, 12-sided cookie, Gem, Diamond, Circle, Pill
  - [ ] Color via a prop mapped to a token, not hex
  - [ ] Scale while preserving proportion (the silhouette occupies ~0.842 of the box in Figma)
- **TK-04.5.2** — `GlowBackdrop`
  - [ ] Ellipse with `filter: blur()` and a token color
  - [ ] Props for size, position, and opacity
  - [ ] `will-change`/`contain` so it doesn't repaint the entire page
- **TK-04.5.3** — `HeroDecor`
  - [ ] Compose glows + clipped shape + outline ring
  - [ ] Per-breakpoint geometry (in Figma it's hand-tuned, not scaled)
  - [ ] `aria-hidden` and `pointer-events: none`
  - [ ] Reduce or remove blur under `prefers-reduced-motion`

### ST-04.6 — Parity of existing components

- **TK-04.6.1** — Audit `Button` against Figma
  - [ ] Check Type × Size × Style × Width against the component set
  - [ ] Visible focus ring (Figma has `Show focus indicator`)
  - [ ] Translate the component's Portuguese comments
- **TK-04.6.2** — Audit `IconButton`
  - [ ] Variants and the selected state
  - [ ] Minimum 48px touch target
- **TK-04.6.3** — Audit `SearchBar` and `ConnectedButtonGroup`
  - [ ] Focus and filled-value states
  - [ ] Parity with the design
- **TK-04.6.4** — Audit `TabbedNavigation`
  - [ ] Variant parity against the Tab Bar component set (see §2.2)
  - [ ] Clean up while touching the CSS: descending-specificity selectors and a duplicate `--btn-state-layer-bg` custom property in `TabbedNavigation.module.css`/`TabItem.module.css`, and the `!important` override in `TabItem.module.css:288` (flagged by `deno task check`, pre-existing, unrelated to `ST-01.0`)

---

## EP-05 — App shell and responsive navigation

**Goal:** a shell that switches navigation patterns per breakpoint, as in Figma.
**Dependencies:** `EP-04`. **Size:** M.

### ST-05.1 — Navigation Rail faithful to the design

> **As a** desktop visitor, **I want** the rail with all three destinations, **so that** I can reach any page in one click.

Context: `Sidebar` has 2 destinations (Home, Projects); Figma has 3 (Home, About Me, Projects). The `#root` grid reserves `88px`; Figma uses `96px`.

- **TK-05.1.1** — Fix the rail
  - [ ] `#root` from `88px` to `96px`
  - [ ] Add the About Me destination with the design's icon
  - [ ] Active indicator driven by route, including `/about`
  - [ ] Footer actions: language and theme
- **TK-05.1.2** — Rail accessibility
  - [ ] `<nav>` with `aria-label`
  - [ ] `aria-current="page"` on the active destination
  - [ ] Focus order and a skip link to the content
- **TK-05.1.3** — Clean up while touching the CSS
  - [ ] Empty `.nav-item--selected` block and a descending-specificity selector in `NavItem.module.css` (flagged by `deno task check`, pre-existing, unrelated to `ST-01.0`)

### ST-05.2 — TopAppBar and NavigationBar for tablet and mobile

> **As a** mobile visitor, **I want** navigation at the top and bottom, **so that** I can reach everything with my thumb.

- **TK-05.2.1** — `TopAppBar`
  - [ ] 88px, logo + title + actions, as in Figma
  - [ ] Contextual title per route
  - [ ] Scroll behavior (elevation once it leaves the top)
- **TK-05.2.2** — `NavigationBar`
  - [ ] 88px, 3 destinations with icon and label
  - [ ] Active indicator
  - [ ] iOS gesture-bar safe area
- **TK-05.2.3** — `AppShell` that picks the pattern
  - [ ] Rail above 1512; TopAppBar + NavigationBar at 744 and below
  - [ ] A single source of truth for destinations, consumed by both patterns
  - [ ] Confirm there's no layout jump when switching

### ST-05.3 — PageContent

- **TK-05.3.1** — Content container
  - [ ] `surface-container-lowest` background, rounded corners only on the rail side (as in Figma)
  - [ ] On tablet/mobile the rounding moves to the top
  - [ ] Token-based padding

---

## EP-06 — Home: fixes

**Goal:** raise Home's fidelity to the current design.
**Dependencies:** `EP-05`. **Size:** M.

### ST-06.1 — Home hero

- **TK-06.1.1** — Apply `HeroDecor`
  - [ ] Geometry for all 4 breakpoints per Figma
  - [ ] Main glow behind the blob; on vertical layouts it moves down with the blob
- **TK-06.1.2** — Copy and chips
  - [ ] Chips: `#Python`, `3+ Years in Data`, `Power BI · SQL`, `TypeScript`, `Applied AI`
  - [ ] Swap for the `EP-04` `Chip`
  - [ ] Headline with the highlighted portion in a token color (not a `<span>` with hex)
- **TK-06.1.3** — CTAs
  - [ ] `See My Projects` (filled) and `Contact me` (tonal), Large size on desktop and Medium on mobile

### ST-06.2 — Overview section

- **TK-06.2.1** — Service cards
  - [ ] `Systems & Process Automation` and `Data Engineering & Analysis` in English (the supporting text was still in PT in Figma until now — verify the repo)
  - [ ] Illustration using the `Shape` component
- **TK-06.2.2** — TrustedCompaniesBar
  - [ ] Real logos instead of `CoreOS` repeated 4×
  - [ ] Scrollable row behavior on mobile
- **TK-06.2.3** — ProjectsCarousel
  - [ ] Card peek on the sides, as in the design
  - [ ] Touch drag, arrows on desktop
  - [ ] Cards sourced from the data layer, not hardcoded

### ST-06.3 — Responsive Home

- **TK-06.3.1** — Check all 4 breakpoints
  - [ ] 1920 and 1512 side by side; 744 and 402 stacked
  - [ ] No horizontal overflow on any of them

---

## EP-07 — About Me (new page)

**Goal:** ship the page that exists in Figma and not in code.
**Dependencies:** `EP-05`. **Size:** L.

### ST-07.1 — Route and data

> **As a** visitor, **I want** a page about Nicolas, **so that** I can understand who's behind the projects.

- **TK-07.1.1** — `/about` route
  - [ ] Register in `App.tsx`
  - [ ] Destination in the rail and navigation bar
  - [ ] Title in the TopAppBar
- **TK-07.1.2** — Typed data layer
  - [ ] `about.data.ts`: bio, quick facts, stack by category, education, languages, contact
  - [ ] Types in `features/about/data/about.types.ts`
  - [ ] Flag Figma's fictional content as pending (Verde Analytics, Horizonte Tech, USP/Esalq, PUC Minas, `nicolas.soares@email.com`) — needs real data before publishing

### ST-07.2 — Desktop two-column layout

Context: in Figma the 1920 fits **exactly** into 1080px, with no scroll. The height isn't a guessed fixed value: the frame is fixed, the hero and contact strip are `hug`, and the body absorbs the rest. Worth reproducing this with `grid-template-rows: auto 1fr auto` instead of a magic height.

- **TK-07.2.1** — Structure
  - [ ] `100dvh` with hero + body + contact strip
  - [ ] Two-column body: fluid main column, 520px sidebar (440px at 1512)
  - [ ] Columns ending together
- **TK-07.2.2** — Hero
  - [ ] Eyebrow, headline, role/location
  - [ ] 420px photo with `HeroDecor` (330px at 1512)
  - [ ] No CTA in the hero (those live in the contact strip)
- **TK-07.2.3** — Main column
  - [ ] About card
  - [ ] Work Experience: cards with index, title, supporting text, and period chip
  - [ ] Professional experience only — education goes in the sidebar
- **TK-07.2.4** — Sidebar
  - [ ] Quick facts (tertiary container)
  - [ ] Stack: chips grouped by work area
  - [ ] Education: multiple entries with a divider
  - [ ] Speaks (secondary container)
  - [ ] Distribution filling the height, without stretching a card and clipping content
- **TK-07.2.5** — Contact strip
  - [ ] Primary container, email in Display, social chips + Download CV
  - [ ] Horizontal on desktop, vertical on mobile

### ST-07.3 — About Me on tablet and mobile

- **TK-07.3.1** — Single column
  - [ ] Sidebar moves below the main content
  - [ ] Stacked hero: copy on top, photo below
  - [ ] Scrollable page (doesn't lock to the viewport)
- **TK-07.3.2** — 402 adjustments
  - [ ] Vertical experience cards: index + period on top, title and description below
  - [ ] Contact email in a smaller scale step to fit on one line
  - [ ] Photo at 240px

---

## EP-08 — Projects Index: fixes

**Dependencies:** `EP-04`, `EP-05`. **Size:** M.

### ST-08.1 — Working filter and search

> **As a** visitor, **I want** to filter and search projects, **so that** I can find what interests me.

Context: the chips and `SearchBar` are designed and rendered, but filter nothing.

- **TK-08.1.1** — Filter state
  - [ ] `useProjectFilters` hook with tags and search term
  - [ ] Reflect in the URL as a query string (shareable, survives reload)
  - [ ] Multi-select tags
- **TK-08.1.2** — Wire up the UI
  - [ ] Selectable chips with counts
  - [ ] Debounced search
  - [ ] Clear filters button
- **TK-08.1.3** — Empty state
  - [ ] Render `EP-10`'s `EmptyState` when the filter returns nothing
  - [ ] Actions: `Clear filters` and `View all projects`

### ST-08.2 — Tablet and mobile views

Context: Figma has three variations at 744 and 402 — Search view, Filter view, and Selector.

- **TK-08.2.1** — Search view
  - [ ] Expanded search filling the bar
  - [ ] Auto-focus and Esc key to exit
- **TK-08.2.2** — Filter view
  - [ ] Filter panel as a bottom sheet
  - [ ] Apply and clear
- **TK-08.2.3** — Selector
  - [ ] Multi-select cards
  - [ ] Contextual action bar

### ST-08.3 — Responsive grid

- **TK-08.3.1** — Columns per breakpoint
  - [ ] 4 / 3 / 2 / 1 per Figma
  - [ ] Token-based gap
  - [ ] Skeleton with the same column count
- **TK-08.3.2** — `ProjectCard` parity with Figma `Project Card` (Size L/M/C)
  - [ ] Tags: `ConnectedButtonGroup` is `nowrap` + `overflow: hidden`, so 4 tags clip on 744/402 cards; Figma wraps them (Small size, 2px gap) — allow `flex-wrap` below 1512
  - [ ] Title `title-large`, subtitle `body-large`, sized by the responsive typescale (`ST-03.2`) — no per-breakpoint classes

---

## EP-09 — Project Detail: fixes

**Dependencies:** `EP-02` (real content — done), `EP-05`. **Size:** M.
**Design source:** Figma `Project — Spotify W` (content, 3 tabs × 4 breakpoints) and `Project — Reference` (every block type); components on the `Components` page.

### ST-09.1 — Real content

- **TK-09.1.1** — Replace the placeholder
  - [ ] Port the Spotify Web case study from Figma into `spotify-clone.data.ts` (Overview, Architecture, Repository tabs), in English
  - [x] Confirm every block in the design exists in the `blockRegistry` (done in `TK-02.2.1` — no missing block types)
- **TK-09.1.2** — Project facts and intro
  - [ ] `ProjectData` has no facts field — add `facts: { label: string; value: string }[]` (Role / Stack / Year / Type)
  - [ ] `ProjectIntro` mirroring Figma `Project Intro`: facts beside the intro paragraph at Large, stacked at Medium/Compact
- **TK-09.1.3** — Block parity with the Figma `Block / *` components
  - [ ] List items: `ListBlock.module.css` uses `body-medium`, Figma uses `body/large-plus`
  - [ ] Image block: lock a default aspect ratio (Figma ratios 16:9 / 3:2 / 4:3 / 1:1 / 5:2)
  - [ ] `columns` block matches `Block / Media Columns` (side by side at Large, stacked below)

### ST-09.2 — Footer

- **TK-09.2.1** — Footer component (Figma `Footer`, Size L/M/C + `Footer Link Column`)
  - [ ] Navigation and Resources columns, Social, and the copyright line
  - [ ] Labels in English (Navigation, About, Work, Contact, Resources, Résumé)
  - [ ] Reusable across other pages

### ST-09.3 — SummaryNav and project-to-project navigation

- **TK-09.3.1** — Review SummaryNav
  - [ ] Sticky, with the active item tracking scroll position
  - [ ] Hide on mobile or turn into a selector
- **TK-09.3.2** — Previous/next (Figma `Project Pager`: Horizontal on desktop, Vertical on mobile)
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
  - [ ] Props: illustration, headline, supporting text, actions
  - [ ] Centered in `PageContent`, filling the available height
  - [ ] Illustration scale per breakpoint (340 / 340 / 260 / 200)
  - [ ] Actions in a column on mobile

### ST-10.2 — The five states

- **TK-10.2.1** — 404 (fix)
  - [ ] Migrate `NotFound` to `StateLayout`
  - [ ] "404" numeral over the Very sunny shape
  - [ ] `Back to home` (filled) and `View projects` (text)
- **TK-10.2.2** — Under Construction (fix)
  - [ ] Migrate `UnderConstruction` to `StateLayout`
  - [ ] Cone over Soft boom
- **TK-10.2.3** — Something Went Wrong / 500 (new)
  - [ ] Burst in error-container with "!"
  - [ ] `Try again` and `Back to home`
  - [ ] Root `ErrorBoundary` falling into this screen
  - [ ] `/error` route for visual review
- **TK-10.2.4** — No Projects Found (new)
  - [ ] Search icon over 12-sided cookie
  - [ ] Used inline by Projects Index, not as a route
- **TK-10.2.5** — Loading / Skeleton (new)
  - [ ] Projects Index skeleton: header + linear indeterminate + grid
  - [ ] `Suspense` on routes with the matching skeleton
  - [ ] Minimum duration floor to avoid flashing on fast connections

### ST-10.3 — Integration

- **TK-10.3.1** — Wire up to real flows
  - [ ] Nonexistent slug falls to 404
  - [ ] Data load failure falls to 500
  - [ ] Loading shows a skeleton, not a blank screen
  - [ ] Test each path

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
| 1 | ~~Default theme per page~~ — **resolved 2026-10-13:** Light everywhere; Dark via toggle | ~~`EP-02`~~, `EP-03` |
| 2 | ~~Test runner~~ — **resolved:** Vitest (ADR-004) | ~~`EP-01`~~ |
| 3 | ~~Real content for Project — Detail~~ — **resolved:** Spotify Web case study in Figma | ~~`EP-09`~~ |
| 4 | Real About Me data — the two postgraduate degrees in Figma are fictional | `EP-07` |
| 5 | i18n with a library or a custom solution | `EP-11` |
| 6 | Deploy host — must also run the Express server (`EP-13`) | `EP-12`, `EP-13` |

## 5. Execution notes

- **`EP-01` and `EP-02` are done.** Start `EP-03` from a fresh branch off `develop`.
- **`EP-03` is the real bottleneck.** Touching tokens after screens are written means revisiting all of them. Not worth getting ahead on `EP-06`+.
- **`EP-04` can be sliced by consumer:** Chip before `EP-08`, Skeleton and Progress before `EP-10`, decor before `EP-06`. No need to finish the whole library before starting a screen.
- **`EP-11` is last on purpose.** Extracting strings from a screen that's still going to change is guaranteed rework.
