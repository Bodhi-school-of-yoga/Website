"use client";

import * as React from "react";
import { WorkshopDetailHero, type WorkshopDetailHeroProps } from "./workshop-detail-hero";
import {
  BatchBookingDialog,
  type BatchOption,
  type TimeSlotOption,
} from "@/components/ui/batch-booking-dialog";

type WorkshopHeroWithBookingProps = Omit<WorkshopDetailHeroProps, "onCtaClick"> & {
  workshopName: string;
  amountInPaise: number;
  razorpayKey: string;
  batches: BatchOption[];
  timeSlots: TimeSlotOption[];
};

export function WorkshopHeroWithBooking({
  workshopName,
  amountInPaise,
  razorpayKey,
  batches,
  timeSlots,
  booking,
  ...heroProps
}: WorkshopHeroWithBookingProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const openDialog = () => setDialogOpen(true);

  return (
    <>
      <WorkshopDetailHero
        {...heroProps}
        onCtaClick={openDialog}
        booking={{
          ...booking,
          onCtaClick: openDialog,
        }}
      />
      <BatchBookingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        courseName={workshopName}
        amountInPaise={amountInPaise}
        razorpayKey={razorpayKey}
        batches={batches}
        timeSlots={timeSlots}
      />
    </>
  );
}
