"use client";

import { useActionState, type ReactNode } from "react";

import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import type { SubmitEnquiryResult } from "@/lib/actions/submitEnquiry";
import { submitEnquiry } from "@/lib/actions/submitEnquiry";
import { EVENT_TYPE_OPTIONS } from "@/lib/validations/enquiry.schema";
import type { ContactFormProps } from "@/types/contactForm";

import styles from "./ContactForm.module.scss";

const EVENT_TYPE_SELECT_OPTIONS = EVENT_TYPE_OPTIONS.map((option) => ({
  label: option,
  value: option,
}));

const initialState: SubmitEnquiryResult = { success: false };

async function submitAction(
  _previousState: SubmitEnquiryResult,
  formData: FormData,
): Promise<SubmitEnquiryResult> {
  return submitEnquiry(formData);
}

export function ContactForm({ successMessage }: ContactFormProps): ReactNode {
  const [state, formAction, isPending] = useActionState(
    submitAction,
    initialState,
  );

  if (state.success) {
    return (
      <p role="status" className={styles.success}>
        {successMessage ?? "Thanks for reaching out! We'll be in touch soon."}
      </p>
    );
  }

  return (
    <form action={formAction} className={styles.form} noValidate>
      {/* Honeypot: real users never see or focus this — visually clipped,
          not display:none (some bots skip CSS-hidden fields), removed
          from both the visual and keyboard/screen-reader flow. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <FormField
        label="Full Name"
        name="name"
        required
        placeholder="Your Name"
        error={state.errors?.name}
      />
      <FormField
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        error={state.errors?.email}
      />
      <FormField
        label="Phone Number"
        name="phone"
        type="tel"
        required
        placeholder="+91 XXXXX XXXXX"
        error={state.errors?.phone}
      />
      <FormField
        as="select"
        label="Event Type"
        name="eventType"
        required
        placeholder="Select an option"
        options={EVENT_TYPE_SELECT_OPTIONS}
        error={state.errors?.eventType}
      />
      <FormField
        label="Event Date"
        name="eventDate"
        type="date"
        required
        error={state.errors?.eventDate}
      />
      <FormField
        label="Expected Guests"
        name="expectedGuests"
        type="number"
        placeholder="e.g. 150"
        error={state.errors?.expectedGuests}
      />
      <FormField
        as="textarea"
        label="Message"
        name="message"
        required
        rows={4}
        placeholder="Tell us about the theme, location, or requirements..."
        error={state.errors?.message}
      />
      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
