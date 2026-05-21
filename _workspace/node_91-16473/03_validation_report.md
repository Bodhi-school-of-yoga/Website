# Validation report — node 91:16473

**Overall: PASS** (3 WARN, 0 FAIL)

## Category results
| Category | Result |
|----------|--------|
| Schema integrity | PASS |
| Cross-references | PASS |
| Completeness | WARN |
| Internal consistency | PASS |
| Source fidelity | PASS |

## Warnings
1. **W1 — completeness/low**: Component entries on this page are reference-table rows, not rendered UI specs. Full component geometry (padding/height/icon slots) is not extractable here.
2. **W2 — internal-consistency/low**: Badge radius cell says `999px`; radius scale defines `full = 9999px`. Visually identical for badge dimensions, but the literal values diverge.
3. **W3 — completeness/info**: Node frame's declared 688px height understates ~2900px actual content height. All children were resolved; just a viewport vs content mismatch.

## Failures
None.

## Cross-reference resolution check
Every token name cited in the 7 mapping rows resolves to an extracted token:

| Cited in table | Resolves to |
|----------------|-------------|
| brand-primary, brand-shade, brand lite | color/brand |
| text-primary, text-secondary, text-brand, text-inverse | color/text |
| Surface-1, Surface-2 | color/surface |
| border-2, border-3 | color/border |
| 8px, 12px, 999px | radius (sm, md, full~) |
| H2, H3, H5, subtext-1, mini-text | typography |
| 40% opacity, 1px | opacity / other |

No dangling references.
