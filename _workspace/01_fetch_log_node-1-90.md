# Figma Fetch Log — Node 1:90 (Header / Top Navigation Bar)

- File key: `eqaofBeNUhOUISevtRfOpT`
- Node ID: `1:90`
- Node name: `Group 1171281887`
- Fetched at: 2026-05-22

## Fetch Results

| MCP Call | Status | Output file |
|---|---|---|
| `get_metadata` | OK | `01_figma_metadata_node-1-90_fresh.json` |
| `get_design_context` | OK | `01_figma_context_node-1-90_fresh.json` |
| `get_variable_defs` | OK (empty `{}` → saved as `null`) | `01_figma_variables_node-1-90_fresh.json` |
| `get_libraries` | OK | `01_figma_libraries_node-1-90_fresh.json` |
| `get_screenshot` (maxDimension 2048) | OK | `01_figma_screenshot_node-1-90.png` (1641x56 PNG, ~12 KB) |

No retries needed. No variables are bound on this node — colors and typography are baked in as literal values.

## Navbar Geometry

- Bounding box: `x=228, y=20, width=1464, height=56`
- The node itself is the inner content row only (no full-bleed background). Within the canvas, the bar sits at the top with the logo at the left and CTA at the right.
- Inner layout: a single horizontal flex row with `gap: 80px` between the logo block and the right-hand cluster.
- The container flex declares `inset-[0_-12.08%_0_0]` — the design overflows ~12% to the right of the 1464-wide group. The screenshot renders at 1641 × 56, which matches `1464 * (1 + 0.1208) ≈ 1640.7`. In code, this means the navbar's logical full width is ~1641px and `1464px` is the visible/clipped region — for our implementation, treat the navbar as a normal `max-w-screen / px-* container` flex row at height 56.

## Structural Layout (left → right)

```
[ Logo block ]   gap 80px   [ Nav links row + search ]   gap 42px   [ Search icon | CTA pill ]
```

### 1) Logo block (left)
- Two stacked texts in a single grid cell:
  - **`Bodhi`** wordmark
    - Font: `Fraunces`, Italic, 400
    - Size: `32px`
    - Letter-spacing: `-0.3551px`
    - Line-height: `55.044px`
    - Color: `#000000`
    - Font-variation-settings: `'SOFT' 0, 'WONK' 1`
  - **`SCHOOL OF YOGA`** tagline (positioned beneath, `mt-[46.5px]`, so it overlaps visually as a baseline below the wordmark within the 56px row)
    - Font: `Manrope`, Semibold (600)
    - Size: `12px`
    - Letter-spacing: `2.9562px` (~0.24em)
    - Line-height: `20.766px`
    - Text-transform: uppercase
    - Color: `#000000` at `opacity: 0.6`

### 2) Right-hand cluster — flex row, `gap: 42px`, items centered

#### 2a) Nav links group — flex row, `gap: 9px`
Inner inner row: `gap: 39px` between nav items. Order:

| # | Label | Has dropdown arrow? | Notes |
|---|---|---|---|
| 1 | Teacher Courses | yes | rendered as `<button>` with 8px gap before the arrow icon |
| 2 | Advanced Certifications | yes | `<button>`, 7px gap before arrow |
| 3 | Yoga Courses | yes | `<button>`, 7px gap before arrow, fixed `width: 116px` |
| 4 | Workshops | no | `<a>` link only |
| 5 | Our Centers | no | `<a>` link only |
| 6 | About Bodhi | no | plain text node |

All nav labels share:
- Font: `Instrument Sans`, Medium (500)
- Size: `17px`
- Line-height: `normal`
- Color: `#000000`
- `font-variation-settings: 'wdth' 100`
- `whitespace: nowrap`

Dropdown arrows (`Iconly/Light/Arrow---Up-2`, rotated 180° → points down):
- Size: 18 × 18 px
- Asset: `https://www.figma.com/api/mcp/asset/c13df89c-434a-4a6d-977a-7d304e71d866`
- Used in items 1–3 and a 7th trailing arrow (after "About Bodhi")

Note: there is a 7th `rotate-180` arrow at the end of the nav-link row (`I1:90;353:11634`). Visually in the screenshot, the only icon between "About Bodhi" and the CTA is the **search/magnifier glyph** — that 44×44 image is the search affordance, not a chevron. The trailing arrow node seems to be either a hidden helper or fused into the search icon rendering. Treat the search circle (next bullet) as authoritative.

