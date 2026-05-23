import * as React from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChecklistItem } from "@/components/ui/checklist-item";
import { cn } from "@/lib/utils";

type PricingBuyCardProps = {
  caption: string;
  price: string;
  priceStrike?: string;
  saveBadge?: string;
  perks: string[];
  ctaLabel: string;
  ctaHref?: string;
  secureNote?: string;
  className?: string;
};

function PricingBuyCard({
  caption,
  price,
  priceStrike,
  saveBadge,
  perks,
  ctaLabel,
  ctaHref,
  secureNote,
  className,
}: PricingBuyCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-md rounded-2xl border border-border-1 bg-surface-0 p-8 shadow-card",
        className,
      )}
    >
      <p className="text-mini uppercase tracking-wider text-text-tertiary">
        {caption}
      </p>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-h2 text-text-primary">{price}</span>
        {priceStrike ? (
          <span className="text-body-sm text-text-tertiary line-through">
            {priceStrike}
          </span>
        ) : null}
        {saveBadge ? <Badge variant="secondary">{saveBadge}</Badge> : null}
      </div>

      <ul className="mt-6 space-y-2">
        {perks.map((perk) => (
          <li key={perk}>
            <ChecklistItem label={perk} />
          </li>
        ))}
      </ul>

      <Button
        render={<Link href={ctaHref ?? "#unlock"} />}
        size="lg"
        className="mt-6 w-full transition-transform active:scale-[0.98]"
      >
        {ctaLabel}
      </Button>

      {secureNote ? (
        <p className="mt-3 text-center text-mini text-text-tertiary">
          {secureNote}
        </p>
      ) : null}
    </Card>
  );
}

export { PricingBuyCard };
export type { PricingBuyCardProps };
