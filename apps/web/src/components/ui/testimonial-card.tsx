"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type MotionProps, type Variants } from "framer-motion";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type TestimonialCardProps = {
  quote: string;
  authorName: string;
  authorMeta?: string;
  avatarSrc: string;
  avatarAlt?: string;
  showDecorativeQuote?: boolean;
  priority?: boolean;
  className?: string;
} & Omit<MotionProps, "children">;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TestimonialCard({
  quote,
  authorName,
  authorMeta,
  avatarSrc,
  avatarAlt = "",
  showDecorativeQuote = true,
  priority = false,
  className,
  ...motionProps
}: TestimonialCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full"
      {...motionProps}
    >
      <Card
        className={cn(
          "relative isolate h-full gap-0 overflow-hidden py-0",
          "rounded-3xl border border-border-2 bg-card hover:bg-card",
          "shadow-card transition-shadow duration-300",
          "hover:shadow-[0_18px_48px_-12px_rgba(0,40,44,0.18)]",
          className,
        )}
      >
        {showDecorativeQuote && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={cn(
              "pointer-events-none absolute -top-2 right-4 z-0 select-none",
              "font-heading text-[5.5rem] leading-none text-brand-primary/90",
            )}
          >
            &rdquo;
          </motion.span>
        )}

        <div className="relative z-10 flex h-full flex-col px-6 pb-6 pt-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
            className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-full"
          >
            <Image
              src={avatarSrc}
              alt={avatarAlt || authorName}
              fill
              sizes="88px"
              className="object-cover"
              priority={priority}
            />
          </motion.div>

          <div className="mt-5 flex flex-1 flex-col gap-3 border-t border-border-2/70 pt-5">
            <p
              className={cn(
                "font-heading text-[1.0625rem] font-semibold leading-[1.55] text-foreground",
                "sm:text-[1.125rem]",
              )}
            >
              &ldquo;{quote}&rdquo;
            </p>

            <p className="mt-auto pt-1 font-sans text-[0.8125rem] font-medium tracking-wide text-sage">
              <span aria-hidden="true">— </span>
              {authorName}
              {authorMeta ? (
                <>
                  <span className="text-sage/70">, {authorMeta}</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
