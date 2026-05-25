import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";
import { FooterBrandCta } from "@/components/sections/footer-brand-cta";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact Us | Bodhi School of Yoga",
  description:
    "Reach Bodhi School of Yoga — phone, email, and our Hyderabad office. We reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ContactSection />

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
