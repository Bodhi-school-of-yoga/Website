# Decomposition — Course Card (node 1:3978)

**Target:** Figma node `1:3978` — `Decoding "What is Prana?"` course card
**Viewport:** 1308 × 362 (single horizontal card)

## Sections

### 1. `course-card` (1308 × 362)
A single horizontal card: left-half photo (447 × 362), right-half content column starting at x=487.

**Layout map (right column):**
| y | element |
|---|---|
| 26 | Title `Decoding "What is Prana?"` (left) + Price `₹249` (right, x=1194) |
| 84 | Description body (2 lines, 597 px wide) |
| 160–264 | Feature tile row (4 tiles, 485 px wide, 110×104 each, 15 px gap) |
| 289–333 | Mint pill CTA `Book spot now` (241×44) + caption `Starts in 3 days` (right, x=1153) |

## Components

### `CourseCard` — new-section
The whole horizontal card. Props:
- `image` (src, alt) — left 447 × 362 region
- `title` — `Decoding "What is Prana?"`
- `description` — `Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows.`
- `price` — `₹249`
- `startsCaption` — `Starts in 3 days`
- `cta` — `{ label: "Book spot now", variant: "mint-pill" }`
- `features[]` — array of 4 `{ icon, label }`

### `FeatureTile` — new-component (×4)
Identical 110 × 104 rounded tile with centered icon (top) and label (bottom).
Instances:
1. `calendar` → `Sat & Sun`
2. `yoga-pose-figure` → `Studio`
3. `clock` → `3 days`
4. `english-badge` (icon-park-solid:english) → `English`

### `MintPillButton` — existing-primitive (to verify)
241 × 44 pill CTA, mint fill, label `Book spot now`. Codebase-scout to confirm whether `components/ui/button.tsx` already has a `mint` + `pill` variant; if not, extend rather than create a new component.

## Uncertain
- `icon-park-solid:english` (node 1:3999) is a packaged 29×29 frame — may render as a mint "En" badge rather than a plain vector. Builder to inspect children.
- `Starts in 3 days` caption (node 1:4010) sits bottom-right; spatially closer to the price column than the CTA. Treated as a sibling of the CTA row.
- Feature-tile row (485 px) is narrower than the right column (597 px) — left-aligned, not stretched.

## Notes for downstream agents
- Use Bodhi design tokens: `text-h*`, `text-text-primary/brand/tertiary`, `bg-surface-*`, `border-border-*`. No inline hex.
- Treat the card as one component; the feature tiles are the only repeated sub-piece (count: 4) and warrant their own component file.
- The 2×2 grid description from Phase 1 is actually a 1×4 row in the metadata — corrected here.
