// YogaDayLanding — the full International Yoga Day campaign page composition.
//
// Single source for the page body so the released route (/yoga-day) and the
// demo route (/demo/yoga-day) render the EXACT same thing — no duplication.
"use client";

import * as React from "react";
import { SiteHeader } from "@/components/site-header";
import { YogaDayHeroSection } from "@/components/sections/yoga-day-hero-section";
import { BatchBookingDialog } from "@/components/ui/batch-booking-dialog";
import { YogaDayCurriculumSection } from "@/components/sections/yoga-day-curriculum-section";
import { YogaDayWeeklyDiscountSection } from "@/components/sections/yoga-day-weekly-discount-section";
import { YogaDayWhyBodhiSection } from "@/components/sections/yoga-day-why-bodhi-section";
import { VideoTestimonialsSection } from "@/components/sections/video-testimonials-section";
import { TESTIMONIAL_VIDEOS } from "@/data/testimonial-videos";
import { YogaDayUrgencySection } from "@/components/sections/yoga-day-urgency-section";
import { YogaDayCoursesSection } from "@/components/sections/yoga-day-courses-section";
import { SiteFooterBlock } from "@/components/site-footer-block";

// International Yoga Day scholarship: 70% off the original price. The original
// (₹41,900) and the resulting ₹12,570 are the same figures shown in
// YogaDayWeeklyDiscountSection — the checkout must match the on-page price.
const YOGA_DAY_ORIGINAL_RUPEES = 41_900;
const YOGA_DAY_AMOUNT_IN_PAISE = Math.round(YOGA_DAY_ORIGINAL_RUPEES * 0.3 * 100);

export function YogaDayLanding() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-surface-1">
      <SiteHeader />
      <main>
        <YogaDayHeroSection onCtaClick={() => setDialogOpen(true)} />
        <BatchBookingDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          courseName="International Yoga Day — 70% Scholarship"
          amountInPaise={YOGA_DAY_AMOUNT_IN_PAISE}
          razorpayKey={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""}
          batches={[
            { label: "Next batch — Mon – Fri", value: "next" },
            { label: "Following batch", value: "following" },
          ]}
          timeSlots={[
            { label: "Morning · 6:00 AM – 8:00 AM IST", value: "morning" },
            { label: "Evening · 6:00 PM – 8:00 PM IST", value: "evening" },
          ]}
        />
        <YogaDayCurriculumSection />
        <YogaDayWeeklyDiscountSection />
        <YogaDayWhyBodhiSection />
        <VideoTestimonialsSection
          eyebrow="TESTIMONIALS"
          heading="What our students say"
          testimonials={TESTIMONIAL_VIDEOS}
        />
        <YogaDayUrgencySection />
        <YogaDayCoursesSection />
      </main>
      <SiteFooterBlock />
    </div>
  );
}
