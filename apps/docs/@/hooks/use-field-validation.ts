"use client";

import * as React from "react";

interface ValidationRule {
  type: "required" | "min" | "max" | "pattern" | "custom";
  message: string;
  value?: number | RegExp | ((v: unknown) => boolean);
}

interface UseFieldValidationOptions {
  rules?: ValidationRule[];
  externalError?: string;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

function validateValue(value: unknown, rules: ValidationRule[]): string | undefined {
  for (const rule of rules) {
    switch (rule.type) {
      case "required": {
        if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
          return rule.message;
        }
        break;
      }
      case "min": {
        if (typeof rule.value === "number") {
          if (typeof value === "number" && value < rule.value) return rule.message;
          if (typeof value === "string" && value.length < rule.value) return rule.message;
        }
        break;
      }
      case "max": {
        if (typeof rule.value === "number") {
          if (typeof value === "number" && value > rule.value) return rule.message;
          if (typeof value === "string" && value.length > rule.value) return rule.message;
        }
        break;
      }
      case "pattern": {
        if (rule.value instanceof RegExp && typeof value === "string" && !rule.value.test(value)) {
          return rule.message;
        }
        break;
      }
      case "custom": {
        if (typeof rule.value === "function" && !rule.value(value)) {
          return rule.message;
        }
        break;
      }
    }
  }
  return undefined;
}

function useFieldValidation(options: UseFieldValidationOptions = {}) {
  const { rules = [], externalError, validateOnBlur = true, validateOnChange = false } = options;
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [touched, setTouched] = React.useState(false);

  const validate = React.useCallback(
    (value: unknown) => {
      const result = validateValue(value, rules);
      setError(result);
      return result;
    },
    [rules],
  );

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setTouched(true);
      if (validateOnBlur) {
        validate(e.target.value);
      }
    },
    [validate, validateOnBlur],
  );

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (validateOnChange && touched) {
        validate(e.target.value);
      }
    },
    [validate, validateOnChange, touched],
  );

  const reset = React.useCallback(() => {
    setError(undefined);
    setTouched(false);
  }, []);

  const displayError = externalError ?? error;

  return { error: displayError, onBlur, onChange, validate, reset, touched };
}

export { useFieldValidation };
export type { ValidationRule, UseFieldValidationOptions };
