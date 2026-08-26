# ADR-001 — Routing Consolidation

**Status:** Accepted
**Date:** 2026-04-12
**Author:** Nicolau
**Context:** Refactoring guided by Fowler's catalog — branch `refactor/architecture-foundations`

## Context
The project had two competing sources of truth for application routing: `App.tsx` (using `BrowserRouter` and `Routes`) and `router.tsx` (using `createBrowserRouter`). This created an architectural divergence (*Divergent Change* and *Duplicated Code*), plus inconsistencies in the defined paths (e.g. `/work` vs `/projects`, `:id` vs `:slug`). This duplication made maintenance confusing and error-prone whenever a new route was added in one file and forgotten in the other.

## Alternatives considered
1. **Fully migrate to `router.tsx`**: Use React Router v6's Data Router API (`createBrowserRouter`), which would enable loaders and actions. This would require refactoring the app's mounting in `main.tsx` (using `RouterProvider`) and moving the layout structure (`Sidebar`) into a parent route (layout route).
2. **Consolidate in `App.tsx`**: Keep the classic use of `<Routes>` and `<Route>` components grouped in `App.tsx`, which already had a base structure with the `Sidebar` layout working simply and directly for the portfolio's current scope.

## Decision
It was decided to consolidate routing in `App.tsx`, eliminating the definition in `router.tsx`. Routes were standardized to use the `/projects` prefix and the `:slug` parameter. This decision was made because `App.tsx` already contained the layout structure (`Sidebar`) coupled and working, and the added complexity of the Data Router wasn't justified for a portfolio project that is mostly static at this point. The `router.tsx` file was emptied, leaving only an instructive comment.

## Consequences
**Positive:**
- Single source of truth for all application routes.
- Elimination of duplicated code and divergent paths (`/work` vs `/projects`).
- Easier maintenance and understanding of the navigation flow.

**Negative / Trade-offs:**
- We won't use React Router v6's advanced features (loaders/actions) in the short term without refactoring the root structure again toward a `RouterProvider`.
