"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "./icons";

import { cn } from "@/lib/utils";

const phoneInputVariants = cva(
  "flex items-center gap-1 rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
  {
    variants: {
      size: {
        default: "h-8",
        sm: "h-7 text-sm",
        lg: "h-9 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface CountryOption {
  /** ISO country code / ISO 国家码 */
  code: string;
  /** Display label / 显示名称 */
  label: string;
  /** Dial code, e.g. "+86" / 区号，如 "+86" */
  dialCode: string;
  /** Flag emoji / 国旗 emoji */
  flag: string;
}

interface PhoneInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof phoneInputVariants> {
  /** Controlled value (phone portion) / 受控值（电话部分） */
  value?: string;
  /** Default value / 默认值 */
  defaultValue?: string;
  /** Change callback / 变更回调 */
  onChange?: (data: {
    countryCode: string;
    phone: string;
    full: string;
  }) => void;
  /** Country list / 国家列表 */
  countries?: CountryOption[];
  /** Default country dial code / 默认区号 (default: "+86") */
  defaultCountry?: string;
  /** Placeholder / 占位文本 */
  placeholder?: string;
  /** Disabled / 是否禁用 */
  disabled?: boolean;
  /** Read-only / 是否只读 */
  readOnly?: boolean;
}

const defaultCountries: CountryOption[] = [
  { code: "CN", label: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "HK", label: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "TW", label: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { code: "US", label: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "JP", label: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", label: "Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "SG", label: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "DE", label: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", label: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "AU", label: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "CA", label: "Canada", dialCode: "+1", flag: "🇨🇦" },
];

/**
 * @component PhoneInput
 * @category ui/data-entry
 * @since 0.2.0
 * @description International phone number input with country code selector / 带国家区号选择器的国际电话号码输入框
 * @keywords phone, input, international, country, dial
 * @example
 * <PhoneInput defaultCountry="+86" onChange={(d) => console.log(d)} />
 */
function PhoneInput({
  className,
  value: controlledValue,
  defaultValue = "",
  onChange,
  countries: countriesProp = defaultCountries,
  defaultCountry = "+86",
  placeholder = "Enter phone number",
  disabled = false,
  readOnly = false,
  size = "default",
  ...props
}: PhoneInputProps) {
  const countries = countriesProp ?? [];
  const [internalPhone, setInternalPhone] = React.useState(defaultValue);
  const [countryCode, setCountryCode] = React.useState(
    defaultCountry || countries[0]?.dialCode || "+86",
  );

  const isControlled = controlledValue !== undefined;
  const phone = isControlled ? controlledValue : internalPhone;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d]/g, "");
    if (!isControlled) setInternalPhone(newValue);
    onChange?.({
      countryCode,
      phone: newValue,
      full: `${countryCode}${newValue}`,
    });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setCountryCode(newCode);
    onChange?.({ countryCode: newCode, phone, full: `${newCode}${phone}` });
  };

  return (
    <div
      data-slot="phone-input"
      data-size={size}
      className={cn(
        phoneInputVariants({ size }),
        disabled && "pointer-events-none",
        className,
      )}
      {...props}
    >
      <div className="relative flex items-center">
        <select
          data-slot="phone-input-country"
          value={countryCode}
          onChange={handleCountryChange}
          disabled={disabled || readOnly}
          className="h-full cursor-pointer appearance-none bg-transparent pr-6 pl-2.5 text-sm outline-none disabled:cursor-not-allowed"
          aria-label="Select country code"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.dialCode}>
              {c.flag} {c.dialCode}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="text-muted-foreground pointer-events-none absolute right-1 size-3" />
      </div>
      <div className="bg-border h-full w-px" />
      <input
        data-slot="phone-input-field"
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className="placeholder:text-muted-foreground h-full w-full bg-transparent px-2.5 text-sm outline-none"
      />
    </div>
  );
}

export { PhoneInput, phoneInputVariants, defaultCountries };
export type { PhoneInputProps, CountryOption };
