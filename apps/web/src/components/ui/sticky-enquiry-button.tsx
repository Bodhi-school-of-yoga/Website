"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const INTEREST_OPTIONS = [
  "Regular Classes",
  "Teacher Training",
  "Workshops",
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  interestedIn: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = { name: "", phone: "", email: "", interestedIn: "" };

export function StickyEnquiryButton() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [fields, setFields] = React.useState<FormData>(INITIAL);
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const panelRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  function validate(): Errors {
    const e: Errors = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(fields.phone.replace(/\D/g, "")))
      e.phone = "Enter a valid 10-digit number";
    if (!fields.email.trim()) e.email = "Email is required";
    else if (!EMAIL_REGEX.test(fields.email)) e.email = "Enter a valid email";
    if (!fields.interestedIn) e.interestedIn = "Please select an option";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) throw new Error("Submission failed");

      const interest = encodeURIComponent(fields.interestedIn);
      setFields(INITIAL);
      setErrors({});
      setOpen(false);
      router.push(`/thank-you?type=enquiry&interest=${interest}`);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function setField(key: keyof FormData, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-[14px] text-text-primary placeholder:text-text-tertiary/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary";

  return (
    <>
      {/* Floating button — sits above WhatsApp button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-label={open ? "Close enquiry form" : "Open enquiry form"}
        className={cn(
          "fixed bottom-2 right-4 sm:bottom-4 sm:right-6 z-50",
          "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)]",
          "transition-all duration-200 hover:scale-110 active:scale-95",
          open
            ? "bg-text-primary text-white"
            : "bg-brand-primary text-white",
        )}
      >
        {open ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </button>

      {/* Enquiry form panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed bottom-36 right-4 sm:bottom-42 sm:right-6 z-50",
              "w-[calc(100vw-2rem)] max-w-[360px]",
              "rounded-2xl border border-border-2 bg-surface-0 shadow-xl",
              "overflow-hidden",
            )}
          >
            {/* Header */}
            <div className="bg-brand-primary px-5 py-4">
              <p className="text-[15px] font-semibold text-white">
                Quick Enquiry
              </p>
              <p className="mt-0.5 text-[12px] text-white/70">
                We'll get back to you within 24 hours
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={fields.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={cn(inputClass, errors.name && "ring-2 ring-red-400")}
                />
                {errors.name && (
                  <p className="mt-1 text-[12px] text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={fields.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={cn(inputClass, errors.phone && "ring-2 ring-red-400")}
                />
                {errors.phone && (
                  <p className="mt-1 text-[12px] text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={fields.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={cn(inputClass, errors.email && "ring-2 ring-red-400")}
                />
                {errors.email && (
                  <p className="mt-1 text-[12px] text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Interested In */}
              <div className="relative">
                <select
                  value={fields.interestedIn}
                  onChange={(e) => setField("interestedIn", e.target.value)}
                  className={cn(
                    inputClass,
                    "appearance-none pr-10",
                    !fields.interestedIn && "text-text-tertiary/60",
                    errors.interestedIn && "ring-2 ring-red-400",
                  )}
                >
                  <option value="" disabled>
                    Interested in *
                  </option>
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                {errors.interestedIn && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.interestedIn}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="text-[13px] text-red-500">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 h-11 w-full rounded-full bg-brand-primary text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-105 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
