---
status: accepted
---

# Bilingual EN/ID via client-side toggle

## Context

The audience splits between Indonesian and English, and both languages must ship from one static deploy on the `/portfolio` subpath.

## Decision

Client-side language toggle with translations in JSON files; the visitor's choice is persisted in localStorage. Locale is not encoded in the URL — one page, one address.

## Consequences

- Rejected alternative: URL-driven locales (`/en`, `/id`). On a static subpath site that doubles build output and complicates anchor links; a toggle is simpler for four sections.
- Accepted trade-off: both locales ship to every visitor and per-locale URLs don't exist, so per-language SEO is limited in v1. If per-locale indexing ever matters, revisit with locale routes — that decision would supersede this ADR.
