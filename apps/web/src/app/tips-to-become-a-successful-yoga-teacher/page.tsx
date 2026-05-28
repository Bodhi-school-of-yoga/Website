import type { Metadata } from "next";

import { FooterBrandCta } from "@/components/sections/footer-brand-cta";
import { ListingHero } from "@/components/sections/listing-hero";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { ProgramCard } from "@/components/ui/program-card";
import { COURSES } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Tips to Become a Successful Yoga Teacher | Bodhi School of Yoga",
  description:
    "Explore Bodhi's teacher training paths — find the right course to grow as a skilled and confident yoga teacher, whether you're just starting or expanding your career.",
};

const TEACHER_PATHS = COURSES.filter(
  (c) => c.category === "teacher" || c.category === "advanced",
);

export default function TipsToBecomeASuccessfulYogaTeacherPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <ListingHero
          breadcrumb={[]}
          eyebrow={`${TEACHER_PATHS.length} Courses`}
          headline="Tips to Become a"
          headlineAccent="Successful Yoga Teacher"
          accentPosition="end"
          subtitle="Discover essential tips, strategies, and insights to grow as a skilled and confident yoga teacher, whether you're just starting or looking to enhance your teaching career."
          backgroundImage="/images/hero/tips.jpg"
          minHeightClassName="min-h-[421px]"
          contentAlign="center"
          headlineClassName="text-[40px] leading-[1.05] font-bold sm:text-[52px] lg:text-[60px] lg:leading-[58px] tracking-[-0.0093em] lg:max-w-[1228px]"
          headlineAccentClassName="text-accent-mint"
          verticalPaddingClassName="pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-[110px] lg:pb-[90px]"
        />
        <section className="bg-surface-1 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {TEACHER_PATHS.map((course) => (
                <li key={course.slug}>
                  <ProgramCard
                    variant="article"
                    title={course.title}
                    imageSrc={course.listingImage}
                    imageAlt={course.title}
                    href={`/courses/${course.slug}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <FooterBrandCta
          brand="Bodhi"
          heading="Begin where you are."
          body="Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
          ctaLabel="Try a Class, Free"
          ctaHref="/enquire?intent=try-a-class"
        />
      </main>
      <SiteFooterBlock showCta={false} />
    </>
  );
}
