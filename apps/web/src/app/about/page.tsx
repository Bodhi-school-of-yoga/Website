import type { Metadata } from "next";
import AboutContent from "@/components/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Bodhi Yoga Studio — our story, philosophy, and commitment to mindful practice.",
};

export default function AboutPage() {
  return <AboutContent />;
}
