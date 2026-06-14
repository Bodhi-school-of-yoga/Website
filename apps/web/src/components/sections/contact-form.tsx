'use client';

// ContactForm — controlled enquiry form on the Contact page with name, email, phone, and message fields.
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ContactFormData = {
  firstName: string;
  phone: string;
  email: string;
  interestedIn: string;
  message: string;
};

const INTEREST_OPTIONS = [
  'Yoga Classes (Online + Offline)',
  'Teacher Training (Online + Offline)',
  'Workshops',
];

export type ContactFormProps = {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  className?: string;
};

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const LABEL_CLASSES =
  'block text-[15px] font-medium text-text-primary mb-2';

const INPUT_CLASSES =
  'h-10 sm:h-12 w-full rounded-xl bg-white border border-neutral-200 pl-12 sm:pl-14 pr-5 sm:pr-6 text-[15px] sm:text-body-md text-text-primary placeholder:text-text-tertiary/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary';

const SUBMIT_CLASSES =
  'h-12 sm:h-14 w-full rounded-full bg-brand-primary text-white text-[15px] sm:text-body-md font-semibold transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed';

const INITIAL_FIELDS: ContactFormData = {
  firstName: '',
  phone: '',
  email: '',
  interestedIn: '',
  message: '',
};

type Errors = Partial<Record<keyof ContactFormData, string>>;

export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const router = useRouter();
  const [fields, setFields] = useState<ContactFormData>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const interestedInRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFields(INITIAL_FIELDS);
    setErrors({});
    setIsSubmitting(false);
    setSubmitError(null);
  };

  const handleChange =
    (name: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFields((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    };

  const validate = (data: ContactFormData): Errors => {
    const next: Errors = {};
    if (!data.firstName.trim()) next.firstName = 'First name is required.';
    if (!data.email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!data.interestedIn) next.interestedIn = 'Please select an option.';
    if (!data.message.trim()) next.message = 'Message is required.';
    return next;
  };

  const focusFirstInvalid = (next: Errors) => {
    const order: Array<{
      key: keyof ContactFormData;
      ref: React.RefObject<HTMLInputElement | HTMLSelectElement | null>;
    }> = [
      { key: 'firstName', ref: firstNameRef },
      { key: 'phone', ref: phoneRef },
      { key: 'email', ref: emailRef },
      { key: 'interestedIn', ref: interestedInRef },
      { key: 'message', ref: messageRef },
    ];
    for (const { key, ref } of order) {
      if (next[key]) {
        ref.current?.focus();
        return;
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validate(fields);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstInvalid(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(fields);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      reset();
      router.push('/thank-you?type=contact');
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      noValidate
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-[21px] bg-white p-5 border border-neutral-200 rounded-lg shadow-2xs', className)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
    >
      <div>
        <label htmlFor="contact-firstName" className={LABEL_CLASSES}>
          First name
        </label>
        <div className="relative">
          <Image src="/icon/users.svg" alt="" width={20} height={20} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={firstNameRef}
            id="contact-firstName"
            name="firstName"
            type="text"
            required
            placeholder="Your name"
            value={fields.firstName}
            onChange={handleChange('firstName')}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'contact-firstName-error' : undefined}
            className={INPUT_CLASSES}
          />
        </div>
        {errors.firstName ? (
          <p id="contact-firstName-error" className="mt-2 text-sm text-red-500">
            {errors.firstName}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-phone" className={LABEL_CLASSES}>
          Mobile number
        </label>
        <div className="relative">
          <Image src="/icon/Phonenumber.svg" alt="" width={20} height={20} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={phoneRef}
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+ 91  8123456789"
            value={fields.phone}
            onChange={handleChange('phone')}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.phone)}
            className={INPUT_CLASSES}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className={LABEL_CLASSES}>
          Email
        </label>
        <div className="relative">
          <Image src="/icon/Email2.svg" alt="" width={20} height={20} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={emailRef}
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            value={fields.email}
            onChange={handleChange('email')}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={INPUT_CLASSES}
          />
        </div>
        {errors.email ? (
          <p id="contact-email-error" className="mt-2 text-sm text-red-500">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-interestedIn" className={LABEL_CLASSES}>
          Interested in
        </label>
        <div className="relative">
          <Image src="/icon/users.svg" alt="" width={20} height={20} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            ref={interestedInRef}
            id="contact-interestedIn"
            name="interestedIn"
            required
            value={fields.interestedIn}
            onChange={handleChange('interestedIn')}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.interestedIn)}
            aria-describedby={errors.interestedIn ? 'contact-interestedIn-error' : undefined}
            className={cn(
              INPUT_CLASSES,
              'appearance-none pr-12',
              !fields.interestedIn && 'text-text-tertiary/60',
            )}
          >
            <option value="" disabled>
              Select an option
            </option>
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="text-text-primary">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 sm:right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
        </div>
        {errors.interestedIn ? (
          <p id="contact-interestedIn-error" className="mt-2 text-sm text-red-500">
            {errors.interestedIn}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className={LABEL_CLASSES}>
          What can we help with?
        </label>
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon/Help.png" alt="" width={20} height={20} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={messageRef}
            id="contact-message"
            name="message"
            type="text"
            required
            placeholder="Course details, partnerships, scheduling..."
            value={fields.message}
            onChange={handleChange('message')}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={INPUT_CLASSES}
          />
        </div>
        {errors.message ? (
          <p id="contact-message-error" className="mt-2 text-sm text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p role="alert" className="text-sm text-red-500">
          {submitError}
        </p>
      ) : null}

      <button type="submit" disabled={isSubmitting} className={SUBMIT_CLASSES}>
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </motion.form>
  );
}
