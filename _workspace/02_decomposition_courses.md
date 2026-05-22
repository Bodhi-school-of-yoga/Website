# Section Decomposition — Yoga Teacher Training Courses (`1:7667`)

- **Page**: Yoga Teacher Training Courses
- **Viewport**: 1920 × 5740
- **Run ID**: courses-1-7667

## Sections (top-to-bottom)

### 1. site-header — `1:8115`
- **bbox**: 252, 20 — 1417×56
- **Purpose**: Site-wide nav bar instance (existing primitive expected)
- **Components**: `site-header` (existing-primitive)

### 2. course-hero — `1:8074`
- **bbox**: 309, 244 — 1304×479
- **Purpose**: Course landing hero
- **Headline**: "Aerial Yoga Course"
- **Breadcrumb**: "Home / Yoga courses / Online 300 hour yoga teacher training course ryt 300"
- **Tagline**: "Master the art of yoga in the air. Build strength, grace, and confidence while learning to teach this unique"
- **Meta chips**: Sat & Sun · Studio · 4:00 PM – 6:00 PM · English
- **CTA**: "Reserve Your Spot Now"
- **Image**: hero image right (node 1:8114, `imgRectangle161124051`)
- **Components**:
  - `course-hero` (new-section)
  - `course-meta-chip` (new-component)

### 3. section-nav-strip — `1:7980`
- **bbox**: -4, 900 — 1924×82
- **Purpose**: In-page section nav (sticky strip)
- **Items**: Overview (active), Highlights, Circulum, Eligibility, Overall
- **Components**: `course-section-nav` (new-component)
- **Note**: "Circulum" mis-spelled in Figma — flag editorial.

### 4. course-overview — `1:7670`
- **bbox**: 1, 982 — 1919×336
- **Purpose**: Overview narrative
- **Eyebrow**: "Overview"
- **Heading**: "Elevate Your Practice — Literally"
- **Body**:
  - "Master the art of yoga in the air with our Aerial Yoga Teacher Training Course at Bodhi School of Yoga. Build strength, grace, and confidence while learning how to teach this unique and therapeutic style of yoga using hammock."
  - "You'll combine traditional yoga postures with graceful aerial movements — learning how inversions decompress the spine, build core stability, and create a deeply healing experience for your future students."
- **Components**: `course-overview-section` (new-section)

### 5. highlights-grid — `1:7683`
- **bbox**: 1, 1315 — 1923×653
- **Purpose**: "What You'll Gain" benefit grid (6 cards, 2-col × 3-row)
- **Eyebrow**: "Highlights"
- **Heading**: "What You'll Gain"
- **Cards**:
  - Yoga Meets Flight — Combine traditional poses with graceful aerial movements.
  - Relieve & Realign — Inversions decompress the spine and boost flexibility.
  - Build Strength — Improve core stability, balance, and control.
  - Therapeutic & Fun — Enjoy emotional release through playful, healing practice.
  - Teach with an Edge — Gain a unique certification and grow your yoga career with a skill few teachers have.
  - Join a Community — Connect with passionate practitioners and expert teachers at Bodhi School of Yoga.
- **Components**:
  - `highlights-section` (new-section)
  - `highlight-card` (new-component)

### 6. curriculum — `1:8029`
- **bbox**: 309, 1968 — 1628×345
- **Purpose**: "Course Syllabus" horizontal-scroll row of 5 cards + a circular next button
- **Eyebrow**: "Curriculum"
- **Heading**: "Course Syllabus"
- **Cards**:
  - Rigging Essentials — How to safely set up and use aerial hammocks
  - Aerial Sequences — Beginner to advanced aerial yoga flows
  - Teaching Methodology — Conducting private and group aerial sessions
  - Alignment & Anatomy in the Air — How aerial postures impact muscles and joints
  - Contraindications & Safety — Modifications for common conditions
- **Components**:
  - `curriculum-section` (new-section)
  - `syllabus-card` (new-component)
  - `scroll-next-button` (new-component, shared with instructors)

### 7. eligibility — `1:7992`
- **bbox**: 0, 2313 — 2074×556
- **Purpose**: "Pre-Requisites" checklist with portrait image
- **Eyebrow**: "Eligibility"
- **Heading**: "Pre-Requisites"
- **Image**: portrait left (`imgRectangle161124055`, node 1:7994)
- **Checklist** (6 rows; only 3 unique labels per Figma):
  - Basic understanding of yoga postures (×2)
  - Physically fit to perform inversions and aerial movements (×2)
  - Willingness to explore new boundaries of body and breath (×2)
- **Components**:
  - `eligibility-section` (new-section)
  - `checklist-item` (new-component)

### 8. instructors — `1:7770`
- **bbox**: 1, 2869 — 1923×306
- **Purpose**: "Meet Your Instructor's" — 4-card row + circular next button
- **Eyebrow**: "Your Guide"
- **Heading**: "Meet Your Instructor's"
- **Instructors** (all role: "Certified Aerial Yoga Instructor · Bodhi School of Yoga"):
  - Atheesh Kumar
  - Sneha Shankar
  - VijayaRaghavan
  - Prajakta Jadhav
