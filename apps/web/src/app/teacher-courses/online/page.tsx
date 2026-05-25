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
    title: "Pranayama & the Nervous System",
    image: "/images/programs/pranayama-nervous-system.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "300 Hour Yoga Teacher Training Course — Online",
    image: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Face Yoga Teacher Training Course",
    image: "/images/programs/face-yoga-teacher-training.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Weight Loss Coach Teacher Training Course",
    image: "/images/programs/weight-loss-coach-teacher-training.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Bala Yoga Teacher Training Course",
    image: "/images/programs/bala-yoga-teacher-training.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Mat Pilates Teacher Training Course",
    image: "/images/programs/mat-pilates-teacher-training.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Mat Pilates Teacher Training Course",
    image: "/images/programs/mat-pilates.png",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "Pranayama & the Nervous System",
    image: "/images/programs/pranayama.jpg",
    meta: COURSE_META,
    instructor: COURSE_INSTRUCTOR,
    ctaLabel: "View Program",
    ctaHref: "/yoga-courses/online-300-hour-ytt",
  },
  {
    title: "300 Hour Yoga Teacher Training Course — Online",
    image: "/images/programs/ttc-300.jpg",
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
          resultCount="23 COURSES"
          backgroundImage="/images/hero/teacher-training-online.jpg"
        />
        <CourseGridSection courses={COURSES} />
      </main>
      <SiteFooterBlock />
    </>
  );
}
