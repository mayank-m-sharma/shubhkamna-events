export interface ContactFormProps {
  // Shown after a successful submission — CMS-editable via
  // contactSection.successMessage, falls back to a generic message when
  // unset (no real content exists on the reference to source this from).
  successMessage?: string;
}
