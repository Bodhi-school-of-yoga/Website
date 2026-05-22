'use client';

import * as React from "react";
import { useState } from "react";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  className?: string;
}

function FaqItem({ question, answer, defaultOpen = false, className }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = React.useId();

  return (
    <div className={cn("border-b border-border-1", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-5 text-left",
          "text-subtext-2 text-text-secondary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        <span>{question}</span>
        {open ? (
          <Minus size={18} strokeWidth={2} className="shrink-0 text-text-tertiary" />
        ) : (
          <Plus size={18} strokeWidth={2} className="shrink-0 text-text-tertiary" />
        )}
      </button>
      {open && answer && (
        <div
          id={panelId}
          className="pb-5 text-subtext-2 text-text-tertiary"
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export { FaqItem };
