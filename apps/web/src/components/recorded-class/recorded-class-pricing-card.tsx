"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type RecordedClassPricingCardProps = {
  eyebrow: string;
  priceCurrent: string;
  priceOriginal?: string;
  discountBadge?: string;
  benefits: string[];
  cta: { label: string; href?: string; onClick?: () => void };
  trustNote?: string;
  className?: string;
};

/**
 * Dark glassmorphic pricing card for the recorded-class hero (Figma 353:10685).
 * Glass surface (bg rgba(0,0,0,0.54), border white/22%, backdrop-blur 30.1px,
 * rounded-[36px]) is intentionally ad-hoc — flagged as `surface-glass-dark`
 * token gap in 03_build_plan.json.
 */
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
  // Split a price like "₹ 4,99" or "₹4,99" into the currency glyph + amount so the
  // Figma's "₹ Regular + amount Bold" weight contrast renders correctly.
  const [currencyChar, ...amountParts] = priceCurrent.trim();
  const amountStr = amountParts.join("").trim();

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
      className={cn(
        "w-full lg:w-[340px] lg:h-[482px] overflow-hidden",
        "rounded-[36px] border border-white/[0.22] bg-black/55 backdrop-blur-[30.1px]",
        "flex flex-col",
        className,
      )}
    >
      <div className="px-6 pt-6 pb-[18px]">
        <p
          className="text-[12px] font-medium uppercase tracking-[2px] text-brand-shade"
          style={{ fontFamily: "var(--font-sans, 'SF Pro Display'), system-ui, sans-serif" }}
        >
          {eyebrow}
        </p>

        <div className="mt-[3px] flex items-baseline gap-[6px] font-heading text-text-inverse">
          <span className="text-[37.5px] leading-[66px] font-normal">
            {currencyChar}
          </span>
          <span className="text-[37.5px] leading-[66px] font-bold">
            {amountStr}
          </span>
        </div>

        {priceOriginal ? (
          <p className="mt-[2px] text-[14px] leading-none text-text-inverse line-through">
            {priceOriginal}
          </p>
        ) : null}

        {discountBadge ? (
          <Badge
            variant="discount"
            className="mt-2 h-[18px] rounded-[4px] px-[5px] text-[12px] font-medium leading-none"
          >
            {discountBadge}
          </Badge>
        ) : null}
      </div>

      <div aria-hidden="true" className="mx-auto h-px w-[335px] bg-white/[0.15]" />

      <ul className="flex flex-col gap-[22px] px-6 pt-[22px] pb-[22px] text-text-inverse">
        {benefits.map((label) => (
          <li
            key={label}
            className="text-[14px] leading-[23.1px] font-normal"
          >
            {label}
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="mx-auto h-px w-[335px] bg-white/[0.15]" />

      <div className="mt-auto px-6 pt-[18px] pb-[22px]">
        {cta.onClick ? (
          <button
            type="button"
            onClick={cta.onClick}
            className={cn(
              "flex h-[44px] w-full items-center justify-center rounded-[10px]",
              "bg-brand-shade px-[15px] text-[15px] font-semibold leading-none",
              "text-[#243a42] transition-[transform,filter] duration-150",
              "hover:brightness-110 hover:shadow-md active:scale-[0.98]",
            )}
          >
            {cta.label}
          </button>
        ) : (
          <Link
            href={cta.href ?? "#buy"}
            className={cn(
              "flex h-[44px] w-full items-center justify-center rounded-[10px]",
              "bg-brand-shade px-[15px] text-[15px] font-semibold leading-none",
              "text-[#243a42] transition-[transform,filter] duration-150",
              "hover:brightness-110 hover:shadow-md active:scale-[0.98]",
            )}
          >
            {cta.label}
          </Link>
        )}
        {trustNote ? (
          <p className="mt-[14px] text-center text-[12px] leading-[19.8px] text-text-inverse opacity-50">
            {trustNote}
          </p>
        ) : null}
      </div>
    </motion.aside>
  );
}

export { RecordedClassPricingCard };
