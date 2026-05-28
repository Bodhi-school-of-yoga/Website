'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface ClosingCtaContent {
  /** Italic wordmark shown above the headline (defaults to "Bodhi"). */
  wordmark?: string;
  /** Headline lead — rendered in white. e.g. "Begin where". */
  headingLead: string;
  /** Headline italic accent — rendered in mint-shade italic. e.g. "you are.". */
  headingAccent: string;
  subheading: string;
  primary: { label: string; href: string };
}

export interface FooterLinkColumn {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

export interface ClosingFooterContent {
  logoHref: string;
  /** Italic wordmark for the footer brand column. */
  wordmark?: string;
  /** Multi-line tagline beneath the brand mark. Use \n for line breaks. */
  brandTagline: string;
  /** Optional website URL line beneath the tagline. */
  websiteLabel?: string;
  websiteHref?: string;
  linkColumns: FooterLinkColumn[];
  copyright: string;
  /** Right-hand tagline in the bottom bar. */
  signoff?: string;
}

export interface ClosingCtaAndFooterProps {
  cta: ClosingCtaContent;
  footer: ClosingFooterContent;
}

export function ClosingCtaAndFooter({ cta, footer }: ClosingCtaAndFooterProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUpSlow: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const staggerParent: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
      };

  const childItem: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const wordmark = cta.wordmark ?? 'Bodhi';
  const footerWordmark = footer.wordmark ?? 'Bodhi';
  const signoff = footer.signoff ?? 'Designed quietly. Practised daily.';

  return (
    <footer
      aria-label="Closing call to action and site footer"
      className="w-full bg-brand-dark"
    >
      {/* Closing CTA band */}
      <section aria-label="Closing call to action" className="bg-brand-dark">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="page-px mx-auto w-full max-w-[1340px] pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20"
        >
          <div className="mx-auto flex max-w-[1138px] flex-col items-center gap-6 text-center md:gap-7">
            <div className="flex flex-col items-center">
              <motion.p
                variants={childItem}
                className="font-heading italic text-text-inverse text-[22px] md:text-[28px] lg:text-[32px] leading-[1.55] tracking-[-0.32px] mb-[-6px] md:mb-[-10px] lg:mb-[-14px]"
              >
                {wordmark}
              </motion.p>
              <motion.h2
                variants={childItem}
                className="text-text-inverse font-heading font-normal text-[44px] md:text-[64px] lg:text-[80px] xl:text-[90px] leading-[1.08] tracking-[-1.5px] md:tracking-[-2.16px]"
              >
                <span>{cta.headingLead}</span>{' '}
                <span className="italic text-text-mint-shade tracking-[-1.08px]">
                  {cta.headingAccent}
                </span>
              </motion.h2>
            </div>

            <motion.p
              variants={childItem}
              className="text-subtext-2 text-text-inverse/[0.63] max-w-[58ch] leading-[1.65]"
            >
              {cta.subheading}
            </motion.p>

            <motion.div variants={childItem} className="mt-4 md:mt-6">
              <Link
                href={cta.primary.href}
                className="inline-flex items-center justify-center rounded-full bg-brand-shade px-6 py-4 text-body-sm font-semibold text-brand-dark tracking-[0.28px] motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] hover:bg-brand-shade-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark min-w-[197px]"
              >
                {cta.primary.label}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer block */}
      <section aria-label="Site footer" className="bg-brand-dark">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="page-px mx-auto w-full max-w-[1340px] pt-16 pb-10 md:pt-20 md:pb-12 lg:pt-24"
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
            {/* Brand column */}
            <motion.div
              variants={childItem}
              className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1"
            >
              <Link
                href={footer.logoHref}
                aria-label="Bodhi — home"
                className="inline-block font-heading italic text-text-inverse text-[28px] lg:text-[32px] leading-[1.55] tracking-[-0.32px] motion-safe:transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade rounded-sm w-fit"
              >
                {footerWordmark}
              </Link>
              <p className="text-body-sm text-text-inverse/[0.76] leading-[1.55] max-w-[36ch] whitespace-pre-line">
                {footer.brandTagline}
              </p>
              {footer.websiteLabel ? (
                footer.websiteHref ? (
                  <a
                    href={footer.websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-text-inverse tracking-[0.29px] motion-safe:transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade rounded-sm w-fit"
                  >
                    {footer.websiteLabel}
                  </a>
                ) : (
                  <p className="text-body-sm text-text-inverse tracking-[0.29px]">
                    {footer.websiteLabel}
                  </p>
                )
              ) : null}
            </motion.div>

            {/* Link columns */}
            {footer.linkColumns.map((col) => (
              <motion.div
                key={col.heading}
                variants={childItem}
                className="flex flex-col gap-4"
              >
                <h3 className="text-mini font-medium uppercase text-text-inverse tracking-[2.42px]">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-[9px]">
                  {col.links.map((link) => {
                    const isExternal =
                      link.href.startsWith('mailto:') ||
                      link.href.startsWith('http') ||
                      link.href === '#';
                    const className =
                      'group inline-flex items-center text-body-sm text-text-inverse/[0.76] motion-safe:transition-colors hover:text-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-shade rounded-sm';
                    const inner = (
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat motion-safe:transition-[background-size] motion-safe:duration-300 group-hover:bg-[length:100%_1px]">
                        {link.label}
                      </span>
                    );
                    return (
                      <li key={`${col.heading}-${link.label}`}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                            className={className}
                          >
                            {inner}
                          </a>
                        ) : (
                          <Link href={link.href} className={className}>
                            {inner}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom bar */}
          <motion.div
            variants={childItem}
            className="mt-16 flex flex-col gap-3 border-t border-text-inverse/[0.08] pt-6 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-6"
          >
            <p className="text-body-sm text-text-inverse tracking-[0.08px] leading-[1.55]">
              {footer.copyright}
            </p>
            <p className="text-body-sm text-text-inverse tracking-[0.08px] leading-[1.55]">
              {signoff}
            </p>
          </motion.div>
        </motion.div>
      </section>
    </footer>
  );
}
