# Figma Fetch Log — Node 1:7544 ("Article")

**File:** `Bodhi-landing-page-web-handoff` (`eqaofBeNUhOUISevtRfOpT`)
**Node:** `1:7544` — frame named `Article`
**Fetched:** 2026-05-22
**Source URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-7544&m=dev

## Fetch Status

| MCP Call | Status | File |
|---|---|---|
| `get_metadata` | OK | `_workspace/01_figma_metadata_node-1-7544.json` |
| `get_design_context` (excludeScreenshot=true) | OK | `_workspace/01_figma_context_node-1-7544.json` |
| `get_variable_defs` | OK (empty `{}`) | `_workspace/01_figma_variables_node-1-7544.json` |
| `get_libraries` | OK | `_workspace/01_figma_libraries_node-1-7544.json` |
| `get_screenshot` (maxDimension=1400) | OK | `_workspace/01_figma_screenshot_node-1-7544.png` + `.json` |

No retries needed. Auth confirmed via successful calls (whoami skipped — MCP returned content immediately).

## Component Identification

This node is **a small "Article" card** — a compact program/course teaser used inside a grid (e.g., Programs / Popular Courses). It is **NOT** a hero, navbar, section header, CTA bar, or promo banner.

Layout shape:
- Top: photo region (rendered in Figma as a "Gradient" fill that bleeds 87px above the card frame and 99.9px below the visible region — i.e. a single image fill that's positioned as the top portion of the card)
- Bottom: single heading line ("Mat Pilates Teacher Training Course") on white surface
- No body text, no meta chips, no instructor row, no CTA button
- Soft hairline border, large radius, very soft floating shadow

This matches the **Article variant** of an image-on-top card.

## Exact Layout

### Outer frame (`1:7544` "Article")
- Dimensions: **472 x 321 px**
- Background: `#FFFFFF`
- Border: `1.098px solid rgba(0,0,0,0.08)` (hairline)
- Border radius: `24.151px` (effectively `24px` / `rounded-2xl`)
- Shadow: `0px 4px 48.3px 0px rgba(226,226,226,0.25)` (very soft floating card shadow)
- Padding: `pt-[22.098px] pb-[24.098px] px-[31.836px]` (≈ 22 / 24 / 32 px)
- Auto-layout: `flex-col`, `gap-[10.1px]`, `items-center`, `justify-end`
- `overflow-clip`
- Stacking: relative; one absolutely-positioned image child + one normal-flow text child

### Image / "Gradient" child (`1:7545`)
- Type: rounded rectangle with image fill (named "Gradient" in Figma but is the program photo — confirmed by screenshot showing people on yoga mats)
- Positioned absolutely on the card with `inset-[-88.1px_-1.1px_99.9px_-1.1px]`
  - i.e. top: -88px, right: -1.1px, bottom: 99.9px, left: -1.1px
  - This makes the visible image occupy roughly the **top 220px** of the 321px card, with the bottom 99.9px reserved for the title block (matches the 321 - 99.9 ≈ 221px image height)
- Width × height (intrinsic): 472 × 307 px
- Asset URL (7-day TTL): `https://www.figma.com/api/mcp/asset/7325c727-e00d-4d3d-af4e-e9d89e89c8ba`

### Heading wrapper (`1:7546` → `1:7547` → `1:7548`)
- A 3-level nested auto-layout wrapper around a single text node
- Width: `408.33px` (= 472 − 31.836·2 padding)
- Height: `51px`
- Located `y=245.9` relative to outer frame (image ends, title begins)

### Text node (`1:7549`)
- Content: **"Mat Pilates Teacher Training Course"**
- Font family: `Instrument Sans`
- Weight: SemiBold (600)
- Font size: `23px`
- Line height: `25px`
- Color: `#2f4a3e` (Bodhi forest-green — matches `text-text-brand-deep` token in globals.css)
- Width constraint: `265px` (wraps to 2 lines as shown in screenshot)
- `font-variation-settings: 'wdth' 100`
- `word-break: break-word`

## Breakpoints / Variants / States

- **No component variants exposed** in the Figma node (not a Figma component instance — it's a frame with literal layers)
- **No interactive states** (no hover/focus/pressed defined)
- **No breakpoints** — single fixed size 472 × 321

## Inventory

### Text nodes
| Node | Content | Font / Size / Weight | Color |
|---|---|---|---|
| `1:7549` | "Mat Pilates Teacher Training Course" | Instrument Sans / 23px / SemiBold (LH 25) | `#2f4a3e` |

### Images
| Node | Role | Asset |
|---|---|---|
| `1:7545` "Gradient" | Hero photo (program imagery) | `https://www.figma.com/api/mcp/asset/7325c727-e00d-4d3d-af4e-e9d89e89c8ba` |

### Icons
None.

### CTAs / Buttons
None. The whole card is presumably the clickable surface (no explicit button shown in this node).

### Design tokens / Variables
None bound — `get_variable_defs` returned `{}`. All colors and dimensions are raw hex/px in the source.

## Comparison vs Existing Codebase

Scanned `apps/web/src/components/{sections,ui}/*.tsx`.

### Top candidate: `ProgramCard` with `variant="article"` (`apps/web/src/components/ui/program-card.tsx`) — **STRONG MATCH**

This is the same visual primitive already implemented for Figma node `1:246` (see commit `1b754bc` "feat(web/ui): add ProgramCard from Figma node 1:246"). Side-by-side:

| Property | Figma 1:7544 | ProgramCard `variant="article"` |
|---|---|---|
| Outer shape | white card, hairline border, soft shadow, ~24px radius | `rounded-2xl border-border-1 shadow-card` (matches) |
| Layout | image on top, heading below | `<Image>` (aspect 413/235) + `<CardTitle>` (matches) |
| Heading font | Instrument Sans SemiBold 23 / 25 | `font-heading text-h5 text-text-brand-deep` (matches design tokens — verify h5 = 23/25 in globals.css; if not, near-equivalent) |
| Heading color | `#2f4a3e` | `text-text-brand-deep` (`#2f4a3e` per Bodhi tokens) — exact match |
| Click target | implicit whole-card | `<Link href={href} aria-label={title}>` wrapping card (matches) |
| Meta / instructor / CTA | none in this node | already gated off when `variant="article"` (matches) |
| Mode badge | none | optional `modeBadge` prop (gracefully absent) |

### Decision: NOT a new component

**This is an existing component / variant.** No new file needed. Use:

```tsx
<ProgramCard
  variant="article"
  title="Mat Pilates Teacher Training Course"
  href="..."
  imageSrc="<downloaded asset>"
  imageAlt="Mat Pilates students on yoga mats"
/>
```

### Minor delta vs spec (worth confirming during QA)

1. **Card width**: Figma node is 472px wide; current `ProgramCard` is fluid (driven by its grid container). The Programs grid in `popular-courses-section.tsx` / `programs-grid-section.tsx` already produces cards close to this width at desktop. No change needed.
2. **Image aspect ratio**: Figma image region ≈ 472 × 221 = ratio **2.135 : 1**. Current `ProgramCard` uses `aspect-ratio: 413 / 235` ≈ **1.757 : 1** (taller image). If the design intent for this node is a wider/shorter photo, consider exposing the aspect-ratio as a prop, or accept the existing ratio as the unified pattern.
3. **Heading size**: Figma is 23/25 Instrument Sans SemiBold. Existing component uses `text-h5`. If `--text-h5` in `globals.css` is not 23/25 SemiBold, that's a typography-token alignment item — but since the design tokens memory says to use `text-h5..h5`, prefer the token over raw px.
4. **Padding**: Figma uses 32px horizontal / ~22px top / ~24px bottom on the title block. Current `ProgramCard` article footer uses `px-8 pt-6 pb-6` (32 / 24 / 24) — within rounding tolerance.

### Other candidates considered (rejected)

- `course-card.tsx` — too rich (price, CTA, features/stats, countdown). Reject.
- `highlight-card.tsx`, `instructor-card.tsx`, `syllabus-card.tsx` — different content shapes. Reject.
- `testimonial-card.tsx` — quote-based. Reject.
- `program-card.tsx` `variant="course"` — has meta + instructor + inline CTA. Reject (this article-only flavor matches `variant="article"`).

## Handoff Notes

- **To component-extractor**: This node is a near-duplicate of node `1:246` (already implemented). Recommend marking as "reuse ProgramCard variant=article" rather than emitting a new component spec.
- **To token-extractor**: Only one new color reference: `#2f4a3e` — already in token system as `text-text-brand-deep`. No new tokens.
- **To visual-qa**: Verify image aspect ratio (2.135:1 in Figma vs 1.757:1 in code) and confirm whether the article cards in the actual section should match the Figma intent for this node or the unified Programs grid ratio.

## Artifacts

- `_workspace/01_figma_metadata_node-1-7544.json`
- `_workspace/01_figma_context_node-1-7544.json`
- `_workspace/01_figma_variables_node-1-7544.json`
- `_workspace/01_figma_libraries_node-1-7544.json`
- `_workspace/01_figma_screenshot_node-1-7544.json`
- `_workspace/01_figma_screenshot_node-1-7544.png`
