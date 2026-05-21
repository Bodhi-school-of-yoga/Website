# figma-token-enhancer — run log

**Run mode:** cache-reuse from prior `figma-extract` harness (Figma MCP not called).
**Reason:** `00_input.json.figmaUrl` is `null`; `figmaContextSources` lists four pre-extracted node directories.
**Workspace base:** `_workspace/design-md/`
**Figma fileKey (carried from upstream extractions):** `eqaofBeNUhOUISevtRfOpT`
**Timestamp:** 2026-05-21

## Inputs read

For each of the four node directories under `_workspace/`, the enhancer read:

| Node directory | `02_tokens.json` | `02_components.json` | `01_figma_variables.json` |
|---|---|---|---|
| `node_91-15377` | yes (15 color tokens only) | yes (16 inferred components) | `{}` (empty) |
| `node_91-15743` | yes (color + typography + spacing + radius = 43 tokens) | yes (12 components, includes variant sets) | `{}` (empty) |
| `node_91-16108` | yes (43 tokens, near-duplicate of 15743) | yes (12 components, near-duplicate of 15743) | `{ raw: "{}" }` (empty) |
| `node_91-16473` | yes (45 tokens incl. opacity + border-width) | yes (component-token-map page; doc shells + table rows) | `{ raw: {} }` (empty) |

All four Figma `get_variable_defs` endpoints returned empty in the upstream harness — i.e. **the Bodhi handoff file does not expose published Figma variables to MCP**. Every token captured here was inferred from named frames / design-context code, so no `variable` IDs were available except a per-row `figma_id` recorded by node 91:16473's extractor.

## Schema normalization

Output `01_figma_tokens_normalized.json` rows match the **token-collector** schema:

```jsonc
{
  "name": "color/brand-primary",       // <category>/<kebab-name>
  "value": "#009877",                   // raw value (string/number/object for typography)
  "category": "color",                  // color | typography | spacing | radius | border-width | shadow | breakpoint | motion | z-index | opacity | uncategorized
  "source": {
    "type": "figma",
    "file": "eqaofBeNUhOUISevtRfOpT",
    "node": "91:15377" | ["91:15377", ...],  // single id or array if merged
    "variable": "91:16487" | null               // figma_id when upstream captured one
  },
  "raw": { /* the original row from the source 02_tokens.json */ },
  "sourceNodes": ["91:15377", "91:15743", ...], // always present
  "mode": "light"  // omitted when default-only (Figma variables endpoint was empty → only "default" mode seen)
}
```

Conflicts (same `(name, category)` with different normalized values) get one row per distinct value with `conflict: true` and a `conflictingValues` summary.

### Category mapping decisions
- Upstream `effect` → `shadow` (none present in inputs).
- Upstream `other` from 16473 with `border-width.hairline` → `border-width`.
- Upstream `opacity` retained as `opacity`.
- Token names normalized to lowercase, spaces and underscores → hyphens, `+` → `-plus` (e.g. `sm+` → `spacing/sm-plus`, `brand_dark` → `color/brand-dark`, `brand lite` → `color/brand-lite`).
- Misspelled name `text-teritary` preserved verbatim (matches upstream fidelity-preservation note).

