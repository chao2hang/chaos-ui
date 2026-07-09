"use client";
import * as React from "react";
import PhoneInputBase, {
  type Value,
  type Country,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import zhLocale from "react-phone-number-input/locale/zh";
import { cn } from "@chaos_team/chaos-ui/lib";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: Country;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function PhoneInput({
  value,
  onChange,
  defaultCountry = "CN" as Country,
  placeholder,
  disabled,
  className,
}: PhoneInputProps) {
  return (
    <PhoneInputBase
      international
      labels={zhLocale}
      defaultCountry={defaultCountry}
      value={(value || undefined) as Value}
      onChange={(v?: Value) => onChange(v ?? "")}
      placeholder={placeholder}
      disabled={disabled}
      numberInputProps={{
        className: cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        ),
      }}
      className={cn("PhoneInput", className)}
      countrySelectProps={{
        className: cn(
          "h-8 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        ),
      }}
    />
  );
}

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
export type { PhoneInputProps };
