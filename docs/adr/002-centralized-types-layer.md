# ADR-002 — Centralized Types Layer

**Status:** Accepted
**Date:** 2026-04-12
**Author:** Nicolau
**Context:** Refactoring guided by Fowler's catalog — branch `refactor/architecture-foundations`

## Context
During project analysis, an *Inappropriate Intimacy* issue was identified between the feature component `ProjectCarousel.tsx` and the pure UI component `CarouselSlide.tsx`. Both defined and locally shared an identical `Project` interface. This created unwanted coupling: a generic UI component (`CarouselSlide`) depended on the data shape of a feature (`ProjectCarousel`), which duplicated maintenance effort (adding a field to the interface required updating both places) and violated the boundary that UI components should be agnostic of domain data structure, or at least rely on a single contract.

## Alternatives considered
1. **Pass data to the UI through primitive types (flattening):** Replace the `project: Project` prop in `CarouselSlide.tsx` with individual props (`title: string`, `description: string`, etc.).
2. **Create a centralized `/types` layer:** Extract the `Project` interface and move it to a common, central directory (e.g. `/src/types/project.ts`), serving as a single source of truth (shared contract) imported by both features and UI components, if strictly necessary for more complex data cohesion.

## Decision
The chosen decision was to create the `/src/types` directory and centralize the `Project` interface in `project.ts`. While "flattening" is ideal for primitive components (like `Button` or `TabItem`), for composition components like `CarouselSlide`, which may need to pass along several pieces of information from a domain, extracting a central shared type immediately resolves the duplication smell (DRY) and establishes a pattern for where all application contracts should live. The interface was expanded to include optional properties (`imageUrl`, `technologies`, etc.) that were already anticipated for the domain.

## Consequences
**Positive:**
- Elimination of interface duplication and indirect coupling between files that shouldn't know about each other (DRY/Inappropriate Intimacy).
- A foundation established for a global contracts layer (centralized typing), making it easier to grow features in the project without generating new duplication.
- Domain type maintenance happens in a single place.

**Negative / Trade-offs:**
- Components in the `/components/ui` folder (like `CarouselSlide`) now import files from the `/types` folder. Ideally, "pure" UI components wouldn't depend on domain entities but on generic types instead (e.g. `CarouselItemData`), but the centralized extraction already represents a huge structural improvement over the peer-to-peer coupling that existed before.
