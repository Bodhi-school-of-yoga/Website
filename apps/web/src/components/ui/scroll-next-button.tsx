import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ScrollNextButtonProps {
  href?: string;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
}

function ScrollNextButton({ href, onClick, ariaLabel, className }: ScrollNextButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center",
    "size-[46px] rounded-full shrink-0",
    "bg-brand-primary text-text-inverse",
    "shadow-card",
    "transition-opacity hover:opacity-90",
    className
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={baseClasses}>
        <ArrowUpRight className="size-5" />
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={baseClasses}>
      <ArrowUpRight className="size-5" />
    </button>
  );
}

export { ScrollNextButton };
