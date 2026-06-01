// TrainersPullQuoteBand — dark-green band with oversized italic Fraunces opening-quote glyph,
// body quote, and attribution. Single responsive layout that scales from mobile to desktop.
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import Image from "next/image";

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
        "relative w-full bg-[#003E22] text-text-inverse",
        "py-12 sm:py-16 lg:py-20",
        className,
      )}
    >
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center page-px text-center">

<div className="max-w-[760px]">
        <p
          className={cn(
            "flex justify-center font-heading font-normal",
            "text-[22px] leading-[1.3] sm:text-[28px] lg:text-[34px] lg:leading-[1.35]",
            "text-text-inverse",
          )}
        >

          <span className="flex  items-center text-[#B4FFEF]">
            Yoga is not just a series of poses and techniques.
            <Image
              src="/comma1.svg"
              height="100"
              width="40"
              alt=""
            />
          </span>




        </p>
        <p
          className={cn(
            "flex justify-center font-heading font-normal",
            "text-[22px] leading-[1.3] sm:text-[28px] lg:text-[34px] lg:leading-[1.35]",
            "text-text-inverse",
          )}
        >
          It is a lifestyle to be pursued day in and day out.

        </p>
        <p
          className={cn(
            "flex justify-center font-heading font-normal",
            "text-[22px] leading-[1.3] sm:text-[28px] lg:text-[34px] lg:leading-[1.35]",
            "text-text-inverse",
          )}
        >
          <Image
            src="/comma2.svg"
            height="100"
            width="40"
            alt=""
          />
          <span className="ml-5">
            In this, our teachers lead by example
          </span>
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
      </div>
    </section>
  );
}
