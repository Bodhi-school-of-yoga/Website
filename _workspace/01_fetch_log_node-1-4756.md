# Figma Fetch Log — node-1-4756

- **File**: Bodhi-landing-page-web-handoff
- **fileKey**: `eqaofBeNUhOUISevtRfOpT`
- **nodeId**: `1:4756`
- **URL**: https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-4756&m=dev
- **Fetched at**: 2026-05-22

## Frame summary

- **Title**: `Offline Courses` (note: name is misleading — this is the full landing page composition under the "Offline Courses" frame)
- **Type**: `frame`
- **Position**: x=14700, y=5169 (canvas coords)
- **Dimensions**: 1920 × 1994 px (root frame box; child content extends below into stacked sections)
- **Descendant element count**: ~682 nodes (frames + rectangles + texts + groups)
- **Unique `name=` strings**: 225 (116 after filtering Figma-generic noise)

## Depth-1 children (top-level sections by y-offset)

The root frame contains 1 background image and 7 grouped section frames. Listed in document order (note that several y-offsets reach far below the declared root height of 1994):

| id | name | x,y | width × height | Inferred section |
|----|------|-----|----------------|------------------|
| 1:4757 | `image 25` (rounded-rectangle) | -185, -451 | 2519 × 872 | Hero background photograph |
| 1:5543 | `Group 1171281918` | 224, 132 | 892 × 224 | Hero headline block — contains "Become The Teacher You Were Meant To Be" |
| 1:5289 | `Group 1171281879` | 224, 475 | 1472 × 1355 | Hero / Programs intro block (sits in viewport ~475–1830) |
| 1:4758 | `Group 1171281727` | 0, 2676 | 1920 × 1991 | "Yoga Teacher Training Courses" — Top Popular Yoga Course grid (Online cohort cards: Pranayama, Mudra Therapy, MAT Pilates, Weight Loss Coach, Bala, Face Yoga, etc.) |
| 1:5128 | `Frame 1171281022` | 321, 3911 | 1291 × 630 | Sub-grid for Offline / specialized course cards (Top Popular Yoga Course tag) |
| 1:4961 | `Group 1171281821` | 120, 4782 | 1680.5 × 1571.2 | "Why Bodhi School of Yoga?" — pillars / value-prop section (Heal · Lead · Rise; women-centred copy) |
| 1:5255 | `Group 1171281832` | 240, 6504 | 1441 × 499 | "What our clients say" — testimonial trio (Aanya / Lena / Ravi quotes) |
| 1:5035 | `Group 1171281827` | 0, 7081 | 1920 × 1302 | Footer — "Begin where you are." CTA + "Stay close" links + "© Bodhi School of Yoga · Yoga Alliance Registered School (RYS-200, RYS-300)" |

(Note: there's also a "Recognizing the Global Impact of Yoga" / accreditation strip — RYS200, RYS300, Yoga Alliance, Ministry of Ayush, Yoga Certification Board, Jyotish Yoga Sastra University, AIVETC — nested inside one of the upper groups around y≈4500.)

## Inferred page structure (semantic order from named anchors)

1. **Hero** — "Become The Teacher You Were Meant To Be" + background photograph + intro paragraph
2. **Programs intro / featured TTCs** — Bala TTC, Face Yoga TTC, Mudra Therapy, MAT Pilates, Weight Loss Coach (Online + Offline variants), "View Program →" CTAs, course meta chips (4 weeks / Online / 2 weeks etc.)
3. **Top Popular Yoga Course** sub-grid — Pranayama & the nervous system, 300 Hour Yoga Teacher Training Course — Online, etc.
4. **Accreditations strip** — "Recognizing the Global Impact of Yoga" — RYS-200, RYS-300, Yoga Alliance USA, Ministry of Ayush, Yoga Certification Board, Jyotish Yoga Sastra University, AIVETC, Professional Quality Management Services
5. **Why Bodhi School of Yoga?** — pillars: "Making yoga accessible & empowering for every woman", "Supporting women to rise personally & professionally", "Offering accredited TTCs that reflect women's unique needs", "Creating a safe space for healing, leadership & sisterhood", "Growing a global network of empowered yoginis"
6. **Take a Guided Path / Free Trial Session** block — "Talk to counsellor who can assess and offer recommendations", "Our assessment will guide you take direction best suited based on your experience", "50 Mins Session with the option of choosing from 10 slots in a day."
7. **Testimonials** — "What our clients say" — Aanya (TTC Cohort 11, Goa), Lena (online, Berlin), Ravi (workshop) — with author avatars (initials PP/LY/JD also appear)
8. **Footer CTA + meta** — "Begin where you are.", "A school for teachers, a home for seekers. Practice, taught honestly.", "Try a class, free" / "Speak to us", "Stay close" link cluster (Teacher Training, Workshops, Classes, Faculty, Lineage, Newsletter, Instagram, YouTube, Email us), address ("The Practice Room, 2nd floor, Quiet Lane, City · India"), © line

## Artifacts produced

| File | Size | Status |
|------|------|--------|
| `_workspace/01_figma_metadata_node-1-4756.json` | ~90 KB | OK (XML embedded in JSON; large — exceeded inline token limit on the MCP response, copied via jq) |
| `_workspace/01_figma_context_node-1-4756.json` | ~90 KB | OK (large — exceeded inline token limit on the MCP response, copied via jq) |
| `_workspace/01_figma_variables_node-1-4756.json` | 60 bytes | OK — only 3 primitives (`opacity/100`, `letterSpacing/0`, `radius/16`); the file has very few published Figma variables, design tokens live in `apps/web/src/app/globals.css` |
| `_workspace/01_figma_libraries_node-1-4756.json` | ~2.4 KB | OK — 4 subscribed community libraries: Material 3, Simple Design System, iOS 18 / iPadOS 18, iOS / iPadOS 26 (note: none of these are the Bodhi project's actual design system; they are leftover community subscriptions and should not drive token decisions) |
| `_workspace/01_figma_screenshot_node-1-4756.png` | ~1.8 MB | OK — 1541 × 1600 (rendered) / 1920 × 1994 (natural) |

## Issues / notes

- `get_metadata` and `get_design_context` both returned responses too large for inline embedding (>89,000 chars). The MCP server cached them to its tool-results dir; both were copied into the namespaced artifact paths via `jq -c .` (preserves bytes; no data loss).
- Note that this frame is named "Offline Courses" in Figma, but the actual content is the **full Bodhi landing page** (hero → programs → accreditations → why-Bodhi → testimonials → footer). The other queue node (`1:1547`) is likely the desktop-light variant or a distinct compositional column. Confirm the relationship via the component-extractor.
- No auth issues. `get_libraries` succeeded; `get_variable_defs` returned a near-empty set as expected (this Figma file does not publish a token system — token source-of-truth is the code in `apps/web/src/app/globals.css`).
- Only 1 retry budget was needed (the large-response failures resolved without a retry by reading the cached MCP output).
