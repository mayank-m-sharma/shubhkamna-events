"use client";

import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { FormFieldProps } from "@/types/formField";

import styles from "./FormField.module.scss";

export function FormField(props: FormFieldProps): ReactNode {
  const { label, name, required, error, placeholder, className, value } = props;
  const fieldId = useId();
  const errorId = useId();

  return (
    <div className={cn(styles.field, className)}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
        {required ? " *" : null}
      </label>
      {props.as === "textarea" ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          onChange={props.onChange}
          rows={props.rows}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={styles.control}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={props.type ?? "text"}
          value={value}
          onChange={props.onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={styles.control}
        />
      )}
      {error ? (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
