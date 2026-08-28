# ADR-004 — Use Vitest for React component tests

## Status
Accepted

## Context
The project needs a test runner and a DOM environment for React component tests.
The evaluated options were Deno's built-in test runner with Testing Library, or Vitest.

## Decision
Use Vitest as the test runner, React Testing Library for component interaction tests,
and jsdom as the simulated browser environment.

## Consequences
- Tests run through `deno task test`.
- CI runs the test suite on every relevant push.
- New UI components must include tests.
- Vitest adds npm-based test dependencies, managed by Deno.