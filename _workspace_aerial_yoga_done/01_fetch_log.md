# Figma Fetch Log

## Target
- **File key:** `eqaofBeNUhOUISevtRfOpT`
- **Primary node:** `218:30509` — "Yoga Teacher Training Courses – Mobile" (Aerial Yoga Course detail page, mobile breakpoint)
- **File path:** Bodhi-landing-page-web-handoff
- **Page:** "🖌️ Final Designs" (page id `0:1`)
- **Date:** 2026-05-23

## Auth
- `whoami`: OK — `tech@wokay.com` (Wokay Design Lab, pro tier). Auth check passed.

## Viewport / frame dimensions
| Breakpoint | Node ID | Name | Width × Height | Canvas position |
|---|---|---|---|---|
| Mobile (authored) | `218:30509` | Yoga Teacher Training Courses – Mobile | **390 × 6885** | x=13149, y=10000 |
| Desktop (discovered sibling) | `1:7667` | Yoga Teacher Training Courses | **1920 × 5390** | x=6300, y=5169 |
| Tablet | — | not found in canvas metadata | — | — |

No frame named for ~768/820/834 width was discovered for this page. The Figma file appears to ship only desktop (1920) and mobile (390) authored boards for the Aerial Yoga Course detail. Downstream responsive plan must interpolate the tablet breakpoint.

## Section hierarchy (top-level children of `218:30509`, mobile)
| # | Node ID | Section | Width × Height |
|---|---|---|---|
| 1 | `218:30510` | Nav (logo + Enquire CTA + hamburger) | 390 × 75 |
| 2 | `218:30521` | Hero (breadcrumb, title, subtitle, 4 meta chips, primary CTA, image) | 390 × 611 |
| 3 | `222:30558` | Tabs (Overview / Highlights / Curriculum / Eligibility / Overall) — horizontally scrolling | 390 × 56 |
| 4 | `222:30569` | Overview ("Elevate Your Practice — Literally" + 2 paragraphs) | 390 × 391 |
| 5 | `222:30574` | Gain — "What You'll Gain" (6 highlight cards w/ icon) | 390 × 779 |
| 6 | `222:30607` | Syllabus — "Course Syllabus" (6 numbered cards) | 390 × 833 |
| 7 | `222:30640` | PreRequisites — "Pre-Requisites" (5 check-mark rows) | 390 × 522 |
| 8 | `222:30673` | Instructors — "Meet Your Instructor's" (4 instructor cards) | 390 × 527 |
| 9 | `222:30696` | FAQ — accordion (1 open + 3 collapsed) | 390 × 521 |
| 10 | `222:30720` | LeadMore — "Lead to more courses from us" (3 course cards) | 390 × 1231 |
| 11 | `222:30769` | CTASection — "Begin where you are." (Try a class CTA, dark) | 390 × 375 |
| 12 | `222:30775` | CtaCards — 3 light cards (Free Trial / Speak to us / Take a Guided Path) | 390 × 540 |
| 13 | `222:30791` | Footer (Bodhi logo, link cols, copyright) | 390 × 424 |

## Files written (all under `/Users/anukul/Desktop/bodhi/_workspace/`)
| File | Source tool | Size | Notes |
|---|---|---|---|
| `01_figma_metadata.json` | `get_metadata` (node 218:30509) | ~3.4k | Trimmed XML + section-level summary + sibling breakpoint pointer |
| `01_figma_context.json` | `get_design_context` (node 218:30509) | ~77k | Full Tailwind/React reference output (mobile) — saved as-is from MCP tool-result file |
| `01_figma_context_desktop.json` | `get_design_context` (node 1:7667) | ~145k | Full Tailwind/React reference output (desktop sibling) — saved as-is |
| `01_figma_variables.json` | `get_variable_defs` (node 218:30509) | <1k | MCP returned `{}` — no variables attached. Colors are inlined hex in the context payload. |
| `01_figma_screenshot.png` | `get_screenshot` (node 218:30509, maxDim 1200) | ~52k | Mobile authored breakpoint (rendered 68 × 1200, original 390 × 6885) |
| `01_figma_screenshot_desktop.png` | `get_screenshot` (node 1:7667, maxDim 2000) | ~344k | Desktop authored breakpoint (rendered 713 × 2000, original 1920 × 5390) |

## What was NOT fetched
- **Tablet variant** — no node found in the canvas metadata.
- **`01_figma_screenshot_mobile.png`** — not created as a separate file because the primary node IS the mobile breakpoint (already saved as `01_figma_screenshot.png`).
- **`get_libraries`** — not called in this run (skill requested only the four core fetches above). Can be re-fetched on demand.

## Errors / warnings
- `get_design_context` for both nodes exceeded the inline token cap and was streamed to MCP tool-result files. Both files were copied verbatim into `_workspace/`. Downstream agents (component-extractor, build-planner) must read these as JSON via the standard `[{type, text}]` schema and chunk-process if needed.
- `get_variable_defs` returned `{}`. No retry needed — this is expected for nodes without bound variables. Token mapping must rely on `apps/web/src/app/globals.css` design tokens.
- Top-level canvas `get_metadata` (page `0:1`) is 662 KB — too large to read inline. Sibling breakpoint discovery was done by reading the saved MCP tool-result file with a python regex pass.

## Discovered sibling breakpoint nodeIds (for downstream stages)
- **Desktop variant of this page:** `1:7667` (1920 × 5390). Already fetched + screenshotted.
- **Tablet variant:** **none discovered.** Downstream responsive plan must derive tablet by interpolating between mobile (390) and desktop (1920) — typical Tailwind `md:` (768) and `lg:` (1024) breakpoints.

## Other nearby pages (informational — do NOT build)
These desktop artboards live near `1:7667` and may share components but are out of scope for this build:
- `1:32` Homepage 1920×8033
- `1:8326` YogaCourse (generic 300-hour YTT) 1920×6588
- `1:8910` Our Trainers 1920×4274
- `1:9681` About us 1920×5064
- `1:3968` Our Workshops 1920×3044
- `1:4207` Pre recorded courses 1920×3059
- `1:7174` Tips to become a successful yoga teacher 1920×2525

## Re-run hints
- All output files have been refreshed for node `218:30509`. Any prior cache for the previous target (`19-1436` / `226:31293`) has been overwritten or removed (`01_figma_context.tsx` and `01_figma_metadata_desktop.json` deleted).
- If component-extractor needs deeper inspection of a specific child (e.g. the Tabs frame `222:30558`), call `get_design_context` on that nodeId — partial re-runs are supported.
