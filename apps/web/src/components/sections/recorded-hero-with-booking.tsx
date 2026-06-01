"use client";

import * as React from "react";
import {
  RecordedClassesHero,
  type RecordedClassesHeroProps,
} from "./recorded-classes-hero";
import {
  BatchBookingDialog,
  type BatchOption,
  type TimeSlotOption,
} from "@/components/ui/batch-booking-dialog";

type RecordedHeroWithBookingProps = RecordedClassesHeroProps & {
  courseName: string;
  amountInPaise: number;
  razorpayKey: string;
  batches: BatchOption[];
  timeSlots: TimeSlotOption[];
};

export function RecordedHeroWithBooking({
  courseName,
  amountInPaise,
  razorpayKey,
  batches,
  timeSlots,
  pricing,
  ...heroProps
}: RecordedHeroWithBookingProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const openDialog = () => setDialogOpen(true);

  return (
    <>
      <RecordedClassesHero
        {...heroProps}
        onCtaClick={openDialog}
        pricing={{
          ...pricing,
          cta: { ...pricing.cta, onClick: openDialog },
        }}
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
