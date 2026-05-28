'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface ClosingCtaContent {
  heading: string;
  subheading: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export interface FooterLinkColumn {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

export interface ClosingFooterContent {
  logoHref: string;
  brandTagline: string;
  subtagline: string;
  linkColumns: FooterLinkColumn[];
  copyright: string;
  socials: { instagram: string; youtube: string; email: string };
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
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const fadeIn: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

  return (
    <footer aria-label="Closing call to action and site footer" className="w-full">
      {/* Closing CTA band */}
      <section
        aria-label="Closing call to action"
        className="bg-brand-dark text-text-inverse"
      >
        <motion.div
          variants={fadeInUpSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="page-px mx-auto w-full max-w-[1340px] py-14 md:py-20 lg:py-24"
        >
          <div className="flex flex-col items-center gap-5 text-center md:gap-6">
            <motion.h2
              variants={fadeInUpSlow}
              transition={prefersReducedMotion ? undefined : { delay: 0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-h4 md:text-h3 lg:text-h2 font-medium text-text-inverse max-w-[22ch]"
            >
              {cta.heading}
            </motion.h2>
            <motion.p
              variants={fadeInUpSlow}
              transition={prefersReducedMotion ? undefined : { delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-body-sm md:text-subtext-2 text-text-mint-shade max-w-[58ch]"
            >
              {cta.subheading}
            </motion.p>
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={prefersReducedMotion ? undefined : { delay: 0.25 }}
              className="mt-2 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
            >
              <motion.div variants={childItem} className="w-full sm:w-auto">
                <Link
                  href={cta.primary.href}
                  className="inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-8 py-4 text-subtext-2 font-medium text-text-inverse motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                >
                  {cta.primary.label}
                </Link>
              </motion.div>
              <motion.div variants={childItem} className="w-full sm:w-auto">
                <Link
                  href={cta.secondary.href}
                  className="inline-flex w-full items-center justify-center rounded-full border border-text-inverse/40 bg-transparent px-8 py-4 text-subtext-2 font-medium text-text-inverse motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] hover:border-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                >
                  {cta.secondary.label}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Site footer V2 */}
      <section
        aria-label="Site footer"
        className="bg-surface-cream border-t border-border-2"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="page-px mx-auto w-full max-w-[1340px] py-12 md:py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-10">
            {/* Brand block */}
            <motion.div
              variants={fadeInUpSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="flex flex-col gap-3 md:col-span-2 lg:col-span-1"
            >
              <Link
                href={footer.logoHref}
                aria-label="Bodhi — home"
                className="inline-flex items-center gap-2 text-h5 font-semibold text-text-primary motion-safe:transition-colors hover:text-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand rounded-sm"
              >
                Bodhi
              </Link>
              <p className="text-body-sm text-text-primary max-w-[36ch]">
                {footer.brandTagline}
              </p>
              <p className="text-mini uppercase tracking-wider text-text-tertiary">
                {footer.subtagline}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href={footer.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bodhi on Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-2 bg-surface-1 text-text-primary motion-safe:transition-colors hover:text-text-brand hover:border-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand"
                >
                  <InstagramIcon className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={footer.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bodhi on YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-2 bg-surface-1 text-text-primary motion-safe:transition-colors hover:text-text-brand hover:border-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand"
                >
                  <YoutubeIcon className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={footer.socials.email}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email Bodhi"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-2 bg-surface-1 text-text-primary motion-safe:transition-colors hover:text-text-brand hover:border-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Link columns with stagger */}
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={prefersReducedMotion ? undefined : { delay: 0.15 }}
              className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:col-span-2 md:grid-cols-3 lg:col-span-3 lg:grid-cols-3 lg:gap-12"
            >
              {footer.linkColumns.map((col) => (
                <motion.div
                  key={col.heading}
                  variants={childItem}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-mini uppercase tracking-wider text-text-tertiary">
                    {col.heading}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {col.links.map((link) => {
                      const isExternal =
                        link.href.startsWith('mailto:') ||
                        link.href.startsWith('http') ||
                        link.href === '#';
                      const className =
                        'group inline-flex items-center text-body-sm text-text-primary motion-safe:transition-colors hover:text-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand rounded-sm';
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
            </motion.div>
          </div>

          {/* Copyright row */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={prefersReducedMotion ? undefined : { delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-2 border-t border-border-2 pt-6 md:mt-12 md:flex-row md:items-center md:justify-between"
          >
            <p className="text-mini uppercase tracking-wider text-text-tertiary">
              {footer.copyright}
            </p>
            <p className="text-mini uppercase tracking-wider text-text-tertiary">
              Made with intention.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </footer>
  );
}
