import type { Metadata } from "next";

import CourseGridSection from "@/components/sections/course-grid-section";
import { ListingHero } from "@/components/sections/listing-hero";
import { type PopularCourse } from "@/components/sections/popular-courses-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { getCoursesByCategoryAndMode } from "@/data/courses-catalog";

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
    ctaHref: `/courses/${c.slug}`,
    rating: 5,
    reviewCount: 30,
    featured: idx === 0,
    price: "₹9,999",
    originalPrice: "₹14,999",
    discountLabel: "33% OFF",
  }),
);

export default function OnlineCoursesPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <ListingHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Teacher training courses", href: "/teacher-courses" },
            { label: "Online" },
          ]}
          headlineAccent="Become"
          headline="The Teacher You Were Meant To Be"
          subtitle="World-class yoga teacher training and mindful practice for aspiring instructors and lifelong learners."
          resultCount={`${COURSES.length} COURSES`}
          backgroundImage="/images/hero/teacher-training-online.jpg"
        />
        <CourseGridSection courses={COURSES} />
      </main>
      <SiteFooterBlock />
    </>
  );
}
