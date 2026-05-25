import type { Metadata } from "next";

import { CentersSection } from "@/components/sections/centers-section";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Our Centers — Bodhi School of Yoga",
  description: "Find a Bodhi center near you across India.",
};

export default function OurCentersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <CentersSection />
      </main>
      <SiteFooterBlock cta={{ primaryCta: { label: "Try a Class, Free", href: "/classes" } }} />
    </>
  );
}
