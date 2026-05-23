import type { Metadata } from "next";
import { Clock, Globe } from "lucide-react";

import { ListingHero } from "@/components/sections/listing-hero";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Offline Advanced Yoga Certifications | Bodhi School of Yoga",
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
    id: "pranayama-nervous-system",
    title: "Pranayama & the nervous system",
    imageSrc: "/images/programs/pranayama-nervous-system.jpg",
    imageAlt: "Pranayama & the nervous system",
    href: "/yoga-courses/online-300-hour-ytt",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
  },
  {
    id: "300-hour-ttc-offline",
    title: "300 Hour Yoga Teacher Training Course — Offline",
    imageSrc: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    imageAlt: "300 Hour Yoga Teacher Training Course — Offline",
    href: "/yoga-courses/online-300-hour-ytt",
    instructor: { initials: "PP", name: "Prarthana Patel" },
  },
  {
    id: "face-yoga-ttc",
    title: "Face Yoga Teacher Training",
    imageSrc: "/images/programs/face-yoga-teacher-training.jpg",
    imageAlt: "Face Yoga Teacher Training",
    href: "/yoga-courses/online-300-hour-ytt",
    instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
  },
  {
    id: "weight-loss-coach-offline",
    title: "Offline Weight Loss Coach Certification",
    imageSrc: "/images/programs/weight-loss-coach-teacher-training.jpg",
    imageAlt: "Offline Weight Loss Coach Certification",
    href: "/yoga-courses/online-300-hour-ytt",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
  },
  {
    id: "bala-ttc",
    title: "Bala Yoga Teacher Training",
    imageSrc: "/images/programs/bala-yoga-teacher-training.jpg",
    imageAlt: "Bala Yoga Teacher Training",
    href: "/yoga-courses/online-300-hour-ytt",
    instructor: { initials: "PP", name: "Prarthana Patel" },
  },
  {
    id: "mat-pilates",
    title: "MAT Pilates Instructor Certification",
    imageSrc: "/images/programs/mat-pilates-teacher-training.jpg",
    imageAlt: "MAT Pilates Instructor Certification",
    href: "/yoga-courses/online-300-hour-ytt",
    instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
  },
];

// TODO: replace with CMS-driven items — duplicate first 3 entries with unique
// ids until the Strapi catalogue lands so the listing fills its 3x3 grid per
// Figma 1:5551.
const COURSES: Course[] = [
  ...UNIQUE_COURSES,
  { ...UNIQUE_COURSES[0], id: `${UNIQUE_COURSES[0].id}-dup` },
  { ...UNIQUE_COURSES[1], id: `${UNIQUE_COURSES[1].id}-dup` },
  { ...UNIQUE_COURSES[2], id: `${UNIQUE_COURSES[2].id}-dup` },
];

export default function OfflineAdvancedCertificationsPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <ListingHero
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Advanced Certifications", href: "/advanced-certifications" },
            { label: "Offline" },
          ]}
          headlineAccent="Offline"
          headline="Advanced Certifications"
          subtitle="Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          resultCount="23 courses"
          backgroundImage="/images/hero/tt-offline.jpg"
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
