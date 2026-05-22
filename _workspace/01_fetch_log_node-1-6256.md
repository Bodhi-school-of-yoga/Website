# Figma Fetch Log — node 1:6256

## Source
- File: `eqaofBeNUhOUISevtRfOpT` (Bodhi-landing-page-web-handoff)
- Node: `1:6256` (frame name: `Article`)
- URL: https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-6256&m=dev
- User intent: CARD-level component

## MCP calls
| Call | Status | Output file |
|------|--------|-------------|
| `get_metadata` | OK | `_workspace/01_figma_metadata_node-1-6256.json` |
| `get_design_context` (excludeScreenshot=true) | OK | `_workspace/01_figma_context_node-1-6256.json` |
| `get_variable_defs` | OK (empty `{}`) | `_workspace/01_figma_variables_node-1-6256.json` |
| `get_libraries` | OK | `_workspace/01_figma_libraries_node-1-6256.json` |
| `get_screenshot` | OK | `_workspace/01_figma_screenshot_node-1-6256.png` (569 x 528) |

No retries needed. No size warnings.

---

## What kind of card is this?

This is a **program card — `article` variant** (course/program teaser card).

Evidence:
1. Figma frame is literally named `Article` — matches the existing `ProgramCardVariant = "course" | "article"` taxonomy in `program-card.tsx`.
2. Layout = full-bleed top photo + title + meta row (duration / mode / language) + dashed divider + "View Program →" CTA. This is the established Bodhi program-listing card pattern.
3. CTA says "View Program →" (not "Read Article", "Learn More", "Book a slot"), which is the same default CTA already coded into `ProgramCard`.
4. Content shown: "Mat Pilates Teacher Training Course" — clearly a program/course offering, not a blog article and not a testimonial.

So despite the Figma layer name "Article", semantically and behaviorally this is the **teaser/listing card for a course** (the `article`-style compact variant, distinguished from the larger `course` variant which also shows an instructor row).

---

## Exact layout structure

```
Card (frame id 1:6256, 472 x 431, named "Article")
- background: #ffffff
- border: 1.098px solid rgba(0,0,0,0.08)
- border-radius: 24.151px
- shadow: 0px 4px 48.3px 0px rgba(226,226,226,0.25)
- padding: 22.098px top / 31.836px x / 24.098px bottom
- overflow: clip
- flex column, items-center, justify-end, gap 10.1px
- Auto-layout stack, content sits at bottom of frame:

  ├── Gradient image (1:6257)
  │   - absolute, inset: -88.1px -1.1px 179.9px -1.1px
  │   - rounded-rectangle filled with photo (program image)
  │   - extends beyond top + left/right edges; clipped by card overflow-clip
  │
  └── Content stack (1:6258, w=408.33, gap=12px col)
      ├── Heading 3 block (1:6259/1:6260, gap=18px col)
      │   ├── Title text (1:6261, w=265)
      │   └── Meta row (1:6262, flex-wrap, gap 10px col)
      │       - [icon 13x13] · "4 weeks"           (1:6263)
      │       - 3x3 dot @ #c8a96e/50%              (1:6268)
      │       - [icon 13x13] · "Online"            (1:6269)
      │       - 3x3 dot                             (1:6274)
      │       - [icon 13x13] · "English"           (1:6275)
      │
      └── HorizontalBorder + CTA row (1:6280)
          - border-top: 1.098px dashed rgba(47,74,62,0.22)
          - padding-top: 16.467px
          - flex row, items-center, justify-between
          - left:  "View Program →" link (1:6281)
          - right: empty 117x23 placeholder (1:6282)
```

### Paddings & gaps (exact)
| Token | Value |
|-------|-------|
| Card padding-top | 22.098px |
| Card padding-bottom | 24.098px |
| Card padding-x | 31.836px |
| Card border-radius | 24.151px |
| Card border | 1.098px rgba(0,0,0,0.08) |
| Card shadow | 0 4 48.3 0 rgba(226,226,226,0.25) |
| Image-to-content gap | 10.1px (`gap-[10.1px]` in MCP code) |
| Title-to-meta gap | 18px |
| Meta inline gap | 10px column / 0px row (wrap) |
| Meta icon-to-label gap | 5px |
| Divider padding-top | 16.467px |
| Content stack gap | 12px |

These all approximate the 8px-grid Bodhi tokens: 24, 22, 12, 18, 16 are essentially `space-6 / space-5 / space-3 / space-4` — fine for direct mapping.

---

## Text nodes (every one)

| Node | Content | Font | Weight | Size | Line-height | Letter-spacing | Color |
|------|---------|------|--------|------|-------------|----------------|-------|
| 1:6261 | "Mat Pilates Teacher Training Course" | Instrument Sans | SemiBold (600) | 23px | 25px | — | `#2f4a3e` (deep brand green) |
| 1:6267 | "4 weeks" | DM Sans | Medium (500) | 12px | normal | 0.12px | `#7a6e65` (warm/tertiary text) |
| 1:6273 | "Online" | DM Sans | Medium (500) | 12px | normal | 0.12px | `#7a6e65` |
| 1:6279 | "English" | DM Sans | Medium (500) | 12px | normal | 0.12px | `#7a6e65` |
| 1:6281 | "View Program →" | Manrope | Medium (500) | 14.271px | 22.12px | 0.0878px | `#038f9f` (brand teal / link) |

