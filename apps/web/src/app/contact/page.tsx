import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";
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
      <main className="mt-8">
        <ContactSection />
      </main>
      <SiteFooterBlock />
    </>
  );
}
