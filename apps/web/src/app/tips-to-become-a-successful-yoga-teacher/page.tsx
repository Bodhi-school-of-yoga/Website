import type { Metadata } from "next";

import { ListingHero } from "@/components/sections/listing-hero";
import { SiteFooterBlock } from "@/components/site-footer-block";
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

export default function TipsToBecomeASuccessfulYogaTeacherPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <ListingHero
          breadcrumb={[]}
          eyebrow="23 courses"
          headline="Tips to become a"
          headlineAccent="successful yoga teacher"
          accentPosition="end"
          subtitle="Discover essential tips, strategies, and insights to grow as a skilled and confident yoga teacher, whether you're just starting or looking to enhance your teaching career."
          backgroundImage="/images/hero/tips.jpg"
          minHeightClassName="min-h-[421px]"
          contentAlign="center"
          headlineClassName="text-[40px] leading-[1.05] font-bold sm:text-[52px] lg:text-[60px] lg:leading-[58px] tracking-[-0.0093em]"
          headlineAccentClassName="text-accent-mint"
          verticalPaddingClassName="pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-[120px] lg:pb-[100px]"
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
      <SiteFooterBlock />
    </>
  );
}
