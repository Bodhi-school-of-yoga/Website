import type { Metadata } from "next";

import { ListingHero } from "@/components/sections/listing-hero";
import { YogaPosesListSection } from "@/components/sections/yoga-poses-list-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { categories, poses } from "@/data/yoga-poses";

export const metadata: Metadata = {
  title: "Yoga Poses | Bodhi School of Yoga",
  description:
    "Explore the Bodhi School of Yoga pose library — step-by-step instructions, benefits, beginner tips, and precautions for standing, supine, and balancing asanas.",
};

export default function YogaPosesPage() {
  return (
    <>
      <SiteHeader tone="dark" />
      <main>
        <ListingHero
          background="gradient"
          tone="light"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Yoga Poses" }]}
          headline="Yoga Poses"
          subtitle="A healthier body, a calmer mind, spiritual growth, or a rewarding career — yoga makes it all happen, simply, gently, easily. Explore our library of asanas with step-by-step guidance, benefits, and precautions."
          resultCount={`${poses.length} Poses`}
          contentAlign="top"
          minHeightClassName="min-h-[420px] sm:min-h-[480px] lg:min-h-[565px]"
        />

        <YogaPosesListSection
          poses={poses}
          categories={categories}
          overlapHero
        />
      </main>
      <SiteFooterBlock />
    </>
  );
}
