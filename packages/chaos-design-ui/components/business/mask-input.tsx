"use client"
import * as React from "react"
import { InputMask } from "@react-input/mask"
import { cn } from "@/lib/utils"

interface MaskInputProps {
  mask: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function MaskInput({
  mask,
  value,
  onChange,
  placeholder,
  disabled,
  className,
}: MaskInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <InputMask
      mask={mask}
      replacement={{ "9": /\d/ }}
      value={value}
      onChange={handleChange}
      placeholder={placeholder ?? mask.replace(/9/g, "_")}
      disabled={disabled}
      data-slot="mask-input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base font-mono transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
    />
  )
}

MaskInput.displayName = "MaskInput"

export { MaskInput }
export type { MaskInputProps }
