import type { Metadata } from "next";
import InstructorsContent from "@/components/instructors/instructors-content";

export const metadata: Metadata = {
  title: "Instructors",
  description:
    "Meet our certified yoga instructors at Bodhi Yoga Studio. Experienced, passionate, and dedicated to your practice.",
};

export default function InstructorsPage() {
  return <InstructorsContent />;
}
