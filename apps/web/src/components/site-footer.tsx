import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Image from "next/image";

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  /** Optional address lines rendered above the links (used by the "Visit" column). */
  lines?: string[];
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
    /** Site URL displayed in the brand column. Accepts an object or a plain string. */
    url?: { label: string; href: string } | string;
  };
  columns: FooterColumn[];
  address?: FooterAddressColumn;
  legalLeft?: string;
  legalRight?: string;
  className?: string;
};

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = cn(
    "inline-block text-[13.5px] leading-[21px] tracking-[0.08px] text-text-inverse/75",
    "md:text-[14.5px] md:leading-[22.48px]",
    "transition-colors duration-200 hover:text-text-inverse",
    "focus-visible:outline-none focus-visible:underline focus-visible:text-text-inverse",
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
        "w-full bg-brand-dark nav-px pb-6 pt-0 text-text-inverse",
        "sm:pb-8 md:pb-10",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 sm:gap-8">
        <div
          className={cn(
            "grid gap-6 sm:gap-8",
            "grid-cols-1 sm:grid-cols-2",
            address
              ? "md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]"
              : "md:grid-cols-[1.3fr_1fr_1fr_1fr]",
          )}
        >
          {/* Brand column */}
          <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1 md:gap-[13.7px]">
            <Link
              href="/"
              aria-label="Bodhi — home"
              className={cn(
                "w-fit rounded-sm italic leading-[1.2] tracking-[-0.02em] text-text-inverse",
                "text-[2.5rem] lg:text-[3rem]",
                "transition-opacity hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade",
              )}
              style={{
                fontFamily:
                  'var(--font-fraunces), Georgia, "Times New Roman", serif',
                fontWeight: 300,
              }}
            >
              <Image
                src="/bodhi-logo-light-v2.png"
              alt="Bodhi Yoga Studio"
              width={140}
              height={636}
              priority
                     
                    />
            </Link>
            {brand.tagline && (
              <p
                className={cn(
                  "max-w-[320px] whitespace-pre-line text-text-inverse/75",
                  "text-[13.5px] leading-[21px] tracking-[0.08px]",
                  "md:text-[14.5px] md:leading-[22.48px]",
                )}
              >
                {brand.tagline}
              </p>
            )}
            {brand.url &&
              (typeof brand.url === "string" ? (
                <span
                  className={cn(
                    "text-text-inverse",
                    "text-[13.5px] leading-[21px] tracking-[0.29px]",
                    "md:text-[14.5px] md:leading-[22.48px]",
                  )}
                >
                  {brand.url}
                </span>
              ) : (
                <a
                  href={brand.url.href}
                  className={cn(
                    "text-text-inverse transition-opacity hover:opacity-80",
                    "text-[13.5px] leading-[21px] tracking-[0.29px]",
                    "md:text-[14.5px] md:leading-[22.48px]",
                  )}
                >
                  {brand.url.label}
                </a>
              ))}
          </div>

          {columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="flex flex-col gap-3 md:gap-[17px]"
            >
              <h4 className="text-[11px] font-medium uppercase leading-[17px] tracking-[2.42px] text-text-inverse">
                {column.heading}
              </h4>
              {column.lines && column.lines.length > 0 && (
                <ul className="flex flex-col gap-2 md:gap-[9px]">
                  {column.lines.map((line) => (
                    <li
                      key={`${column.heading}-line-${line}`}
                      className={cn(
                        "text-text-inverse/75",
                        "text-[13.5px] leading-[21px] tracking-[0.08px]",
                        "md:text-[14.5px] md:leading-[22.48px]",
                      )}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              )}
              <ul className="flex flex-col gap-2 md:gap-[9px]">
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
              className="flex flex-col gap-3 md:gap-[17px]"
              aria-label={address.heading}
            >
              <h4 className="text-[11px] font-medium uppercase leading-[17px] tracking-[2.42px] text-text-inverse">
                {address.heading}
              </h4>
              <address className="not-italic">
                <ul className="flex flex-col gap-2 md:gap-[9px]">
                  {address.lines.map((line) => (
                    <li
                      key={line}
                      className={cn(
                        "text-text-inverse/75",
                        "text-[13.5px] leading-[21px] tracking-[0.08px]",
                        "md:text-[14.5px] md:leading-[22.48px]",
                      )}
                    >
                      {line}
                    </li>
                  ))}
                  {address.action && (
                    <li>
                      <FooterLinkItem link={address.action} />
                    </li>
                  )}
                </ul>
              </address>
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex flex-col-reverse items-start justify-between gap-2 border-t border-text-inverse/10 pt-4",
            "sm:flex-row sm:items-center sm:gap-3 sm:pt-5",
          )}
        >
          <p
            className={cn(
              "text-text-inverse/80",
              "text-[11.5px] leading-[18px] tracking-[0.08px]",
              "md:text-[12.5px] md:leading-[19.38px] md:text-text-inverse",
            )}
          >
            {legalLeft}
          </p>
          <p
            className={cn(
              "text-text-inverse/80",
              "text-[11.5px] leading-[18px] tracking-[0.08px]",
              "md:text-[12.5px] md:leading-[19.38px] md:text-text-inverse",
            )}
          >
            {legalRight}
          </p>
        </div>
      </div>
    </footer>
  );
}