Notes:
- Title color `#2f4a3e` aligns with `text-text-brand-deep`.
- Meta color `#7a6e65` aligns with `text-muted-foreground` / warm secondary.
- CTA color `#038f9f` aligns with `text-brand-primary` (teal).
- Title has `fontVariationSettings: 'wdth' 100` — width axis stays default.
- Meta has `fontVariationSettings: 'opsz' 14` — optical-size axis.
- The arrow `→` is part of the title string in Figma; existing component uses lucide `<ArrowRight>` icon instead. Visually equivalent.

---

## Image / icon nodes

| Node | Kind | Asset URL (7-day expiry) | Size |
|------|------|--------------------------|------|
| 1:6257 (Gradient) | Photo / image fill | https://www.figma.com/api/mcp/asset/ec29c543-675b-4fe9-afb0-d0a292bb30d0 | absolute, fills top of card incl. bleed |
| 1:6264 (SVG, "4 weeks") | Icon — clock / duration | https://www.figma.com/api/mcp/asset/948f1024-daed-416e-a8ca-1001ec26c172 | 13x13 |
| 1:6270 (SVG, "Online") | Icon — globe / monitor | https://www.figma.com/api/mcp/asset/82ed3fc9-8b1b-4196-9b71-9efe825e70f5 | 13x13 |
| 1:6276 (SVG, "English") | Icon — language / globe | https://www.figma.com/api/mcp/asset/970d2ba7-0819-4c1e-a6df-afe1bd01b2b9 | 13x13 |
| 1:6268, 1:6274 | Decorative 3x3 rounded square dots | — (no asset; pure shape) | bg `#c8a96e` opacity 50% |

Note on naming: layer 1:6257 is called "Gradient" in Figma but the fill is actually a photograph (people in yoga / pilates poses outdoors). The Figma layer name is misleading.

---

## Variants / states visible in this node

Only **one variant** is visible at this nodeId (`1:6256`). No `default/hover/active` siblings or component-set frames are present at this scope.

Inferred relationship to other cards in the file (out of scope for this fetch but worth noting):
- This `Article` card differs from the larger Bodhi course card by:
  - Smaller image area (image is cropped/clipped, not given a fixed aspect-ratio sub-frame).
  - Meta row is wrapped inline with the title block (gap 18px), not a separate section.
  - Footer is just `View Program →` — no instructor avatar/name and no booking CTA.
- The right side of the footer (1:6282) is an empty 117x23 placeholder, suggesting the same layout slot is sometimes filled with an instructor chip or secondary CTA in another variant.

If we need the sibling states (hover, active, course-variant) — re-fetch with the parent component-set nodeId.

---

## Comparison to existing `apps/web/src/components/ui/program-card.tsx`

**Verdict: This is a VARIANT we already support — extend, do not create a new component.**

Existing `ProgramCard` already has:
- `variant: "course" | "article"` with `isArticle = variant === "article"` branch.
- `meta` items (icon + label) with `3px` warm-50 dot separators between them.
- Dashed top border on the footer row (`border-t border-dashed border-foreground/20`).
- Brand teal CTA (`text-brand-primary` with `<ArrowRight>`).
- Title in `font-heading text-text-brand-deep` when `isArticle`.
- Soft shadow + 24px-ish radius + hairline border ("rounded-2xl border-border-1 shadow-card").

So the building blocks all exist. However the current `article` branch in the component has TWO behavioral mismatches with Figma 1:6256:

1. **Meta row is gated by `!isArticle`.** Current code only renders the meta list in the `course` variant. Figma 1:6256 is the `article` layer and DOES show a meta row (4 weeks · Online · English). Either:
   - The Figma `article` is actually closer to the existing `course` layout minus instructor + minus booking CTA; OR
   - We need to allow `meta` in the `article` variant as well.
   - Recommended: lift the meta row out of the `!isArticle` gate so both variants can render it.

2. **Dashed divider + CTA are gated by `!isArticle`.** Current code only shows the `<Link>` "View Program" CTA in the `course` variant. Figma 1:6256 shows both the dashed top border AND the "View Program →" CTA inside the `article` card.
   - Recommended: render the dashed border + CTA inside the `article` branch too (without the instructor chip).

3. Minor: image aspect/positioning — current code uses `aspect-ratio: 413/235` with a fixed sub-frame; Figma uses an absolutely-positioned photo that bleeds above the card. The visual outcome is comparable (photo fills the top of the card) but the existing implementation is cleaner. Keep as-is.

4. The empty right-side 117x23 slot (node 1:6282) in Figma suggests the same component supports an optional right-aligned chip in the footer (e.g., price, status, secondary CTA). Worth modeling as an optional `footerEnd` slot if a sibling variant later needs it — but not blocking for now.

### Proposed delta (do not implement here; for build-planner)
- In `program-card.tsx`, restructure so:
  - Title always renders.
  - `meta` (when provided) always renders (move outside the `!isArticle` gate).
  - Dashed divider + CTA row always renders when `cta`/`href` provided.
  - Instructor chip stays gated to `variant === "course"`.
- Token alignment is already correct; no new tokens needed.
- Visual smoke-test the article variant against `_workspace/01_figma_screenshot_node-1-6256.png`.

## Notification
- component-extractor: context ready → `_workspace/01_figma_context_node-1-6256.json`
- token-extractor: variables empty (`{}`) for this node; nothing to extract. Card uses raw hex values that already map to existing Bodhi tokens.
