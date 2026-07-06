"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export type MaskType = "phone" | "currency" | "number" | "idcard" | "custom";

interface FieldMaskProps extends React.ComponentProps<"input"> {
  mask?: MaskType;
  customPattern?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const maskFormatters: Record<MaskType, (value: string) => string> = {
  phone: (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  },
  currency: (v) => {
    const digits = v.replace(/[^\d.]/g, "");
    const parts = digits.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".").slice(0, 20);
  },
  number: (v) => v.replace(/\D/g, ""),
  idcard: (v) => {
    const digits = v.replace(/[^\dXx]/g, "").slice(0, 18);
    return digits.toUpperCase();
  },
  custom: (v) => v,
};

function FieldMask({
  mask = "phone",
  customPattern,
  value: propValue,
  onChange,
  className,
  ...props
}: FieldMaskProps) {
  const [internalValue, setInternalValue] = React.useState(propValue ?? "");

  React.useEffect(() => {
    if (propValue !== undefined) setInternalValue(propValue);
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatter = maskFormatters[mask];
    const formatted = formatter(e.target.value);
    setInternalValue(formatted);
    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: formatted },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  };

  return (
    <Input
      data-slot="field-mask"
      value={internalValue}
      onChange={handleChange}
      className={cn("", className)}
      inputMode={
        mask === "number" || mask === "currency" ? "numeric" : undefined
      }
      {...(props as React.ComponentProps<"input">)}
    />
  );
}

export { FieldMask };
export type { FieldMaskProps, MaskType };
