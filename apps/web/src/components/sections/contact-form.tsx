'use client';

// ContactForm — controlled enquiry form on the Contact page with name, email, phone, and message fields.
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

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
  'h-14 w-full rounded-full bg-[#f3f3f3] border-none px-6 text-body-md text-text-primary placeholder:text-text-tertiary/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary';

const TEXTAREA_CLASSES =
  'min-h-[120px] py-4 w-full rounded-3xl bg-[#f3f3f3] border-none px-6 text-body-md text-text-primary placeholder:text-text-tertiary/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none';

const SUBMIT_CLASSES =
  'h-14 w-full rounded-full bg-brand-shade text-brand-dark text-body-md font-semibold transition-all duration-200 hover:bg-brand-shade/90 hover:shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed';

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
  const messageRef = useRef<HTMLTextAreaElement>(null);

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
      ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
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

  if (isSubmitted) {
    return (
      <motion.div
        className={cn(
          'rounded-2xl border border-border-2 bg-surface-2 p-8',
          className,
        )}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <p className="text-subtext-1 text-text-primary">
          Thanks — we got your message. Bodhi will reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 text-subtext-2 text-text-brand underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-primary rounded"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      noValidate
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-[21px]', className)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
    >
      <div>
        <label htmlFor="contact-firstName" className={LABEL_CLASSES}>
          First name
        </label>
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

      <div>
        <label htmlFor="contact-email" className={LABEL_CLASSES}>
          Email
        </label>
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
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          required
          placeholder="Course details, partnerships, scheduling..."
          value={fields.message}
          onChange={handleChange('message')}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={TEXTAREA_CLASSES}
        />
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
