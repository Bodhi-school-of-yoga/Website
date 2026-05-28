# Homepage Decomposition — Bodhi (Figma `1:32`)

- **Target node:** `1:32` (Homepage)
- **Page-relative viewport:** 1920 × 7008 (Figma absolute origin x=4200, y=5169)
- **Background:** Light cream / warm white throughout, with one dark band for the closing CTA + footer at the bottom.

## Section order (top → bottom)

| # | Section id (file-friendly) | Figma node | bbox (page-rel) | Type | Notes |
|---|---|---|---|---|---|
| 1 | `site-header` | `1:90` | x=228 y=20 w=1464 h=56 | existing-primitive | Header instance overlaid on hero. Shared component — do not redesign. |
| 2 | `hero-section` | `1:33` (+ `1:35`, `75:3228`, `1:83`) | x=0 y=0 w=1920 h=1175 | new-section | Eyebrow, H1 'Yoga for Self. Yoga for Teaching', body paragraph, devanagari wash, right-side rounded portrait card. |
| 3 | `what-we-offer-section` | `1:591` | x=223 y=859 w=1475 h=163 | new-section | Floats on top of hero bottom. 4 category cards with arrow CTAs. |
| 4 | `sanskrit-marquee` | `1:53` | x=0 y=1102 w=1920 h=73 | existing-primitive | 8-limbs marquee strip (Yama, Niyama, Āsana, Prāṇāyāma, Pratyāhāra, Dhāraṇā, Dhyāna, Samādhi). Reuse `sanskrit-marquee-strip.tsx`. |
| 5 | `our-practice-quote-section` | `1:39` | x=0 y=1175 w=1920 h=477 | new-section | Acharya Ashok pull-quote with circular portrait (355×355). |
| 6 | `why-bodhi-section` | `607:8414` | x=316 y=1763 w=1202 h=832 | existing-primitive | Reuse `why-bodhi-section.tsx`. Image-left + H2/intro/sub-H3/bulleted-list/Learn-More layout. |
| 7 | `courses-band` | `1:226` (bg) + `607:8415` (content) | x=0 y=3218 w=1920 h=1403 | new-section | Cream-colored full-bleed band containing TWO course-row sub-sections: 'Yoga Teacher Training Courses' (3 cards) and 'Regular yoga Courses' (3 cards), each with a 'More Courses' button. Cards reuse `ui/course-card.tsx`. |
| 8 | `accreditations-section` | `1:129` | x=120 y=4691 w=1681 h=663 | existing-primitive | 'We are recognised across the world'. 4×2 logo grid (8 logos) with dividers. Reuse `accreditations-section.tsx`. |
| 9 | `testimonials-section` | `1:557` | x=240 y=5569 w=1441 h=499 | existing-primitive | 'What our clients say'. 3 testimonial cards. Reuse `testimonials-section.tsx` + `ui/testimonial-card.tsx`. |
| 10 | `closing-cta-footer` | `1:619` | x=0 y=6192 w=1920 h=906 | existing-primitive | Dark band: closing CTA ('Begin where you are.' + 'Try a class, free' button) + 4-column site footer + copyright row. Reuse `closing-cta-section.tsx` + shared `site-footer`. Do not redesign defaults. |

## Per-section content props (verbatim Figma copy)

### 1. site-header (`1:90`)
- Instance — no overrides.

### 2. hero-section (`1:33`)
- eyebrow: `बोधि  ·  The awakening`
- headline: `Yoga for Self. Yoga for Teaching`
- body: `Discover a premium yoga and wellness experience offering teacher training, regular practice, and therapy sessions through immersive online and offline programs.`
- assets: `hero-bg.png`, `hero-portrait.png` (right rounded card 865×952)

### 3. what-we-offer-section (`1:591`)
- eyebrow: `what we offer`
- cards (4):
  1. `yoga teacher training` — *I want to teach Yoga & Pillate*
  2. `daily yoga classes` — *I want to learn Yoga & Pillate*
  3. `wellness workshops` — *Looking for short Workshops*
  4. `Yoga Therapies` — *Looking for relief from lifestyle diseases*
- Each card has a 44×44 round arrow button. Hrefs inferred — confirm with content team. Subtitle has 'Pillate' typo (should be 'Pilates').

### 4. sanskrit-marquee (`1:53`)
- items: `["Yama", "Niyama", "Āsana", "Prāṇāyāma", "Pratyāhāra", "Dhāraṇā", "Dhyāna", "Samādhi"]`
- Content overflows the 1920px frame (Figma shows 2770w) — implies horizontal auto-scroll marquee.

### 5. our-practice-quote-section (`1:39`)
- eyebrow: `Our practice`
- quote: `When a woman is empowered through yoga, her entire family, community, and future generations benefit.`
- attribution: `—Acharya Ashok, Founder`
- portrait: `acharya-ashok.png` (355×355 rounded, right side)

### 6. why-bodhi-section (`607:8414`)
- heading: `Why Bodhi School of Yoga?`
- intro: `Founded in 2014 by Acharya Ashok, Bodhi School of Yoga was created with a simple yet powerful vision: to help people reconnect with themselves through yoga, wellness, and inner awareness. Over the years, Bodhi has evolved into more than a yoga school. It is a space where individuals cultivate balance, clarity, and deeper well-being, whether for personal transformation or as a meaningful path to becoming a yoga teacher. At the heart of the mission is the empowerment of women through yoga.`
- sub-headline: `We Empower Women to Heal, Lead, and Rise`
- sub-sub-headline: `Physically, emotionally, and spiritually, through the transformative wisdom of yoga.`
- list label: `What We Stand For`
- bullets (5):
  - Making yoga accessible, inclusive, and empowering for every woman
  - Offering internationally aligned teacher training programs designed with women's unique journeys in mind
  - Creating a safe and supportive space for healing, leadership, and sisterhood
  - Helping women grow personally, professionally, and spiritually
  - Building a global community of empowered yoginis spreading holistic well-being
