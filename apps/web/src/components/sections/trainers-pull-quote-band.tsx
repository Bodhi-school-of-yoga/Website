// TrainersPullQuoteBand — full-width inspirational pull-quote strip on the Trainers page.
import * as React from "react";

import { cn } from "@/lib/utils";

export type TrainersPullQuoteBandProps = {
  highlight?: string;
  body?: string;
  className?: string;
};

export function TrainersPullQuoteBand({
  highlight = "Yoga is not just a series of poses and techniques.",
  body = "It is a lifestyle to be pursued day in and day out.\nIn this, our teachers lead by example",
  className,
}: TrainersPullQuoteBandProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-brand-green-darkest text-text-inverse",
        "py-12 sm:py-14 lg:py-16",
        className,
      )}
    >
      <div className="relative mx-auto flex max-w-[1340px] items-center justify-center page-px">
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none select-none",
            "font-heading font-semibold leading-none",
            "text-[64px] sm:text-[80px] lg:text-[100px]",
            "text-text-cyan/35",
            "absolute left-[3%] top-1/2 -translate-y-1/2 rotate-180",
            "hidden md:block",
          )}
        >
          &rdquo;
        </span>

        <p
          className={cn(
            "max-w-[760px] text-center font-semibold",
            "text-subtext-3 sm:text-h5 lg:text-[28px] lg:leading-[33px]",
          )}
        >
          <span className="text-text-mint-pale">{highlight}</span>
          <br aria-hidden="true" />
          {body.split("\n").map((line, idx, arr) => (
            <React.Fragment key={idx}>
              {line}
              {idx < arr.length - 1 ? <br aria-hidden="true" /> : null}
            </React.Fragment>
          ))}
        </p>

        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none select-none",
            "font-heading font-semibold leading-none",
            "text-[64px] sm:text-[80px] lg:text-[100px]",
            "text-text-cyan/35",
            "absolute right-[3%] top-1/2 -translate-y-1/2",
            "hidden md:block",
          )}
        >
          &rdquo;
        </span>
      </div>
    </section>
  );
}
