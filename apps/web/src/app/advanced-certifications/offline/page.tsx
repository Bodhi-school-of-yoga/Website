import type { Metadata } from "next";
import { Clock, Globe, Monitor } from "lucide-react";

import { ListingHero } from "@/components/sections/listing-hero";
import { LocationFilterBar } from "@/components/sections/location-filter-bar";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { getCoursesByCategoryAndMode } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Studio Advanced Yoga Certifications | Bodhi School of Yoga",
  description:
    "In-studio advanced yoga teacher training — immersive, residential-style learning at a Bodhi centre.",
};

const COURSES = getCoursesByCategoryAndMode("advanced", "studio");

export default function StudioAdvancedCertificationsPage() {
  return (
    <>
      <SiteHeader tone="dark" />
      <main>
        <ListingHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Advanced Certifications", href: "/advanced-certifications" },
            { label: "Online", href: "/advanced-certifications/online" },
          ]}
          headlineAccent="Studio"
          headline="Advanced Certifications"
          subtitle="Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          resultCount="23 courses"
          tone="light"
          resultCountTone="accent"
          className="bg-[#EFFFFB]"
        />

        {/* Location filter */}
        <section className="border-t border-border-1 bg-surface-1 pt-12 pb-6">
          <div className="mx-auto max-w-[1340px] page-px">
            <LocationFilterBar />
            <p className="mt-6 text-mini uppercase tracking-widest text-text-brand">
              3 results
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
                        icon: <Monitor className="h-3.5 w-3.5" strokeWidth={1.75} />,
                        label: "Studio",
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
                    price="₹14,999"
                    originalPrice="₹19,999"
                    discountLabel="25% OFF"
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
