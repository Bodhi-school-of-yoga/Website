import type { Metadata } from "next";

import { ClosingCtaSection } from "@/components/sections/closing-cta-section";
import { RecordedCoursesHero } from "@/components/sections/recorded-courses-hero";
import { CourseCard } from "@/components/ui/course-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

import { PRE_RECORDED_COURSES } from "./courses";

export const metadata: Metadata = {
  title: "Pre-recorded courses | Bodhi School of Yoga",
  description:
    "Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.",
};

const SHARED_STATS: { value: string; label: string }[] = [
  { value: "25", label: "Videos" },
  { value: "8h", label: "Content" },
  { value: "∞", label: "Access" },
];

const COURSES = PRE_RECORDED_COURSES.map((c) => ({
  title: c.title,
  image: c.image,
  description: c.description,
  href: `/pre-recorded-courses/${c.slug}`,
}));

export default function PreRecordedCoursesPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <RecordedCoursesHero
          backgroundImage="/images/pre-recorded/hero-bg.png"
          backgroundAlt="Bodhi students practising in a sunlit studio"
          eyebrow={`${COURSES.length} Courses`}
          title="Pre Recorded Courses"
          subtitle="Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
        />

        <section className="relative z-10 page-px -mt-16 sm:-mt-24 lg:-mt-[130px] pb-12 lg:pb-16">
          <div className="mx-auto flex w-full max-w-[1340px] flex-col gap-[30px]">
            {COURSES.map((course) => (
              <CourseCard
                key={course.title}
                variant="workshop"
                image={course.image}
                title={course.title}
                description={course.description}
                stats={SHARED_STATS}
                price="₹499"
                originalPrice="₹999"
                taxNote="incl. taxes"
                ctaLabel="Purchase Now"
                ctaHref={course.href}
                cardHref={course.href}
                className="w-full max-w-[1308px] mx-auto"
              />
            ))}
          </div>
        </section>

        <ClosingCtaSection
          eyebrow="Bodhi"
          headingLead="Begin where"
          headingAccent="you are."
          subhead="Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
          primaryCta={{
            label: "Try a Class, Free",
            href: "/enquire?intent=try-a-class",
          }}
          theme="dark"
        />
      </main>
      <SiteFooterBlock />
    </>
  );
}
