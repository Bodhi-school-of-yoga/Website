'use client';

// FaqItem — accordion-style FAQ row that toggles its answer on click.

import * as React from "react";
import { useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const reducedMotion = useReducedMotion();

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
          "transition-transform active:scale-[0.98]",
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
      <AnimatePresence initial={false}>
        {open && answer && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-subtext-2 text-text-tertiary">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { FaqItem };