### Cross-node value normalization (for dedupe only)
- Numeric strings like `"4px"`, `"90px"`, `"-0.56px"` normalized to floats.
- `fontWeight` strings like `"Bold"`, `"SemiBold"`, `"Regular"` mapped to numeric CSS weights (700, 600, 400). The map handles `"Regular/SemiBold"` by taking the first token (→ 400, which matched the other nodes' weight for `subtext-1`).
- Hex colors uppercased.
- These transforms are applied only to a comparison key — original raw values are preserved on each row.

## Dedupe stats

| Metric | Value |
|---|---|
| Raw token rows read across 4 nodes | **146** |
| Final deduped tokens | **45** |
| Duplicate rows merged into combined `sourceNodes` arrays | **101** |
| Conflicts (same name, different value) | **0** |

### Category breakdown of final inventory
| Category | Count |
|---|---|
| color | 15 |
| typography | 9 |
| spacing | 12 |
| radius | 7 |
| opacity | 1 |
| border-width | 1 |
| **total** | **45** |

### Coverage per node
- 28 tokens appear in 3 nodes (the color tokens covered everywhere except 16473 use a different bare-name schema captured separately, so they merge as 3-way; the remaining values match).
- 15 tokens appear in all 4 nodes (the canonical color palette merged cleanly across every page).
- 2 tokens are unique to node 91:16473: `border-width/hairline` (1px) and `opacity/disabled` (0.4). These were inferred from the component-token-map table cells and do not appear in the swatch / typography / spacing pages.

### Notes on near-conflicts that were resolved (not flagged as conflicts)
All 9 typography tokens (H1..H5, subtext-3/2/1, mini-text) appeared in two shapes:
- Numeric form `{ fontWeight: 600, fontSize: 24, lineHeight: 23, letterSpacing: -0.11 }` from nodes 91:15743 and 91:16108.
- String form `{ fontWeight: "SemiBold", fontSize: "24px", lineHeight: "23px", letterSpacing: "-0.11px" }` from node 91:16473.

These are the **same values in different encodings**. After applying the weight-name and px-string normalizations described above, all nine matched exactly and were merged. The merged row keeps the numeric value (from 15743) as the canonical `value` and lists all three nodes in `sourceNodes`. The raw v2 form is preserved under `raw` if you inspect a row whose `value` happens to come from 16473.

One borderline case worth flagging to downstream consumers: `subtext-1` weight in 91:16473 is recorded as `"Regular/SemiBold"`. The normalizer mapped this to 400 (Regular), which matches the other two nodes. The Figma source genuinely uses both weights for subtext-1 depending on context (body vs buttons), so a downstream composer may want to surface this as a typography token with a weight-variant axis. The original ambiguous string is preserved on that row under `raw.weight`.

## Components

`01_figma_components.json` is a flat variant index. One row per `(component, variant, props)` triple. Where the same triple appears across multiple nodes, the `source.node` field becomes an array.

| Metric | Value |
|---|---|
| Raw component-variant rows | **124** |
| Deduped rows | **80** |
| Unique component names | **40** |

The set spans documentation shells (`DesignSystemPage/*`, `Section …`, `Header`, `Doc Page Header`), token-display primitives (`ColorSwatchCard`, `TypefaceTile`, `SpacingTile`, `RadiusTile`, `TextStyleRow`, `ComponentTokenMapRow`), and the mapped UI components from the 91:16473 component-token map (`Button.primary`, `Button.ghost`, `Card`, `Input.text`, `Badge`, `Nav.link`, `Heading.section`). Variant rows from `TextStyleRow`, `SpacingTile`, `RadiusTile`, `TypefaceTile`, and `ComponentTokenMapRow` carry per-variant `props` (style, alias+value, family, or full component-token-map row data respectively).

## Outputs written

- `_workspace/design-md/01_figma_raw.json` — bundled raw inputs from all four node directories (tokens, components, figma_variables).
- `_workspace/design-md/01_figma_tokens_normalized.json` — 45 deduped, token-collector-shaped rows.
- `_workspace/design-md/01_figma_components.json` — 80 deduped component-variant rows.
- `_workspace/design-md/01_figma_log.md` — this file.

## Caveats / follow-ups

1. **No Figma variable IDs were resolved.** Every `source.variable` is either `null` or a `figma_id` of the swatch/specimen frame (only available for node 91:16473). If/when the Figma file publishes variables, re-run figma-extract with `--refresh` to pick them up; this enhancer will then carry proper variable IDs through.
2. **No light/dark or mode-aware tokens captured** — the upstream extractions only encountered the `default` mode. `mode` is omitted from every row.
3. **`color/text-brand` and `color/brand-primary`** share the value `#009877`. They are kept as separate semantic tokens (matching the upstream raw rows, where 16473 explicitly aliases text-brand → brand-primary in `references`). The composer should treat text-brand as an alias of brand-primary if it wants to compact the palette.
4. **The names `color/surface-0`, `color/surface-1`, `color/surface-2`** appear with mixed case in upstream (`Surface-0` in 16473, `surface-0` in 15377). The normalizer lower-cases all names, so they merge cleanly.
