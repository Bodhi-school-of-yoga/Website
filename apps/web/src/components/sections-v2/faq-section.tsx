'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
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
  onToggle: () => void;
  variants: Variants;
  prefersReducedMotion: boolean;
}

function FaqItem({ item, isOpen, onToggle, variants, prefersReducedMotion }: FaqItemProps) {
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
      className="border-b border-border-3"
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="group flex w-full items-start justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-text-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1 md:py-6"
      >
        <span className="text-body-md text-text-primary md:text-body-lg">
          {item.question}
        </span>
        <motion.span
          aria-hidden="true"
          animate={prefersReducedMotion ? { rotate: 0 } : { rotate: isOpen ? 45 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-text-brand"
        >
          <Plus className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="answer"
            initial={prefersReducedMotion ? { opacity: 1, height: 'auto' } : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1, height: 'auto' } : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0, height: 0 } : { height: 0, opacity: 0 }}
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
            <p className="pb-5 pr-8 text-body-sm leading-[1.55] text-text-tertiary md:pb-6 md:text-body-md">
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
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };

  const headingFadeInUp: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section className="bg-surface-1 page-px py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[910px] md:w-[90%] lg:w-full">
        <div className="flex flex-col gap-4 md:gap-5">
          {eyebrow ? (
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-mini uppercase tracking-[0.18em] text-text-brand"
            >
              {eyebrow}
            </motion.span>
          ) : null}
          <motion.h2
            variants={headingFadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-h3 text-text-primary md:text-h2"
          >
            {heading}
          </motion.h2>
        </div>

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 flex flex-col md:mt-10"
        >
          {items.map((item, idx) => (
            <FaqItem
              key={idx}
              item={item}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              variants={childFade}
              prefersReducedMotion={Boolean(prefersReducedMotion)}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
