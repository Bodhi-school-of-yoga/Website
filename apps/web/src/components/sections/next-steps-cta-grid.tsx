// NextStepsCtaGrid — grid of action cards guiding users to their next step after viewing a page.
import Link from "next/link";

import { cn } from "@/lib/utils";

export type NextStepsCtaItem = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type NextStepsCtaGridProps = {
  items: NextStepsCtaItem[];
  className?: string;
};

export function NextStepsCtaGrid({ items, className }: NextStepsCtaGridProps) {
  return (
    <section
      className={cn(
        "w-full page-px py-12 lg:py-16",
        className,
      )}
    >
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className={cn(
              "flex flex-col justify-between gap-8",
              "rounded-lg border border-border-1 bg-surface-1",
              "p-8",
            )}
          >
            <div className="space-y-3">
              <h3 className="text-h5 text-text-primary">{item.title}</h3>
              <p className="text-subtext-1 text-text-tertiary">{item.body}</p>
            </div>

            <Link
              href={item.ctaHref}
              className={cn(
                "inline-flex items-center justify-center",
                "h-[46px] w-[154px]",
                "rounded-lg bg-brand-primary",
                "text-sm font-semibold text-text-inverse",
                "transition-opacity duration-200 hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
              )}
            >
              {item.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
