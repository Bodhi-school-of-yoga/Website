# Figma Fetch Log — node 1:9139

- **Source URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-9139&m=dev
- **File key:** `eqaofBeNUhOUISevtRfOpT`
- **Node ID:** `1:9139`
- **Fetched at:** 2026-05-22

## Frame summary
- **Name:** `Recorded classes`
- **Type:** Top-level page frame (desktop, full-bleed)
- **Dimensions:** 1920 x 5373 px
- **Canvas position:** x=21000, y=5169
- **Background:** Single full-width rounded-rectangle hero background (`Rectangle 161124051`) plus white page bg.

## Top-level sections (12 children)
| # | Node ID | Name | Size (w x h) | Notes |
|---|---------|------|--------------|-------|
| 1 | 353:10712 | Hero-section | 1920 x 993 | Two-column: left = breadcrumb + H1 "Yoga for Sciatica" + subcopy + 3 hero-stats (25 Videos / 8h Content / ∞ Access). Right = pricing card (₹4,99 / ₹9,99 strikethrough / 50% off badge, perk list, "Buy now and get instant access" CTA, secure-booking note). |
| 2 | 1:9143 | Scroller - blur | 1924 x 82 | Filter tabs strip ("All Videos", "Free"). Sits at y=911 over hero. |
| 3 | 353:10662 | Free Preview | 1337.99 x 448.93 | Section heading "Free Preview — Watch before you buy" + subcopy. 2 unlocked `vcard`s (Lesson 01 "Welcome & What to Expect" 12 min Beginner; Lesson 02 "Setting Up Your Hammock Safely" 18 min Beginner). |
| 4 | 1:9241 | Unlock videos | 1337.24 x 197.55 | Locked-state CTA block: copy + "Unlock All 25 Videos — ₹1,999" primary button. |
| 5 | 1:9249 | Module 1 | 1337.24 x 851.07 | Section header "Module 1 — Foundations (Lessons 3–8)" + subcopy. 4 locked `vcard`s in a 3-col grid (Lessons 03–06, Beginner level). |
| 6 | 1:9311 | Module 2 | 1337.24 x 851.07 | "Module 2 — Building Confidence (Lessons 9–16)". 4 locked vcards (Lessons 09–12, Intermediate). Lesson 10 thumb shows lock overlay + duration pill `22:40`. |
| 7 | 1:9388 | Module 3 | 1337.24 x 459.15 | "Module 3 — Advanced Flows (Lessons 17–25)". 3 locked vcards (Lessons 17, 18, 25; Advanced). |
| 8 | 1:9436 | duration | 59.36 x 25.83 | Floating duration pill (`12:30`) — likely overlay on a thumb. |
| 9 | 1:9438 | free-badge | 54.02 x 28.87 | Floating "Free" pill — overlay on Lesson 01 thumb. |
| 10 | 1:9440 | Things included in the course | 1917 x 280 | "Everything included in your purchase" heading + 8-item benefits grid (4 cols x 2 rows). Each item has title + sub. |
| 11 | 339:8869 | Footer | 1920 x 906 | Standard Bodhi footer: "Begin where you are." hero CTA block, 4-column link grid (Bodhi blurb, School, Visit, Stay close), copyright row. |
| 12 | 353:13673 | Header | 1462 x 56 | Component instance (site nav). |

## vcard anatomy (reused across Free Preview + all 3 modules)
- ~427.5 x 364.9 px
- `thumb` (top, 427.5 x 240.5) — image; locked variant overlays a circular lock icon + duration pill (`22:40` shown on Lesson 10).
- `vcard-body` (~124 px tall): label "Lesson NN", title (H4-ish, ~29px line), meta row = duration text + `level-dot` (color-coded per level) + level label (Beginner / Intermediate / Advanced).
- Free unlocked variant has a "Free" badge overlay on the thumb.

## Pricing card anatomy
- Row 1: "recorded cost" caption, big price `₹ 4,99`, strikethrough `₹9,99`, `50% off` save badge.
- Divider, perk list (Lifetime access, Watch on any device, Download available, Certificate on completion).
- Divider, primary button "Buy now and get instant access" + "🔒 Secure booking · No hidden charges".

## Variables / tokens
- `get_variable_defs` returned only `{"opacity/100":"100"}` — no color/spacing/typography variables surfaced for this node. Tokens will need to be pulled from existing Bodhi `globals.css` design tokens during build.

## Prototype / reactions
- **None detected.** `get_metadata` XML did not include any `<reaction>` / `<prototypeStartNode>` / interaction nodes, and no transitions or hover/press variants were exposed via `get_design_context`. Interactions for this page (hover states on cards, locked-overlay reveal, CTA button states, scroll-snap on the filter strip) will need to be designed by `interaction-designer` rather than imported.

## Artifacts written
- `_workspace/01_figma_metadata_node-1-9139.json` — top-level child summary (full XML in this log).
- `_workspace/01_figma_context_node-1-9139.json` — full `get_design_context` payload (104 KB, persisted by MCP).
- `_workspace/01_figma_variables_node-1-9139.json` — sparse variables payload.
- `_workspace/01_figma_screenshot_node-1-9139.png` — 572 x 1600 PNG (original canvas 1920 x 5373, scaled to fit maxDimension=1600).

## Fetch status
| MCP call | Status | Notes |
|----------|--------|-------|
| `get_metadata` | OK | Full XML returned inline. |
| `get_design_context` | OK | Response >100 KB, persisted to MCP tool-results path and copied into `_workspace`. |
| `get_variable_defs` | OK | Only `opacity/100`. No richer tokens for this node. |
| `get_screenshot` | OK | PNG fetched via curl from short-lived MCP URL. |
| `get_libraries` | Skipped | Not needed for design-to-code build (no external library refs in metadata). |
