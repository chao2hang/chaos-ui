"use client"
import * as React from "react"
import { LanguagesIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface LanguageOption {
  code: string
  label: string
  nativeLabel?: string
  flag?: string
}

interface LanguageSwitcherProps {
  value?: string
  onChange?: (code: string) => void
  options?: LanguageOption[]
  className?: string
  align?: "start" | "center" | "end"
}

const DEFAULT_LANGUAGES: LanguageOption[] = [
  { code: "zh-CN", label: "Chinese (Simplified)", nativeLabel: "简体中文" },
  { code: "zh-TW", label: "Chinese (Traditional)", nativeLabel: "繁體中文" },
  { code: "en-US", label: "English (US)", nativeLabel: "English" },
  { code: "ja-JP", label: "Japanese", nativeLabel: "日本語" },
  { code: "ko-KR", label: "Korean", nativeLabel: "한국어" },
]

export function LanguageSwitcher({
  value,
  onChange,
  options = DEFAULT_LANGUAGES,
  className,
  align = "end",
}: LanguageSwitcherProps) {
  const current = options.find((o) => o.code === value) ?? options[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1.5", className)}
            aria-label="Switch language"
          />
        }
      >
        <LanguagesIcon />
        <span className="text-xs">{current?.nativeLabel ?? current?.code}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>选择语言</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.code}
            onClick={() => onChange?.(opt.code)}
            className="justify-between"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm">{opt.nativeLabel ?? opt.label}</span>
              {opt.nativeLabel && opt.nativeLabel !== opt.label && (
                <span className="text-xs text-muted-foreground">{opt.label}</span>
              )}
            </div>
            {opt.code === value && <CheckIcon className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
