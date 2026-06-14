import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooterBlock } from "@/components/site-footer-block";
import { ThankYouContent } from "./thank-you-content";

export const metadata: Metadata = {
  title: "Thank You | Bodhi School of Yoga",
  description:
    "Your submission has been received. We will get back to you shortly.",
};

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader tone="dark" solidBg />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 sm:py-40 text-center">
        <Suspense>
          <ThankYouContent />
        </Suspense>
      </main>
      <SiteFooterBlock />
    </>
  );
}
