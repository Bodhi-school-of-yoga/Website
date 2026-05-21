# Stage 1 — Fetch Log (node 91:16473)

- **Fetched at:** 2026-05-21
- **Authenticated user (whoami):** tech@wokay.com / tech Wokay (Wokay Design Lab — Pro)
- **File:** eqaofBeNUhOUISevtRfOpT (Bodhi-landing-page-web-handoff)
- **Node:** 91:16473 — "04 — Component Token Map"

## Tool call status

| Tool | Status | Notes |
|------|--------|-------|
| whoami | OK | first try |
| get_metadata | OK | full XML returned inline |
| get_design_context | OK (overflowed) | 93,614 chars exceeded inline limit; overflow saved by host runtime to tool-results txt; we re-saved the primary `.text` payload (89,466 chars / 901 lines of TSX) to `_design_code.tsx` |
| get_variable_defs | OK | `{}` — no published variables (consistent with pages 1-3) |
| get_libraries | OK | Only generic community libs subscribed; no Bodhi-specific library |

## Page identity

This node is the **04 — Component Token Map** section of the handoff. The node frame's declared height is 688px but its child layout actually spans the full multi-section handoff document (header + sections 01-04). The unique content of this node vs prior pages is the **component-token mapping table** at the bottom (y=132..564), listing 7 component rows mapped to fill/text/border/radius/typography/states tokens.

## Cross-page comparison

| Page | Node | Identity | Unique content |
|------|------|----------|----------------|
| 1 | 91:15377 | 01 — Color Tokens (focused) | 15 color tokens |
| 2 | 91:15743 | Full handoff render | 12 comp + 43 tok |
| 3 | 91:16108 | 03 — Spacing Scale header (duplicate render) | duplicate |
| 4 | 91:16473 | **04 — Component Token Map** | **7 component→token mapping rows (NEW, not in pages 1-3)** |

Page 4 is NOT a pure duplicate. It is a partial duplicate of the handoff (same header + sections 01/02/03 reused for context) PLUS the unique section 04 component-token map table that does not appear at all in pages 1-3.

## Retries

None required.
