import type { Metadata } from "next";

import { YogaDayLanding } from "@/components/yoga-day-landing";

export const metadata: Metadata = {
  title: "International Yoga Day 2026 | Bodhi School of Yoga",
  description:
    "Celebrate International Yoga Day with Bodhi. Limited-time scholarships across every course — reserve your seat before the offer closes on June 21.",
};

export default function YogaDayPage() {
  return <YogaDayLanding />;
}
