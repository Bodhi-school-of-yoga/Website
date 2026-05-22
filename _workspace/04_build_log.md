A1 AboutHero — OK
A2 AboutStatsBar — OK
A3 AboutPillarsSection — OK
A4 AboutStorySection — OK
A5 AboutVisionMissionSection — OK
A6 CentersSection — OK
B2 OurCenters page — OK
B1 About page — OK
FIX framer-motion: testimonials-section — OK
FIX framer-motion: closing-cta-section — OK
FIX framer-motion: site-footer — OK
FIX theme: tokens added — OK
FIX theme: closing-cta-section light — OK
FIX theme: site-footer light — OK
FIX theme: vision card teal + hero H1 scaled down — OK
T1 ✓ button.tsx (extend) | variants: +mint (bg-brand-shade text-text-secondary) | sizes: +pill (rounded-full px-6 h-11) | tokens: bg-brand-shade, text-text-secondary, rounded-full
T2 ✓ no-op — feature tiles match existing default tone (Figma node 1:3978 renders all 4 tiles as `bg-white border-[#e2e2e2] opacity-82` — pure white, no mint/sand tint). CourseMetaChip default `bg-surface-1 border-border-1` already matches; file unchanged. T3 must omit the `tone` prop.
T4: OK
T2 (cross-page): OK — marketing-hero.tsx | tokens: text-mini, text-h2, text-subtext-1, text-text-brand, text-text-inverse | layout: next/image fill object-cover sizes='100vw', py-16 md:py-20 lg:py-28 xl:py-32, max-w-3xl text-center, no overlay tint, no CTA | headline color: text-text-inverse (safer default over arbitrary photography)
T3: OK
T1 (cross-page): OK — program-card.tsx | added props: variant?: 'course' | 'article' (default 'course'), modeBadge?: { label: 'Online'|'Offline'; icon?: ReactNode } | article variant: drops meta row + dashed divider + 'View Program' CTA, title -> text-text-brand-deep font-heading, whole card wrapped in Link to href | modeBadge: absolute top-3 right-3 pill, bg-surface-1 backdrop-blur rounded-full px-3 py-1 text-mini uppercase tracking-wide text-text-primary | backward-compatible: existing call sites in popular-courses-section.tsx + page.tsx unchanged
T3 ✓ course-card.tsx (lines: ~190) | imports: Button, CourseMetaChip, Image (next/image), Link (next/link), motion + useReducedMotion (framer-motion) | tokens: bg-surface-1, border-border-1, text-h5, text-subtext-2, text-text-secondary, text-text-tertiary, text-text-brand, text-mini, rounded-lg, text-h4 (price) | motion: motion.article root with whileInView viewport={{once:true,amount:0.3}}, containerVariants stagger 0.06, children fade-in-up (initial opacity:0 y:12 → opacity:1 y:0, duration 0.4 easeOut) with explicit per-child delays: image 0 / title 0.06 / body 0.12 / feature-row 0.18 / price 0.18 / cta 0.24 / caption 0.3 | reduced-motion: useReducedMotion() → renders all children at 'visible' immediately, skips variants, hover-lift CSS remains | hover-lift: transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md on root | layout: w-[1308px] h-[362px] flex, left photo w-[447px] (next/image fill object-cover priority), right column flex-1 px-10 py-6 with absolute price top-6 right-10, cta bottom-6 left-10, caption bottom-6 right-10 | CTA: <Button variant="mint" size="pill" render={<Link href={ctaHref} />}>{ctaLabel}</Button> — card surface NOT clickable, only CTA navigates | UNRESOLVED HREF: cta defaults to ctaHref='#' (real /courses/[slug]/book route TBD) — flagged in 03_build_plan.json unresolved_hrefs[0]

T4 ✓ course-card/page.tsx (28 lines) | imports: CourseCard, lucide-react (Calendar, Clock, Languages, User) | tokens: bg-surface-2, min-h-screen flex items-center justify-center p-8 | server component (no MotionConfig — CourseCard internally handles prefers-reduced-motion via useReducedMotion()) | content: title "Decoding \"What is Prana?\"", description, price ₹249, startsCaption "Starts in 3 days", ctaLabel "Book spot now", ctaHref="#" (UNRESOLVED), 4 features (Calendar/Sat & Sun, User/Studio, Clock/3 days, Languages/English) | WARN: missing asset /images/courses/prana.jpg — fallback to existing /images/programs/pranayama.jpg

T5: OK — apps/web/src/app/online-courses/page.tsx | composition: SiteHeader, MarketingHero (Yoga Teacher Training), FilterChipBar (All/Online/Offline, defaultIndex=0, centered max-w-[1340px] -mt-8 mb-4), PopularCoursesSection (6 courses, all modeBadge Online, meta clock/monitor/globe), AccreditationsSection (8 logos), WhyBodhiSection (defaults), ClosingCtaSection (3 cards), TestimonialsSection (3 items, heading="What our clients say"), SiteFooter | metadata exported | server component (FilterChipBar handles its own use client) | inlined data arrays at module scope (TESTIMONIALS, ACCREDITATIONS, COURSES, CLOSING_CTA_CARDS, FOOTER_*) | no inline hex | tsc clean
T7: OK
T6: OK
T8: OK
