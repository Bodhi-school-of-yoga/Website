// YogaPoseDetailBody — the instructional content of a pose detail page:
// numbered steps, benefits, beginner tips, precautions, and variations.
import * as React from "react";
import { Check, Sparkles, TriangleAlert, Repeat } from "lucide-react";

import { RevealItem } from "@/components/ui/reveal-item";
import { cn } from "@/lib/utils";

export type YogaPoseDetailBodyProps = {
  name: string;
  steps: string[];
  benefits: string[];
  tips: string[];
  contraindications: string[];
  variations: string[];
  className?: string;
};

function Block({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <RevealItem className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        {eyebrow ? (
          <span className="text-mini uppercase tracking-widest text-text-brand">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="font-heading text-h4 text-text-primary">{title}</h2>
      </div>
      {children}
    </RevealItem>
  );
}

function IconList({
  items,
  icon,
  tone = "brand",
}: {
  items: string[];
  icon: React.ReactNode;
  tone?: "brand" | "warning";
}) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
              tone === "warning"
                ? "bg-accent-pink/10 text-accent-pink"
                : "bg-brand-primary/10 text-text-brand",
            )}
          >
            {icon}
          </span>
          <span className="text-body-md text-text-secondary">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function YogaPoseDetailBody({
  name,
  steps,
  benefits,
  tips,
  contraindications,
  variations,
  className,
}: YogaPoseDetailBodyProps) {
  return (
    <section className={cn("w-full bg-surface-0 py-10 sm:py-14 lg:py-24", className)}>
      <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-10 sm:gap-14 lg:gap-16 page-px">
        {/* Steps */}
        <Block eyebrow="How to do it" title={`Steps to Perform ${name}`}>
          <ol className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-border-2 bg-surface-1 px-4 py-3 sm:px-5 sm:py-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary font-heading text-body-sm font-bold text-text-inverse">
                  {i + 1}
                </span>
                <span className="pt-1 text-body-md text-text-secondary">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </Block>

        {/* Benefits + Tips, side by side on large screens */}
        <div className="grid gap-12 lg:grid-cols-2">
          {benefits.length > 0 ? (
            <Block eyebrow="Why practise it" title="Benefits">
              <IconList items={benefits} icon={<Check className="h-3.5 w-3.5" />} />
            </Block>
          ) : null}

          {tips.length > 0 ? (
            <Block eyebrow="For beginners" title="Tips">
              <IconList
                items={tips}
                icon={<Sparkles className="h-3.5 w-3.5" />}
              />
            </Block>
          ) : null}
        </div>

        {/* Precautions */}
        {contraindications.length > 0 ? (
          <RevealItem>
            <div className="flex flex-col gap-5 rounded-[22px] border border-accent-pink/20 bg-accent-pink/[0.04] px-6 py-8 sm:px-9">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-pink/10 text-accent-pink">
                  <TriangleAlert className="h-4 w-4" />
                </span>
                <h2 className="font-heading text-h4 text-text-primary">
                  Watch Out For
                </h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {contraindications.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-body-md text-text-secondary"
                  >
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-pink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ) : null}

        {/* Variations */}
        {variations.length > 0 ? (
          <Block eyebrow="Go further" title="Variations">
            <IconList items={variations} icon={<Repeat className="h-3.5 w-3.5" />} />
          </Block>
        ) : null}
      </div>
    </section>
  );
}
