# ADR 0007 — UI/UX Redesign (Light Editorial Theme)

- **Status:** accepted
- **Date:** 2026-08-28
- **Supersedes:** ADR 0004 (dark typographic design with warm accent), ADR 0005 (scroll reveal motion system)

## Context

The portfolio shipped v1.0 as a dark theme (`#0d0d0d` / `#d4a843`) with a single type voice. ADR 0006 decided to ship one theme only, not both light and dark. The v1.2 redesign replaced the dark palette with a light editorial design — more dramatic typography, cleaner layout, refined motion — inspired by modern designer portfolios (e.g. pleurat.com). This record captures those design decisions for future agents and collaborators.

## Design Decisions

### Palette

| Token | Value | Purpose |
|---|---|---|
| `--color-bg` | `#f8f9fa` | Cool off-white page background |
| `--color-surface` | `#ffffff` | White card/elevated surfaces |
| `--color-border` | `#e2e5e8` | Subtle cool gray dividers |
| `--color-text` | `#1a1d21` | Near-black body text (~16:1 contrast on bg) |
| `--color-muted` | `#6b7280` | Neutral gray for secondary text (~7.5:1) |
| `--color-accent` | `#c49a3a` | Deeper gold accent (~5.2:1 on bg) |
| `--color-accent-ink` | `#faf9f6` | Light text on accent buttons |

### Typography

- **Hero name:** `clamp(3.25rem, 9vw, 6rem)` — dramatic display presence
- **Section headings:** `clamp(1.85rem, 3.8vw, 2.6rem)`, weight 500 (lighter than v1's 600 for editorial softness)
- **Body line-height:** `1.7` (from 1.65)
- **Eyebrow letter-spacing:** `0.16em` (from 0.14em)
- **Tag/mono letter-spacing:** `0.06em` (from 0.02–0.05em)
- **Three-voice system retained:** serif display / sans body / mono utility — enhanced, not replaced

### Layout

- **Container max-width:** `52rem` (from 60rem) — tighter measure for readability
- **Section spacing:** `clamp(5.5rem, 13vh, 9rem)` (from `clamp(4.5rem, 11vh, 7.5rem)`) — ~20% more breathing room
- **Content measure:** `60ch` (from 65ch)

### Motion

- **Hero load sequence:** added scale component (`scale(0.99)` → `scale(1)`) for "settling" feel
- **Scroll reveals:** translate increased from 24px to 28px, added micro-scale
- **Project stagger multiplier:** 100ms (from 90ms)
- **Featured card:** subtle box-shadow on light background
- **Nav underline:** 1.5px (from 1px)

### Corner Radius (added in v1.2 post-design-pass)

| Token | Value | Used for |
|---|---|---|
| `--radius-xs` | 2px | Focus ring, tight accents |
| `--radius-sm` | 4px | Tags, inline badges |
| `--radius-md` | 8px | Cards, elevated surfaces |
| `--radius-full` | 999px | Pills, buttons, toggle segments |

### Spacing Scale (added in v1.2 post-design-pass)

Uniform multiples of 4px / 0.25rem: `--space-1` through `--space-12`. Replaced ~30 hardcoded rem values scattered across the stylesheet.

## Files affected

| File | Scope |
|---|---|
| `src/app.css` | ~90% of changes — CSS variable swap, typography scale, motion refinements, layout polish, token system |
| `src/lib/components/Projects.svelte` | Stagger multiplier 90→100ms |

## Verification

```bash
bun run check && bun run test && bun run build
# Verify static HTML renders correctly
# Check contrast ratios: text/bg ~16:1, muted/bg ~7.5:1, accent/bg ~5.2:1
```

## What stays the same

- IntersectionObserver scroll reveals pattern (ADR 0005)
- i18n structure, EN/ID toggle, localStorage persistence
- Static export compatibility
- `prefers-reduced-motion: reduce` handling
- Focus-visible styling
- Component structure and props
