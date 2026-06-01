// WhatWeDoSection — overview section on the homepage or About page describing Bodhi's program categories.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type WhatWeDoCard = {
  iconSrc: string;
  iconAlt: string;
  title: string;
  body: string;
  ctaLabel: string;
  href: string;
};

export type WhatWeDoSectionProps = {
  eyebrow?: string;
  heading?: string;
  cards?: WhatWeDoCard[];
  className?: string;
};

const DEFAULT_CARDS: WhatWeDoCard[] = [
  {
    iconSrc: "/images/what-we-do/personalized-classes-icon.svg",
    iconAlt: "",
    title: "Personalized Classes",
    body: "200-hour and 300-hour residential and weekend programmes, taught with rigour.",
    ctaLabel: "See curriculum",
    href: "/programs",
  },
  {
    iconSrc: "/images/what-we-do/breath-body-focus-icon.svg",
    iconAlt: "",
    title: "Breath & body focus",
    body: "Short, focused weekends on breath, sleep, recovery from injury, women's health, and more.",
    ctaLabel: "Browse workshops",
    href: "/workshops",
  },
  {
    iconSrc: "/images/what-we-do/easy-online-access-icon.svg",
    iconAlt: "",
    title: "Easy online access",
    body: "Drop in, online or at our studio. Hatha, Ashtanga, Yin, Pranayama, and beginner-friendly classes.",
    ctaLabel: "See timetable",
    href: "/timetable",
  },
];

export function WhatWeDoSection({
  eyebrow = "What we do",
  heading = "Three rooms in one school.",
  cards = DEFAULT_CARDS,
  className,
}: WhatWeDoSectionProps) {
  return (
    <section
      className={cn(
        "w-full border-y border-sage-divider bg-surface-0 py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 page-px lg:gap-12">
        <header className="flex flex-col items-center gap-3 text-center">
          <p className="text-mini uppercase text-text-brand">{eyebrow}</p>
          <h2 className="font-heading text-h4 sm:text-h3 text-text-secondary">
            {heading}
          </h2>
        </header>

        <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title}>
              <WhatWeDoCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhatWeDoCard({ card }: { card: WhatWeDoCard }) {
  return (
    <Link
      href={card.href}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-[35px] border border-border-2 bg-surface-1 p-8 sm:p-10",
        "shadow-card transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-brand-shade hover:shadow-[0_22px_44px_-12px_rgba(0,152,119,0.18)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
      )}
    >
      <span className="relative flex h-[46px] w-[46px] items-center justify-center">
        <Image
          src={card.iconSrc}
          alt={card.iconAlt}
          width={46}
          height={46}
          className="h-full w-full"
        />
      </span>
      <h3 className="font-sans text-h5 font-semibold leading-snug text-text-brand-deep">
        {card.title}
      </h3>
      <p className="text-body-sm text-text-tertiary">{card.body}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-body-sm text-text-brand transition-transform duration-300 group-hover:translate-x-0.5">
        {card.ctaLabel}
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
