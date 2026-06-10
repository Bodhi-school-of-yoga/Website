import type { Metadata } from "next";
import { Clock, Globe, Monitor } from "lucide-react";

import { OnlineOfflineHero } from "@/components/sections/online-offline-hero";
import { LocationFilterBar } from "@/components/sections/location-filter-bar";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { courseHref, fetchCoursesByCategoryAndMode, getDiscountLabel } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Studio Advanced Yoga Certifications | Bodhi School of Yoga",
  description:
    "In-studio advanced yoga teacher training — immersive, residential-style learning at a Bodhi centre.",
};

export default async function StudioAdvancedCertificationsPage() {
  const COURSES = await fetchCoursesByCategoryAndMode("advanced", "studio");
  return (
    <>
      <SiteHeader tone="dark" solidBg />
      <main>
        <OnlineOfflineHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Advanced Certifications", href: "/advanced-certifications" },
            { label: "Offline" },
          ]}
          headline="Offline Advanced Certifications"
          subtitle="Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          resultCount={`${COURSES.length} course${COURSES.length === 1 ? "" : "s"}`}
          backgroundImage="/Offline.png"
          backgroundAlt="Group yoga class at Bodhi studio"
          features={[
            { icon: "/icon/off1.svg", label: "Expert-Led Sessions", description: "Learn from certified instructors" },
            { icon: "/icon/off2.svg", label: "Small Class Sizes", description: "Personalized attention in every session" },
            { icon: "/icon/off3.svg", label: "Flexible Schedules", description: "Morning, evening & weekend batches" },
            { icon: "/icon/off4.svg", label: "Community Vibes", description: "Connect, grow & stay inspired" },
          ]}
        />

        {/* Location filter */}
        <section className=" bg-surface-1 pt-12 pb-6">
          <div className="mx-auto max-w-[1200px] page-px">
            <LocationFilterBar />
            <p className="mt-6 text-mini uppercase tracking-widest text-text-brand">
              {COURSES.length} result{COURSES.length === 1 ? "" : "s"}
            </p>
          </div>
        </section>

        {/* Course grid */}
        <section className="bg-surface-1 py-10 md:py-14 lg:py-16">
          <div className="mx-auto max-w-[1200px] page-px">
            <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {COURSES.map((course, idx) => (
                <li key={course.slug}>
                  <ProgramCard
                    title={course.title}
                    href={courseHref(course)}
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
                    price={course.price ?? ""}
                    originalPrice={course.originalPrice}
                    discountLabel={getDiscountLabel(course)}
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
