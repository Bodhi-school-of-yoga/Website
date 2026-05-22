# Figma Fetch Log — node 1:7667

## Input
- File: `eqaofBeNUhOUISevtRfOpT` (Bodhi-landing-page-web-handoff)
- Node: `1:7667` — "Yoga Teacher Training Courses"
- Canvas position: x=6300, y=5169
- Canvas size: 1920 x 5390 (tall, full page-style frame)

## Fetch Results

| MCP call | Result | File |
|---|---|---|
| `get_metadata` | OK (60 KB) | `_workspace/01_figma_metadata_node-1-7667.json` |
| `get_design_context` | OK (144 KB) — exceeded inline token budget, persisted to disk | `_workspace/01_figma_context_node-1-7667.json` |
| `get_variable_defs` | Empty `{}` — frame uses raw hex/rgba, no published variables resolved | `_workspace/01_figma_variables_node-1-7667.json` |
| `get_libraries` | OK — 4 community libraries subscribed (Material 3, Simple Design System, iOS 18, iOS 26); none look load-bearing for this frame | `_workspace/01_figma_libraries_node-1-7667.json` |
| `get_screenshot` | OK — 730 x 2048 PNG (clamped from native 1920 x 5390 by maxDimension=2048) | `_workspace/01_figma_screenshot_node-1-7667.png` |

No retries were needed. No errors.

## Top-Level Structure (from metadata + context inspection)

The frame is a complete **"Yoga Teacher Training Courses" landing/program page** (the demo page for an Aerial Yoga Teacher Training course). Observed top-down section ordering:

1. **Hero band** — green wash background (`#f0fff8`, ~900px tall), program hero (title, breadcrumb "Home / Yoga courses / Online 300 hour yoga teacher training course ryt 300", short description, schedule chip "Sat & Sun · 4:00 PM – 6:00 PM", `Reserve Your Spot Now` CTA).
2. **Overview band** — white strip with eyebrow "Overview" + h2 "Elevate Your Practice — Literally" and two paragraphs about Aerial Yoga TTC.
3. **Highlights / "What You'll Gain"** — eyebrow `Highlights` + h2 `What You'll Gain`, six card grid (2 columns × 3 rows) each with an icon tile + title + body. Card titles: *Yoga Meets Flight, Relieve & Realign, Build Strength, Therapeutic & Fun, Teach with an Edge, Join a Community*.
4. **Course Syllabus** — section with `IMAGE SLOTS 6–11 · Each syllabus card (400 × 260 px)` annotation. Topics: *Rigging Essentials, Aerial Sequences, Teaching Methodology, Alignment & Anatomy in the Air, Contraindications & Safety, Business of Aerial Yoga*.
5. **Eligibility / Pre-Requisites** — bullet list (Basic understanding of yoga postures; Physically fit to perform inversions; Willingness to explore new boundaries of body and breath).
6. **Meet Your Instructors** — 4 instructor cards (Atheesh Kumar, Sneha Shankar, VijayaRaghavan, Prajakta Jadhav) each "Certified Aerial Yoga Instructor · Bodhi School of Yoga".
7. **FAQ** (`data-name="7. FAQ"`) — accordion with: *Do I need prior experience in aerial yoga? / Is this TTC Yoga Alliance certified? / Will I get to practice on hammocks during training? / Can this course help me start my own aerial yoga classes?*
8. **Top Popular Yoga Course** — cross-sell, three program cards with View Program CTA: *Online Weight Loss Coach Certification* (Janardhan Durga Prasad), *Online Mudra Therapy Yoga Teacher Training* (Prarthana Patel), *Online MAT Pilates Instructor Certification* (Lakshmi Yalamudi).
9. **Footer band** — Bodhi School of Yoga marketing footer with columns (School of yoga / Teacher Courses / Advanced Certifications / Yoga Courses / Our Centers / Enquire Now), tagline ("A school for teachers, a home for seekers. Practice, taught honestly."), address block (The Practice Room, 2nd floor, Quiet Lane, City · India), `Get directions →`, copyright `© Bodhi School of Yoga · Yoga Alliance Registered School (RYS-200, RYS-300)`, plus a "Try a class, free" callout.

## Typography & Color Tokens Spotted Inline
(Variables come back as raw hex since `get_variable_defs` was empty.)

- Font families: `Instrument Sans` (display/bold) and `DM Sans` (body/regular/semibold).
- Eyebrow style: `text-[11px]` uppercase tracking `1.8px`; colors seen: `#009877` (overview), `#005564` (highlights).
- H2 display: `Instrument Sans Bold` at `30px` / `34px`, color `#1e1410` or black.
- Body copy: `DM Sans Regular 15px / leading-27px`, color `rgba(0,0,0,0.55)` and `#7a6258`.
- Card surface: `#fdfdfd` with `#e9e9e9` border, radius `19px`, drop-shadow `rgba(231,231,231,0.25) 0 7 17`.
- Hero band background: `#f0fff8`. Icon tile background: `#e4fff9`.

## Image / Asset References (28 unique MCP asset URLs)

These short-lived URLs were embedded as `const imgX = "..."` in the design-context output. Downstream agents should download the high-quality originals before they expire (~7 days).

