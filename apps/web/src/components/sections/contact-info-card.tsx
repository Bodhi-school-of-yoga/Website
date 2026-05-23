import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type ContactInfoCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string | null;
  className?: string;
};

export function ContactInfoCard({
  icon: Icon,
  label,
  value,
  href,
  className,
}: ContactInfoCardProps) {
  const baseClasses = cn(
    "flex items-start gap-5 rounded-2xl border border-border-3 bg-surface-1 p-6",
    className,
  );

  const interactiveClasses = cn(
    "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-sm hover:border-border-3",
  );

  const content = (
    <>
      <span
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-shade/20",
        )}
      >
        <Icon className="h-5 w-5 text-text-brand" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-mini uppercase tracking-widest text-text-brand">
          {label}
        </span>
        <span className="text-subtext-1 text-text-primary whitespace-pre-line">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(baseClasses, interactiveClasses)}>
        {content}
      </a>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}
