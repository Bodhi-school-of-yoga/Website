import type { Metadata } from "next";

import { ListingHero } from "@/components/sections/listing-hero";
import {
  WorkshopsComingSoonSection,
  type ComingSoonWorkshop,
} from "@/components/sections/workshops-coming-soon-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { workshops } from "@/data/workshops";

export const metadata: Metadata = {
  title: "Our Workshops | Bodhi School of Yoga",
  description:
    "Accredited, women-centred teacher-training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga. New workshops coming soon.",
};

const WORKSHOPS: ComingSoonWorkshop[] = workshops.map((w) => ({
  id: w.slug,
  title: w.title,
  description: w.description,
  // Pricing hidden for now — re-add `price: w.price` to show it again.
  image: { src: `/images/workshops/${w.image}`, alt: w.title },
  mode: w.mode,
  language: w.language,
}));

export default function WorkshopsPage() {
  return (
    <>
      <SiteHeader tone="dark" />
      <main>
        <ListingHero
          background="gradient"
          tone="light"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Workshops" }]}
          eyebrow={`${WORKSHOPS.length} Workshops`}
          headline="Our Workshops"
          subtitle="Accredited, women-centred teacher-training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
          contentAlign="top"
          minHeightClassName="min-h-[420px] sm:min-h-[480px] lg:min-h-[565px]"
        />

        <WorkshopsComingSoonSection workshops={WORKSHOPS} overlapHero />
      </main>
      <SiteFooterBlock />
    </>
  );
}
