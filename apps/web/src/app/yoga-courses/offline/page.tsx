import type { Metadata } from "next";
import { Clock, Globe } from "lucide-react";

import { ListingHero } from "@/components/sections/listing-hero";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { getCoursesByCategoryAndMode } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Studio Yoga Courses | Bodhi School of Yoga",
  description:
    "Daily regular yoga classes at Bodhi centres — weekday mornings and evenings for every level.",
};

const COURSES = getCoursesByCategoryAndMode("yoga", "studio");

export default function OfflineYogaCoursesPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <ListingHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Yoga courses", href: "/yoga-courses" },
            { label: "Studio" },
          ]}
          headline="Studio Yoga"
          headlineAccent="Courses"
          accentPosition="end"
          subtitle="In-person yoga classes at a Bodhi centre — weekday mornings and evenings only."
          resultCount={`${COURSES.length} course${COURSES.length === 1 ? "" : "s"}`}
          resultCountTone="inverse"
          contentAlign="center"
          minHeightClassName="min-h-[421px]"
          backgroundImage="/images/hero/yoga-courses-listing.png"
          backgroundAlt="Yoga instructor guiding three students through side-stretch poses in a sunlit studio"
        />

        <section className="bg-surface-1 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
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
