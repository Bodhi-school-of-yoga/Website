"use client";

// WeekPriceCard — a single tiered week-pricing card for the "Weekly Discount
// Drop" section: week label + discount% OFF + current price + strikethrough
// original price + seat status + optional "Live" badge + optional seats bar.
// Week 1 is the highlighted dark variant (bg-brand-dark / text-text-inverse).
//
// Presentational; every visible string arrives verbatim via props (the section
// supplies the exact Figma copy — no normalization here; a strikethrough that
// literally reads "₹9,99" ships as-is).
//
// Designed as a fade-in-up stagger child: it consumes the `hidden`/`visible`
// variants defined on its whileInView parent grid (staggerChildren 0.1).
// useReducedMotion drops the translate so the card appears statically. Tailwind
// hover-lift gives a gentle lift + shadow on all four cards.

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

export type WeekPriceCardProps = {
  /** Verbatim week label — e.g. "Week 1" | "Week 2" | "Week 3" | "Week 4 · Final". */
  week: string;
  /** Verbatim discount figure — e.g. "70%" | "50%" | "30%" | "10%". */
  discount: string;
  /** Suffix after the discount figure. */
  discountSuffix?: string;
  /** Verbatim rupee string — e.g. "₹12,570". Rendered as the current price. */
  price: string;
  /** Verbatim original price, rendered strikethrough — e.g. "₹41,900". */
  originalPrice?: string;
  /** Verbatim seat-status line — e.g. "17 / 50 seats left" | "50 seats unlock" | "Closes June 21". */
  status: string;
  /** Optional badge label — "Live" on Week 1 only. */
  badge?: string;
  /** When true, renders the dark Week 1 highlighted variant. */
  highlighted?: boolean;
  /** Week 1 partial seats bar fill (0–100). Omit for no bar. */
  progressPct?: number;
  className?: string;
};

// Mirrors the house fade-in-up primitive (y:12, HOUSE_EASE, 0.4s). The parent
// grid container owns staggerChildren; this child only exposes the variant.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function WeekPriceCard({
  week,
  discount,
  discountSuffix = "OFF",
  price,
  originalPrice = "₹41,900",
  status,
  badge,
  highlighted = false,
  progressPct,
  className,
}: WeekPriceCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : cardVariants}
      className={cn(
        "flex flex-col justify-between gap-5 rounded-3xl border p-6",
        highlighted
          ? "border-transparent bg-[#005340] text-text-inverse"
          : "border-[#F0F0F0] bg-[#FBFBFB] text-text-primary",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "font-sans text-sm uppercase tracking-wider",
            highlighted ? "text-text-inverse/80" : "text-text-tertiary",
          )}
        >
          {week}
        </span>
        {badge ? (
          <Badge variant="discount" className="shrink-0">
            {badge}
          </Badge>
        ) : null}
      </div>

      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            "font-heading text-h2 leading-none font-normal",
            highlighted ? "text-text-mint-shade" : "text-black",
          )}
        >
          {discount}
        </span>
        <span
          className={cn(
            "font-sans text-sm",
            highlighted ? "text-text-inverse/80" : "text-text-tertiary",
          )}
        >
          {discountSuffix}
        </span>
      </div>

      <div className={cn("-mx-6 flex items-baseline gap-2 border-b  px-6 pb-5",highlighted ? "border-text-inverse/20" : "border-[#E2E2E2]")}
      >
        <span className="font-heading text-h5 font-normal leading-none ">{price}</span>
        {originalPrice ? (
          <span
            className={cn(
              "font-sans text-[14px] line-through",
              highlighted ? "text-text-inverse/60" : "text-[#4A574F]",
            )}
          >
            {originalPrice}
          </span>
        ) : null}
      </div>

      <span
        className={cn(
          "font-sans text-sm",
          highlighted ? "text-text-inverse/80" : "text-text-tertiary",
        )}
      >
        {status}
      </span>

      <ProgressBar
        value={progressPct ?? 0}
        tone={highlighted ? "dark" : "light"}
        animateOnView
      />
    </motion.div>
  );
}

export { WeekPriceCard };
