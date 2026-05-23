// WhyBodhiSection — value-proposition section on the homepage highlighting reasons to choose Bodhi.
import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type WhyBodhiSectionProps = {
  heading?: string;
  subhead?: string;
  innerHeading?: string;
  bullets?: string[];
  ctaLead?: string;
  ctaCopy?: string;
  photoSrc?: string;
  photoAlt?: string;
  className?: string;
};

const DEFAULT_BULLETS = [
  "Making yoga accessible & empowering for every woman",
  "Offering accredited TTCs that reflect women's unique needs",
  "Creating a safe space for healing, leadership & sisterhood",
  "Supporting women to rise personally & professionally",
  "Growing a global network of empowered yoginis",
];

export function WhyBodhiSection({
  heading = "Why Bodhi School of Yoga?",
  subhead = "We Empower Women to Heal, Lead, and Rise—Physically, Emotionally, and Spiritually—through the transformative wisdom of Yoga.",
  innerHeading = "What We Stand For",
  bullets = DEFAULT_BULLETS,
  ctaLead = "Whether you're a seeker or a teacher — you belong here.",
  ctaCopy = "Transform your career, Bodhi is here to guide and support you at every step.",
  photoSrc = "/images/why-bodhi/yoga-in-the-park.jpg",
  photoAlt = "A group practicing yoga together in a park.",
  className,
}: WhyBodhiSectionProps) {
  return (
    <section
      className={cn("w-full bg-background py-20 sm:py-24 lg:py-28", className)}
    >
      <div
        className={cn(
          "mx-auto grid max-w-[1340px] gap-12 page-px",
          "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14",
        )}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] sm:aspect-[5/6] lg:aspect-[4/5]">
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-7 lg:gap-8">
          <header className="flex flex-col gap-4">
            <h2 className="font-heading text-h4 sm:text-h3 text-text-secondary">
              {heading}
            </h2>
            <p className="text-subtext-2 text-text-tertiary">{subhead}</p>
          </header>

          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-h5 text-text-secondary">
              {innerHeading}
            </h3>
            <ul className="flex flex-col divide-y divide-sage-divider-soft">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-brand-primary"
                  />
                  <span className="text-subtext-1 text-text-secondary">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 rounded-lg bg-brand-primary px-6 py-5 text-text-inverse">
            <p className="text-subtext-2 font-semibold leading-tight">
              {ctaLead}
            </p>
            <p className="mt-1 text-body-sm text-text-inverse/85">{ctaCopy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
