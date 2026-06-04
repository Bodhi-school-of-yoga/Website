// CourseHeroSection — top-of-page hero for a course detail page with image, title, metadata badges, and enroll CTA.
// Adds framer-motion mount stagger (T2) + BreadcrumbItem[] support while preserving backward compatibility.
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Clock, Globe } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { SimpleBreadcrumb, type BreadcrumbItemData as BreadcrumbItem } from "@/components/ui/breadcrumb";

const ICON_MAP: Record<string, React.ReactNode> = {
  calendar: <CalendarDays className="h-6 w-6" strokeWidth={1.75} />,
  location: <MapPin className="h-6 w-6" strokeWidth={1.75} />,
  clock: <Clock className="h-6 w-6" strokeWidth={1.75} />,
  globe: <Globe className="h-6 w-6" strokeWidth={1.75} />,
};

export type CourseMetaItem = {
  icon: string;
  label: string;
};

export type CourseHeroSectionProps = {
  breadcrumb: string | BreadcrumbItem[];
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  meta: CourseMetaItem[];
  ctaLabel: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  heroImage: string;
  className?: string;
};

export function CourseHeroSection({
  breadcrumb,
  titleLead,
  titleAccent,
  subtitle,
  meta,
  ctaLabel,
  ctaHref,
  onCtaClick,
  heroImage,
  className,
}: CourseHeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // fade-in-up: opacity 0 -> 1, y 12 -> 0, 400ms easeOut. Reduced-motion: resolves to final state with duration 0.
  const fadeInUp: Variants = React.useMemo(
    () =>
      shouldReduceMotion
        ? {
            hidden: { opacity: 1, y: 0 },
            show: { opacity: 1, y: 0, transition: { duration: 0 } },
          }
        : {
            hidden: { opacity: 0, y: 12 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            },
          },
    [shouldReduceMotion],
  );

  // Parent variants for meta row: staggerChildren 0.08, delayChildren 0.1.
  // The 0.4s row-level offset from the interaction spec is applied via the element's own
  // transition prop; this variant only governs how children cascade.
  const metaParent: Variants = React.useMemo(
    () =>
      shouldReduceMotion
        ? {
            hidden: { opacity: 1 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0, delayChildren: 0 },
            },
          }
        : {
            hidden: { opacity: 1 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
                when: "beforeChildren",
              },
            },
          },
    [shouldReduceMotion],
  );

  const isBreadcrumbArray = Array.isArray(breadcrumb);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-brand-lite",
        "pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] page-px">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex flex-col lg:flex-1 lg:max-w-[640px]">
            <motion.div initial="hidden" animate="show" variants={fadeInUp}>
              {isBreadcrumbArray ? (
                <SimpleBreadcrumb items={breadcrumb} tone="light" separator="slash" />
              ) : (
                <p className="text-mini text-text-tertiary">{breadcrumb}</p>
              )}
            </motion.div>

            <h1 className="mt-4 sm:mt-6 font-heading font-bold leading-[1.06] text-[clamp(2rem,5vw+0.5rem,4.25rem)]">
              <motion.span
                className="block text-text-brand"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.4, ease: "easeOut", delay: 0.1 }
                }
              >
                {titleLead}
              </motion.span>
              <motion.span
                className="block text-text-primary"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.4, ease: "easeOut", delay: 0.2 }
                }
              >
                {titleAccent}
              </motion.span>
            </h1>

            <motion.p
              className="mt-6 max-w-md font-body text-subtext-2 text-text-tertiary"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: "easeOut", delay: 0.3 }
              }
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: "easeOut", delay: 0.55 }
              }
              className="mt-7 sm:mt-10 w-fit"
            >
              {onCtaClick ? (
                <button
                  type="button"
                  onClick={onCtaClick}
                  className={cn(
                    "inline-flex items-center justify-center rounded-xl px-8 py-2.5",
                    "bg-brand-primary text-text-inverse",
                    "text-sm font-semibold",
                    "transition-opacity duration-200 hover:opacity-90",
                    "active:scale-[0.98] motion-safe:transition-transform",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
                  )}
                >
                  {ctaLabel}
                </button>
              ) : (
                <Link
                  href={ctaHref ?? "#"}
                  className={cn(
                    "inline-flex items-center justify-center rounded-xl px-8 py-2.5",
                    "bg-brand-primary text-text-inverse",
                    "text-sm font-semibold",
                    "transition-opacity duration-200 hover:opacity-90",
                    "active:scale-[0.98] motion-safe:transition-transform",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
                  )}
                >
                  {ctaLabel}
                </Link>
              )}
            </motion.div>

            <motion.ul
              className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4"
              initial="hidden"
              animate="show"
              variants={metaParent}
            >
              {meta.slice(0, 4).map((item) => (
                <motion.li
                  key={item.label}
                  variants={fadeInUp}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3",
                    "h-[104px] w-full sm:w-[110px]",
                    "rounded-[17px] border border-border-1 bg-surface-1/80",
                    "px-3 py-4 text-center",
                  )}
                >
                  <span className="text-text-brand">
                    {ICON_MAP[item.icon] ?? <CalendarDays className="h-6 w-6" strokeWidth={1.75} />}
                  </span>
                  <span className="text-body-sm font-semibold text-text-secondary">
                    {item.label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className={cn(
              "relative w-full overflow-hidden rounded-2xl bg-surface-2",
           
              "lg:w-[44%] lg:max-w-[520px] lg:shrink-0",
            )}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.6, ease: "easeOut", delay: 0.2 }
            }
          >
            <Image
              src={heroImage}
              alt={`${titleLead} ${titleAccent}`}
             height={600}
             width={520}

              
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
