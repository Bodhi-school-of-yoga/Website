# Section Decomposition — node 1:7667 (Aerial Yoga Course page)

Frame: `1:7667` "Yoga Teacher Training Courses" · 1920 × 5390. Decomposed into 12 sections top-to-bottom by y. Repeating sub-frames collapsed into one component spec with `count: N`.

Component-kind legend:
- `existing-primitive` → expected to live in `apps/web/src/components/ui/`; codebase-scout will verify.
- `new-section` → a vertical slice of the page (one per scrollable band).
- `new-component` → a reusable sub-unit (card, chip, accordion item).

---

## 1. SiteHeader · y 20–76 · `1:8115`

Top nav bar. Figma node is an instance (Group 1171281731) — already a shared component in the Figma file, so we expect a corresponding primitive in code.

- **SiteHeader** — `existing-primitive`. No props extracted (links live in code).

---

## 2. CourseHero · y 0–900 · `1:8074`

Green-wash hero band. Two-column: text+chips+CTA left, lifestyle photo right.

- **CourseHero** — `new-section`
  - `breadcrumb`: "Home / Yoga courses / Online 300 hour yoga teacher training course ryt 300"
  - `title`: "Aerial Yoga Course"
  - `body`: "Master the art of yoga in the air. Build strength, grace, and confidence while learning to teach this unique"
  - `chips`: 4 schedule chips
  - `ctaLabel`: "Reserve Your Spot Now"
  - `heroImage`: `imgRectangle161124051` (606 × 479)
- **ScheduleChip** — `new-component` · count: 4 · `{ icon, label }` (Sat & Sun · Studio · 4:00 PM – 6:00 PM · English)
- CTA button likely reuses existing **Button** primitive.

---

## 3. SectionTabNav · y 900–982 · `1:7980`

Sticky in-page anchor nav band. Active item is `Overview`.

- **SectionTabNav** — `new-component`
  - `items`: Overview (active) · Highlights · Circulum · Eligibility · Overall
  - Typos preserved verbatim from Figma — flagged in `uncertain[]`.

---

## 4. OverviewSection · y 982–1318 · `1:7670`

White content band: eyebrow + h2 + two body paragraphs. No image.

- **OverviewSection** — `new-section`
  - `eyebrow`: "Overview"
  - `title`: "Elevate Your Practice — Literally"
  - `paragraphs`: 2 body paragraphs about Aerial Yoga TTC.

---

## 5. HighlightsSection · y 1315–1968 · `1:7683`

"What You'll Gain" — 6-card grid (2 cols × 3 rows). Each card: 52 × 52 icon tile + title + body.

- **HighlightsSection** — `new-section`
  - `eyebrow`: "Highlights"
  - `title`: "What You'll Gain"
  - `items`: 6 (Yoga Meets Flight / Relieve & Realign / Build Strength / Therapeutic & Fun / Teach with an Edge / Join a Community)
- **HighlightCard** — `new-component` · count: 6 · `{ icon, title, body }`

Icons referenced: `imgGroup1171281779`, `imgBiAlignCenter`, `imgGroup1171281781`, `imgBoxiconsLeafFilled`, `imgGrommetIconsTechnology`, `imgHealthiconsPeople`.

---

## 6. SyllabusSection · y 1965–2363 · `1:8029`

Course Syllabus — eyebrow + h2 + horizontal row of 6 topic cards with a scroller-arrow affordance. Note: Figma frame title says "IMAGE SLOTS 6–11 · Each syllabus card (400 × 260 px)" but the rendered cards in the design are text-only (294 × 148), not image cards.

- **SyllabusSection** — `new-section`
  - `eyebrow`: "Curriculum"
  - `title`: "Course Syllabus"
  - `items`: 6 (Rigging Essentials, Aerial Sequences, Teaching Methodology, Alignment & Anatomy in the Air, Contraindications & Safety, Business of Aerial Yoga)
- **SyllabusCard** — `new-component` · count: 6 · `{ title, body }`
- **ScrollerArrowButton** — `new-component` · count: 2 (also reused at Instructors)

---

## 7. EligibilitySection · y 2211–2869 · `1:7996`

Pre-Requisites — centered eyebrow+h2 with a 3-item ✓ checklist, flanked by two large lifestyle photos sitting on a tinted full-bleed band.

- **EligibilitySection** — `new-section`
  - `eyebrow`: "Eligibility"
  - `title`: "Pre-Requisites"
  - `items`: 3 (Basic understanding of yoga postures · Physically fit to perform inversions and aerial movements · Willingness to explore new boundaries of body and breath)
  - `leftImage`: `imgBackground1`, `rightImage`: `imgBackground2`
- **ChecklistItem** — `new-component` · count: 3 · `{ label }`

Each list item is duplicated in Figma (probably default + hover) — collapsed to 3 unique items. See `uncertain[]`.

---

