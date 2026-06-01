import type { Metadata } from "next";

import { ListingHero } from "@/components/sections/listing-hero";
import { TeacherTipsVideoGallery } from "@/components/sections/teacher-tips-video-gallery";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";
import { TEACHER_TIPS_VIDEOS } from "@/data/teacher-tips-videos";

export const metadata: Metadata = {
  title: "Tips to Become a Successful Yoga Teacher | Bodhi School of Yoga",
  description:
    "Short video guidance from Bodhi on how to grow as a skilled, confident and successful yoga teacher — fees, workshops, communication, confidence and more.",
};

export default function TipsToBecomeASuccessfulYogaTeacherPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <ListingHero
          breadcrumb={[]}
          eyebrow={`${TEACHER_TIPS_VIDEOS.length} Video Tips`}
          headline="Tips to Become a"
          headlineAccent="Successful Yoga Teacher"
          accentPosition="end"
          subtitle="Discover essential tips, strategies, and insights to grow as a skilled and confident yoga teacher, whether you're just starting or looking to enhance your teaching career."
          backgroundImage="/images/hero/tips.jpg"
          minHeightClassName="min-h-[421px]"
          contentAlign="center"
          headlineClassName="text-[40px] leading-[1.05] font-bold sm:text-[52px] lg:text-[60px] lg:leading-[58px] tracking-[-0.0093em] lg:max-w-[1228px]"
          headlineAccentClassName="text-accent-mint"
          verticalPaddingClassName="pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-[110px] lg:pb-[90px]"
        />
        <TeacherTipsVideoGallery
          eyebrow="Free guidance · Watch & learn"
          videos={TEACHER_TIPS_VIDEOS}
        />
      </main>
      <SiteFooterBlock />
    </>
  );
}
