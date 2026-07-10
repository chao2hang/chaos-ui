"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "./icons";

const browseInputVariants = cva(
  "flex items-center gap-2 rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      size: {
        default: "h-8",
        sm: "h-7",
        lg: "h-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface BrowseInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof browseInputVariants> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  "aria-invalid"?: boolean;
  onBrowse?: () => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  showBrowseButton?: boolean;
}

/**
 * @component BrowseInput
 * @category ui/data-entry
 * @since 0.2.0
 * @description An input field combined with browse/search and clear action buttons / 带有浏览/搜索和清除按钮的组合输入框
 * @keywords browse, input, search, picker, lookup
 * @example
 * <BrowseInput placeholder="Search..." onBrowse={() => openPicker()} onChange={(v) => console.log(v)} />
 */
function BrowseInput({
  className,
  size,
  value: controlledValue,
  defaultValue,
  placeholder: placeholderProp,
  disabled,
  readOnly,
  required,
  "aria-invalid": ariaInvalid,
  onBrowse,
  onChange,
  onClear,
  showClearButton = true,
  showBrowseButton = true,
  ...props
}: BrowseInputProps) {
  const { t } = useTranslation("ui");
  const placeholder = placeholderProp ?? t("browseInput.placeholder");
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    defaultValue || "",
  );
  const value = controlledValue ?? uncontrolledValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUncontrolledValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setUncontrolledValue("");
    onChange?.("");
    onClear?.();
  };

  return (
    <div
      data-slot="browse-input"
      data-size={size}
      className={cn(browseInputVariants({ size, className }))}
      aria-invalid={ariaInvalid}
      {...props}
    >
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className="h-full border-0 bg-transparent focus-visible:ring-0"
      />
      {showClearButton && value && !disabled && !readOnly && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={handleClear}
          className="mr-1 shrink-0"
          tabIndex={-1}
        >
          <XIcon className="size-3" />
          <span className="sr-only">{t("browseInput.clear")}</span>
        </Button>
      )}
      {showBrowseButton && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onBrowse}
          disabled={disabled}
          className="mr-1 shrink-0"
          tabIndex={-1}
        >
          <SearchIcon className="size-3" />
          <span className="sr-only">{t("browseInput.browse")}</span>
        </Button>
      )}
    </div>
  );
}

export { BrowseInput, browseInputVariants };
export type { BrowseInputProps };
