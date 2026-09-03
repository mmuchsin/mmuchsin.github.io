# ADR 0006 — Light editorial theme only (no dark mode)

- **Status:** accepted
- **Date:** 2026-08-28
- **Supersedes:** ADR 0004 (dark typographic design with warm accent)

## Context

ADR 0004 defined a dark-only theme (`#0d0d0d` / `#d4a843`). The v1.2 redesign (phases 14–16) replaced it with a light editorial palette (`--bg: #f8f9fa`, `--surface: #ffffff`, `--accent: #c49a3a`). This raised the question of whether dark mode should be added alongside the light theme.

## Decision

The portfolio will ship with **one theme only** — the light editorial design. No dark mode, no toggle, no `prefers-color-scheme` media query. This is a permanent boundary for this project.

### Rationale

1. **Editorial intent.** The three-voice typography system (serif display / sans body / mono utility) was tuned for a light background with warm gold accents. Dark mode would require re-tuning every token, not just swapping colors.
2. **Scope discipline.** This is a personal portfolio, not a product. Adding dark mode increases maintenance burden without adding user value — readers view it briefly and move on.
3. **Agent ergonomics.** A single theme means a single source of truth in `app.css`. Dark mode would split the token definitions across media queries, making the CSS harder to reason about for future agents and collaborators.

## Consequences

- `app.css` defines tokens only in `:root` — no dark-mode overrides.
- No dark-mode toggle in the UI (the existing LanguageToggle remains EN/ID only).
- ADR 0004 is marked as superseded; its design decisions live in git history.
- If a future redesign changes the base palette, it replaces rather than extends the current one.
