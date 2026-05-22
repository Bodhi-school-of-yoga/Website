import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export type FooterAddressColumn = {
  heading: string;
  /** Free-form lines (e.g. address) */
  lines: string[];
  /** Trailing actionable link (e.g. "Get directions →") */
  action?: FooterLink;
};

export type SiteFooterProps = {
  brand: {
    wordmark?: string;
    tagline?: string;
    url?: { label: string; href: string };
  };
  columns: FooterColumn[];
  address?: FooterAddressColumn;
  legalLeft?: string;
  legalRight?: string;
  className?: string;
};

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = cn(
    "inline-block py-1 text-body-md leading-snug text-white/75",
    "transition-colors duration-200 hover:text-white",
    "focus-visible:outline-none focus-visible:underline focus-visible:text-white",
  );
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function SiteFooter({
  brand,
  columns,
  address,
  legalLeft = "© Bodhi School of Yoga  ·  Yoga Alliance Registered School (RYS-200, RYS-300)",
  legalRight = "Designed quietly. Practised daily.",
  className,
}: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "w-full bg-brand-dark px-6 pb-10 pt-20 text-white",
        "sm:px-10 sm:pt-24 lg:px-16",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10">
          <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
            {brand.wordmark && (
              <Link
                href="/"
                className="font-serif text-h4 italic font-light leading-none text-white"
                aria-label="Bodhi — home"
              >
                {brand.wordmark}
              </Link>
            )}
            {brand.tagline && (
              <p className="max-w-xs whitespace-pre-line text-body-md text-white/75">
                {brand.tagline}
              </p>
            )}
            {brand.url && (
              <a
                href={brand.url.href}
                className="mt-2 inline-block text-body-md text-white transition-opacity hover:opacity-80"
              >
                {brand.url.label}
              </a>
            )}
          </div>

          {columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="flex flex-col gap-3"
            >
              <h4 className="text-mini uppercase text-white">
                {column.heading}
              </h4>
              <ul className="flex flex-col gap-0.5">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {address && (
            <div
              className="flex flex-col gap-3"
              aria-label={address.heading}
            >
              <h4 className="text-mini uppercase text-white">
                {address.heading}
              </h4>
              <address className="not-italic text-body-md text-white/75">
                {address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              {address.action && (
                <FooterLinkItem link={address.action} />
              )}
            </div>
          )}
        </div>

        <div
          className={cn(
            "mt-16 flex flex-col-reverse items-start justify-between gap-3 border-t pt-6",
            "border-white/10 sm:flex-row sm:items-center",
          )}
        >
          <p className="text-body-sm text-white/65">{legalLeft}</p>
          <p className="text-body-sm italic text-white/65">{legalRight}</p>
        </div>
      </div>
    </footer>
  );
}