- **Components**:
  - `instructors-section` (new-section)
  - `instructor-card` (new-component)
  - `scroll-next-button` (shared with curriculum)

### 9. faq — `1:7821`
- **bbox**: 1, 3177 — 1923×471
- **Purpose**: FAQ accordion (4 items)
- **Eyebrow**: "FAQ"
- **Heading**: "Frequently Asked Questions"
- **Items**:
  - **Do I need prior experience in aerial yoga?** — "No prior aerial yoga experience is required. A basic understanding of yoga postures and physical fitness to perform inversions is sufficient to join this course." (open by default)
  - Is this TTC Yoga Alliance certified? (collapsed)
  - Will I get to practice on hammocks during training? (collapsed)
  - Can this course help me start my own aerial yoga classes? (collapsed)
- **Components**:
  - `faq-section` (new-section)
  - `faq-item` (existing-primitive — confirm Accordion exists)

### 10. popular-courses — `1:7851`
- **bbox**: 315, 3725 — 1291×617
- **Purpose**: Upsell 3-up program card grid
- **Eyebrow**: "Top Popular Yoga Course"
- **Heading**: "Lead to more courses from us"
- **Subhead**: "Deepen your wisdom and elevate your yoga career with our specialized yoga certifications."
- **Cards**:
  - **Online Weight Loss Coach Certification** — 4 weeks · Online · English · by Janardhan Durga Prasad (JD) — View Program
  - **Online Mudra Therapy Yoga Teacher Training** — 2 weeks · Online · English · by Prarthana Patel (PP) — View Program
  - **Online MAT Pilates Instructor Certification** — 4 weeks · Online · English · by Lakshmi Yalamudi (LY) — View Program
- **Components**:
  - `popular-courses-section` (new-section)
  - `program-card` (existing-primitive — recently added in commit 1b516d0)

### 11. site-footer — `1:8116`
- **bbox**: 0, 4438 — 1920×1302
- **Purpose**: Footer block = next-steps CTA grid + brand statement + footer link grid
- **Sub-blocks**:
  - **Next-steps CTA grid** (3 cards):
    - Free Trial Session — "50 Mins Session with the option of choosing from 10 slots in a day." — Join now
    - Speak to us — "Talk to counsellor who can assess and offer recommendations" — Contact us
    - Take a Guided Path — "Our assessment will guide you take direction best suited based on your experience" — Start now
  - **Brand statement**: "Bodhi · Begin where you are." — body: "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that." — CTA: "Try a class, free"
  - **Footer columns** (existing site-footer):
    - Brand: Bodhi · "A school for teachers, a home for seekers. Practice, taught honestly." · bodhischoolofyoga.com
    - **School**: Teacher Training, Workshops, Classes, Faculty, Lineage
    - **Visit**: The Practice Room, / 2nd floor, Quiet Lane / City · India / Get directions →
    - **Stay close**: Newsletter, Instagram, YouTube, Email us
  - **Legal**: "© Bodhi School of Yoga · Yoga Alliance Registered School (RYS-200, RYS-300)"
  - **Tagline**: "Designed quietly. Practised daily."
- **Components**:
  - `next-steps-cta-grid` (new-component)
  - `footer-brand-cta` (new-component)
  - `site-footer` (existing-primitive — repo has `apps/web/src/components/site-footer.tsx`)

## Component summary

| Proposed name | Kind | Repeats |
|---|---|---|
| site-header | existing-primitive | 1 |
| course-hero | new-section | 1 |
| course-meta-chip | new-component | 4 |
| course-section-nav | new-component | 1 |
| course-overview-section | new-section | 1 |
| highlights-section | new-section | 1 |
| highlight-card | new-component | 6 |
| curriculum-section | new-section | 1 |
| syllabus-card | new-component | 5 |
| scroll-next-button | new-component | 2 (curriculum + instructors) |
| eligibility-section | new-section | 1 |
| checklist-item | new-component | 3–6 |
| instructors-section | new-section | 1 |
| instructor-card | new-component | 4 |
| faq-section | new-section | 1 |
| faq-item | existing-primitive (confirm) | 4 |
| popular-courses-section | new-section | 1 |
| program-card | existing-primitive | 3 |
| next-steps-cta-grid | new-component | 1 |
| footer-brand-cta | new-component | 1 |
| site-footer | existing-primitive | 1 |

**Totals**: 11 sections · 21 component specs (8 new-section, 9 new-component, 4 existing-primitive).

## Uncertainties / blockers

1. "Circulum" mis-spelling in section nav strip — editorial flag.
2. Eligibility/curriculum frames overlap on Y axis at ~2313 — confirm visual stacking from screenshot before building.
3. Eligibility checklist has 6 rows but only 3 unique labels (duplicated). Likely designer copy-paste.
4. Two off-canvas "Business of Aerial Yoga" cards at x>1867 in node `1:7753` — possibly carousel overflow; ignore unless visible.
5. Body-text in course-overview is overflowed in Figma (1273w in a 441w column). Treat as constrained block.
6. Instructor heading "Meet Your Instructor's" has spurious apostrophe — flag editorial.
7. FAQ items 2–4 have no answer text in Figma — placeholders TBD.
