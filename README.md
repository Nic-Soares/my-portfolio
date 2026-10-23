# Portfolio — Nicolas Soares

A modern portfolio built with React, TypeScript, and Material Design 3, showcasing data visualization and web development projects.

## 🏗️ Project Structure

```
my-portfolio/
├── client/                         # React frontend
│   ├── index.html                  # HTML template (Vite app root)
│   ├── vite.config.ts              # Vite config (local to client)
│   ├── public/                     # Static assets served as-is
│   └── src/
│       ├── app/                    # Bootstrap, App.tsx, routes, root pages
│       ├── components/             # Reusable components (layout, ui)
│       ├── features/               # Domain modules (home, work)
│       ├── styles/                 # Global CSS, themes, typography
│       ├── types/                  # Global types and module declarations
│       └── main.tsx                # Entry point
│
├── docs/adr/                       # Architecture Decision Records
│
├── package.json                    # Dependencies and scripts
├── package-lock.json               # npm lockfile
├── tsconfig.json                   # TypeScript (tsc 7, type-check only)
├── .nvmrc                          # Node version (26)
├── biome.json                      # Lint/format config (Biome)
├── shared/                         # Contracts used by client, server and ingestion
│   ├── project.ts                  # Zod schema of a project (.portfolio/ and served)
│   ├── catalog.ts                  # Catalog built from .portfolio/ folders
│   ├── markdown.ts                 # Minimal Markdown for project text
│   ├── pageMeta.ts                 # Per-route title, description, Open Graph
│   └── schema/                     # JSON Schemas for .portfolio/ files
├── server/                         # Hono server (ADR-007)
│   ├── app.ts                      # Routes, head per page, API, security headers
│   ├── local.ts                    # Runs it on Node (npm run serve)
│   └── fixtures/projects/          # Local .portfolio/ projects
└── README.md
```

> Architecture: ADR-006 to ADR-009 and `docs/planning/ROADMAP.md` (EP-15 onward). Ingestion (`ingest/`) comes in EP-16.

## 🚀 Technologies Used

- **Runtime**: Node 26 + npm (moved from Deno, ADR-006)
- **Frontend**: React 19, TypeScript 7
- **Build Tool**: Vite
- **UI Framework**: Material Design 3 (Material Web Components)
- **Styling**: CSS Modules
- **Lint/Format**: Biome
- **Icons**: Material Symbols, SVG Components (via `vite-plugin-svgr`)

## 📦 Installation and Running

### Prerequisites
- [Node.js](https://nodejs.org) 26 (see `.nvmrc`) and npm

```bash
npm ci
```

### Commands

```bash
# Development mode (hot reload). Projects come from the local server, so
# run it in a second terminal first:
#   npm run ingest:local && npm run serve
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview

# Type checking (tsc 7)
npm run typecheck

# Lint (Biome)
npm run lint

# Format (Biome)
npm run format

# Lint + format + import organization, with fixes
npm run check

# Server: the build with each page's <head>, the projects API, sitemap.
# Projects come from .data/store, written by the local ingestion
# (server/fixtures/projects: Spotify Web and the Reference page)
npm run build && npm run ingest:local && npm run serve   # http://localhost:3000

# Real ingestion: your GitHub repos into R2 (keys in .env, docs/runbooks/keys.md)
npm run ingest

# Rewrite the JSON Schemas after changing shared/project.ts
npm run schema
```

With `npm run dev` running, open `/__gallery` to see every component next to its Figma name, in Light/Dark and at the four Figma widths. The gallery only exists in development.

## 🎨 Design System

The project uses Material Design 3 with:
- **Components**: Material Web Components
- **Typography**: Roboto
- **Icons**: Material Symbols Outlined
- **Colors**: Material 3-based color scheme
- **Layout**: Flexible, responsive system

### Breakpoints

Four size classes (M3 window size classes), declared once as `@custom-media` in `client/src/styles/breakpoints.css`. Each range is checked against one Figma frame:

| Size class | Width | Figma frame |
|---|---|---|
| `--compact` | `< 600px` | 402 |
| `--medium` | `600px – 1199px` | 744 |
| `--large` | `1200px – 1599px` | 1512 |
| `--extra-large` | `≥ 1600px` | 1920 |

```css
@import "@/styles/breakpoints.css";

@media (--compact), (--medium) {
  .columns { flex-direction: column; }
}
```

Don't write raw pixel media queries — use these names. Lightning CSS resolves them at build time.

## 📁 Import Aliases

The project is configured with import aliases, declared both in `tsconfig.json` (`paths`) and in `client/vite.config.ts`'s `resolve.alias`:

```typescript
// Components and source code (client/src/*)
import Sidebar from "@/components/layout/Sidebar/Sidebar.tsx";

// Assets (logos, icons, images)
import Logo from "@assets/logos/logo.svg?react";
```

Relative and alias imports use an **explicit extension** (`.ts`/`.tsx`/`/index.ts`), a convention kept from the Deno days (`allowImportingTsExtensions` in `tsconfig.json`).

## 🔧 Configuration

### Node and npm
- `package.json` holds the dependencies and the scripts; `package-lock.json` pins exact versions. Install with `npm ci`.
- Biome is pinned to an exact version; see `docs/runbooks/dependency-upgrades.md`.
- CI runs `npm audit --audit-level=high`; Dependabot opens weekly update PRs.

### Vite
- Config in `client/vite.config.ts`, with an implicit root at `client/` (where `index.html` lives).
- **Public**: `client/public/` — static assets.
- **Build**: `dist/client/` — compiled build, resolved relative to `client/`.
- **Plugins**: React, SVGR for importing SVGs as components.
- **CSS**: Lightning CSS (`css.transformer: "lightningcss"`) with the `customMedia` draft enabled, for the breakpoint names above.
- The npm scripts run `cd client && vite`.

### TypeScript
- `tsconfig.json` at the root, type-check only (`noEmit`); `tsc` 7 checks `client/src` (tests included) and the client config files.
- `jsx: "react-jsx"`; `types` are `vite/client`, `vite-plugin-svgr/client` and `node`.
- Ambient modules (`*.svg?react`, `*.mp4`) are declared in `client/src/types/assets.d.ts` and `client/src/custom.d.ts`; project env vars extend `ImportMetaEnv` there.
- Strict mode enabled.

## 🎯 Features

- [x] Responsive layout with navigation sidebar
- [x] Client-side routing (react-router-dom)
- [x] Hero section with personal information
- [x] Partner companies showcase
- [x] Project carousel
- [x] Project listing and detail with content blocks
- [x] Configured path aliases (`@/`, `@assets/`)
- [x] SVG imports as React components
- [ ] Services section
- [ ] About me page
- [ ] Theme system (light/dark)
- [ ] Internationalization (pt/en)
- [ ] Backend (`server/`)

## 🤝 Contributing

This is a personal project, but suggestions and feedback are always welcome!

### Testing

Every new component added under `client/src/components/ui/` must include at least one test covering its primary user-facing behavior. Existing components do not require retroactive tests under this rule.

Run the test suite with:

```bash
npm test
```

## 📄 License

This project is under a private license. All rights reserved.

---

**Nicolas Soares** - Data Visualization & Frontend Developer
