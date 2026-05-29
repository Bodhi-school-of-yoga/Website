# Figma Fetch Log

- **Fetched:** 2026-05-29
- **File key:** `eqaofBeNUhOUISevtRfOpT` (Bodhi landing page web handoff)
- **Node:** `819:18444`
- **URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=819-18444&m=dev
- **Transport:** Figma Dev Mode MCP server at `http://127.0.0.1:3845/mcp` (called over JSON-RPC/SSE via curl/python; the MCP tools were not exposed as native function calls in this session, so the local server was driven directly). Auth OK — the desktop Dev Mode server served the node without error.

## Fetch results

| Tool | File | Status | Notes |
|------|------|--------|-------|
| `get_metadata` | `01_figma_metadata.json` | OK (~27 KB) | Full node tree for the frame |
| `get_design_context` | `01_figma_context.json` | OK (~64 KB) | Core artifact: React/Tailwind code + asset URLs |
| `get_variable_defs` | `01_figma_variables.json` | EMPTY → saved as `null` | MCP returned `{}` (no bound variables on this node). Saved `null` per protocol so the token-extractor can tell "no data" from "failed". |
| `get_screenshot` | `01_figma_screenshot.png` | OK (~360 KB, image/png) | Full-frame render |
| `get_libraries` | — | NOT AVAILABLE | This Dev Mode MCP server does not expose `get_libraries` (only metadata / design_context / variable_defs / screenshot / figjam). Not a failure — the tool simply isn't offered. |

## What this frame is

- Frame name: **"Online"** — a teacher-training / course **listing page** (top-level frame `819:18444`).
- **Dimensions: 1920 x 1994** (desktop full-page, positioned at x=13246, y=45 in the canvas).
- Breadcrumb text in the design reads `Home / Teacher training courses / Offline /` even though the frame is named "Online" — the design reuses the same layout for both online and offline variants (matches the input intent: apply to offline listing pages).

## Top-level sections (top → bottom)

1. **Header** (`842:19929`, instance, 1462 x 56) — site nav: logo "Bodhi / SCHOOL OF YOGA", nav items (Yoga Courses, Teacher Courses, Recorded classes, Workshops, Our Centers, About Bodhi), search icon, green "Enquire Now" pill button.
2. **Hero-Heading** (`842:19919`, 1920 x 421) — full-width hero band with:
   - Background image `image 25` (`842:19920`).
   - Breadcrumb (`Home / Teacher training courses / Offline /`).
   - H1 "**Become The Teacher You Were Meant To Be**".
   - Sub copy "World-class yoga teacher training and mindful practice for aspiring instructors and lifelong learners."
   - Result count "**23 courses**".
   - Right-side **"Mask group"** (`964:23826`, 756 x 421): decorative star/starburst (`Star 1`) + a masked yoga-pose photo (`Magnific AI ... 1`, 404 x 410).
3. **Courses List** (`819:18202`, 1472 x 917) — the main listing region.

## Listing layout — IMPORTANT (grid, NOT list rows)

Despite the brief's "list-first / rows" expectation, this frame renders the courses as a **3-column card grid**, not list rows:

- Inner grid frame `819:18211` "Frame 1171281871" (1472 x 917) holds **4 course cards**, each **472 x 443**.
- Layout positions: card1 (0,0), card2 (500,0), card3 (1000,0) → 3 across the first row; card4 (0,474) → start of second row. So column gap ≈ 28px (500 − 472), row gap ≈ 31px (474 − 443). It is a responsive card grid, ~3 per row at 1920w.
- Each card is an `Article` (`819:18214`, etc.). The next agent should treat this as a **course-card grid**, and the "list-first" intent will need to be reconciled at build time (the Figma reference itself is a grid).

### What each course card contains (top → bottom)

- **Image / gradient header** — `Gradient` rounded-rectangle (`819:18215`, 472 x 324) acting as the card's photo + gradient overlay area (the photo fills the top ~324px of the card).
- **"Most Popular" badge** (`Group 1171281962` → vector + text `Most Popular`) — pill in the top-right of the image area. Present on **card 1 (200-Hour)** and **card 4 (Weight Loss Coach)** only; cards 2 & 3 have no badge.
- An **"online" overlay/border tag** (`Overlay+Border` frames `819:18203/18205/18207/18209`) positioned over each card image (one per card).
- **Title** (Heading 3) — e.g. "200-Hour Yoga Teacher Training Course".
- **Rating** — 5 `material-symbols:star` icons + review count text "**30 Reviews**" (every card shows 5 stars / 30 Reviews in the mock).
- **Meta row** (`Container` `819:18234`) — four inline items separated by small dot separators (3x3 rounded rects): icon + "**4 weeks**" · icon + "**Online**" · icon + "**English**" · location icon (`tdesign:location`) + "**4 Centers**".
- **CTA** — `View Program →` button (`Rectangle 161124094` pill 478 x 57 + text `819:18263`). Full-width green-ish button at the bottom of each card. Text includes a right-arrow glyph.
- **No price** is shown on these cards (no $/₹/price text found anywhere in the context). Cards convey: image, title, rating + review count, meta (duration/mode/language/centers), CTA. Pricing is not part of this listing design.

### The four courses in the mock

1. **200-Hour Yoga Teacher Training Course** — Most Popular badge.
2. **Face Yoga Teacher Training Course**.
3. **MAT Pilates Certification Course**.
4. **Weight Loss Coach Certification Course** — Most Popular badge.

(Heading text says "23 courses" total, but only 4 cards are laid out in this artboard.)

## Images / assets referenced (from design_context)

The MCP serves assets from `http://localhost:3845/assets/...` (only resolvable while the Figma desktop Dev Mode server is running).

- **5 PNGs** (card photos + hero photo). Unique:
  - `592be4e0105e7f948cc0d67b11549cf10f1f2cff.png`
  - `6b84913611354694dc186e48cb7da034f1a802e3.png`
  - `aeb7f8f75dba272ca918a1a458602e6720e7892a.png`
  - `e1f4521589a23fd74e1694150ae4bcb567efbb0e.png`
  - `f85b2ab57679d6a23310fd0eff750be91c4633f3.png`
  - (plus a star/mask PNG `10c13ac1a228a365cb98a0064b1d5afbc84887b2.png` referenced in the usage note)
- **14 unique SVGs** — icons: stars, clock (weeks), monitor (online), language/globe, `tdesign:location`, search, nav chevrons, the hero starburst, etc.
- Card photos are real yoga/class photography (people practicing in studios), per the screenshot.

## Palette hints (hex sampled from context)

`#008c6d`, `#009877`, `#1d3e59`, `#2f4a3e`, `#3fffd5`, `#424242`, `#737373`, `#8ee0ce`, `#effffb` — Bodhi greens (brand/CTA), dark slate/ink for text, mint/teal accents and pale-mint surfaces. No design **variables** were bound (variable_defs empty), so these are raw fills; the token-extractor should map them to the existing Bodhi tokens in `apps/web/src/app/globals.css` rather than treat them as new tokens.

## Notes for downstream agents

- **component-extractor:** context ready in `01_figma_context.json`. Treat the listing as a **course-card grid** (4 cards, 472x443, ~3/row). Card anatomy and exact text labels are enumerated above.
- **token-extractor:** `01_figma_variables.json` is `null` (Figma returned no bound variables). Use the hex palette above + map to existing Bodhi CSS tokens; do not invent new tokens.
- Asset URLs are `localhost:3845` and only valid while the Dev Mode server runs — download/snapshot them before the server stops if they're needed.
