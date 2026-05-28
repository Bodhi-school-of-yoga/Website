'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface PrerequisitesSectionProps {
  eyebrow: string;
  heading: string;
  checklist: string[];
  sideImage: string;
  imageAlt: string;
}

interface ChecklistItemProps {
  label: string;
  variants: Variants;
}

function ChecklistItem({ label, variants }: ChecklistItemProps) {
  return (
    <motion.li variants={variants} className="flex items-start gap-3">
      <CheckCircle2
        className="mt-0.5 h-5 w-5 shrink-0 text-text-brand lg:h-6 lg:w-6"
        aria-hidden="true"
      />
      <span className="text-body-md text-text-primary">{label}</span>
    </motion.li>
  );
}

export function PrerequisitesSection({
  eyebrow,
  heading,
  checklist,
  sideImage,
  imageAlt,
}: PrerequisitesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const headingFadeInUp: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
        },
      };

  const staggerParent: Variants = prefersReducedMotion
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
      };

  const childFade: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const scaleIn: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.94 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
        },
      };

  return (
    <section className="page-px py-10 md:py-14 lg:py-20">
      <div className="mx-auto max-w-[1340px]">
        {/* Mobile (~375px): image then checklist stack, image 16:10 */}
        <div className="flex flex-col gap-8 md:hidden">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl"
          >
            <Image
              src={sideImage}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-mini uppercase text-text-brand"
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              variants={headingFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-h4 text-text-primary"
            >
              {heading}
            </motion.h2>

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-4"
            >
              {checklist.map((item, idx) => (
                <ChecklistItem key={idx} label={item} variants={childFade} />
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Tablet (~768px): heading → checklist → image stack */}
        <div className="hidden md:flex md:flex-col md:gap-10 lg:hidden">
          <div className="flex flex-col gap-6">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-mini uppercase text-text-brand"
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              variants={headingFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-h3 text-text-primary"
            >
              {heading}
            </motion.h2>

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-4"
            >
              {checklist.map((item, idx) => (
                <ChecklistItem key={idx} label={item} variants={childFade} />
              ))}
            </motion.ul>
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
          >
            <Image
              src={sideImage}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 90vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Desktop (1280-1920px): image flanks per Figma, mirrors right-for-you */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-2xl justify-self-start"
          >
            <Image
              src={sideImage}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="flex max-w-[540px] flex-col gap-6">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-mini uppercase text-text-brand"
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              variants={headingFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-h2 text-text-primary"
            >
              {heading}
            </motion.h2>

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-4"
            >
              {checklist.map((item, idx) => (
                <ChecklistItem key={idx} label={item} variants={childFade} />
              ))}
            </motion.ul>
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-2xl justify-self-end"
            aria-hidden="true"
          >
            <Image
              src={sideImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
