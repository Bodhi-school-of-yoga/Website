"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Globe,
  Play,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  calendar: Calendar,
  location: MapPin,
  clock: Clock,
  globe: Globe,
  play: Play,
  users: Users,
};

export type BenefitItem = {
  label: string;
  icon?: string;
};

export type RecordedClassPricingCardProps = {
  eyebrow: string;
  priceCurrent: string;
  priceOriginal?: string;
  discountBadge?: string;
  benefits: (string | BenefitItem)[];
  cta: { label: string; href?: string; onClick?: () => void };
  trustNote?: string;
  className?: string;
};

function RecordedClassPricingCard({
  eyebrow,
  priceCurrent,
  priceOriginal,
  discountBadge,
  benefits,
  cta,
  trustNote,
  className,
}: RecordedClassPricingCardProps) {
  const [currencyChar, ...amountParts] = priceCurrent.trim();
  const amountStr = amountParts.join("").trim();

  const ctaClassName = cn(
    "flex h-[48px] w-full items-center justify-center rounded-full",
    "bg-brand-primary px-6 text-[15px] font-semibold leading-none",
    "text-text-inverse transition-[transform,filter] duration-150",
    "hover:brightness-110 hover:shadow-md active:scale-[0.98]",
  );

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
      className={cn(
        "w-full lg:w-[340px] overflow-hidden",
        "rounded-[36px] border border-white/[0.22] bg-black/55 backdrop-blur-[30.1px]",
        "flex flex-col",
        className,
      )}
    >
      {/* Price header */}
      <div className="px-6 pt-6 pb-5">
        <p className="text-[12px] font-medium uppercase tracking-[2px] text-brand-shade">
          {eyebrow}
        </p>

        <div className="mt-1 flex items-baseline gap-[6px] font-heading text-text-inverse">
          <span className="text-[37.5px] leading-[1.2] font-normal">
            {currencyChar}
          </span>
          <span className="text-[37.5px] leading-[1.2] font-bold">
            {amountStr}
          </span>
        </div>

        {(priceOriginal || discountBadge) ? (
          <p className="mt-1 text-[13px] text-text-inverse/60">
            Early bird:{" "}
            {priceOriginal ? (
              <span className="line-through">{priceOriginal}</span>
            ) : null}
            {priceOriginal && discountBadge ? " · " : null}
            {discountBadge ? (
              <span>{discountBadge}</span>
            ) : null}
          </p>
        ) : null}
      </div>

      <div aria-hidden="true" className="mx-6 h-px bg-white/[0.12]" />

      {/* Benefits list */}
      <ul className="flex flex-col gap-4 px-6 py-5 text-text-inverse">
        {benefits.map((benefit) => {
          const item: BenefitItem =
            typeof benefit === "string" ? { label: benefit } : benefit;
          const IconComp = item.icon ? ICON_MAP[item.icon] : null;
          return (
            <li
              key={item.label}
              className="flex items-center gap-3 text-[14px] leading-snug"
            >
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-brand-primary/20">
                {IconComp ? (
                  <IconComp className="h-3.5 w-3.5 text-brand-shade" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-shade" />
                )}
              </span>
              {item.label}
            </li>
          );
        })}
      </ul>

      <div aria-hidden="true" className="mx-6 h-px bg-white/[0.12]" />

      {/* CTA */}
      <div className="mt-auto px-6 pt-5 pb-6">
        {cta.onClick ? (
          <button type="button" onClick={cta.onClick} className={ctaClassName}>
            {cta.label}
          </button>
        ) : (
          <Link href={cta.href ?? "#buy"} className={ctaClassName}>
            {cta.label}
          </Link>
        )}
        {trustNote ? (
          <p className="mt-3 text-center text-[12px] leading-[1.5] text-text-inverse/50">
            {trustNote}
          </p>
        ) : null}
      </div>
    </motion.aside>
  );
}

export { RecordedClassPricingCard };
