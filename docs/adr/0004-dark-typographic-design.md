---
status: accepted
---

# Dark typographic design with warm accent

## Context

The site is a personal brand at the intersection of Islamic scholarship and modern tech; it should read as calm, content-first, and distinct from generic light corporate templates.

## Decision

Dark-only theme — background `#0d0d0d`, single warm accent `#d4a843` — with a system font stack, generous whitespace, and vanilla CSS custom properties (no CSS framework). Motion is CSS transitions only; no animation library.

## Consequences

- Deliberate deviations: no light-mode toggle in v1 (don't "fix" this by adding one), and theming lives in CSS variables so a future theme remains cheap if ever wanted.
- Content and projects carry the visual weight; design restraint keeps load instant against the spec's 90+ Lighthouse target.
