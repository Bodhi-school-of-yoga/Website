import type { Metadata } from "next";

import { ListingHero } from "@/components/sections/listing-hero";
import {
  PopularCoursesSection,
  type PopularCourse,
} from "@/components/sections/popular-courses-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Offline Yoga Teacher Training Courses | Bodhi School of Yoga",
  description:
    "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.",
};

const COURSES: PopularCourse[] = [
  {
    title: "Pranayama for the Nervous System",
    image: "/images/programs/pranayama-nervous-system.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "300 Hour Yoga Teacher Training",
    image: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Face Yoga Teacher Training",
    image: "/images/programs/face-yoga-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Weight Loss Coach Certification",
    image: "/images/programs/weight-loss-coach-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Bala Yoga Teacher Training",
    image: "/images/programs/bala-yoga-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "MAT Pilates Instructor Certification",
    image: "/images/programs/mat-pilates-teacher-training.jpg",
    meta: [
      { icon: "clock", label: "4 weeks" },
      { icon: "globe", label: "English" },
    ],
    instructor: { initials: "BS", name: "Bodhi School of Yoga" },
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
];

export default function OfflineCoursesPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <ListingHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Teacher training courses", href: "/teacher-courses" },
            { label: "Offline" },
          ]}
          headlineAccent="Become"
          headline="The Teacher You Were Meant To Be"
          subtitle="Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
          resultCount={`${COURSES.length} COURSES`}
          backgroundImage="/images/hero/figma-hero-bg.png"
        />
        <PopularCoursesSection
          eyebrow="Yoga Teacher Training"
          heading="Yoga Teacher Training Courses"
          subhead="Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          courses={COURSES}
        />
      </main>
      <SiteFooterBlock />
    </>
  );
}
