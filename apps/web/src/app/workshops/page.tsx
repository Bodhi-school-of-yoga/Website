import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Award,
  Calendar,
  Clock,
  Globe,
  Infinity as InfinityIcon,
  Laptop,
  Layers,
  Video,
} from "lucide-react";

import { ListingHero } from "@/components/sections/listing-hero";
import {
  WorkshopsListSection,
  type WorkshopListItem,
} from "@/components/sections/workshops-list-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { workshops, type IconKey } from "@/data/workshops";

export const metadata: Metadata = {
  title: "Our Workshops | Bodhi School of Yoga",
  description:
    "Expert-led yoga workshops, teacher trainings, and wellness programs from Bodhi School of Yoga — deepen your knowledge, enhance your techniques, and transform your wellness journey.",
};

const ICON_CLASS = "h-[18px] w-[18px]";

// Maps the icon keys used in workshops.json to lucide icons.
const ICONS: Record<IconKey, ReactNode> = {
  video: <Video className={ICON_CLASS} strokeWidth={1.75} />,
  clock: <Clock className={ICON_CLASS} strokeWidth={1.75} />,
  calendar: <Calendar className={ICON_CLASS} strokeWidth={1.75} />,
  globe: <Globe className={ICON_CLASS} strokeWidth={1.75} />,
  laptop: <Laptop className={ICON_CLASS} strokeWidth={1.75} />,
  award: <Award className={ICON_CLASS} strokeWidth={1.75} />,
  layers: <Layers className={ICON_CLASS} strokeWidth={1.75} />,
  infinity: <InfinityIcon className={ICON_CLASS} strokeWidth={1.75} />,
};

const WORKSHOPS: WorkshopListItem[] = workshops.map((w) => ({
  id: w.slug,
  title: w.title,
  image: {
    src: `/images/workshops/${w.image}`,
    alt: w.title,
  },
  description: w.shortDescription,
  price: w.price,
  originalPrice: w.originalPrice ?? undefined,
  taxNote: w.taxNote ?? undefined,
  features: w.listingFeatures.map((f) => ({
    icon: ICONS[f.icon],
    label: f.label,
  })),
  startsCaption: w.startsCaption,
  ctaLabel: w.ctaLabel,
  ctaHref: `/workshops/${w.slug}`,
  cardHref: `/workshops/${w.slug}`,
}));

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
          subtitle="Expert-led workshops, teacher trainings, and wellness programs designed to deepen your knowledge, enhance your techniques, and transform your wellness journey."
          resultCount={`${WORKSHOPS.length} Workshops`}
          contentAlign="top"
          minHeightClassName="min-h-[420px] sm:min-h-[480px] lg:min-h-[565px]"
        />

        <WorkshopsListSection workshops={WORKSHOPS} overlapHero />
      </main>
      <SiteFooterBlock />
    </>
  );
}
