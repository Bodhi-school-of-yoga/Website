# Interactions — node 1:3978 (Course Card)

**Library:** `framer-motion` (already installed in `apps/web/package.json` @ ^12.39.0)
**Figma prototype data:** none. Web-handoff file; all behavior below is **inferred from convention** for the Bodhi yoga site.
**Tone target:** calm. Durations 300–400ms, translates ≤12px, no spring bounces.

---

## CourseCard (section root, node 1:3978)

### Motion
- **Hover (Tailwind):** `hover-lift` — `transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md`. Subtle 4px lift + soft shadow. No JS.
- **Mount cascade (framer-motion, on scroll-into-view):** parent uses `stagger-children` + each target uses `fade-in-up`. Total stagger span = 300ms (within ≤300ms requirement).

| Target          | Primitive    | Delay (s) |
|-----------------|--------------|-----------|
| image           | fade-in-up   | 0.00      |
| title           | fade-in-up   | 0.06      |
| body            | fade-in-up   | 0.12      |
| feature-row     | fade-in-up   | 0.18      |
| price           | fade-in-up   | 0.18      |
| cta             | fade-in-up   | 0.24      |
| starts-caption  | fade-in-up   | 0.30      |

Scroll reveal: `whileInView` with `viewport={{ once: true, amount: 0.3 }}` — animates once when ~30% visible.

### Actions
| Target | Event | Kind     | Destination                                | Status     |
|--------|-------|----------|--------------------------------------------|------------|
| root   | click | navigate | `/courses/decoding-what-is-prana`          | unresolved |
| cta    | click | navigate | `/courses/decoding-what-is-prana/book`     | unresolved |
| cta    | hover | decorative (`press-scale-bright` Tailwind) | brightness-105 + active:scale-[0.98] | — |
| cta    | press | decorative (`press-scale-bright` Tailwind) | same                              | — |

**Conflict:** card-link + nested CTA-link is invalid HTML (`<a>` in `<a>`). Builder must pick **one**. Recommended default: CTA-only navigation, card surface is decorative.

### Implementation notes
- Component must be a Client Component (`'use client'`) because of `whileInView` + stagger.
- Wrap root in `motion.article` with `variants` + `initial="hidden" whileInView="visible"`. Children share the variants; framer resolves stagger via parent transition config.
- Hover-lift (Tailwind transform) coexists fine with `motion.div`'s `animate` (opacity + y) — different properties, no conflict.
- Respect reduced-motion: wrap with `<MotionConfig reducedMotion="user">` at app root, or branch on `useReducedMotion()`.

---

## FeatureTile (×4, nodes 1:3985 / 1:3989 / 1:3993 / 1:3997)

- **Motion:** none (covered by parent's `feature-row` fade-in-up — the whole row animates as one target, not per-tile).
- **Actions:** none. Purely decorative — icon + label.
- **Scroll reveal:** none (parent owns it).

---

## MintPillButton (existing primitive, node 1:4008)

- **Motion:** `press-scale-bright` Tailwind class — hover brightness shift + active press-scale. Only add if the existing Button primitive's `mint` variant doesn't already ship hover/press states.
- **Action:** click → navigate `/courses/decoding-what-is-prana/book` (unresolved — see below).
- **Scroll reveal:** none.

Wired by `CourseCard`; this entry documents the contract so the builder doesn't double-animate.

---

## Unresolved (orchestrator must confirm before builder runs)

1. **CourseCard root `href`** — guess `/courses/decoding-what-is-prana`. Confirm routing pattern (`/courses/[slug]`), slug spelling, and whether the whole card should be clickable at all.
2. **CourseCard cta `href`** — guess `/courses/decoding-what-is-prana/book`. Could also be `/book?course=decoding-what-is-prana`. Confirm REST-ish vs query-param checkout pattern.
3. **MintPillButton root `href`** — same destination as CTA above; depends on (2).
4. **Card-click vs CTA-click conflict** — recommended default is **CTA-only**, dropping the card-level navigate action. Confirm before build to avoid invalid nested `<a>` markup.

---

## Global notes
- This card's only framer-motion usage is the entrance stagger + fade-in-up. Hover/press are Tailwind-only — keeps the runtime cost low.
- If multiple `CourseCard`s render in a list, the parent list should **not** add its own stagger — each card stagger-reveals its own children, and stacking the two reads sluggish.
