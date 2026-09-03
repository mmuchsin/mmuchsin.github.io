---
status: accepted
supersedes: ADR 0004 (motion clause only)
---

# Motion: orchestrated hand-rolled animation, no libraries

## Context

ADR 0004 pinned motion to "CSS transitions only; no animation library" in service of restraint and the 90+ Lighthouse target. For the v1.1 design pass, the owner explicitly approved richer motion ("fancy animations allowed") to push the site from clean to distinctive — a senior-engineer portfolio should have an orchestrated feel, not just hover states.

## Decision

Motion is hand-rolled, no animation library (GSAP/Framer/etc.):

- **Load sequence** — CSS keyframes: staggered rise-in on hero elements plus an accent rule draw under the name.
- **Scroll reveals** — a single `IntersectionObserver` in the page toggles an `is-visible` class; the actual motion is CSS transitions with per-element delay.
- **Micro-interactions** — nav underline reveal, external-link arrow slide, card/row hover lifts.

Two guardrails are part of the decision, not afterthoughts:

1. Every hidden pre-reveal state is gated behind an early `html.js` class (inline script in `app.html`), so the prerendered no-JS HTML is never invisible — SEO and resilience included.
2. All animation and reveal motion collapses to instant under `prefers-reduced-motion: reduce`.

## Consequences

- Supersedes ADR 0004's "CSS transitions only" clause; ADR 0004 otherwise stands (dark-only palette, single warm accent, system font stacks, no CSS framework).
- Cost is ~20 lines of JS and one observer — negligible against the Lighthouse budget; the hero LCP element animates opacity/transform only.
- If motion ever needs choreography beyond CSS (scrubbing, physics, scroll-tied timelines), that is a new ADR introducing a library — not an edit to this one.
