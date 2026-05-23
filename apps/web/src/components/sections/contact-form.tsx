'use client';

// ContactForm — controlled enquiry form on the Contact page with name, email, phone, and message fields.
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFormProps = {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  className?: string;
};

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const INPUT_CLASSES =
  'h-16 w-full rounded-2xl bg-surface-1 border border-border-3 px-7 text-subtext-1 text-text-primary placeholder:text-text-tertiary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary';

const TEXTAREA_CLASSES =
  'min-h-[160px] py-5 w-full rounded-2xl bg-surface-1 border border-border-3 px-7 text-subtext-1 text-text-primary placeholder:text-text-tertiary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary';

const SUBMIT_CLASSES =
  'h-16 w-full rounded-2xl bg-brand-shade text-brand-dark text-subtext-1 font-medium transition-all duration-200 hover:bg-brand-shade/90 hover:shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed';

const INITIAL_FIELDS: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
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
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
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
    if (!data.lastName.trim()) next.lastName = 'Last name is required.';
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
      { key: 'lastName', ref: lastNameRef },
      { key: 'email', ref: emailRef },
      { key: 'phone', ref: phoneRef },
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
        <label htmlFor="contact-firstName" className="sr-only">
          First name
        </label>
        <input
          ref={firstNameRef}
          id="contact-firstName"
          name="firstName"
          type="text"
          required
          placeholder="First name"
          value={fields.firstName}
          onChange={handleChange('firstName')}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.firstName)}
          aria-describedby={errors.firstName ? 'contact-firstName-error' : undefined}
          className={INPUT_CLASSES}
        />
        {errors.firstName ? (
          <p id="contact-firstName-error" className="mt-2 text-mini text-red-500">
            {errors.firstName}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-lastName" className="sr-only">
          Last Name
        </label>
        <input
          ref={lastNameRef}
          id="contact-lastName"
          name="lastName"
          type="text"
          required
          placeholder="Last Name"
          value={fields.lastName}
          onChange={handleChange('lastName')}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.lastName)}
          aria-describedby={errors.lastName ? 'contact-lastName-error' : undefined}
          className={INPUT_CLASSES}
        />
        {errors.lastName ? (
          <p id="contact-lastName-error" className="mt-2 text-mini text-red-500">
            {errors.lastName}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          Email
        </label>
        <input
          ref={emailRef}
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="Email"
          value={fields.email}
          onChange={handleChange('email')}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={INPUT_CLASSES}
        />
        {errors.email ? (
          <p id="contact-email-error" className="mt-2 text-mini text-red-500">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-phone" className="sr-only">
          Phone number
        </label>
        <input
          ref={phoneRef}
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="Phone number"
          value={fields.phone}
          onChange={handleChange('phone')}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.phone)}
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          required
          placeholder="Message"
          value={fields.message}
          onChange={handleChange('message')}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={TEXTAREA_CLASSES}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-2 text-mini text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p role="alert" className="text-mini text-red-500">
          {submitError}
        </p>
      ) : null}

      <button type="submit" disabled={isSubmitting} className={SUBMIT_CLASSES}>
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </motion.form>
  );
}
