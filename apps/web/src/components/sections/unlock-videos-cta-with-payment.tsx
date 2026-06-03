"use client";

import * as React from "react";
import { UnlockVideosCTA } from "./unlock-videos-cta";
import { BatchBookingDialog, type BatchOption, type TimeSlotOption } from "@/components/ui/batch-booking-dialog";

type UnlockVideosCTAWithPaymentProps = {
  body: string;
  ctaLabel: string;
  courseName: string;
  amountInPaise: number;
  razorpayKey: string;
  batches: BatchOption[];
  timeSlots: TimeSlotOption[];
  className?: string;
};

export function UnlockVideosCTAWithPayment({
  body,
  ctaLabel,
  courseName,
  amountInPaise,
  razorpayKey,
  batches,
  timeSlots,
  className,
}: UnlockVideosCTAWithPaymentProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <UnlockVideosCTA
        body={body}
        ctaLabel={ctaLabel}
        onCtaClick={() => setDialogOpen(true)}
        className={className}
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
