import type { Metadata } from "next";
import { Clock, Globe } from "lucide-react";

import { ListingHero } from "@/components/sections/listing-hero";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Online Yoga Courses | Bodhi School of Yoga",
  description:
    "Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.",
};

type Course = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  instructor: { initials: string; name: string };
};

const UNIQUE_COURSES: Course[] = [
  {
    id: "hatha-fundamentals",
    title: "Hatha Yoga Fundamentals",
    imageSrc: "/images/programs/pranayama-nervous-system.jpg",
    imageAlt: "Hatha Yoga Fundamentals",
    href: "/yoga-courses/aerial-yoga",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
  },
  {
    id: "vinyasa-flow-online",
    title: "Vinyasa Flow Online",
    imageSrc: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    imageAlt: "Vinyasa Flow Online",
    href: "/yoga-courses/aerial-yoga",
    instructor: { initials: "PP", name: "Prarthana Patel" },
  },
  {
    id: "face-yoga",
    title: "Face Yoga Practice",
    imageSrc: "/images/programs/face-yoga-teacher-training.jpg",
    imageAlt: "Face Yoga Practice",
    href: "/yoga-courses/aerial-yoga",
    instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
  },
  {
    id: "weight-management",
    title: "Weight Management Yoga",
    imageSrc: "/images/programs/weight-loss-coach-teacher-training.jpg",
    imageAlt: "Weight Management Yoga",
    href: "/yoga-courses/aerial-yoga",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
  },
  {
    id: "bala-beginners",
    title: "Bala Yoga for Beginners",
    imageSrc: "/images/programs/bala-yoga-teacher-training.jpg",
    imageAlt: "Bala Yoga for Beginners",
    href: "/yoga-courses/aerial-yoga",
    instructor: { initials: "PP", name: "Prarthana Patel" },
  },
  {
    id: "mat-pilates-online",
    title: "MAT Pilates Online",
    imageSrc: "/images/programs/mat-pilates-teacher-training.jpg",
    imageAlt: "MAT Pilates Online",
    href: "/yoga-courses/aerial-yoga",
    instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
  },
];

// TODO: replace with CMS-driven items
const COURSES: Course[] = [
  ...UNIQUE_COURSES,
  { ...UNIQUE_COURSES[0], id: `${UNIQUE_COURSES[0].id}-dup` },
  { ...UNIQUE_COURSES[1], id: `${UNIQUE_COURSES[1].id}-dup` },
  { ...UNIQUE_COURSES[2], id: `${UNIQUE_COURSES[2].id}-dup` },
];

export default function OnlineYogaCoursesPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <ListingHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Yoga courses", href: "/yoga-courses" },
            { label: "Online" },
          ]}
          headline="Online Yoga"
          headlineAccent="Courses"
          accentPosition="end"
          subtitle="Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          resultCount="23 courses"
          resultCountTone="inverse"
          contentAlign="center"
          minHeightClassName="min-h-[421px]"
          backgroundImage="/images/hero/yoga-courses-listing.png"
          backgroundAlt="Yoga instructor guiding three students through side-stretch poses in a sunlit studio"
        />

        <section className="bg-surface-1 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {COURSES.map((course) => (
                <li key={course.id}>
                  <ProgramCard
                    title={course.title}
                    href={course.href}
                    imageSrc={course.imageSrc}
                    imageAlt={course.imageAlt}
                    meta={[
                      {
                        icon: <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />,
                        label: "4 weeks",
                      },
                      {
                        icon: <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />,
                        label: "English",
                      },
                    ]}
                    instructor={course.instructor}
                    cta="View Program"
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
