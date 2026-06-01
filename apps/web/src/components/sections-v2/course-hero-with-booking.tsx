"use client";

import * as React from "react";

import { CourseHero, type CourseHeroProps } from "./course-hero";
import {
  BatchBookingDialog,
  type BatchOption,
  type TimeSlotOption,
} from "@/components/ui/batch-booking-dialog";

type CourseHeroWithBookingProps = Omit<CourseHeroProps, "cta"> & {
  ctaLabel: string;
  courseName: string;
  amountInPaise: number;
  razorpayKey: string;
  batches: BatchOption[];
  timeSlots: TimeSlotOption[];
};

export function CourseHeroWithBooking({
  ctaLabel,
  courseName,
  amountInPaise,
  razorpayKey,
  batches,
  timeSlots,
  ...heroProps
}: CourseHeroWithBookingProps) {
  const [open, setOpen] = React.useState(false);
  // For subscription courses the charged amount follows the selected tier;
  // flat-price courses never fire onPlanChange and keep `amountInPaise`.
  const [planAmountInPaise, setPlanAmountInPaise] = React.useState<number | null>(
    null,
  );

  return (
    <>
      <CourseHero
        {...heroProps}
        onPlanChange={(plan) =>
          setPlanAmountInPaise(
            Number(plan.price.replace(/[^\d]/g, "")) * 100 || null,
          )
        }
        cta={{ label: ctaLabel, onClick: () => setOpen(true) }}
      />
      <BatchBookingDialog
        open={open}
        onOpenChange={setOpen}
        courseName={courseName}
        amountInPaise={planAmountInPaise ?? amountInPaise}
        razorpayKey={razorpayKey}
        batches={batches}
        timeSlots={timeSlots}
      />
    </>
  );
}
