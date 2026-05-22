# Phase 1 — Figma Fetch Log (courses-1-7667)

**Source:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-7667
**Node:** 1:7667 — "Yoga Teacher Training Courses"
**Frame:** 1920 × 5740
**Fetched:** 2026-05-22 (sequential, main session)

## Artifacts

| File | Size | Source |
|---|---|---|
| `01_figma_context_courses.json` | 147 KB | `get_design_context` — React+Tailwind reference code (entry[0]: 146KB) + 3 small advisory entries |
| `01_figma_metadata_courses.json` | 65 KB | `get_metadata` — full node tree XML |
| `01_figma_variables_courses.json` | <1 KB | `get_variable_defs` — only 3 vars: opacity/100, letterSpacing/0, radius/16 |
| `01_figma_libraries_courses.json` | <1 KB | `get_libraries` — community kits attached but not used; design system is local (DESIGN.md) |
| `01_figma_screenshot_courses.png` | 333 KB | `get_screenshot` — 686×2048 rendered (original 1920×5740) |

## Notes

- Variables payload is nearly empty — the design uses styles/literals, not bound variables. Token resolution must come from DESIGN.md.
- Libraries are community kits (Material 3, Simple Design System, iOS) — none of these influence the Bodhi visual language. Ignore for build planning.
- Sequential fetches succeeded without 529 overload.
