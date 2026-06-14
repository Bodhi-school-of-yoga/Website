import type { Metadata } from "next";
import { Clock, Globe } from "lucide-react";

import { OnlineOfflineHero } from "@/components/sections/online-offline-hero";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { courseHref, getCoursesByCategoryAndMode, getDiscountLabel, getDisplayPrice } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Online Yoga Courses | Bodhi School of Yoga",
  description:
    "Live online yoga classes — daily practice, happy weight-loss, and advanced yoga + mat-pilates classes for every level.",
};

const COURSES = getCoursesByCategoryAndMode("yoga", "online");

export default function OnlineYogaCoursesPage() {
  return (
    <>
      <SiteHeader tone="dark" solidBg />
      <main>
        <OnlineOfflineHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Yoga Courses", href: "/yoga-courses" },
            { label: "Online" },
          ]}
          headline="Online Yoga, Anywhere"
          subtitle="Practice from the comfort of your home. Live classes, expert guidance, real transformation."
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
                    imageClassName={
                      course.slug === "daily-regular-yoga-online" ? "object-top" : undefined
                    }
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
                    featured={idx === 0}
                    price={getDisplayPrice(course)}
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
