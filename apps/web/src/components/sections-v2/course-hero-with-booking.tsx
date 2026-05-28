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

  return (
    <>
      <CourseHero
        {...heroProps}
        cta={{ label: ctaLabel, onClick: () => setOpen(true) }}
      />
      <BatchBookingDialog
        open={open}
        onOpenChange={setOpen}
        courseName={courseName}
        amountInPaise={amountInPaise}
        razorpayKey={razorpayKey}
        batches={batches}
        timeSlots={timeSlots}
      />
    </>
  );
}
