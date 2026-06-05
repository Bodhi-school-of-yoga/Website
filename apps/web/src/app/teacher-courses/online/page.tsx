import type { Metadata } from "next";

import CourseGridSection from "@/components/sections/course-grid-section";
import { OnlineOfflineHero } from "@/components/sections/online-offline-hero";
import { type PopularCourse } from "@/components/sections/popular-courses-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { courseHref, getCoursesByCategoryAndMode, getDiscountLabel } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Online Yoga Teacher Training Courses | Bodhi School of Yoga",
  description:
    "200-Hour YTT, Face Yoga, MAT Pilates and Weight-Loss Coach certifications — live online with senior Bodhi faculty.",
};

const COURSES: PopularCourse[] = getCoursesByCategoryAndMode("teacher", "online").map(
  (c, idx) => ({
    title: c.title,
    image: c.listingImage,
    meta: [
      { icon: "clock", label: c.durationLabel },
      { icon: "monitor", label: "Online" },
      { icon: "globe", label: "English" },
    ],
    instructor: c.instructor,
    ctaLabel: "View Program",
    ctaHref: courseHref(c),
    rating: 5,
    reviewCount: 30,
    featured: idx === 0,
    price: c.price ?? "",
    originalPrice: c.originalPrice,
    discountLabel: getDiscountLabel(c),
  }),
);

export default function OnlineCoursesPage() {
  return (
    <>
      <SiteHeader tone="dark" solidBg />
      <main>
        <OnlineOfflineHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Teacher Training Courses", href: "/teacher-courses" },
            { label: "Online" },
          ]}
          headline="Become The Teacher You Were Meant To Be"
          subtitle="World-class yoga teacher training and mindful practice for aspiring instructors and lifelong learners."
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
        <CourseGridSection courses={COURSES} />
      </main>
      <SiteFooterBlock />
    </>
  );
}
