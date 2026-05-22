import type { Metadata } from "next";

import { ListingHero } from "@/components/sections/listing-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProgramCard } from "@/components/ui/program-card";

export const metadata: Metadata = {
  title: "Tips to Become a Successful Yoga Teacher | Bodhi School of Yoga",
  description:
    "Discover essential tips, strategies, and insights to grow as a skilled and confident yoga teacher, whether you're just starting or looking to enhance your teaching career.",
};

type Article = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

const ARTICLES: Article[] = [
  {
    id: "pranayama-nervous-system",
    title: "Pranayama & the nervous system",
    imageSrc: "/images/programs/pranayama-nervous-system.jpg",
    imageAlt: "Pranayama & the nervous system",
    href: "/tips/pranayama-nervous-system",

  },
  {
    id: "300-hour-ttc-online",
    title: "300 Hour Yoga Teacher Training Course — Online",
    imageSrc: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    imageAlt: "300 Hour Yoga Teacher Training Course — Online",
    href: "/tips/300-hour-ttc-online",

  },
  {
    id: "face-yoga-ttc",
    title: "Face Yoga Teacher Training",
    imageSrc: "/images/programs/face-yoga-teacher-training.jpg",
    imageAlt: "Face Yoga Teacher Training",
    href: "/tips/face-yoga-ttc",
  },
  {
    id: "weight-loss-coach",
    title: "Online Weight Loss Coach Certification",
    imageSrc: "/images/programs/weight-loss-coach-teacher-training.jpg",
    imageAlt: "Online Weight Loss Coach Certification",
    href: "/tips/weight-loss-coach",

  },
  {
    id: "bala-ttc",
    title: "Bala Yoga Teacher Training",
    imageSrc: "/images/programs/bala-yoga-teacher-training.jpg",
    imageAlt: "Bala Yoga Teacher Training",
    href: "/tips/bala-ttc",
  },
  {
    id: "mat-pilates",
    title: "MAT Pilates Instructor Certification",
    imageSrc: "/images/programs/mat-pilates-teacher-training.jpg",
    imageAlt: "MAT Pilates Instructor Certification",
    href: "/tips/mat-pilates",

  },
  // TODO: replace with CMS-driven items
  {
    id: "pranayama-nervous-system-2",
    title: "Pranayama & the nervous system",
    imageSrc: "/images/programs/pranayama-nervous-system.jpg",
    imageAlt: "Pranayama & the nervous system",
    href: "/tips/pranayama-nervous-system",

  },
  // TODO: replace with CMS-driven items
  {
    id: "300-hour-ttc-online-2",
    title: "300 Hour Yoga Teacher Training Course — Online",
    imageSrc: "/images/programs/300-hour-yoga-teacher-training-online.jpg",
    imageAlt: "300 Hour Yoga Teacher Training Course — Online",
    href: "/tips/300-hour-ttc-online",

  },
  // TODO: replace with CMS-driven items
  {
    id: "face-yoga-ttc-2",
    title: "Face Yoga Teacher Training",
    imageSrc: "/images/programs/face-yoga-teacher-training.jpg",
    imageAlt: "Face Yoga Teacher Training",
    href: "/tips/face-yoga-ttc",
  },
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

export default function TipsToBecomeASuccessfulYogaTeacherPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ListingHero
          eyebrow="23 courses"
          headline="Tips to become a"
          headlineAccent="successful yoga teacher"
          subtitle="Discover essential tips, strategies, and insights to grow as a skilled and confident yoga teacher, whether you're just starting or looking to enhance your teaching career."
          backgroundImage="/images/hero/hero-photo.jpg"
        />
        <section className="bg-surface-1 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {ARTICLES.map((article) => (
                <li key={article.id}>
                  <ProgramCard
                    variant="article"
                    title={article.title}
                    imageSrc={article.imageSrc}
                    imageAlt={article.imageAlt}
                    href={article.href}
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
