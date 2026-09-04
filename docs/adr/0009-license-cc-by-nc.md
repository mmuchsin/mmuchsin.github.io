---
status: accepted
---

# License the repository CC BY-NC 4.0

## Context

The repo is public and serves the live personal portfolio at muchsin.me. It contains three kinds of assets: application code (SvelteKit), design (tokens, CSS, layout — the site's visual identity), and personal content (blog posts, about copy).

The owner's intent: people may clone and remix the design for learning and personal use; commercial reuse (e.g., a freelancer shipping it to a paying client) is not welcome.

Candidates considered:

- **MIT / Apache-2.0** — permissive, allows commercial reuse: rejected, broader than the intent.
- **PolyForm Noncommercial (code) + CC BY-NC (design/content)** — technically the cleanest split, since Creative Commons is formally "not recommended for software": rejected as two licenses to explain, near-zero name recognition, and no GitHub auto-detection in the About sidebar.
- **No license** (all rights reserved) — also blocks the desired non-commercial cloning.

## Decision

License the whole repository under **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**: free to share and adapt for non-commercial purposes with attribution; commercial use requires separate permission from the author. `LICENSE` carries the canonical legal code fetched from creativecommons.org.

## Consequences

- "NonCommercial" bars use primarily intended for commercial advantage — a student cloning it for their own portfolio is fine; paid client work is not.
- CC BY-NC is **not** an OSI open-source license. That is deliberate: the design and content are the primary assets, and a single recognized license covers them coherently. The formal "CC is not for software" caveat was knowingly accepted in exchange for one license that GitHub auto-detects.
- GitHub shows the license in the About sidebar automatically.
- The author retains copyright and can grant a separate commercial license on request.
