import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type BookingCardChip = {
  icon: React.ReactNode;
  label: string;
};

export type BookingCardProps = {
  eyebrow?: string;
  currency?: string;
  price: string;
  priceStrike?: string;
  saveNote?: string;
  chips: BookingCardChip[];
  ctaLabel: string;
  ctaHref?: string;
  guaranteeNote?: string;
  className?: string;
};

/**
 * Glassmorphic dark booking card from Figma node 1:9943.
 * Sits over a photo hero on the workshop detail page.
 */
function BookingCard({
  eyebrow = "Workshop cost",
  currency = "₹",
  price,
  priceStrike,
  saveNote,
  chips,
  ctaLabel,
  ctaHref = "#reserve",
  guaranteeNote,
  className,
}: BookingCardProps) {
  return (
    <aside
      className={cn(
        "w-full max-w-[520px] rounded-[36px]",
        "border border-white/20",
        "bg-black/55 backdrop-blur-[30px]",
        "shadow-[0_4px_80px_rgba(0,0,0,0.25)]",
        "p-8 sm:p-10",
        className,
      )}
    >
      <div className="flex flex-col gap-1.5">
        <p className="font-sans font-semibold text-[12px] uppercase tracking-[2px] text-brand-shade">
          {eyebrow}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-text-inverse text-[2.25rem] leading-none">
            {currency}
          </span>
          <span className="font-heading font-bold text-text-inverse text-[2.75rem] leading-none">
            {price}
          </span>
        </div>
        {(priceStrike || saveNote) && (
          <p className="mt-1 text-body-sm text-text-inverse/85">
            {priceStrike ? (
              <>
                Early bird:{" "}
                <span className="line-through opacity-70">{priceStrike}</span>
              </>
            ) : null}
            {priceStrike && saveNote ? <span> · </span> : null}
            {saveNote ? <span>Save {saveNote}</span> : null}
          </p>
        )}
      </div>

      <ul className="mt-6 flex flex-col gap-3.5">
        {chips.map((chip) => (
          <li key={chip.label} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
                "border border-white/10 bg-white/[0.08] backdrop-blur-[30px]",
                "text-[16px] leading-none text-text-inverse",
              )}
            >
              {chip.icon}
            </span>
            <span className="text-[15px] leading-snug text-text-inverse">
              {chip.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Link
          href={ctaHref}
          className={cn(
            "inline-flex h-12 w-full items-center justify-center rounded-[12px]",
            "bg-brand-shade px-6",
            "font-sans font-bold text-text-secondary text-[15px] tracking-[0.5px]",
            "transition-all duration-150",
            "hover:bg-brand-shade/85 active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade focus-visible:ring-offset-2 focus-visible:ring-offset-black/55",
          )}
        >
          {ctaLabel}
        </Link>
        {guaranteeNote ? (
          <p className="text-center text-[12px] font-sans normal-case tracking-normal text-text-inverse/90">
            {guaranteeNote}
          </p>
        ) : null}
      </div>
    </aside>
  );
}

export { BookingCard };