- cta: `Learn More →` (likely → `/about`)

### 7. courses-band (`1:226` + `607:8415`)
Two stacked course rows on one band.

**Row 1 — `Yoga Teacher Training Courses`** (eyebrow: `Yoga Teacher Training`):
1. `Pranayama & the nervous system` — 4 weeks · Online · English — *View Program →*
2. `300 Hour Yoga Teacher Training Course — Online` — 4 weeks · Online · English — *View Program →*
3. `Face Yoga Teacher Training Course` — 4 weeks · Online · English — *View Program →*
- More Courses button below row.

**Row 2 — `Regular yoga Courses`** (eyebrow: `Teacher Training` — likely typo, flag):
1. `Pranayama & the nervous system` — 4 weeks · Online · English — *View Program →*
2. `300 Hour Yoga Teacher Training Course — Online` — 4 weeks · Online · English — *View Program →*
3. `Face Yoga Teacher Training Course` — 4 weeks · Online · English — *View Program →*
- More Courses button below row.

All cards have an `online` overlay badge in the top-left of the image.

### 8. accreditations-section (`1:129`)
- eyebrow: `A Path to Wellness`
- title: `We are recognised across the world`
- 4×2 logo grid (8 items): Yoga Alliance USA, AIVETC, Jyotish Yoga Sastra University (+ RYS-300), RYS-300 mark, Ministry of Ayush, Yoga Certification Board, Professional Quality Management Services (+ RYS-200), RYS-200 mark.

### 9. testimonials-section (`1:557`)
- eyebrow: `A Path to Wellness`
- title: `What our clients say`
- 3 testimonials:
  - Aanya — TTC Cohort 11. Now teaching in Goa.
  - Ravi — workshop participant
  - Lena — online student, 2 years

### 10. closing-cta-footer (`1:619`)
**Closing CTA:**
- brand: `Bodhi`
- headline: `Begin where you are.`
- body: `Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.`
- cta: `Try a class, free`

**Footer (4 columns):**
- Brand: `Bodhi` · *A school for teachers, a home for seekers. Practice, taught honestly.* · `bodhischoolofyoga.com`
- **School:** Teacher Training, Workshops, Classes, Faculty, Lineage
- **Visit:** The Practice Room, 2nd floor, Quiet Lane, City  · India · `Get directions →`
- **Stay close:** Newsletter, Instagram, YouTube, Email us
- Bottom row: `© Bodhi School of Yoga  ·  Yoga Alliance Registered School (RYS-200, RYS-300)` | `Designed quietly. Practised daily.`

## Reuse map (for codebase-scout)

| Section | Reuse candidate(s) | Action |
|---|---|---|
| site-header | shared `site-header` | reuse as-is; project rule forbids redesign |
| hero-section | `sections/hero-section.tsx`, `marketing-hero.tsx` | revise existing hero — currently modified per `git status` |
| what-we-offer-section | `next-steps-cta-grid.tsx`, `what-we-do-section.tsx` | likely needs new component but check pattern overlap |
| sanskrit-marquee | `sanskrit-marquee-strip.tsx` | reuse — only `items` prop |
| our-practice-quote-section | `founder-quote-section.tsx`, `trainers-pull-quote-band.tsx` | reuse if API fits; else new section |
| why-bodhi-section | `why-bodhi-section.tsx` | reuse — currently modified per `git status` |
| courses-band rows | `popular-courses-section.tsx`, `course-grid-section.tsx`, `programs-grid-section.tsx`, `ui/course-card.tsx` | likely reuse course-card; band wrapper may be new |
| accreditations-section | `accreditations-section.tsx` | reuse |
| testimonials-section | `testimonials-section.tsx`, `ui/testimonial-card.tsx` | reuse |
| closing-cta-footer | `closing-cta-section.tsx`, layout `site-footer` | reuse — do NOT mutate defaults; add additive props if needed |

## Uncertainties (forward to next step)

1. **What-we-offer hrefs** — not specified in Figma. Inferred from titles.
2. **Course-row 2 eyebrow** — Figma says `Teacher Training`, but H2 is `Regular yoga Courses`. Likely typo.
3. **Copy typo** — 'Pillate' appears in 'what we offer' subtitles. Should be 'Pilates'.
4. **Section 5 ↔ Section 4 overlap** — `our-practice-quote-section` starts at y=1175, same as the marquee's bottom (y=1102+73). They sit flush. Verify with screenshot.
5. **Hero card (`75:3228`)** — standalone rounded-rectangle sibling; interpreted as the right-side portrait card of the hero rather than a separate section.
6. **Multiple 'A Path to Wellness' eyebrows** — same eyebrow string appears on accreditations AND testimonials. Could be intentional brand pattern (small recurring tag) — keep both.

## File outputs
- `/Users/anukul/Desktop/bodhi/_workspace/02_decomposition.json`
- `/Users/anukul/Desktop/bodhi/_workspace/02_decomposition.md`
