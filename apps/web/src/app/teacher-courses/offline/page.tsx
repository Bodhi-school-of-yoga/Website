import type { Metadata } from "next";

import { ListingHero } from "@/components/sections/listing-hero";
import {
  PopularCoursesSection,
  type PopularCourse,
} from "@/components/sections/popular-courses-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { getCoursesByCategoryAndMode } from "@/data/courses-catalog";

export const metadata: Metadata = {
  title: "Studio Yoga Teacher Training Courses | Bodhi School of Yoga",
  description:
    "200-Hour YTT, Aerial Yoga, and Mudgar teacher training — immersive in-studio learning at a Bodhi centre.",
};

const COURSES: PopularCourse[] = getCoursesByCategoryAndMode("teacher", "studio").map(
  (c, idx) => ({
    title: c.title,
    image: c.listingImage,
    meta: [
      { icon: "clock", label: c.durationLabel },
      { icon: "monitor", label: "Studio" },
      { icon: "globe", label: "English" },
    ],
    instructor: c.instructor,
    ctaLabel: "View Program",
    ctaHref: `/courses/${c.slug}`,
    rating: 5,
    reviewCount: 30,
    centersLabel: "4 Centers",
    featured: idx === 0,
    price: "₹14,999",
    originalPrice: "₹19,999",
    discountLabel: "25% OFF",
  }),
);

export default function OfflineCoursesPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <ListingHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Teacher training courses", href: "/teacher-courses" },
            { label: "Studio" },
          ]}
          headlineAccent="Become"
          headline="The Teacher You Were Meant To Be"
          subtitle="World-class yoga teacher training and mindful practice for aspiring instructors and lifelong learners."
          resultCount={`${COURSES.length} COURSES`}
          backgroundImage="/images/hero/teacher-training-online.jpg"
        />

        <PopularCoursesSection
          eyebrow="Yoga Teacher Training"
          heading="Studio Teacher Training Courses"
          subhead="Immersive in-studio teacher training — daily practice, live teaching, and hands-on mentorship."
          courses={COURSES}
        />
      </main>
      <SiteFooterBlock />
    </>
  );
}
