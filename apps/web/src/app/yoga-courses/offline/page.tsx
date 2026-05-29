import type { Metadata } from "next";
import { Clock, Globe } from "lucide-react";

import { ListingHero } from "@/components/sections/listing-hero";
import { ListingHeroDecoration } from "@/components/sections/listing-hero-decoration";
import { LocationFilterBar } from "@/components/sections/location-filter-bar";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { getCoursesByCategoryAndMode } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Regular yoga classes| Bodhi School of Yoga",
  description:
    "Daily regular yoga classes at Bodhi centres weekday mornings and evenings for every level.",
};
                                
const COURSES = getCoursesByCategoryAndMode("yoga", "studio");

export default function OfflineYogaCoursesPage() {
  return (
    <>
      <SiteHeader tone="dark" />
      <main>
        <ListingHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Yoga courses", href: "/yoga-courses" },
            { label: "Studio" },
          ]}
          headline="Regular yoga"
          headlineAccent="classes"
          accentPosition="end"
          headlineAccentClassName="text-text-primary"
          subtitle="In-person yoga classes at a Bodhi centre — weekday mornings and evenings only."
          resultCount={`${COURSES.length} course${COURSES.length === 1 ? "" : "s"}`}
          resultCountTone="accent"
          tone="light"
          className="bg-[#EFFFFB]"
          minHeightClassName="min-h-[421px]"
          decoration={<ListingHeroDecoration />}
        />

        {/* Location filter */}
        <section className="border-t border-border-1 bg-surface-1 pt-12 pb-6">
          <div className="mx-auto max-w-[1340px] page-px">
            <LocationFilterBar />
            <p className="mt-6 text-mini uppercase tracking-widest text-text-brand">
              {COURSES.length} result{COURSES.length === 1 ? "" : "s"}
            </p>
          </div>
        </section>

        {/* Course grid */}
        <section className="bg-surface-1 py-10 md:py-14 lg:py-16">
          <div className="mx-auto max-w-[1340px] page-px">
            <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {COURSES.map((course, idx) => (
                <li key={course.slug}>
                  <ProgramCard
                    title={course.title}
                    href={`/courses/${course.slug}`}
                    imageSrc={course.listingImage}
                    imageAlt={course.title}
                    meta={[
                      {
                        icon: <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />,
                        label: course.durationLabel,
                      },
                      {
                        icon: <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />,
                        label: "English",
                      },
                    ]}
                    instructor={course.instructor}
                    cta="View Program"
                    rating={5}
                    reviewCount={30}
                    centersLabel="4 Centers"
                    featured={idx === 0}
                    price="₹4,999"
                    originalPrice="₹7,499"
                    discountLabel="30% OFF"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooterBlock />
    </>
  );
}
