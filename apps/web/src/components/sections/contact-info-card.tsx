// ContactInfoCard — single contact detail card (phone, email, or address) used in the Contact page sidebar.
import Image from "next/image";

import { cn } from "@/lib/utils";

export type ContactInfoCardProps = {
  iconSrc: string;
  label: string;
  value: string;
  href?: string | null;
  className?: string;
};

export function ContactInfoCard({
  iconSrc,
  label,
  value,
  href,
  className,
}: ContactInfoCardProps) {
  const baseClasses = cn("flex items-start gap-5", className);

  const interactiveClasses =
    "transition-all duration-300 ease-out hover:-translate-y-0.5";

  const content = (
    <>
      <Image
        src={iconSrc}
        alt=""
        width={38}
        height={38}
        className="shrink-0 rounded-lg"
      />
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-mini uppercase tracking-widest text-text-brand">
          {label}
        </span>
        <span className="text-subtext-1 text-text-primary whitespace-pre-line">
          {value}
        </span>
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
