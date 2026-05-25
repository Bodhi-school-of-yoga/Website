# Contact Us — Interaction & Motion Spec

**Target:** Figma node `1:4470` → `/contact`
**Library:** `framer-motion` (already in use across Bodhi sections)
**House curve:** `cubic-bezier(0.22, 1, 0.36, 1)` — gentle ease-out, no bounce
**Defaults:** 0.5s duration, 16px slide distance, 0.08s stagger step
**Reduced motion:** `useReducedMotion()` → drop translate, zero duration (opacity stays animated only if reduced=false; if reduced=true everything is instant)

---

## ContactSection (`contact-section.tsx`)

The hero block animates on mount (above the fold). The two-column row below uses scroll-into-view to defer until in viewport.

**Hero block — mount stagger:**
- `eyebrow` — fade-in-up, delay 0s
- `title` — fade-in-up, delay 0.08s
- `subtitle` — fade-in-up, delay 0.16s

Use a single parent `motion.div` with `variants.container = { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }` and apply `variants.child` to each text node. Avoids per-element delay math.

**Two-column row — scroll-into-view:**
- `info_cards_column` — parent stagger-children
  - each `ContactInfoCard` — fade-in-up-soft (12px translate, 0.45s)
- `form_container` — fade-in-up, delay 0.1s (right column fades in as one block, not field-by-field)

Use the existing `<RevealOnScroll />` wrapper at `apps/web/src/components/ui/reveal-on-scroll.tsx` — it already encodes the house easing and reduced-motion fallback.

**No click actions on the section itself.**

---

## ContactInfoCard (`contact-info-card.tsx`)

**Motion:**
- Card-level entrance is driven by the parent stagger in ContactSection (no own scroll trigger).
- `hover-lift-card` (Tailwind, conditional on `href != null`):
  - `transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)]`
  - Only the phone + email cards are interactive. Office card (href=null) renders as a non-interactive `<div>` with no hover state.

**Actions:**
- `click` on root → `external-link` to `href` prop
  - Phone: `tel:+919870347348`
  - Email: `mailto:info@bodhischoolofyoga.com`
  - Office: no action (renders as div)

Wrap in `<a href={href}>` only when href is set, otherwise plain `<div>`.

---

## ContactForm (`contact-form.tsx`)

**Motion:**
- `input-focus` (Tailwind, all 4 inputs — already in code per user note):
  - `transition-[border-color,box-shadow] duration-200 ease-out focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:outline-none`
- `submit_button` hover: `hover-lift-button` — `-translate-y-0.5` + mint-tinted soft shadow `0_6px_16px_-8px_rgba(0,175,136,0.45)`, 200ms.
- `submit_button` press: `press-scale` — `active:scale-[0.98]`, 150ms.
- `submit_button_loading_label`: `AnimatePresence mode="wait"` cross-fades "Send Message" ↔ "Sending…" keyed on `isSubmitting`. No spinner.

**Actions:**
- `click` on submit → `submit` (async onSubmit prop, NOT navigation). Button is disabled while in-flight.

Field gap and form structure are visual concerns owned by build-planner — not in scope here.

---

## FooterBrandCta (`footer-brand-cta.tsx`)

Reuse-as-is component. Expected interactions documented here for QA verification — do not rebuild if existing matches.

**Motion:**
- Whole section: `fade-in-up` on scroll-into-view (wrap with RevealOnScroll if not already).
- `headline_accent` ("you are.", italic mint): fade-in-up-soft, delay 0.15s — subtle beat-after-the-rest entrance. Optional polish; skip if existing component doesn't already do this.
- `cta_pill` hover: `hover-lift-button` (same as form submit, mint-tinted shadow).
- `cta_pill` press: `press-scale`.

**Actions:**
- `click` on cta_pill → `navigate` to `/try-a-class` (per user instruction; verify page-level prop override since decomposition.json has `/classes`).

---

## SiteHeader / SiteFooterBlock

Reuse-as-is. No new spec. Existing implementations already handle nav hover-underline, mobile menu toggle, logo→/, and footer link hovers.

---

## Unresolved

| Component | Target | Issue |
|---|---|---|
| ContactForm | submit_button | No navigation — handled by async `onSubmit`. Recorded for transparency. |
| FooterBrandCta | cta_pill | Decomposition lists `cta_href='/classes'`; user says it's wired to `/try-a-class` in the existing FooterBrandCta usage. Visual-qa to confirm page-level prop. |

---

## Cheat sheet for component-builder

```ts
// Parent stagger container (ContactSection hero block + info cards column)
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// Child fade-in-up (with reduced-motion guard)
const reduce = useReducedMotion();
const child = {
  hidden: { opacity: 0.001, y: reduce ? 0 : 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};
```

For scroll-triggered blocks, prefer wrapping with the existing `<RevealOnScroll />` — it handles SSR-safe initial state, `once: true`, and reduced motion already.
