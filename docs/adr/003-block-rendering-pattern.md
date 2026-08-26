# ADR-003 — Block Rendering Pattern

**Status:** Accepted
**Date:** 2026-04-12
**Author:** Nicolau
**Context:** Refactoring guided by Fowler's catalog — branch `refactor/architecture-foundations`

## Context
Currently, the `BlockRender.tsx` component is responsible for reading project content data and rendering it dynamically. To do this, it uses a very large conditional structure (`switch`), evaluating the `block.type` property to render `header`, `paragraph`, `image`, `code`, `list`, or `content-group`. This approach creates two code smells cataloged by Fowler: *Long Function* and *Repeated Switches*.

Besides bloating the file, this structure violates SOLID's Open/Closed Principle: every time we need to support a new block type, `BlockRender.tsx`'s code has to be modified, which increases the risk of regressions and makes maintaining and scaling the content platform harder.

## Alternatives considered
1. **Keep the large `switch` block (status quo):** Keep adding new `case`s as new blocks appear. Faster in the short term, but in the long term makes the file impossible to maintain and test in isolation.
2. **Implement the classic Strategy Pattern via classes:** Create a base interface `IBlockRenderer` and concrete classes for each type with a `render()` method. This would solve extensibility, but is overly bureaucratic and verbose for React's functional, declarative ecosystem.
3. **Component Map/Registry pattern:** Create a static configuration dictionary (or map) that associates `block.type` keys (e.g. `'header'`) directly with pure React components. `BlockRender.tsx` becomes just a generic orchestrator that looks up the map and passes the `block` prop to the matching component to render the content.

## Decision
It was decided to adopt the **Component Map (registry)** strategy.

Although not yet implemented (hence the "Proposed" status), the next refactoring session should break the `switch` blocks into isolated React components (e.g. `HeaderBlock`, `ImageBlock`, `CodeBlock`, etc.), all implementing the same interface (e.g. `BlockComponentProps`). `BlockRender.tsx` will import these sub-components and map them into a static object, replacing the entire `switch` with an O(1) lookup and delegating rendering to the specific component.

## Consequences
**Positive:**
- Adherence to the Open/Closed Principle (OCP): new block types can be added by creating a new file and registering it in the map, without changing the main iterator's logic.
- Elimination of the *Repeated Switches* and *Long Function* code smells.
- Each block's code becomes isolated and easily testable.

**Negative / Trade-offs:**
- Requires an initial setup (registration) step.
- Will require standardizing all sub-components to accept a common props contract, forcing a small architectural overhead before creating any new visual block.
