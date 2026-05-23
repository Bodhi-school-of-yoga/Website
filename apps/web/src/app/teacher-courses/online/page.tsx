import type { Metadata } from "next";

import CourseGridSection from "@/components/sections/course-grid-section";
import { ListingHero } from "@/components/sections/listing-hero";
import { type PopularCourse } from "@/components/sections/popular-courses-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Online Yoga Teacher Training Courses | Bodhi School of Yoga",
  description:
    "Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.",
};

const COURSE_META: PopularCourse["meta"] = [
  { icon: "clock", label: "4 weeks" },
  { icon: "globe", label: "English" },
];

const COURSE_INSTRUCTOR: PopularCourse["instructor"] = {
  initials: "BS",
  name: "Bodhi School",
};

const COURSES: PopularCourse[] = [
  {
    title: "Hatha Yoga Teacher Training",
    image: "/images/programs/pranayama-nervous-system.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Vinyasa Flow Teacher Training",
    image: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Ashtanga Yoga Teacher Training",
    image: "/images/programs/face-yoga-teacher-training.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Yin Yoga Teacher Training",
    image: "/images/programs/weight-loss-coach-teacher-training.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Pranayama & The Nervous System",
    image: "/images/programs/bala-yoga-teacher-training.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Meditation & Mindfulness",
    image: "/images/programs/mat-pilates-teacher-training.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "300 Hour Advanced TTC",
    image: "/images/programs/ttc-300.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Restorative Yoga Teacher Training",
    image: "/images/programs/face-yoga.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Yoga Anatomy Foundations",
    image: "/images/programs/pranayama.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
];

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
          backgroundImage="/images/hero/tt-online.jpg"
        />
        <CourseGridSection courses={COURSES} />
      </main>
      <SiteFooterBlock />
    </>
  );
}
