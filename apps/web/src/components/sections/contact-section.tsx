'use client';

// ContactSection — Contact page layout combining ContactForm and ContactInfoCard columns.
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { usePromoBanner } from '@/components/ui/use-promo-banner';

import { ContactForm, type ContactFormData } from './contact-form';
import { ContactInfoCard } from './contact-info-card';

type ContactIconName = 'phone' | 'mail' | 'map-pin';

export type ContactInfoCardData = {
  icon: ContactIconName;
  label: string;
  value: string;
  href?: string | null;
};

export type ContactSectionProps = {
  eyebrow?: string;
  title?: string;
  subhead?: string;
  infoCards?: ContactInfoCardData[];
  className?: string;
};

const ICON_MAP: Record<ContactIconName, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  'map-pin': MapPin,
};

const DEFAULT_CONTACT_CARDS: ContactInfoCardData[] = [
  {
    icon: 'phone',
    label: 'MOBILE NUMBER',
    value: '+ 91 98703 47348',
    href: 'tel:+919870347348',
  },
  {
    icon: 'mail',
    label: 'EMAIL',
    value: 'info@bodhischoolofyoga.com',
    href: 'mailto:info@bodhischoolofyoga.com',
  },
  {
    icon: 'map-pin',
    label: 'OFFICE LOCATION',
    value:
      '6-3-571/1 2, 1st Floor, Rockvista, Rockdale,\n6-3-571/1 2, Hyderabad, Telangana-500082',
    href: null,
  },
];

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export function ContactSection({
  eyebrow = '23 courses',
  title = 'Contact us',
  subhead = 'Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.',
  infoCards = DEFAULT_CONTACT_CARDS,
  className,
}: ContactSectionProps) {
  const { visible: bannerVisible } = usePromoBanner();
  return (
    <motion.section
      className={cn(
        'relative',
        bannerVisible
          ? 'pt-[140px] sm:pt-[148px] lg:pt-[160px] pb-12 sm:pb-16 md:pb-20 lg:pb-28'
          : 'pt-[96px] sm:pt-[104px] lg:pt-[116px] pb-12 sm:pb-16 md:pb-20 lg:pb-28',
        className,
      )}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-[1200px] mx-auto page-px">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 sm:gap-10 lg:gap-14 xl:gap-20 items-start">
          <div className="flex flex-col">
            <motion.span
              variants={childVariants}
              className="text-mini uppercase tracking-widest text-text-primary"
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              variants={childVariants}
              className="text-[clamp(1.75rem,4vw+0.5rem,3.25rem)] leading-[1.15] font-heading font-bold text-text-primary mt-4 sm:mt-6"
            >
              {title}
            </motion.h2>
            <motion.p
              variants={childVariants}
              className="text-subtext-1 text-text-tertiary mt-6 max-w-xl"
            >
              {subhead}
            </motion.p>

            <motion.div
              variants={childVariants}
              className="mt-10 flex flex-col gap-5"
            >
              {infoCards.map((card, index) => {
                const Icon = ICON_MAP[card.icon];
                return (
                  <ContactInfoCard
                    key={`${card.label}-${index}`}
                    icon={Icon}
                    label={card.label}
                    value={card.value}
                    href={card.href ?? null}
                  />
                );
              })}
            </motion.div>
          </div>

          <motion.div variants={childVariants}>
            <ContactForm onSubmit={async (data: ContactFormData) => {
              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              });
              if (!res.ok) {
                throw new Error('Failed to submit. Please try again.');
              }
            }} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
