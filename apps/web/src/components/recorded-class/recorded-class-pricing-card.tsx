"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChecklistItem } from "@/components/ui/checklist-item";
import { cn } from "@/lib/utils";

export type RecordedClassPricingCardProps = {
  eyebrow: string;
  priceCurrent: string;
  priceOriginal?: string;
  discountBadge?: string;
  benefits: string[];
  cta: { label: string; href: string };
  trustNote?: string;
  className?: string;
};

/**
 * Page-scoped dark glassmorphic pricing card for the recorded-class hero (Figma 353:10685).
 * Composes Badge (variant='discount'), Button (variant='mint', size='pill'), and
 * ChecklistItem (tone='plain') over a glass surface.
 *
 * Glass surface utilities (rounded-[36px], border-white/20, bg-black/55, backdrop-blur-2xl)
 * are intentionally ad-hoc — flagged in 03_build_plan.json token_decisions_needed
 * (missing `surface-glass-dark` semantic token).
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
  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
      className={cn(
        "w-full max-w-[520px] p-8 sm:p-10",
        "rounded-[36px] border border-white/20 bg-black/55 backdrop-blur-2xl",
        "transition-shadow duration-300 ease-out hover:shadow-lg",
        className,
      )}
    >
      <p className="text-mini uppercase tracking-widest text-brand-shade">
        {eyebrow}
      </p>

      <div className="mt-2 flex items-baseline gap-3">
        <span className="text-h3 text-text-inverse">{priceCurrent}</span>
        {priceOriginal ? (
          <span className="text-body-sm text-text-inverse/70 line-through">
            {priceOriginal}
          </span>
        ) : null}
        {discountBadge ? (
          <Badge variant="discount">{discountBadge}</Badge>
        ) : null}
      </div>

      <div aria-hidden="true" className="my-6 h-px bg-white/15" />

      <ul className="flex flex-col gap-3">
        {benefits.map((label) => (
          <li key={label}>
            <ChecklistItem label={label} tone="plain" />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Button
          variant="mint"
          size="pill"
          className="w-full transition-all duration-200 ease-out hover:brightness-110 hover:shadow-md active:scale-[0.98]"
          render={<Link href={cta.href}>{cta.label}</Link>}
        />
        {trustNote ? (
          <p className="text-mini text-text-inverse/60 normal-case tracking-normal text-center">
            {trustNote}
          </p>
        ) : null}
      </div>
    </motion.aside>
  );
}

export { RecordedClassPricingCard };
