import type { Metadata } from "next";
import { Clock, Globe, Monitor } from "lucide-react";

import { ListingHero } from "@/components/sections/listing-hero";
import { ProgramCard } from "@/components/ui/program-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Online Advanced Yoga Certifications | Bodhi School of Yoga",
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
    href: "/programs/pranayama-nervous-system",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
  },
  {
    id: "300-hour-ttc-online",
    title: "300 Hour Yoga Teacher Training Course — Online",
    imageSrc: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    imageAlt: "300 Hour Yoga Teacher Training Course — Online",
    href: "/programs/300-hour-ttc-online",
    instructor: { initials: "PP", name: "Prarthana Patel" },
  },
  {
    id: "face-yoga-ttc",
    title: "Face Yoga Teacher Training",
    imageSrc: "/images/programs/face-yoga-teacher-training.jpg",
    imageAlt: "Face Yoga Teacher Training",
    href: "/programs/face-yoga-ttc",
    instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
  },
  {
    id: "weight-loss-coach",
    title: "Online Weight Loss Coach Certification",
    imageSrc: "/images/programs/weight-loss-coach-teacher-training.jpg",
    imageAlt: "Online Weight Loss Coach Certification",
    href: "/programs/weight-loss-coach",
    instructor: { initials: "JD", name: "Janardhan Durga Prasad" },
  },
  {
    id: "bala-ttc",
    title: "Bala Yoga Teacher Training",
    imageSrc: "/images/programs/bala-yoga-teacher-training.jpg",
    imageAlt: "Bala Yoga Teacher Training",
    href: "/programs/bala-ttc",
    instructor: { initials: "PP", name: "Prarthana Patel" },
  },
  {
    id: "mat-pilates",
    title: "MAT Pilates Instructor Certification",
    imageSrc: "/images/programs/mat-pilates-teacher-training.jpg",
    imageAlt: "MAT Pilates Instructor Certification",
    href: "/programs/mat-pilates",
    instructor: { initials: "LY", name: "Lakshmi Yalamudi" },
  },
];

// TODO: CMS-driven — duplicate first 3 entries with unique ids until the
// Strapi catalogue lands so the listing fills its 3x3 grid per Figma 1:2343.
const COURSES: Course[] = [
  ...UNIQUE_COURSES,
  { ...UNIQUE_COURSES[0], id: `${UNIQUE_COURSES[0].id}-dup` },
  { ...UNIQUE_COURSES[1], id: `${UNIQUE_COURSES[1].id}-dup` },
  { ...UNIQUE_COURSES[2], id: `${UNIQUE_COURSES[2].id}-dup` },
];

const FOOTER_BRAND = {
  wordmark: "Bodhi",
  tagline: "A school for teachers, a home for seekers.\nPractice, taught honestly.",
  url: {
    label: "bodhischoolofyoga.com",
    href: "https://bodhischoolofyoga.com",
  },
};

const FOOTER_COLUMNS = [
  {
    heading: "School",
    links: [
      { label: "Teacher Training", href: "/teacher-training" },
      { label: "Workshops", href: "/workshops" },
      { label: "Classes", href: "/classes" },
      { label: "Faculty", href: "/faculty" },
      { label: "Lineage", href: "/lineage" },
    ],
  },
  {
    heading: "Stay close",
    links: [
      { label: "Newsletter", href: "/newsletter" },
      {
        label: "Instagram",
        href: "https://instagram.com/bodhischoolofyoga",
        external: true,
      },
      {
        label: "YouTube",
        href: "https://youtube.com/@bodhischoolofyoga",
        external: true,
      },
      { label: "Email us", href: "mailto:hello@bodhischoolofyoga.com" },
    ],
  },
];

const FOOTER_ADDRESS = {
  heading: "Visit",
  lines: ["The Practice Room,", "2nd floor, Quiet Lane", "City  ·  India"],
  action: {
    label: "Get directions →",
    href: "https://maps.google.com",
    external: true,
  },
};

export default function OnlineAdvancedCertificationsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ListingHero
          breadcrumb="Home / Advanced Certifications / Online"
          headline="Online Advanced Certifications"
          subtitle="Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          resultCount="23 courses"
          backgroundImage="/images/hero/hero-photo.jpg"
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
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter
        brand={FOOTER_BRAND}
        columns={FOOTER_COLUMNS}
        address={FOOTER_ADDRESS}
      />
    </>
  );
}
