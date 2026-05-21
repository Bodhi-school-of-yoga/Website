import type { Metadata } from "next";
import ClassesContent from "@/components/classes/classes-content";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Explore our yoga classes — Hatha, Vinyasa Flow, Yin Yoga, Meditation, and more for all levels.",
};

export default function ClassesPage() {
  return <ClassesContent />;
}
