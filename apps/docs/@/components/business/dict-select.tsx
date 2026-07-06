"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface DictOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DictSelectProps extends React.ComponentProps<typeof SelectTrigger> {
  dictCode?: string;
  options?: DictOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function DictSelect({
  dictCode,
  options = [],
  value,
  onValueChange,
  placeholder = "请选择",
  className,
  ...props
}: DictSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        data-slot="dict-select"
        className={cn("", className)}
        {...(props as React.ComponentProps<"button">)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { DictSelect };
export type { DictSelectProps, DictOption };
