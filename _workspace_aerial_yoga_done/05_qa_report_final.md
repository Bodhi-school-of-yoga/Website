# Visual QA Final — /our-trainers (round 3)

**Verdict: PASS-WITH-MINOR**

Screenshots (full-page, freshly captured):
- Mobile (390x1200 viewport, full scroll): `/Users/anukul/Desktop/bodhi/_workspace/05_qa_screenshot_mobile_v3.png`
- Desktop (1440x1024 viewport, full scroll): `/Users/anukul/Desktop/bodhi/_workspace/05_qa_screenshot_desktop_v3.png`

Figma refs (unchanged): `_workspace/01_figma_screenshot.png` (mobile), `_workspace/01_figma_screenshot_desktop.png` (desktop).

## F-003 — RESOLVED

`TrainerProfileCard` now exposes `variant: "card" | "avatar"`. `TrainersMeetAll` passes `variant="avatar"` to the `md:`+ grid (`md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6`) and keeps `variant="card"` for the mobile faculty grid.

Verified visually on `05_qa_screenshot_desktop_v3.png`:
- "Meet All Our Trainers" renders an 18-tile grid of **circular avatar portraits** (`rounded-full`, `aspect-square`), centered name + role under each.
- No border, no city, no years — matches Figma desktop reference exactly.
- 6 columns at `xl` (≥1280), confirmed at 1440 viewport.

Verified visually on `05_qa_screenshot_mobile_v3.png`:
- Mobile "Meet our faculty" grid retains the rectangular 3:4 card with name + role + years/city meta — unchanged, matches Figma mobile.

Source-level verification:
- `apps/web/src/components/ui/trainer-profile-card.tsx` lines 65–110 implement the `avatar` branch with `rounded-full`, centered text, no border, no meta row.
- `apps/web/src/components/sections/trainers-meet-all.tsx` line 78 passes `"card"` for `facultyTrainers` (mobile grid), line 87 passes `"avatar"` for `allTrainers` (md+ grid).

## Status of every prior finding

| ID | v1 sev | v2 status | v3 status | Notes |
|----|--------|-----------|-----------|-------|
| F-001 | critical | resolved | **resolved** | Single mint closing CTA band on both viewports. |
| F-002 | major    | resolved | **resolved** | Hero photographic scene visible behind headline on desktop. |
| F-003 | major    | still-open | **resolved** | Circle avatar grid renders at md+, rectangular card retained at mobile (see above). |
| F-004 | major    | reclassified — not a defect | **n/a** | Department Heads tonal tiles match Figma; already accepted in v2. |
| F-005 | minor    | reclassified — nit | **nit** | No regression; mobile hero terminates at CTA. |
| F-006 | minor    | resolved | **resolved** | Hero background image loads on desktop. |
| F-007 | minor    | still-open | **still-open** | Pull-quote desktop band still shows only the opening `"` glyph; no closing glyph after the attribution. Only outstanding minor. |
| F-008 | minor    | resolved | **resolved** | Title "Meet All Our Trainers" rendered title-cased. |
| F-009 | nit      | pass | **pass** | Interactions unchanged. |
| F-010 | nit      | pass | **pass** | Tokens unchanged (no arbitrary hex introduced by the variant change; new avatar branch uses `text-text-secondary` / `text-text-brand-deep` / `rounded-full` only). |

## New issues introduced by the v3 fix
None observed. The `avatar` variant uses semantic text tokens, no new arbitrary hex/inline styles, and the link wrapper / focus ring follow the existing `card` variant's pattern.

## Remaining work to reach full PASS
- F-007 (minor): Add a mirrored closing `"` glyph after the attribution line in `TrainersPullQuoteBand` desktop variant, or center both glyphs around the block.
