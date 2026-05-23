import { RecordedClassesHero } from "@/components/sections/recorded-classes-hero";
import type { BreadcrumbItem } from "@/components/ui/breadcrumb";

const breadcrumb: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Yoga courses", href: "/courses" },
  { label: "Yoga for Sciatica", current: true },
];

export default function RecordedClassHeroDemoPage() {
  return (
    <main className="min-h-screen">
      <RecordedClassesHero
        backgroundImage="/images/figma/recorded-classes/hero-bg.png"
        backgroundAlt="Woman practicing yoga"
        breadcrumb={breadcrumb}
        titleLines={["Yoga for", "Sciatica"]}
        lede="A gentle, evidence-based recorded program to ease sciatic pain and rebuild lower-back resilience. 25 videos, 8 hours, unlimited access — practice on your schedule."
        stats={[
          { value: "25", label: "Videos" },
          { value: "8h", label: "Content" },
          { value: "∞", label: "Access" },
        ]}
        pricing={{
          eyebrow: "recorded cost",
          priceCurrent: "₹4,99",
          priceOriginal: "₹9,99",
          discountBadge: "50% off",
          benefits: [
            "Lifetime access",
            "Watch on any device",
            "Download available",
            "Certificate on completion",
          ],
          cta: {
            label: "Buy now and get instant access",
            href: "#buy",
          },
          trustNote: "🔒 Secure booking · No hidden charges",
        }}
      />
    </main>
  );
}
