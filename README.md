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
├── deno.json                       # Single manifest: deps, tasks, compilerOptions
├── deno.lock                       # Deno lockfile
├── biome.json                      # Lint/format config (Biome)
└── README.md
```

> `server/` (backend) doesn't exist in this repository yet — it will be added as a separate workspace once development starts.

## 🚀 Technologies Used

- **Runtime**: Deno
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite (running via `npm:vite` under Deno, no Node installed)
- **UI Framework**: Material Design 3 (Material Web Components)
- **Styling**: CSS Modules
- **Lint/Format**: Biome
- **Icons**: Material Symbols, SVG Components (via `vite-plugin-svgr`)

## 📦 Installation and Running

### Prerequisites
- [Deno](https://deno.com) 2.x

Node.js, npm, and manually managed `node_modules` are not required — Deno resolves the `npm:` dependencies declared in `deno.json` on demand.

### Commands

```bash
# Development mode (hot reload)
deno task dev

# Production build
deno task build

# Preview the production build
deno task preview

# Type checking (deno check)
deno task typecheck

# Lint (Biome)
deno task lint

# Format (Biome)
deno task format

# Lint + format + import organization, with fixes
deno task check
```

## 🎨 Design System

The project uses Material Design 3 with:
- **Components**: Material Web Components
- **Typography**: Roboto
- **Icons**: Material Symbols Outlined
- **Colors**: Material 3-based color scheme
- **Layout**: Flexible, responsive system

## 📁 Import Aliases

The project is configured with import aliases, declared both in the `deno.json` import map and in `client/vite.config.ts`'s `resolve.alias`:

```typescript
// Components and source code (client/src/*)
import Sidebar from "@/components/layout/Sidebar/Sidebar.tsx";

// Assets (logos, icons, images)
import Logo from "@assets/logos/logo.svg?react";
```

Relative and alias imports use an **explicit extension** (`.ts`/`.tsx`/`/index.ts`) — that's how `deno check` resolves modules, unlike `tsc`'s `moduleResolution: "bundler"`, which infers extensions automatically.

## 🔧 Configuration

### Deno
- `deno.json` is the project's single manifest: import map (dependencies via `npm:`), `compilerOptions`, and `tasks`.
- `nodeModulesDir: "auto"` — Deno manages a `node_modules/` internally only for compatibility with Vite and its plugins, which still expect that layout.
- `deno check` is the only typechecker (there's no `tsc`/`typescript` in the project).

### Vite
- Config in `client/vite.config.ts`, with an implicit root at `client/` (where `index.html` lives).
- **Public**: `client/public/` — static assets.
- **Build**: `dist/client/` — compiled build, resolved relative to `client/`.
- **Plugins**: React, SVGR for importing SVGs as components.
- The `deno.json` tasks run `cd client && vite` via Deno's native shell (`deno_task_shell`), not bash/Node.

### TypeScript
- `compilerOptions` lives inside `deno.json` (there's no `tsconfig.json`).
- `jsx: "react-jsx"` with `jsxImportSource: "react"`.
- Ambient modules (`*.svg?react`, `*.mp4`) are declared in `client/src/types/assets.d.ts` and `client/src/custom.d.ts`, referenced explicitly from the entry point via `/// <reference path>` — Deno doesn't auto-include `.d.ts` files the way `tsc` does.
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
deno task test
```

## 📄 License

This project is under a private license. All rights reserved.

---

**Nicolas Soares** - Data Visualization & Frontend Developer
