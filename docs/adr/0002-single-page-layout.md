---
status: accepted
---

# Single-page layout with four sections

## Context

The portfolio has exactly four content areas (Hero, About, Projects, Contact) and a "understand who this is within 3 seconds" goal. Blog and CV pages are explicitly out of scope for v1.

## Decision

One page at `/` containing all four sections, navigated by anchor links — no multi-page routing in v1.

## Consequences

- No routing complexity on the GitHub Pages subpath, and the i18n toggle (ADR 0003) applies to a single URL instead of a route tree.
- Future blog/CV pages will introduce real routes; SvelteKit supports adding them incrementally, so this is a v1 scope decision, not a permanent constraint.