## 8. InstructorsSection · y 2869–3175 · `1:7770`

Meet Your Instructor's — eyebrow + h2 + 4 instructor cards (avatar + name + role) + scroller arrow.

- **InstructorsSection** — `new-section`
  - `eyebrow`: "Your Guide"
  - `title`: "Meet Your Instructor's" (stylized apostrophe preserved from Figma)
  - `instructors`: 4 (Atheesh Kumar, Sneha Shankar, VijayaRaghavan, Prajakta Jadhav) — all "Certified Aerial Yoga Instructor · Bodhi School of Yoga"
- **InstructorCard** — `new-component` · count: 4 · `{ name, role, avatar }`
- Reuses **ScrollerArrowButton** from syllabus.

---

## 9. FaqSection · y 3177–3648 · `1:7821`

FAQ — eyebrow + h2 + 4-item accordion. Only the first item shows an answer in Figma.

- **FaqSection** — `new-section`
  - `eyebrow`: "FAQ"
  - `title`: "Frequently Asked Questions"
  - `items`: 4 (only Q1 has visible answer body)
- **AccordionItem** — `new-component` · count: 4 · `{ question, answer, defaultOpen }`

---

## 10. PopularCoursesSection · y 3725–4342 · `1:7851`

Cross-sell — eyebrow + h2 + body + 3 ProgramCards.

- **PopularCoursesSection** — `new-section`
  - `eyebrow`: "Top Popular Yoga Course"
  - `title`: "Lead to more courses from us"
  - `body`: "Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
  - `courses`: 3 (Online Weight Loss Coach Certification · Online Mudra Therapy Yoga Teacher Training · Online MAT Pilates Instructor Certification)
- **ProgramCard** — `existing-primitive` · count: 3 · matches `apps/web/src/components/ui/program-card.tsx` shape.

---

## 11. FooterCtaBanner · y 4484–4790 · `339:8455`

Top half of the dark footer band — centered marketing CTA.

- **FooterCtaBanner** — `new-component`
  - `brand`: "Bodhi"
  - `headline`: "Begin where you are."
  - `body`: "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
  - `ctaLabel`: "Try a class, free"

---

## 12. SiteFooter · y 5013–5304 · `339:8402`

Bottom half of the dark footer band — logo, tagline, 3 link columns, copyright.

- **SiteFooter** — `existing-primitive`
  - `brand`: "Bodhi"
  - `tagline`: "A school for teachers, a home for seekers. Practice, taught honestly."
  - `website`: "bodhischoolofyoga.com"
  - `columns`: School / Visit / Stay close
  - `copyright`: "© Bodhi School of Yoga · Yoga Alliance Registered School (RYS-200, RYS-300)"
  - `signature`: "Designed quietly. Practised daily."

---

## Uncertain / flagged

- `1:7668`, `1:7816`, `1:7993` are background rectangles folded into their owning sections, not standalone components.
- `1:7753` 'Business of Aerial Yoga' floating card is the off-screen 6th syllabus card (confirms horizontal scroll), already represented in `SyllabusSection.items`.
- Pre-req items are duplicated 2x each in Figma (default + hover); collapsed to 3 unique strings.
- SectionTabNav contains spelling errors ('Circulum', 'Overall') — preserved verbatim.
- Instructor avatar `image_refs` after the first are ordinal guesses; component-builder should re-check the design-context JSX.
- FAQ items 2–4 have no answer copy in Figma.

---

## Component summary

| Spec | Kind | Count | Notes |
|---|---|---|---|
| SiteHeader | existing-primitive | 1 | Figma instance, verify in code |
| CourseHero | new-section | 1 | |
| ScheduleChip | new-component | 4 | |
| SectionTabNav | new-component | 1 | |
| OverviewSection | new-section | 1 | |
| HighlightsSection | new-section | 1 | |
| HighlightCard | new-component | 6 | |
| SyllabusSection | new-section | 1 | |
| SyllabusCard | new-component | 6 | |
| ScrollerArrowButton | new-component | 2 | |
| EligibilitySection | new-section | 1 | |
| ChecklistItem | new-component | 3 | |
| InstructorsSection | new-section | 1 | |
| InstructorCard | new-component | 4 | |
| FaqSection | new-section | 1 | |
| AccordionItem | new-component | 4 | |
| PopularCoursesSection | new-section | 1 | |
| ProgramCard | existing-primitive | 3 | Reuse `apps/web/src/components/ui/program-card.tsx` |
| FooterCtaBanner | new-component | 1 | |
| SiteFooter | existing-primitive | 1 | Verify primitive exists |

Total: 12 sections (incl. 2 existing-primitive shells), 7 new sub-components (HighlightCard, SyllabusCard, ScrollerArrowButton, ChecklistItem, InstructorCard, AccordionItem, ScheduleChip), 1 nav (SectionTabNav), 1 banner (FooterCtaBanner). ProgramCard reused as-is.
