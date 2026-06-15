"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, XIcon } from "lucide-react"

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
  }
)

interface BrowseInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value">,
    VariantProps<typeof browseInputVariants> {
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  "aria-invalid"?: boolean
  onBrowse?: () => void
  onChange?: (value: string) => void
  onClear?: () => void
  showClearButton?: boolean
  showBrowseButton?: boolean
}

function BrowseInput({
  className,
  size,
  value: controlledValue,
  defaultValue,
  placeholder = "Select...",
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
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")
  const value = controlledValue ?? uncontrolledValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setUncontrolledValue(newValue)
    onChange?.(newValue)
  }

  const handleClear = () => {
    setUncontrolledValue("")
    onChange?.("")
    onClear?.()
  }

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
        className="border-0 bg-transparent focus-visible:ring-0 h-full"
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
          <span className="sr-only">Clear</span>
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
          <span className="sr-only">Browse</span>
        </Button>
      )}
    </div>
  )
}

export { BrowseInput, browseInputVariants }
export type { BrowseInputProps }