### Photographic / background images (priority for high-res download)
| Variable | URL |
|---|---|
| `imgBackground` (hero) | https://www.figma.com/api/mcp/asset/8074c995-271a-4d82-ae7d-9591d732bc25 |
| `imgBackground1` | https://www.figma.com/api/mcp/asset/3f9aaeb5-a8d9-41fe-9134-ad9c83c64cd3 |
| `imgBackground2` | https://www.figma.com/api/mcp/asset/82489d6b-a622-487f-b1e4-3507c5b2df32 |
| `imgBackground3` | https://www.figma.com/api/mcp/asset/0019b411-0fe7-4397-9fbe-da7489419dac |
| `imgWeightLossCoachCertification` (cross-sell card) | https://www.figma.com/api/mcp/asset/8ff97438-5d0d-470b-9341-d066924aeb45 |
| `imgMudraTherapyYogaTeacherTraining` (cross-sell card) | https://www.figma.com/api/mcp/asset/51fa0db8-471e-47cd-86a3-d74264ac49c8 |
| `imgMatPilatesInstructorCertification` (cross-sell card) | https://www.figma.com/api/mcp/asset/51cc0e63-d4cf-43ee-b014-6b62fcb086ee |
| `imgRectangle161124055` (syllabus or instructor photo) | https://www.figma.com/api/mcp/asset/bad43b90-d0ce-483c-aba7-dd562879a2c4 |
| `imgRectangle161124054` (syllabus or instructor photo) | https://www.figma.com/api/mcp/asset/27717dde-1079-4a5f-b3db-c46511a17b9a |
| `imgRectangle161124051` (syllabus or instructor photo) | https://www.figma.com/api/mcp/asset/af5d95c2-d33e-498d-ae41-a16706c8cb54 |
| `imgMaskGroup` | https://www.figma.com/api/mcp/asset/9eca635a-f30a-4319-8eff-928b50241175 |

### Icons / SVG vectors (cheap to re-fetch or inline)
| Variable | URL |
|---|---|
| `imgGroup1171281779` | https://www.figma.com/api/mcp/asset/e5086858-e685-4537-a9ee-ec4393efa8cd |
| `imgBiAlignCenter` | https://www.figma.com/api/mcp/asset/2e1814f8-649b-4e01-aa07-8c1a3d8bca56 |
| `imgGroup1171281781` | https://www.figma.com/api/mcp/asset/3f38b582-d4bc-4759-b703-200b7698b79a |
| `imgBoxiconsLeafFilled` | https://www.figma.com/api/mcp/asset/88ac0ec6-10bb-4ade-9940-4d018641fee0 |
| `imgGrommetIconsTechnology` | https://www.figma.com/api/mcp/asset/8eaae868-7c2a-4716-83ab-3eb8fc8e4c30 |
| `imgHealthiconsPeople` | https://www.figma.com/api/mcp/asset/6d47c84c-7036-43cd-9c56-476ae068ba24 |
| `imgGroup1171281795` | https://www.figma.com/api/mcp/asset/93513244-cf52-4709-a940-3cbc10ef5c2e |
| `imgSvg` | https://www.figma.com/api/mcp/asset/79cdf56a-7ecd-4041-a027-32bf55b47ab7 |
| `imgSvg1` | https://www.figma.com/api/mcp/asset/956c267b-9dfc-4bde-97f5-f3b0228570e0 |
| `imgSvg2` | https://www.figma.com/api/mcp/asset/604e057e-bf2c-4210-a4a4-ecc921d256cd |
| `imgSvg3` | https://www.figma.com/api/mcp/asset/a70ae0cf-1991-4990-9110-fc626ea9e497 |
| `imgVector` | https://www.figma.com/api/mcp/asset/67e092a3-b8ec-48f9-8ff1-c09e64c29469 |
| `imgVector1` | https://www.figma.com/api/mcp/asset/c4866a5f-133d-480e-bc99-a31c3a6565c3 |
| `imgVector2` | https://www.figma.com/api/mcp/asset/852b3b4c-460a-4d03-be71-a4589a391915 |
| `imgArrowUp2` | https://www.figma.com/api/mcp/asset/a016c3e8-73d5-409a-90da-604f9b1e1cb6 |
| `imgGroup1171281692` | https://www.figma.com/api/mcp/asset/043a28af-0688-4b5f-9c7e-3887e9272ed2 |

(28 unique URLs total, matching the `imgX` constants in the design-context payload. Variables named `imgSvg*` / `imgVector*` are almost certainly SVG icons exported as PNG.)

## Notes / Caveats for Downstream Agents

- **Design context is 144 KB and 1339 lines** of generated JSX. Agents (component-extractor, section-decomposer) should grep/jq slice rather than reading the whole file into context.
- **Variables came back empty.** All styling is inline hex/rgba. Token mapping (e.g. mapping `#009877` → `text-text-brand`, `#f0fff8` → `bg-surface-tertiary`) must be done by referencing `apps/web/src/app/globals.css` and the project DESIGN.md instead of relying on `01_figma_variables_node-1-7667.json`.
- **Screenshot is clamped to 730 × 2048**; native frame is 1920 × 5390. If pixel-perfect QA needs full resolution, re-call `get_screenshot` with `maxDimension: 5390`.
- **Cross-sell program card titles overlap existing demo content** (the Programs section already in `apps/web` was just refreshed with Figma photos at commit `93582c6`); reuse `ProgramCard` from `apps/web/src/components/ui/program-card.tsx` rather than re-building.
- **No code-connect mappings** were probed for this frame; if downstream wants to swap raw markup for already-built primitives (Button, Card, ProgramCard), it should pair this output with codebase-scout.
