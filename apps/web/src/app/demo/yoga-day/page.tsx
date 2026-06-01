import { SiteHeader } from "@/components/site-header";
import { YogaDayHeroSection } from "@/components/sections/yoga-day-hero-section";
import { YogaDayCurriculumSection } from "@/components/sections/yoga-day-curriculum-section";
import { YogaDayWeeklyDiscountSection } from "@/components/sections/yoga-day-weekly-discount-section";
import { YogaDayWhyBodhiSection } from "@/components/sections/yoga-day-why-bodhi-section";
import { YogaDayTestimonialsSection } from "@/components/sections/yoga-day-testimonials-section";
import { YogaDayUrgencySection } from "@/components/sections/yoga-day-urgency-section";
import { YogaDayCoursesSection } from "@/components/sections/yoga-day-courses-section";
import { SiteFooterBlock } from "@/components/site-footer-block";

export default function YogaDayDemoPage() {
  return (
    <div className="min-h-screen bg-surface-1">
      <SiteHeader />
      <main>
        <YogaDayHeroSection />
        <YogaDayCurriculumSection />
        <YogaDayWeeklyDiscountSection />
        <YogaDayWhyBodhiSection />
        <YogaDayTestimonialsSection />
        <YogaDayUrgencySection />
        <YogaDayCoursesSection />
      </main>
      <SiteFooterBlock />
    </div>
  );
}
