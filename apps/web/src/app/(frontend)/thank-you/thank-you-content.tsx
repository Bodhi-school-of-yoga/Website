"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ShoppingBag, MessageSquare, Mail } from "lucide-react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type ConversionType = "contact" | "enquiry" | "purchase";

const CONTENT: Record<
  ConversionType,
  {
    icon: React.ReactNode;
    heading: string;
    description: string;
    cta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  }
> = {
  contact: {
    icon: <Mail className="h-10 w-10 text-brand-primary" strokeWidth={1.5} />,
    heading: "Message Received!",
    description:
      "Thank you for reaching out. Our team will review your message and get back to you within 24 hours.",
    cta: { label: "Back to Home", href: "/" },
    secondaryCta: { label: "Explore Courses", href: "/yoga-courses" },
  },
  enquiry: {
    icon: (
      <MessageSquare
        className="h-10 w-10 text-brand-primary"
        strokeWidth={1.5}
      />
    ),
    heading: "Enquiry Submitted!",
    description:
      "Thank you for your interest. Our team will reach out to you within 24 hours to help you get started.",
    cta: { label: "Back to Home", href: "/" },
    secondaryCta: { label: "Explore Courses", href: "/yoga-courses" },
  },
  purchase: {
    icon: (
      <ShoppingBag
        className="h-10 w-10 text-brand-primary"
        strokeWidth={1.5}
      />
    ),
    heading: "Enrollment Confirmed!",
    description:
      "Your payment was successful and your seat is reserved. You will receive a confirmation email with all the details shortly.",
    cta: { label: "Back to Home", href: "/" },
    secondaryCta: { label: "View My Courses", href: "/yoga-courses" },
  },
};

const FALLBACK = CONTENT.contact;

const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-brand-primary px-8 py-3.5 text-[15px] font-semibold text-text-inverse transition-all duration-200 hover:brightness-105 active:scale-[0.98]";
const btnSecondary =
  "inline-flex items-center justify-center rounded-full border border-border-2 bg-surface-1 px-8 py-3.5 text-[15px] font-semibold text-text-primary transition-all duration-200 hover:bg-surface-2 active:scale-[0.98]";

export function ThankYouContent() {
  const searchParams = useSearchParams();

  const type = (searchParams.get("type") ?? "contact") as ConversionType;
  const course = searchParams.get("course");
  const amount = searchParams.get("amount");
  const interest = searchParams.get("interest");
  const txnId = searchParams.get("txn_id");

  // Push GTM dataLayer event once on mount
  const pushed = React.useRef(false);
  React.useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: "conversion",
      conversion_type: type,
      ...(course && { course }),
      ...(amount && { value: Number(amount) }),
      ...(interest && { interest }),
      ...(txnId && { transaction_id: txnId }),
    });
  }, [type, course, amount, interest, txnId]);

  const content = CONTENT[type] ?? FALLBACK;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10">
        {content.icon}
      </div>

      <h1 className="font-heading text-h2 text-text-primary">
        {content.heading}
      </h1>

      <p className="text-body-md leading-relaxed text-text-secondary">
        {content.description}
      </p>

      {/* Purchase-specific details */}
      {type === "purchase" && (course || amount) && (
        <div className="w-full rounded-2xl border border-border-2 bg-surface-1 px-6 py-4 text-left">
          {course && (
            <p className="text-body-sm text-text-secondary">
              <span className="font-medium text-text-primary">Course:</span>{" "}
              {course.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </p>
          )}
          {amount && (
            <p className="mt-1 text-body-sm text-text-secondary">
              <span className="font-medium text-text-primary">
                Amount Paid:
              </span>{" "}
              ₹{Number(amount).toLocaleString("en-IN")}
            </p>
          )}
          {txnId && (
            <p className="mt-1 text-body-sm text-text-secondary">
              <span className="font-medium text-text-primary">
                Transaction ID:
              </span>{" "}
              {txnId}
            </p>
          )}
        </div>
      )}

      {/* Enquiry interest */}
      {type === "enquiry" && interest && (
        <p className="text-body-sm text-text-tertiary">
          You enquired about:{" "}
          <span className="font-medium text-text-primary">{interest}</span>
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link href={content.cta.href} className={btnPrimary}>
          {content.cta.label}
        </Link>
        {content.secondaryCta && (
          <Link href={content.secondaryCta.href} className={btnSecondary}>
            {content.secondaryCta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
