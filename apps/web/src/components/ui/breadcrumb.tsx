import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  tone?: "light" | "inverse";
  separator?: "slash" | "chevron";
  className?: string;
};

export function Breadcrumb({
  items,
  tone = "inverse",
  separator = "slash",
  className,
}: BreadcrumbProps) {
  const isInverse = tone === "inverse";

  const baseLinkColor = isInverse ? "text-text-inverse/80" : "text-text-tertiary";
  const hoverColor = isInverse
    ? "hover:text-text-inverse"
    : "hover:text-text-primary";
  const currentColor = isInverse ? "text-text-inverse" : "text-text-primary";
  const separatorColor = isInverse
    ? "text-text-inverse/50"
    : "text-text-tertiary";

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-body-sm",
        baseLinkColor,
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isCurrent = item.current ?? (isLast && !item.href);

        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {item.href && !isCurrent ? (
              <Link
                href={item.href}
                className={cn(
                  baseLinkColor,
                  "transition-colors duration-200",
                  hoverColor,
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current={isCurrent ? "page" : undefined} className={currentColor}>
                {item.label}
              </span>
            )}
            {!isLast ? (
              <span aria-hidden="true" className={separatorColor}>
                {separator === "chevron" ? (
                  <ChevronRight className="h-3.5 w-3.5" />
                ) : (
                  "/"
                )}
              </span>
            ) : null}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
