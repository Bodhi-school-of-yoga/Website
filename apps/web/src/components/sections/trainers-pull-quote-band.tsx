// TrainersPullQuoteBand — dark-green band with oversized italic Fraunces opening-quote glyph,
// body quote, and attribution. Single responsive layout that scales from mobile to desktop.
import { cn } from "@/lib/utils";

export type TrainersPullQuoteBandProps = {
  quote?: string;
  attribution?: string;
  className?: string;
};

export function TrainersPullQuoteBand({
  quote = "Yoga is not just a series of poses and techniques. It is a lifestyle to be pursued day in and day out. In this, our teachers lead by example.",
  attribution = "— The Bodhi Faculty",
  className,
}: TrainersPullQuoteBandProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-brand-green-deep text-text-inverse",
        "py-12 sm:py-16 lg:py-20",
        className,
      )}
    >
      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-start page-px">
        <span
          aria-hidden="true"
          className={cn(
            "font-heading italic font-normal leading-none select-none pointer-events-none",
            "text-[80px] sm:text-[120px] lg:text-[160px]",
            "text-text-mint-pale",
          )}
        >
          &ldquo;
        </span>

        <p
          className={cn(
            "mt-2 sm:mt-4 max-w-[820px] font-heading italic font-normal",
            "text-[22px] leading-[1.3] sm:text-[28px] lg:text-[34px] lg:leading-[1.35]",
            "text-text-inverse",
          )}
        >
          {quote}
        </p>

        <p
          className={cn(
            "mt-6 sm:mt-8 font-medium",
            "text-[13px] sm:text-[14px] lg:text-body-md",
            "text-text-mint-pale",
          )}
        >
          {attribution}
        </p>
      </div>
    </section>
  );
}
