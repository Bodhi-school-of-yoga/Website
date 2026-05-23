// Aerial Yoga Course detail page — composed from existing sections + the aerialYogaCourse data module.
// Anchor wiring (#overview, #highlights, #curriculum, #eligibility, #faq) pairs with the
// CourseSectionNav's IntersectionObserver + the scroll-smooth class on <html>.
import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { CourseHeroSection } from "@/components/sections/course-hero-section";
import { CourseSectionNav } from "@/components/sections/course-section-nav";
import { CourseOverviewSection } from "@/components/sections/course-overview-section";
import { HighlightsSection } from "@/components/sections/highlights-section";
import { SyllabusGridSection } from "@/components/sections/syllabus-grid-section";
import { PreRequisitesSection } from "@/components/sections/pre-requisites-section";
import { InstructorsSection } from "@/components/sections/instructors-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PopularCoursesSection } from "@/components/sections/popular-courses-section";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";

import { aerialYogaCourse } from "@/data/aerial-yoga-course";

export const metadata: Metadata = {
  title: "Aerial Yoga Course | Bodhi School of Yoga",
  description: aerialYogaCourse.hero.subtitle,
};

// Derive 2-letter initials from a full name (e.g., "Janardhan Durga Prasad" -> "JD").
function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function AerialYogaCoursePage() {
  const {
    breadcrumb,
    hero,
    tabs,
    overview,
    highlights,
    syllabus,
    preRequisites,
    instructors,
    faqs,
    relatedCourses,
    closingCta,
  } = aerialYogaCourse;

  const popularCourses = relatedCourses.courses.map((c) => ({
    title: c.title,
    image: c.image,
    meta: [
      { icon: "clock", label: c.duration },
      { icon: "monitor", label: c.format },
      { icon: "globe", label: c.language },
    ],
    instructor: {
      initials: deriveInitials(c.instructor),
      name: c.instructor,
    },
    ctaLabel: "Enrol Now",
    ctaHref: c.href,
  }));

  return (
    <main className="flex min-h-screen flex-col bg-surface-1">
      <SiteHeader tone="light" />

      <CourseHeroSection
        breadcrumb={breadcrumb}
        titleLead={hero.titleLead}
        titleAccent={hero.titleAccent}
        subtitle={hero.subtitle}
        meta={hero.meta}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
        heroImage={hero.heroImage}
      />

      <CourseSectionNav items={tabs} />

      <section id="overview" className="scroll-mt-20 lg:scroll-mt-24">
        <CourseOverviewSection
          eyebrow={overview.eyebrow}
          heading={overview.heading}
          paragraphs={overview.paragraphs}
        />
      </section>

      <HighlightsSection
        id="highlights"
        eyebrow={highlights.eyebrow}
        heading={highlights.heading}
        items={highlights.items}
      />

      <SyllabusGridSection
        id="curriculum"
        eyebrow={syllabus.eyebrow}
        heading={syllabus.heading}
        modules={syllabus.modules}
      />

      <section id="eligibility" className="scroll-mt-20 lg:scroll-mt-24">
        <PreRequisitesSection
          eyebrow={preRequisites.eyebrow}
          heading={preRequisites.heading}
          items={preRequisites.items}
          leftImage={preRequisites.leftImage}
          rightImage={preRequisites.rightImage}
        />
      </section>

      <InstructorsSection
        layout="grid"
        eyebrow={instructors.eyebrow}
        heading={instructors.heading}
        instructors={instructors.people.map((p) => ({
          name: p.name,
          role: p.role,
          avatar: p.image,
          slug: p.slug,
        }))}
      />

      <section id="faq" className="scroll-mt-20 lg:scroll-mt-24">
        <FaqSection
          eyebrow={faqs.eyebrow}
          heading={faqs.heading}
          items={faqs.items}
        />
      </section>

      <PopularCoursesSection
        eyebrow={relatedCourses.eyebrow}
        heading={relatedCourses.heading}
        subhead={relatedCourses.subhead}
        courses={popularCourses}
      />

      <ClosingCtaSection
        theme="dark"
        headingLead={closingCta.headingLead}
        headingAccent={closingCta.headingAccent}
        subhead={closingCta.subhead}
        primaryCta={closingCta.primaryCta}
        cards={closingCta.cards.map((c) => ({
          title: c.title,
          body: c.body,
          ctaLabel: c.ctaLabel,
          href: c.ctaHref,
        }))}
      />

      <SiteFooterBlock showCta={false} />
    </main>
  );
}
