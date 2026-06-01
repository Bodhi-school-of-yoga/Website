'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Globe, Languages, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface MoreCoursesItem {
  image: string;
  title: string;
  /** Optional secondary description (kept for back-compat with older demos). */
  subtitle?: string;
  href: string;
  /** e.g. "4 weeks" */
  duration?: string;
  /** e.g. "Online" */
  format?: string;
  /** e.g. "English" */
  language?: string;
  /** Instructor full name shown after the "BY" label */
  author?: string;
  /** 2-letter initials shown inside the avatar circle */
  initials?: string;
  /** Optional CTA label override */
  ctaLabel?: string;
}

export interface MoreCoursesSectionProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: MoreCoursesItem[];
}

function getInitials(name: string | undefined): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function MoreCoursesSection({
  eyebrow,
  heading,
  subheading,
  items,
}: MoreCoursesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp: Variants = prefersReducedMotion
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

  const gridStagger: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.15 },
        },
      };

  const cardItem: Variants = prefersReducedMotion
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
    <section className="bg-surface-1 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1340px] page-px">
        {/* Header */}
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-mini font-semibold uppercase tracking-[2.42px] text-text-brand"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.08 }}
            className="font-heading text-[28px] font-bold leading-[1.05] text-text-secondary md:text-[32px] lg:text-[34px]"
          >
            {heading}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.16 }}
            className="text-body-sm text-text-tertiary md:text-[15px]"
          >
            {subheading}
          </motion.p>
        </div>

        {/* Cards — mobile snap carousel, tablet 2-col, desktop 3-col */}
        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 md:mt-10 lg:mt-12"
        >
          {/* Mobile: horizontal snap scroll */}
          <ul
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden"
            style={{ scrollbarWidth: 'none' }}
          >
            {items.map((item, idx) => (
              <motion.li
                key={`m-${item.title}-${idx}`}
                variants={cardItem}
                className="w-[85%] shrink-0 snap-start"
              >
                <CourseCard item={item} />
              </motion.li>
            ))}
          </ul>

          {/* Tablet+ : grid */}
          <ul className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3 lg:gap-7">
            {items.map((item, idx) => (
              <motion.li
                key={`g-${item.title}-${idx}`}
                variants={cardItem}
                className="h-full"
              >
                <CourseCard item={item} />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function CourseCard({ item }: { item: MoreCoursesItem }) {
  const initials = item.initials ?? getInitials(item.author);
  const duration = item.duration ?? '4 weeks';
  const format = item.format ?? 'Online';
  const language = item.language ?? 'English';
  const ctaLabel = item.ctaLabel ?? 'View Program';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border-2 bg-surface-1 shadow-card transition-all duration-300 motion-safe:hover:-translate-y-1">
      {/* Hero image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-cream">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1280px) 50vw, 420px"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-[14px] px-6 pb-5 pt-6">
        <h3 className="font-heading text-[20px] font-semibold leading-[1.15] tracking-[-0.2px] text-text-secondary md:text-[22px] lg:text-[23px]">
          {item.title}
        </h3>

        {/* divider */}
        <div className="h-px w-full bg-border-2" />

        {/* meta chips */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <MetaChip icon={<Clock className="h-[13px] w-[13px]" aria-hidden="true" />} label={duration} />
          <Dot />
          <MetaChip icon={<Globe className="h-[13px] w-[13px]" aria-hidden="true" />} label={format} />
          <Dot />
          <MetaChip icon={<Languages className="h-[13px] w-[13px]" aria-hidden="true" />} label={language} />
        </div>

        {/* divider */}
        <div className="h-px w-full bg-border-2" />

        {/* author + CTA */}
        <div className="mt-1 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2">
              <span className="font-heading text-[13px] font-bold text-text-brand">
                {initials}
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium uppercase tracking-[0.8px] text-text-tertiary">
                By
              </span>
              <span className="text-body-sm font-medium text-text-secondary">
                {item.author ?? 'Bodhi Faculty'}
              </span>
            </div>
          </div>

          <Link
            href={item.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-[14px] text-[13px] font-medium text-white transition-all duration-300 motion-safe:hover:bg-text-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand focus-visible:ring-offset-2"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="h-[15px] w-[15px] transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function MetaChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-text-tertiary">
      <span className="inline-flex h-[13px] w-[13px] items-center justify-center text-text-tertiary">
        {icon}
      </span>
      <span className="text-[12px] font-medium tracking-[0.12px]">{label}</span>
    </span>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[3px] w-[3px] rounded-[1.5px] bg-border-3"
    />
  );
}
