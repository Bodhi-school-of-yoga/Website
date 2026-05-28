"use client";

import * as React from "react";
import { CourseHeroSection, type CourseHeroSectionProps } from "./course-hero-section";
import {
  BatchBookingDialog,
  type BatchOption,
  type TimeSlotOption,
} from "@/components/ui/batch-booking-dialog";

type CourseHeroWithBookingProps = Omit<CourseHeroSectionProps, "onCtaClick" | "ctaHref"> & {
  courseName: string;
  amountInPaise: number;
  razorpayKey: string;
  batches: BatchOption[];
  timeSlots: TimeSlotOption[];
};

export function CourseHeroWithBooking({
  courseName,
  amountInPaise,
  razorpayKey,
  batches,
  timeSlots,
  ...heroProps
}: CourseHeroWithBookingProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <CourseHeroSection
        {...heroProps}
        onCtaClick={() => setDialogOpen(true)}
      />
      <BatchBookingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        courseName={courseName}
        amountInPaise={amountInPaise}
        razorpayKey={razorpayKey}
        batches={batches}
        timeSlots={timeSlots}
      />
    </>
  );
}
