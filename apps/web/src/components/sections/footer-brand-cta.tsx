import Link from "next/link";

import { cn } from "@/lib/utils";

export type FooterBrandCtaProps = {
  brand: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
};

function splitHeading(heading: string): { lead: string; accent: string } {
  const idx = heading.toLowerCase().lastIndexOf("you");
  if (idx === -1) return { lead: heading, accent: "" };
  return { lead: heading.slice(0, idx), accent: heading.slice(idx) };
}

export function FooterBrandCta({
  brand,
  heading,
  body,
  ctaLabel,
  ctaHref,
  className,
}: FooterBrandCtaProps) {
  const { lead, accent } = splitHeading(heading);

  return (
    <section
      className={cn(
        "w-full bg-brand-dark px-4 pt-20 pb-12 text-center text-white",
        "sm:px-6 sm:pt-24 sm:pb-16",
        "lg:px-8 lg:pt-28 lg:pb-20",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-serif text-2xl italic text-white">{brand}</p>

        <h2
          className={cn(
            "mt-2 font-serif leading-[1.05] tracking-tight text-white",
            "text-[64px] sm:text-[88px] lg:text-[108px]",
          )}
        >
          {lead}
          {accent ? (
            <span className="italic text-brand-shade">{accent}</span>
          ) : null}
        </h2>

        <p
          className={cn(
            "mx-auto mt-6 max-w-prose text-subtext-2 text-white/65",
          )}
        >
          {body}
        </p>

        <div className="mt-8">
          <Link
            href={ctaHref}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-7 py-3.5",
              "bg-brand-shade text-brand-dark",
              "text-subtext-1 font-semibold",
              "transition-opacity duration-200 hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade/50",
            )}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
