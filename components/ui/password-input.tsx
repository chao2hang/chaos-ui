"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { EyeIcon, EyeOffIcon } from "./icons";

import { cn } from "@/lib/utils";

const passwordInputVariants = cva(
  "flex items-center gap-2 rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      size: {
        default: "h-8 px-2.5",
        sm: "h-7 px-2 text-sm",
        lg: "h-9 px-3 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface PasswordInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">,
    VariantProps<typeof passwordInputVariants> {
  /** Controlled value / 受控值 */
  value?: string;
  /** Default value / 默认值 */
  defaultValue?: string;
  /**
   * Change callback. Accepts both a simplified `(value: string) => void`
   * signature and a standard `React.ChangeEventHandler<HTMLInputElement>`.
   * This dual-signature allows seamless spreading of react-hook-form field
   * props via `{...field}` (which passes name, ref, onBlur, and a standard
   * onChange) as well as the original simplified API.
   * / 变更回调，同时支持简化签名和标准 ChangeEvent 签名，兼容 react-hook-form。
   */
  onChange?:
    ((value: string) => void) | React.ChangeEventHandler<HTMLInputElement>;
  /** Placeholder text / 占位文本 */
  placeholder?: string;
  /** Whether input is disabled / 是否禁用 */
  disabled?: boolean;
  /** Whether input is read-only / 是否只读 */
  readOnly?: boolean;
  /** Whether to show the toggle button / 是否显示切换按钮 (default: true) */
  showToggle?: boolean;
  /** Whether to show strength meter / 是否显示强度计 (default: false) */
  strengthMeter?: boolean;
  /** Minimum length for strength calc / 强度计算最小长度 (default: 8) */
  minLength?: number;
}

/**
 * @component PasswordInput
 * @category ui/data-entry
 * @since 0.2.0
 * @description Password input with show/hide toggle and optional strength meter / 密码输入框，支持显示/隐藏切换和可选的强度计
 * @keywords password, input, toggle, strength, security
 * @example
 * <PasswordInput placeholder="Enter password" strengthMeter />
 * <PasswordInput value={pwd} onChange={setPwd} showToggle />
 */
function PasswordInput({
  className,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  showToggle = true,
  strengthMeter = false,
  minLength = 8,
  size = "default",
  ...props
}: PasswordInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [visible, setVisible] = React.useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) setInternalValue(newValue);
    if (onChange) {
      // Normalize: support both simplified `(value: string) => void`
      // and standard `React.ChangeEventHandler<HTMLInputElement>`.
      // If the callback expects exactly 1 param (simplified), pass the raw
      // string value. Otherwise, pass the full event (react-hook-form compat).
      if (onChange.length <= 1) {
        (onChange as (v: string) => void)(newValue);
      } else {
        (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
      }
    }
  };

  return (
    <div
      data-slot="password-input"
      className={cn("flex flex-col gap-1.5", className)}
    >
      <div
        className={cn(
          passwordInputVariants({ size }),
          disabled && "pointer-events-none",
        )}
      >
        <input
          data-slot="password-input-field"
          type={visible ? "text" : "password"}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          minLength={minLength}
          className="placeholder:text-muted-foreground h-full w-full bg-transparent text-sm outline-none"
          {...props}
        />
        {showToggle && !readOnly && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            disabled={disabled}
            className="text-muted-foreground hover:text-foreground shrink-0"
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </button>
        )}
      </div>
      {strengthMeter && (
        <PasswordStrengthMeter value={value} minLength={minLength} />
      )}
    </div>
  );
}

/**
 * @component PasswordStrengthMeter
 * @category ui/data-entry
 * @since 0.2.0
 * @description Password strength meter that computes a score 0-4 based on length, case, numbers, and special chars / 密码强度计，根据长度、大小写、数字和特殊字符计算 0-4 的分数
 * @keywords password, strength, meter, score, security
 * @example
 * <PasswordStrengthMeter value="abc123" />
 */
function PasswordStrengthMeter({
  value = "",
  minLength = 8,
  className,
}: {
  value?: string;
  minLength?: number;
  className?: string;
}) {
  const score = React.useMemo(() => {
    if (!value) return 0;
    let s = 0;
    if (value.length >= minLength) s++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) s++;
    if (/\d/.test(value)) s++;
    if (/[^a-zA-Z0-9]/.test(value)) s++;
    return s;
  }, [value, minLength]);

  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  const label = value ? (labels[score - 1] ?? labels[0]) : "";
  const colorClass = value ? (colors[score - 1] ?? colors[0]) : "bg-muted";

  return (
    <div
      data-slot="password-strength-meter"
      className={cn("flex flex-col gap-1", className)}
    >
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < score ? colorClass : "bg-muted",
            )}
          />
        ))}
      </div>
      {value && <span className="text-muted-foreground text-xs">{label}</span>}
    </div>
  );
}

export { PasswordInput, PasswordStrengthMeter, passwordInputVariants };
export type { PasswordInputProps };
