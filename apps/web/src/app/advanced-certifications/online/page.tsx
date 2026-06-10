import type { Metadata } from "next";
import { Clock, Globe, Monitor } from "lucide-react";

import { OnlineOfflineHero } from "@/components/sections/online-offline-hero";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { courseHref, fetchCoursesByCategoryAndMode, getDiscountLabel } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Online Advanced Yoga Certifications | Bodhi School of Yoga",
  description:
    "Advanced yoga teacher training, pre-natal, children's yoga, and postgraduate Yoga Science programmes — live online.",
};

export default async function OnlineAdvancedCertificationsPage() {
  const COURSES = await fetchCoursesByCategoryAndMode("advanced", "online");
  return (
    <>
      <SiteHeader tone="dark" solidBg />
      <main>
        <OnlineOfflineHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Advanced Certifications", href: "/advanced-certifications" },
            { label: "Online" },
          ]}
          headline="Online Advanced Certifications"
          subtitle="Accredited, women-centred advanced training rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          resultCount={`${COURSES.length} courses`}
          backgroundImage="/Online.png"
          backgroundAlt="Woman practising yoga online at home"
          features={[
            { icon: "/icon/Live.svg", label: "Live Interactive Classes", description: "Practice in real-time with expert teachers" },
            { icon: "/icon/On2.svg", label: "All Levels Welcome", description: "From beginners to advanced practitioners" },
            { icon: "/icon/On3.svg", label: "Flexible Schedule", description: "Choose classes that fit your life" },
            { icon: "/icon/On4.svg", label: "Holistic Wellness", description: "Focus on body, mind, and spirit" },
          ]}
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
