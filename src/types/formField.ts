import type { ChangeEvent } from "react";

interface BaseFormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  // Uncontrolled usage (e.g. a native <form action={serverAction}> that
  // reads FormData directly — SHU-014's ContactForm) — omit `value`/
  // `onChange` and the field manages its own DOM state.
  defaultValue?: string;
}

export interface FormFieldInputProps extends BaseFormFieldProps {
  as?: "input";
  type?: "text" | "email" | "tel" | "date" | "number";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface FormFieldTextareaProps extends BaseFormFieldProps {
  as: "textarea";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export interface FormFieldSelectOption {
  label: string;
  value: string;
}

export interface FormFieldSelectProps extends BaseFormFieldProps {
  as: "select";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: FormFieldSelectOption[];
  // Shown as the disabled default option (e.g. "Select an option").
  placeholder?: string;
}

export type FormFieldProps =
  FormFieldInputProps | FormFieldTextareaProps | FormFieldSelectProps;
