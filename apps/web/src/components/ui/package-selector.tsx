'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import {
  describePlans,
  type PricingPlan,
  type DescribedPlan,
} from '@/data/courses-catalog';

export type PackageSelectorProps = {
  /** Eyebrow above the chips. */
  label?: string;
  /** Raw catalog tiers — economics are derived, never read from props. */
  plans: PricingPlan[];
  /** Initial selection. Defaults to the best-value tier. */
  defaultIndex?: number;
  /** Fires on mount with the initial tier and on every change. */
  onPlanChange?: (plan: DescribedPlan, index: number) => void;
  className?: string;
};

export function PackageSelector({
  label = 'Select your package',
  plans,
  defaultIndex,
  onPlanChange,
  className,
}: PackageSelectorProps) {
  const prefersReducedMotion = useReducedMotion();
  const described = React.useMemo(() => describePlans(plans), [plans]);

  const initialIndex = React.useMemo(() => {
    if (
      typeof defaultIndex === 'number' &&
      defaultIndex >= 0 &&
      defaultIndex < described.length
    ) {
      return defaultIndex;
    }
    const best = described.findIndex((p) => p.bestValue);
    return best >= 0 ? best : Math.max(described.length - 1, 0);
  }, [defaultIndex, described]);

  const [selected, setSelected] = React.useState(initialIndex);

  // Emit the initial selection, and re-sync if the plan set changes.
  React.useEffect(() => {
    setSelected(initialIndex);
  }, [initialIndex]);

  const onPlanChangeRef = React.useRef(onPlanChange);
  onPlanChangeRef.current = onPlanChange;
  React.useEffect(() => {
    const current = described[selected];
    if (current) onPlanChangeRef.current?.(current, selected);
  }, [described, selected]);

  if (described.length === 0) return null;

  const active = described[selected];

  // Roving radiogroup keyboard nav (← → ↑ ↓ Home End).
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const last = described.length - 1;
    let next = selected;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = selected >= last ? 0 : selected + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = selected <= 0 ? last : selected - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    setSelected(next);
  };

  return (
    <div className={className}>
      <p className="text-mini font-semibold uppercase tracking-[1.8px] text-text-tertiary">
        {label}
      </p>

      <div
        role="radiogroup"
        aria-label={label}
        onKeyDown={handleKeyDown}
        className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3"
      >
        {described.map((plan, idx) => {
          const isSelected = idx === selected;
          return (
            <button
              key={plan.period}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(idx)}
              className={[
                'relative flex min-h-[96px] flex-col items-center justify-center gap-1 rounded-[14px] border px-3 py-3.5 text-center',
                'motion-safe:transition-colors motion-safe:duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1',
                isSelected
                  ? 'border-brand-primary bg-brand-primary text-text-inverse shadow-sm'
                  : 'border-border-3 bg-surface-1 text-text-secondary hover:border-brand-primary/60',
              ].join(' ')}
            >
              {plan.bestValue ? (
                <span className="absolute -top-2 right-2.5 rounded-full bg-brand-green-deep px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.6px] text-text-inverse">
                  Best value
                </span>
              ) : plan.savingsLabel ? (
                <span
                  className={[
                    'absolute -top-2 right-2.5 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                    isSelected
                      ? 'bg-text-inverse text-text-brand'
                      : 'bg-brand-primary text-text-inverse',
                  ].join(' ')}
                >
                  {plan.savingsLabel}
                </span>
              ) : null}

              <span
                className={[
                  'text-mini font-semibold uppercase tracking-[1px]',
                  isSelected ? 'text-brand-shade' : 'text-text-brand',
                ].join(' ')}
              >
                {plan.period}
              </span>

              <span className="text-h5 font-heading font-bold leading-none">
                {plan.price}
              </span>

              <span
                className={[
                  'text-[11px]',
                  isSelected ? 'text-text-inverse/80' : 'text-text-tertiary',
                ].join(' ')}
              >
                {plan.perMonthLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected-plan summary */}
      <motion.div
        key={active.period}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        }
        className="mt-5 flex flex-col gap-1"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-h4 font-heading font-bold text-brand-primary">
            {active.price}
          </span>
          {active.referencePrice ? (
            <span className="text-[19px] text-text-tertiary line-through">
              {active.referencePrice}
            </span>
          ) : null}
        </div>
        <p className="text-mini text-text-tertiary">
          {active.perMonthLabel} · {active.billingNote}
        </p>
      </motion.div>
    </div>
  );
}
