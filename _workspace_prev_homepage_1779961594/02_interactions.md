# Homepage Interaction Spec (node 1:32)

**Library:** framer-motion (entrance + stagger) + Tailwind (hover/press)
**Tone:** Calm, slow, gentle. No bounce, no spring. House easing `[0.22, 1, 0.36, 1]` at ~0.5s.
**Reduced motion:** Drop translate, set duration 0, pause marquee.

## Motion vocabulary
- `fade-in-up` / `fade-in-up-soft` — entrance with subtle rise (16/12px, 0.5s)
- `fade-in` — opacity-only entrance for large images and logos
- `stagger-children` — 0.08s step
- `hover-lift-card` / `hover-lift-card-dark` — 2px lift + soft shadow on hover
- `hover-lift-button` + `press-scale` — CTA buttons
- `link-arrow-shift` + `hover-underline-link` — text-link CTAs
- `image-zoom-soft` — 1.03 image scale inside card on hover
- `marquee-loop` — 45s linear infinite, motion-reduce safe

## Per-section spec

### HeroSection — SKIP (reuse-as-is)
Not modified.

### SanskritMarqueeStrip
- Continuous horizontal `marquee-loop` on the track (Tailwind/CSS keyframe).
- Render items twice for seamless wrap.
- No hover, no entrance, no actions.

### FounderQuoteSection
- Scroll-in stagger: eyebrow → quote → attribution (left column).
- Portrait image fades only (no translate).
- No interactive elements.

### WhyBodhiSection
- Left photo fades in quietly.
- Right column staggers: heading → intro → pillars title → pillars list (each bullet) → CTA.
- CTA link `Learn More` → `/about` with arrow-shift + underline hover.

### ProgramsGridSection (dark band)
- Per rail: header fades up, then 3 cards stagger in.
- Each rail animates independently (whileInView on the rail row).
- Rail 0 "More Courses" → `/teacher-courses`.
- Rail 1 "More Courses" → `/yoga-courses`.

### ProgramCard
- `hover-lift-card-dark` + inner `image-zoom-soft` + arrow nudge via group hover.
- 6 cards × `view_program` link → **UNRESOLVED** hrefs (all `#` in decomposition).

### AccreditationsSection
- Header staggers, then logo card fades up, then individual logos fade (no translate — feels respectful).
- No interactivity (logos are non-clickable per Figma).

### TestimonialsSection
- Header staggers, then 3 cards stagger at 0.1s steps.
- TestimonialCard: static once revealed. No hover, no click — keeps quotes feeling still.

### FinalCtaSection
- Stagger: eyebrow → heading → body → CTA.
- CTA `Try a class, free` → `/contact` with hover-lift-button + press-scale.

### SiteFooterBlock
- No entrance animation (footer is the bottom — feels settled, not surprised).
- All column links: `hover-underline-link`.
- Email link resolved (`mailto:`). Get-directions / newsletter / Instagram / YouTube **UNRESOLVED**.

## Unresolved hrefs (5)
1. **ProgramCard.view_program** × 6 cards — all `#`. Need real slug routes.
2. **SiteFooterBlock.get_directions** — needs Google Maps URL.
3. **SiteFooterBlock.newsletter** — needs page/modal/Mailchimp URL.
4. **SiteFooterBlock.instagram** — needs Bodhi IG URL.
5. **SiteFooterBlock.youtube** — needs Bodhi YT URL.

## Implementation hints
- Reuse `apps/web/src/components/ui/reveal-on-scroll.tsx` for single-block fades.
- Add `@keyframes marquee` to `apps/web/src/app/globals.css` if missing.
- Use Tailwind `group`/`group-hover:` for card-wide hover that animates inner pieces.
- ProgramCard sits on dark — use `hover-lift-card-dark` (heavier shadow), not the light variant.
