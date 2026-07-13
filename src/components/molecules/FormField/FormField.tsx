"use client";

import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { FormFieldProps } from "@/types/formField";

import styles from "./FormField.module.scss";

interface CommonControlProps {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  className: string;
}

function renderControl(
  props: FormFieldProps,
  common: CommonControlProps,
): ReactNode {
  if (props.as === "textarea") {
    return (
      <textarea
        {...common}
        value={props.value}
        defaultValue={
          props.value === undefined ? props.defaultValue : undefined
        }
        onChange={props.onChange}
        rows={props.rows}
        placeholder={props.placeholder}
      />
    );
  }

  if (props.as === "select") {
    // A disabled placeholder option is skipped by the browser's implicit
    // "select the first enabled option" default unless a value is set
    // explicitly — without this, the field silently submits its first
    // real option (e.g. "Wedding") even when the user never touched it.
    return (
      <select
        {...common}
        value={props.value}
        defaultValue={
          props.value === undefined ? (props.defaultValue ?? "") : undefined
        }
        onChange={props.onChange}
      >
        <option value="" disabled>
          {props.placeholder ?? "Select an option"}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      {...common}
      type={props.type ?? "text"}
      value={props.value}
      defaultValue={props.value === undefined ? props.defaultValue : undefined}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}

export function FormField(props: FormFieldProps): ReactNode {
  const { label, name, required, error, className } = props;
  const fieldId = useId();
  const errorId = useId();

  const common: CommonControlProps = {
    id: fieldId,
    name,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: styles.control,
  };

  return (
    <div className={cn(styles.field, className)}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
        {required ? " *" : null}
      </label>
      {renderControl(props, common)}
      {error ? (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
