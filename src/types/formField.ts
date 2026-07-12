import type { ChangeEvent } from "react";

interface BaseFormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
}

export interface FormFieldInputProps extends BaseFormFieldProps {
  as?: "input";
  type?: "text" | "email" | "tel" | "date" | "number";
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface FormFieldTextareaProps extends BaseFormFieldProps {
  as: "textarea";
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export type FormFieldProps = FormFieldInputProps | FormFieldTextareaProps;
