import type { Metadata } from "next";
import { Calendar, Clock, Globe, MapPin } from "lucide-react";

import { FooterBrandCta } from "@/components/sections/footer-brand-cta";
import { ListingHero } from "@/components/sections/listing-hero";
import {
  WorkshopsListSection,
  type WorkshopListItem,
} from "@/components/sections/workshops-list-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Our Workshops | Bodhi School of Yoga",
  description:
    "Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.",
};

const CHIP_ICON_CLASS = "h-[18px] w-[18px]";

// All cards share the same description, pills, price, caption, CTA — per Figma 1:3968.
// Only the title + photo differ across the 4 cards.
const SHARED_DESCRIPTION =
  "Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows.";

// Static demo countdown target — ~02d 18h 38m from build time so the displayed
// timer roughly matches the reference (02 / 18 / 38 / 19).
const COUNTDOWN_TARGET_ISO = new Date(
  Date.now() + (2 * 24 + 18) * 60 * 60 * 1000 + 38 * 60 * 1000 + 19 * 1000,
).toISOString();

const SHARED_FEATURES = [
  {
    icon: <Calendar className={CHIP_ICON_CLASS} strokeWidth={1.75} />,
    label: "Starts Dec 12",
  },
  {
    icon: <MapPin className={CHIP_ICON_CLASS} strokeWidth={1.75} />,
    label: "Studio",
  },
  {
    icon: <Clock className={CHIP_ICON_CLASS} strokeWidth={1.75} />,
    label: "3 Days",
  },
  {
    icon: <Globe className={CHIP_ICON_CLASS} strokeWidth={1.75} />,
    label: "English",
  },
];

const WORKSHOPS: WorkshopListItem[] = [
  {
    id: "decoding-what-is-prana",
    title: "Decoding \"What is Prana?\"",
    image: {
      src: "/images/workshops/decoding-what-is-prana.png",
      alt: "Decoding 'What is Prana?'",
    },
    description: SHARED_DESCRIPTION,
    price: "₹249",
    originalPrice: "₹499",
    taxNote: "incl. taxes",
    features: SHARED_FEATURES,
    countdownTarget: COUNTDOWN_TARGET_ISO,
    countdownEyebrow: "Workshop starting in",
    ctaLabel: "Book Spot Now",
    ctaHref: "/workshops/decoding-what-is-prana",
    cardHref: "/workshops/decoding-what-is-prana",
  },
  {
    id: "protein-in-indian-diets",
    title: "Protein in Indian Diets: Myths and Facts",
    image: {
      src: "/images/workshops/protein-in-indian-diets.png",
      alt: "Protein in Indian Diets: Myths and Facts",
    },
    description: SHARED_DESCRIPTION,
    price: "₹249",
    originalPrice: "₹499",
    taxNote: "incl. taxes",
    features: SHARED_FEATURES,
    countdownTarget: COUNTDOWN_TARGET_ISO,
    countdownEyebrow: "Workshop starting in",
    ctaLabel: "Book Spot Now",
    ctaHref: "/workshops/protein-in-indian-diets",
    cardHref: "/workshops/protein-in-indian-diets",
  },
  {
    id: "know-about-hatha-yoga",
    title: "Know About Hatha Yoga",
    image: {
      src: "/images/workshops/know-about-hatha-yoga.png",
      alt: "Know About Hatha Yoga",
    },
    description: SHARED_DESCRIPTION,
    price: "₹249",
    originalPrice: "₹499",
    taxNote: "incl. taxes",
    features: SHARED_FEATURES,
    countdownTarget: COUNTDOWN_TARGET_ISO,
    countdownEyebrow: "Workshop starting in",
    ctaLabel: "Book Spot Now",
    ctaHref: "/workshops/know-about-hatha-yoga",
    cardHref: "/workshops/know-about-hatha-yoga",
  },
  {
    id: "yoga-for-sciatica",
    title: "Yoga for Sciatica",
    image: {
      src: "/images/workshops/yoga-for-sciatica.png",
      alt: "Yoga for Sciatica",
    },
    description: SHARED_DESCRIPTION,
    price: "₹249",
    originalPrice: "₹499",
    taxNote: "incl. taxes",
    features: SHARED_FEATURES,
    countdownTarget: COUNTDOWN_TARGET_ISO,
    countdownEyebrow: "Workshop starting in",
    ctaLabel: "Book Spot Now",
    ctaHref: "/workshops/yoga-for-sciatica",
    cardHref: "/workshops/yoga-for-sciatica",
  },
];

export default function WorkshopsPage() {
  return (
    <>
      <SiteHeader tone="dark" />
      <main>
        <ListingHero
          background="gradient"
          tone="light"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Workshops" },
          ]}
          headline="Our Workshops"
          subtitle="Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          resultCount="23 Courses"
          contentAlign="top"
          minHeightClassName="min-h-[420px] sm:min-h-[480px] lg:min-h-[565px]"
        />

        <WorkshopsListSection workshops={WORKSHOPS} overlapHero />

        <FooterBrandCta
          brand="Bodhi"
          heading="Begin where you are."
          body="Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that."
          ctaLabel="Try a Class, Free"
          ctaHref="/try-a-class"
        />
      </main>
      <SiteFooterBlock showCta={false} />
    </>
  );
}
