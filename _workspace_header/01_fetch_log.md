# Figma Fetch Log

- **Date:** 2026-05-29
- **Fetcher:** figma-fetcher
- **Source URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=842-20024&m=dev
- **file_key:** eqaofBeNUhOUISevtRfOpT
- **node_id:** 842:20024
- **MCP server:** Figma Dev Mode MCP Server v1.0.0 @ http://127.0.0.1:3845/mcp (JSON-RPC over SSE)
- **Auth:** OK — server reachable, session established, all tool calls returned `isError=None`. No `whoami` tool exposed; auth implied by successful node serving.

## Tool availability
Tools exposed by this server: `get_design_context`, `get_variable_defs`, `get_screenshot`, `get_metadata`, `get_figjam`.
There is **no `get_libraries` tool** on this MCP build, so `01_figma_libraries.json` was not produced (tool unavailable, not a failure).

## Fetch results
| Artifact | Tool | Status | Notes |
|---|---|---|---|
| 01_figma_metadata.json | get_metadata | OK | Single instance node — see below |
| 01_figma_context.json | get_design_context | OK | Full React+Tailwind reference code (~10KB) — CORE ARTIFACT |
| 01_figma_variables.json | get_variable_defs | EMPTY → saved `null` | MCP returned `{}` (no bound variables/tokens on this node) |
| 01_figma_screenshot.png | get_screenshot | OK | 7,856-byte PNG, full-frame render |

No retries were needed; every call succeeded on first attempt. No payload exceeded 500KB.

---

## What this frame IS

Node `842:20024` is **NOT the whole landing page** — it is a single component **instance named "Header"**, the site's **top navigation bar**.

- Type: `instance`
- Position: x=229, y=20
- Size: **1462 × 56** (desktop nav, full-bleed nav row inside a ~1920 canvas with side gutters)

Screenshot confirms: a horizontal nav bar on a pale mint background — wordmark on the left, primary nav links centered, search icon + mint pill CTA on the right.

> Downstream note: If the intent ("implement this Figma design as React/Tailwind components") means the full landing page, the orchestrator should re-scope to a parent frame. This node alone yields only the header/nav. The repo already has `apps/web/src/components/nav/` (incl. `nav-data.ts`) — strongly prefer extending that over building from scratch.

---

## Anatomy (top container → leaves), with exact text labels

Outer: `Header` (`842:20024`) → row container `I842:20024;1:731` — horizontal flex, `gap-80px`, `items-center`.

### 1. Brand / Logo block (`I842:20024;1:732` → `;1:733`)
Stacked wordmark, left-aligned:
- **"Bodhi"** — `I842:20024;1:735` — font **Fraunces Italic**, 32px, italic, tracking -0.355px, color black, `fontVariationSettings: 'SOFT' 0, 'WONK' 1` (Fraunces optical axes).
- **"School of yoga"** — `I842:20024;1:736` — font **Manrope SemiBold**, 12px, **uppercase**, letter-spacing 2.956px, `opacity-60`. (Renders as "SCHOOL OF YOGA".)

### 2. Primary nav links (`I842:20024;1:737` → `;353:11835` → `;1:738`)
Horizontal flex, `gap-39px`. All links: font **Instrument Sans Medium**, 17px, color black, `fontVariationSettings: 'wdth' 100`. Order left→right:
1. **"Yoga Courses"** (`;1:752`) — has dropdown caret (Arrow-Up-2 icon, rotated 180° = points down). Container width 130px.
2. **"Teacher Courses"** (`;1:740`) — has dropdown caret. (Rendered as a `<button>` with gap-8px to icon.)
3. **"Recorded classes"** (`;1:746`) — `<button>`, no caret.
4. **"Workshops"** (`;1:757`) — plain text, no caret.
5. **"Our Centers"** (`;1:759`) — plain text, no caret.
6. **"About Bodhi"** (`;1:760`) — plain text, no caret.

Note: there is an additional trailing caret node `;353:11634` (Arrow-Up-2, rotated) attached at the end of the link group — appears to be a stray/duplicate dropdown indicator in the design.

### 3. Right cluster (`I842:20024;1:761`)
Horizontal flex, `gap-10px`:
- **Search icon** — `I842:20024;1:764`, 44×44 box, SVG asset (Group 1171281692). This is the magnifier seen on the right of the nav.
- **CTA pill "Enquire Now"** — `Link` node `;1:768` containing text `;1:769`.
  - Background: **`#8ee0ce`** (mint green).
  - Shape: `rounded-[36px]`, height 44px, padding `px-32px py-15px`.
  - Text: **"Enquire Now"** — font **Instrument Sans SemiBold**, 14px, color **`#1d3e59`** (deep navy), letter-spacing 0.26px.

---

## Caret/icon detail
Dropdown carets use a shared SVG `Arrow - Up 2 - Iconly Pro` (Iconly Light set), 18×18, rendered rotated 180° so the up-arrow points **down**. Same asset reused for all carets.

---

## Assets referenced (localhost MCP asset URLs)
| Const | Where used | URL |
|---|---|---|
| `imgArrowUp2` | All dropdown carets (Yoga Courses, Teacher Courses, trailing) | `http://localhost:3845/assets/4807ab1c77a10d0c7102bd519d6ec4ec2be348d1.svg` |
| `imgGroup1171281692` | Search icon (44×44) | `http://localhost:3845/assets/bf7ac2c9994deeb36d07545791ca3c9d0789a84d.svg` |

> These URLs are served by the live local MCP server. Download them before the server stops if they're needed as committed assets. For the repo, the search/caret icons most likely already exist as lucide / existing SVGs — prefer reuse.

---

## Palette hints (from context code)
- Nav text / wordmark: **black** (`text-black`).
- "School of yoga" subtitle: black @ 60% opacity.
- CTA pill fill: **`#8ee0ce`** (mint / brand accent green).
- CTA pill text: **`#1d3e59`** (deep navy / brand primary).
- Page background behind nav (from screenshot): pale mint (not encoded as a token here — header itself is transparent; bg comes from parent frame).

## Typography hints
- **Fraunces** (Italic, optical SOFT/WONK) — display serif used for the "Bodhi" wordmark.
- **Manrope** (SemiBold) — small uppercase label "School of yoga".
- **Instrument Sans** (Medium for nav links @17px, SemiBold for CTA @14px) — UI sans.

## Variables / tokens
`get_variable_defs` returned `{}` — **no bound Figma variables on this node**. Colors above are raw hex literals in the design, not token references. Saved as `null` per protocol so token-extractor can distinguish "no data" from "fetch failed". Token-extractor may need a parent/page-level node to find the document's variable collections.

---

## Notes for downstream agents
- **component-extractor:** Core artifact is `01_figma_context.json`. The header decomposes cleanly into: `Logo` (wordmark + tagline), `NavLinks` (6 items, 2 with dropdown carets), `SearchButton`, `CtaButton ("Enquire Now")`. Repo already has `apps/web/src/components/nav/nav-data.ts` and a nav component dir — reconcile against existing structure rather than duplicating.
- **token-extractor:** This node has no variables. To extract the global token set (colors/spacing/type), re-request a page-level or design-system node id from the orchestrator. Hard-coded values seen here: mint `#8ee0ce`, navy `#1d3e59`, fonts Fraunces/Manrope/Instrument Sans.
- **Scope warning:** node 842:20024 = header only. Confirm whether the implementation task wants just the nav or the full page (which would need a different parent node id).