#### 2b) Search + CTA — flex row, `gap: 10px`
- **Search**: 44 × 44 px image asset (`imgGroup1171281692`, URL: `https://www.figma.com/api/mcp/asset/ac5fba0a-5d18-4122-8821-f6a65e31fc74`). In the screenshot this is a thin magnifier-glass icon. Implement as a 44×44 button containing a search SVG/icon.
- **CTA pill — "Enquire Now"** (anchor `<a>`)
  - Container: `height: 44px`, padding `15px 32px`, `border-radius: 36px` (fully pill)
  - Background: `#8EE0CE` (mint / accent green) — matches existing `--accent-green` token in `globals.css` (`#8EE0CE`)
  - Label: `Instrument Sans`, Semibold (600)
  - Size: `14px`
  - Letter-spacing: `0.26px`
  - Color: `#1D3E59` (deep navy — matches existing `--brand-primary` `#1d3e59`)
  - Line-height: `normal`

## Exact Colors, Fonts, Sizes (quick reference)

| Token | Value | Where used |
|---|---|---|
| `#000000` | logo wordmark, nav link text | Bodhi, all nav items |
| `#000000 @ 0.6` | tagline | "SCHOOL OF YOGA" |
| `#8EE0CE` | CTA background | "Enquire Now" pill |
| `#1D3E59` | CTA label | "Enquire Now" label |
| Fraunces Italic 400, 32 / 55.044 / -0.3551 | wordmark | "Bodhi" |
| Manrope SemiBold 600, 12 / 20.766 / 2.9562, uppercase, opacity 0.6 | tagline | "School of yoga" |
| Instrument Sans Medium 500, 17 / normal | nav links | All 6 items |
| Instrument Sans SemiBold 600, 14 / normal / 0.26 | CTA label | "Enquire Now" |
| Arrow icon 18×18, rotated 180° | dropdown indicator | items 1, 2, 3 |
| Search icon 44×44 | search | between nav and CTA |
| CTA pill: h 44, px 32, py 15, radius 36 | CTA | "Enquire Now" |
| Row height | 56px | overall navbar |
| Row gaps | 80px (logo↔nav cluster), 42px (nav↔cta cluster), 39px (between nav items), 10px (search↔cta), 9px (nav row↔trailing arrow), 8px / 7px (nav label↔chevron) | layout |

## Interactions / Hover States

Figma metadata does NOT encode hover/active states for this node. `cursor-pointer` is set on each interactive element (buttons / anchors), but no separate hover variants, focus rings, or active styles are described. We will need to either:
1. Choose sensible defaults (e.g. underline on hover for nav items, brand-primary tint on CTA hover, slight scale or darker mint), or
2. Ask the design team for hover-state variants.

The three labels with chevrons ("Teacher Courses", "Advanced Certifications", "Yoga Courses") are clearly dropdown triggers but no dropdown menu node is included in the design context.

## Libraries

No design-system library contributes components to this node. The four libraries linked to the file (Material 3, Simple Design System, iOS 18, iOS 26) are not used by 1:90. The navbar is built from custom Bodhi atoms (logo type, raw text nav items, Iconly arrow, custom search asset, custom rounded button).

## Variables

`get_variable_defs` returned `{}` — no Figma variables are bound. All colors / sizes are literal. This means the implementer must map literal hex/px values onto existing project tokens themselves:

- `#1D3E59` → `--brand-primary` / `text-brand-primary` (already exists)
- `#8EE0CE` → `--accent-green` (already exists)
- `#000000` → `--text-primary` (already exists as `#1d3e59` — TODO: this is a divergence; nav text in Figma is true black, not brand-primary)
- `#000000 @ 0.6` → `--text-tertiary` (existing token is `rgba(29,62,89,0.7)` which is close in luminance but tinted navy, not black)

## Notes for Header Implementation (`apps/web/src/components/layout/header.tsx`)

1. Replace any existing brand-primary-colored nav links with **true black `#000`** to match Figma — or get explicit sign-off to keep brand-primary.
2. The wordmark/tagline pair: render the tagline so its baseline sits ~9px below the wordmark baseline (the Figma `mt-[46.5px]` together with the wordmark's 55px line-height produces a tight stack within the 56px row).
3. Three nav items get a downward chevron (Teacher Courses, Advanced Certifications, Yoga Courses) — wire them up as dropdown triggers even if menus are not designed yet.
4. The trailing 18×18 arrow node next to "About Bodhi" in the Figma tree appears to be vestigial — defer to the screenshot, which shows only the search icon between the last nav item and the CTA.
5. CTA pill matches the existing accent-green / brand-primary tokens already in `globals.css`; reuse them rather than hard-coding.

## File Sizes

- `01_figma_context_node-1-90_fresh.json` — ~14 KB (well under 500 KB threshold)
- `01_figma_screenshot_node-1-90.png` — ~12 KB (1641×56)

No size warnings.
