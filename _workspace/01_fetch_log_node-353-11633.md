# Figma Fetch Log — node 353:11633 (Mega Menu / "About Bodhi")

- **File key:** `eqaofBeNUhOUISevtRfOpT`
- **Node id:** `353:11633`
- **Source URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=353-11633&m=dev
- **Fetched:** 2026-05-22
- **Auth:** OK (no errors from any MCP call)

## Calls

| MCP call | Status | Output file |
|---|---|---|
| `get_metadata` | OK | `_workspace/01_figma_metadata_node-353-11633.json` |
| `get_design_context` | OK (returned React+Tailwind code) | `_workspace/01_figma_context_node-353-11633.tsx` + companion JSON `_workspace/01_figma_context_node-353-11633.json` |
| `get_screenshot` | OK (PNG 1288x401, original 1287x400) | `_workspace/01_figma_screenshot_node-353-11633.png` (~59 KB) |
| `get_variable_defs` | OK but **empty** (`{}`) | `_workspace/01_figma_variables_node-353-11633.json` |
| `get_libraries` | OK | `_workspace/01_figma_libraries_node-353-11633.json` |

## Frame summary

- **Top-level frame** `353:11633` "About Bodhi" — width **1227**, height **340**.
- It is a **mega-menu dropdown panel** (the surface that appears under the "About" nav item), not a full page section.
- Three column groups laid out horizontally with a `gap: 45px`, padded `~20.94px`:
  1. **`1:8213` — "Who are we"** (4 items, ~290px tall)
     - About us / At Comfort of your home (`ic:round-laptop`)
     - Yogic Lifestyle / We have 20+ studios (`hugeicons:yoga-03`)
     - Our Trainers / access anytime, anywhere (`hugeicons:yoga-02`)
     - Empowering Yogapreneurs / access anytime, anywhere (`ion:people-sharp`)
  2. **`1:8263` — "blogs & events"** (3 items, ~222px tall)
     - Events & Workshops / At Comfort of your home (icon container empty — vector-only group `1:8267`)
     - Yoga Poses / We have 20+ studios (`tabler:yoga`)
     - Blogs & Insights / access anytime, anywhere (`carbon:blog`)
  3. **`1:8295` — "help & resourses"** (3 items, ~237px tall; note typo "resourses")
     - Our Centers / At Comfort of your home (`tabler:location-filled` over `ic:round-laptop`)
     - Tips to become a succesful Yoga Teacher / We have 20+ studios (`mdi:yoga`; 2-line title, taller 65px row)
     - Contact Us / access anytime, anywhere (icon container empty — vector-only group `1:8318`)

## Visual treatment

- **Panel chrome:** `rgba(255,255,255,0.7)` fill with `backdrop-blur(30.7px)`, `0.91px` solid border `rgba(123,123,123,0.2)`, `border-radius: 31px`, drop shadow `0 19.115px 30.22px rgba(136,136,136,0.25)`. Classic glass / frosted card.
- **Column headers:** Manrope ExtraBold, `10.923px`, tracking `2.6908px`, uppercase, color `#004435` (Bodhi primary green) at `opacity 0.6`.
- **Link titles:** Instrument Sans SemiBold, `18px`, color `#000`, tracking `-0.4642px`, leading `32.495px`. Width-axis variation set to `'wdth' 100`.
- **Link subtitles:** Instrument Sans Medium, `14px`, color `#8a8a8a`.
- **Icon tile:** 48x48 white squircle, `border-radius: 16px`, border `0.91px rgba(182,182,182,0.31)`, shadow `0 4 4 rgba(233,233,233,0.25)`. Each holds a 20-26px icon.
- **Item row:** `flex` with `gap: 20.025px`, vertical `gap: 18px` between rows. Text column has a fixed `180.225px` width.

## Quirks / notes

- **No design-system variables** returned (`get_variable_defs` → `{}`). All colors/spacing are inlined as raw values in the design — token mapping must be inferred client-side.
- **Linked libraries are generic UI kits only** (Material 3, Figma SDS, iOS 18/26). No bespoke Bodhi component library is attached, so component reuse from a library is not possible — every node is a raw frame.
- **Two icon tiles are vector-only / unresolved** (`1:8267` for "Events & Workshops" and `1:8318` for "Contact Us") — they have a 48x48 group but the metadata exposes no inner icon frame. The design context flattens them into single `img` assets (`imgGroup1171281883`, `imgGroup1171281881`). Treat these as raster fallbacks; when building, substitute the right Lucide/Iconify equivalent.
- **`Our Centers`** stacks two icons in the same tile (`tabler:location-filled` + `ic:round-laptop`). The laptop icon is likely an orphan layer left from the template — verify which one ships.
- **Naming inconsistencies:** every link text node is named `"Link → Programs"` regardless of the actual copy; rely on the rendered text content, not the layer names. Header typo "resourses" preserved as-is in the source.
- **Misaligned coordinates:** column 2 and 3 child frames carry inherited absolute `x` offsets (e.g. `x=410.0020751953125`, `820.004150390625`) but each is wrapped in an auto-layout flex parent (`1:8212`), so those offsets are layout artefacts — use the flex gap of 45px when reimplementing.
- **No locked layers detected.**
- **Assets are temporary** — Figma MCP CDN URLs expire in ~7 days; re-fetch or download SVGs into the repo before that.

## Next steps for downstream agents

- **component-extractor:** see `_workspace/01_figma_context_node-353-11633.tsx`. Three repeating list items per column suggest a `MegaMenuItem` (icon-tile + title/subtitle) and a `MegaMenuColumn` (header + items) primitive.
- **token-extractor:** variables empty; harvest inline values from the .tsx — primary candidates: green `#004435`, muted text `#8a8a8a`, panel border `rgba(123,123,123,0.2)`, icon-tile border `rgba(182,182,182,0.31)`, blur `30.7px`, radii `16px` and `31px`.
