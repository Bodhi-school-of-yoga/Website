'use client';

// ContactForm — controlled enquiry form on the Contact page with name, email, phone, and message fields.
import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ContactFormData = {
  firstName: string;
  phone: string;
  email: string;
  message: string;
};

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
  message: '',
};

type Errors = Partial<Record<keyof ContactFormData, string>>;

export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [fields, setFields] = useState<ContactFormData>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFields(INITIAL_FIELDS);
    setErrors({});
    setIsSubmitting(false);
    setIsSubmitted(false);
    setSubmitError(null);
  };

  const handleChange =
    (name: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!data.message.trim()) next.message = 'Message is required.';
    return next;
  };

  const focusFirstInvalid = (next: Errors) => {
    const order: Array<{
      key: keyof ContactFormData;
      ref: React.RefObject<HTMLInputElement | null>;
    }> = [
      { key: 'firstName', ref: firstNameRef },
      { key: 'phone', ref: phoneRef },
      { key: 'email', ref: emailRef },
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
      setIsSubmitted(true);
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
    <>
      {/* Thank You Dialog Overlay */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={reset}
            />

            {/* Dialog */}
            <motion.div
              className="relative z-10 w-full max-w-md rounded-3xl bg-white px-8 py-10 shadow-2xl text-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={reset}
                className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full text-text-tertiary hover:bg-surface-2 hover:text-text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Animated checkmark circle */}
              <motion.div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CheckCircle className="h-10 w-10 text-brand-primary" strokeWidth={1.5} />
                </motion.div>
              </motion.div>

              {/* Animated ring pulse */}
              <motion.div
                className="absolute left-1/2 top-10 -translate-x-1/2 h-20 w-20 rounded-full border-2 border-brand-primary/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.6, opacity: [0, 0.5, 0] }}
                transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
              />

              {/* Title */}
              <motion.h3
                className="text-2xl font-heading font-bold text-text-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                Thank You!
              </motion.h3>

              {/* Message */}
              <motion.p
                className="mt-3 text-base text-text-tertiary leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                We&apos;ve received your message and will get back to you as soon as possible.
              </motion.p>

              {/* Divider */}
              <motion.div
                className="mt-6 mb-6 h-px bg-border-2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              />

              {/* CTA */}
              <motion.button
                type="button"
                onClick={reset}
                className="h-12 w-full rounded-full bg-brand-primary text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Another Message
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}
