import type { Metadata } from "next";
import { Clock, Globe, Monitor } from "lucide-react";

import { ListingHero } from "@/components/sections/listing-hero";
import { ListingHeroDecoration } from "@/components/sections/listing-hero-decoration";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { courseHref, getCoursesByCategoryAndMode, getDiscountLabel } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Online Advanced Yoga Certifications | Bodhi School of Yoga",
  description:
    "Advanced yoga teacher training, pre-natal, children's yoga, and postgraduate Yoga Science programmes — live online.",
};

const COURSES = getCoursesByCategoryAndMode("advanced", "online");

export default function OnlineAdvancedCertificationsPage() {
  return (
    <>
      <SiteHeader tone="dark" />
      <main>
        <ListingHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Advanced Certifications", href: "/advanced-certifications" },
            { label: "Online" },
          ]}
          headline="Online"
          headlineAccent="Advanced Certifications"
          accentPosition="end"
          headlineAccentClassName="text-brand-primary"
          subtitle="Accredited, women-centred advanced training rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          resultCount={`${COURSES.length} courses`}
          resultCountTone="accent"
          tone="light"
          className="bg-[#EFFFFB]"
          minHeightClassName="min-h-[421px]"
          decoration={<ListingHeroDecoration />}
        />

        <section className="bg-surface-1 py-16 md:py-20 lg:py-24">
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
                        label: "Online",
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
