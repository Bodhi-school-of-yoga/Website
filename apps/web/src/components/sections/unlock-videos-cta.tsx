"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type UnlockVideosCTAProps = {
  body: string;
  ctaLabel: string;
  ctaHref?: string;
  className?: string;
};

const bannerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function UnlockVideosCTA({
  body,
  ctaLabel,
  ctaHref = "#unlock",
  className,
}: UnlockVideosCTAProps) {
  return (
    <section className={cn("py-8 lg:py-12", className)}>
      <div className="mx-auto max-w-[1338px] page-px">
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Card
            className={cn(
              "bg-surface-mint-pale border border-border-peach rounded-2xl p-6 lg:p-8",
              "flex flex-col sm:flex-row items-center justify-between gap-4"
            )}
          >
            <p className="text-body-sm text-text-primary flex-1">{body}</p>
            <Button
              variant="default"
              size="lg"
              className="active:scale-[0.98] transition-transform duration-150"
              render={<Link href={ctaHref} />}
            >
              {ctaLabel}
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export { UnlockVideosCTA };
