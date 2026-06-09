"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
  notes: Record<string, string>;
  handler: (response: { razorpay_payment_id: string }) => void;
  theme: { color: string };
};

export type BatchOption = {
  label: string;
  value: string;
};

export type TimeSlotOption = {
  label: string;
  value: string;
};

export type BatchBookingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseName: string;
  /** Amount in smallest currency unit (paise for INR, cents for USD). */
  amountInPaise: number;
  razorpayKey: string;
  /** Razorpay currency code. Defaults to "INR". */
  currency?: "INR" | "USD";
  batches: BatchOption[];
  timeSlots: TimeSlotOption[];
  onPaymentSuccess?: (paymentId: string, formData: BookingFormData) => void;
};

export type BookingFormData = {
  name: string;
  email: string;
  mobile: string;
  batch: string;
  timeSlot: string;
  specialRequests: string;
};

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function BatchBookingDialog({
  open,
  onOpenChange,
  courseName,
  amountInPaise,
  razorpayKey,
  currency = "INR",
  batches,
  timeSlots,
  onPaymentSuccess,
}: BatchBookingDialogProps) {
  const router = useRouter();
  const locale = currency === "USD" ? "en-US" : "en-IN";
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [batch, setBatch] = React.useState(batches[0]?.value ?? "");
  const [timeSlot, setTimeSlot] = React.useState(timeSlots[0]?.value ?? "");
  const [specialRequests, setSpecialRequests] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !mobile.trim()) return;

    setLoading(true);

    const batchLabel = batches.find((b) => b.value === batch)?.label ?? batch;
    const timeSlotLabel = timeSlots.find((t) => t.value === timeSlot)?.label ?? timeSlot;

    // Save to Kylas CRM (best-effort)
    try {
      await fetch("/api/kylas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.trim(),
          email: email.trim(),
          phoneNumber: mobile.trim(),
          courseName,
          batch: batchLabel,
          timeSlot: timeSlotLabel,
          specialRequests: specialRequests.trim(),
        }),
      });
    } catch {
      // Kylas save is best-effort
    }

    // Save booking to Supabase with pending status via API route
    let bookingId: string | null = null;
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          courseName,
          batch: batchLabel,
          timeSlot: timeSlotLabel,
          specialRequests: specialRequests.trim(),
          amount: amountInPaise,
          currency,
        }),
      });
      const result = await res.json();
      bookingId = result.bookingId ?? null;
    } catch {
      // DB save is best-effort — don't block payment
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setLoading(false);
      alert("Failed to load payment gateway. Please try again.");
      return;
    }

    const options: RazorpayOptions = {
      key: razorpayKey,
      amount: amountInPaise,
      currency,
      name: "Bodhi School of Yoga",
      description: courseName,
      prefill: { name: name.trim(), email: email.trim(), contact: `+91${mobile.trim()}` },
      notes: {
        batch,
        timeSlot,
        specialRequests: specialRequests.trim(),
      },
      handler: async (response) => {
        // Update payment status to paid
        if (bookingId) {
          try {
            await fetch("/api/bookings", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId,
                paymentStatus: "paid",
                paymentId: response.razorpay_payment_id,
              }),
            });
          } catch {
            // Best-effort update
          }
        }
        onPaymentSuccess?.(response.razorpay_payment_id, {
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          batch,
          timeSlot,
          specialRequests: specialRequests.trim(),
        });
        onOpenChange(false);

        // Redirect to thank-you with purchase tracking params
        const amountInRupees = Math.round(amountInPaise / 100);
        const courseSlug = encodeURIComponent(courseName);
        const txnId = encodeURIComponent(response.razorpay_payment_id);
        router.push(`/thank-you?type=purchase&course=${courseSlug}&amount=${amountInRupees}&txn_id=${txnId}`);
      },
      theme: { color: "#2A5B4C" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
            "transition-opacity duration-200",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[540px]",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-2xl bg-white px-5 py-5 sm:px-6 sm:py-6 shadow-xl",
            "transition-all duration-200",
            "data-starting-style:opacity-0 data-starting-style:scale-95",
            "data-ending-style:opacity-0 data-ending-style:scale-95",
          )}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <Dialog.Title className="font-heading text-xl font-bold text-text-primary">
                {courseName}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-text-tertiary">
                Fill in your details to proceed with payment of{" "}
                <span className="font-semibold text-text-primary">
                  {new Intl.NumberFormat(locale, {
                    style: "currency",
                    currency,
                    minimumFractionDigits: 0,
                  }).format(amountInPaise / 100)}
                </span>
              </Dialog.Description>
            </div>
            <Dialog.Close
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                "text-text-tertiary hover:bg-surface-2 hover:text-text-primary",
                "transition-colors duration-150",
              )}
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-primary">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn(
                    "h-12 rounded-xl border border-border-1 bg-white px-4",
                    "text-sm text-text-primary placeholder:text-text-tertiary",
                    "outline-none transition-colors",
                    "focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30",
                  )}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-primary">
                  Mobile number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-tertiary">
                    + 91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="8123456789"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    className={cn(
                      "h-12 w-full rounded-xl border border-border-1 bg-white pl-14 pr-4",
                      "text-sm text-text-primary placeholder:text-text-tertiary",
                      "outline-none transition-colors",
                      "focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30",
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "h-12 rounded-xl border border-border-1 bg-white px-4",
                  "text-sm text-text-primary placeholder:text-text-tertiary",
                  "outline-none transition-colors",
                  "focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30",
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                Upcoming training batches
              </label>
              <div className="relative">
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className={cn(
                    "h-12 w-full appearance-none rounded-xl border border-border-1 bg-white px-4 pr-10",
                    "text-sm text-text-primary",
                    "outline-none transition-colors",
                    "focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30",
                  )}
                >
                  {batches.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-tertiary" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                Select time slot
              </label>
              <div className="relative">
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className={cn(
                    "h-12 w-full appearance-none rounded-xl border border-border-1 bg-white px-4 pr-10",
                    "text-sm text-text-primary",
                    "outline-none transition-colors",
                    "focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30",
                  )}
                >
                  {timeSlots.map((ts) => (
                    <option key={ts.value} value={ts.value}>
                      {ts.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-tertiary" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-primary">
                Special requests
              </label>
              <textarea
                rows={2}
                placeholder="Enter your special requests if you have any (optional)"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className={cn(
                  "rounded-xl border border-border-1 bg-white px-4 py-3",
                  "text-sm text-text-primary placeholder:text-text-tertiary",
                  "outline-none transition-colors resize-none",
                  "focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30",
                )}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "mt-1 h-14 w-full rounded-2xl",
                "bg-brand-primary text-white font-semibold text-base",
                "transition-all duration-150",
                "hover:opacity-90 active:scale-[0.98]",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
              )}
            >
              {loading
                ? "Loading..."
                : `Pay ${new Intl.NumberFormat(locale, {
                    style: "currency",
                    currency,
                    minimumFractionDigits: 0,
                  }).format(amountInPaise / 100)} — Proceed to Payment`}
            </button>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
