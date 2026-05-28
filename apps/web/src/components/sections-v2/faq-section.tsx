'use client';

import { useId, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

export interface FaqItemData {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  eyebrow?: string;
  heading: string;
  items: FaqItemData[];
}

interface FaqItemProps {
  item: FaqItemData;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
  variants: Variants;
  prefersReducedMotion: boolean;
}

function FaqItem({
  item,
  isOpen,
  isLast,
  onToggle,
  variants,
  prefersReducedMotion,
}: FaqItemProps) {
  const reactId = useId();
  const buttonId = `faq-trigger-${reactId}`;
  const panelId = `faq-panel-${reactId}`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <motion.li
      variants={variants}
      // token≈#e6d9cf (warm cream divider in Figma); closest Bodhi token is border-border-3
      className={isLast ? 'w-full' : 'w-full border-b border-border-3'}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-6 py-[18px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-text-teal-deep focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
      >
        <span className="text-body-sm font-medium text-text-secondary">
          {item.question}
        </span>
        <motion.span
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? { rotate: 0 }
              : { rotate: isOpen ? 45 : 0 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }
          className="inline-flex h-[26.87px] w-[26.87px] shrink-0 items-center justify-center text-[20px] font-medium leading-none text-text-teal-deep"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="answer"
            initial={
              prefersReducedMotion
                ? { opacity: 1, height: 'auto' }
                : { height: 0, opacity: 0 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1, height: 'auto' }
                : { height: 'auto', opacity: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0, height: 0 }
                : { height: 0, opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.25, ease: 'easeOut', delay: 0.05 },
                  }
            }
            className="overflow-hidden"
          >
            <p className="pb-[18px] pr-8 text-body-sm leading-[1.75] text-text-tertiary">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

export function FaqSection({ eyebrow, heading, items }: FaqSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const staggerParent: Variants = prefersReducedMotion
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
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

  return (
    <section className="bg-surface-1 page-px py-12 md:py-[38px]">
      <div className="mx-auto w-full max-w-[910px]">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-[5px]"
        >
          {eyebrow ? (
            <motion.p
              variants={fadeInUp}
              className="text-mini font-semibold uppercase tracking-[1.8px] text-text-teal-deep"
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h2
            variants={fadeInUp}
            className="text-[28px] font-heading font-bold leading-[1.04] text-text-secondary md:text-[34px]"
          >
            {heading}
          </motion.h2>
        </motion.div>

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-[13px] flex w-full flex-col"
        >
          {items.map((item, idx) => (
            <FaqItem
              key={idx}
              item={item}
              isOpen={openIndex === idx}
              isLast={idx === items.length - 1}
              onToggle={() =>
                setOpenIndex(openIndex === idx ? null : idx)
              }
              variants={childFade}
              prefersReducedMotion={Boolean(prefersReducedMotion)}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
