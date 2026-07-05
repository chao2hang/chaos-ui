"use client"
import { useTranslations, useFormatter, useLocale, useNow, useTimeZone } from "next-intl"
import * as React from "react"

export { useTranslations, useFormatter, useLocale, useNow, useTimeZone }

export function useT(namespace?: string) {
  return useTranslations(namespace)
}

type Formatter = ReturnType<typeof useFormatter>
type NumberFormatOptions = NonNullable<Parameters<Formatter["number"]>[1]>
type DateTimeFormatOptions = NonNullable<Parameters<Formatter["dateTime"]>[1]>
type RelativeTimeFormatOptions = NonNullable<Parameters<Formatter["relativeTime"]>[1]>

export interface FormatProps {
  value: number | string | Date
  format?: "number" | "currency" | "date" | "time" | "datetime" | "relative"
  style?: "decimal" | "currency" | "percent"
  currency?: string
  options?: NumberFormatOptions | DateTimeFormatOptions | RelativeTimeFormatOptions
}

export function Format({ value, format = "number", style, currency, options }: FormatProps) {
  const fmt = useFormatter()
  let out = ""
  try {
    const userOptions = (options ?? {}) as Record<string, unknown>
    if (format === "number") {
      out = fmt.number(typeof value === "number" ? value : Number(value), {
        style,
        ...userOptions,
      } as unknown as NumberFormatOptions)
    } else if (format === "currency") {
      out = fmt.number(typeof value === "number" ? value : Number(value), {
        style: "currency",
        currency: currency ?? "CNY",
        ...userOptions,
      } as unknown as NumberFormatOptions)
    } else if (format === "date") {
      out = fmt.dateTime(new Date(value), {
        dateStyle: "medium",
        ...userOptions,
      } as unknown as DateTimeFormatOptions)
    } else if (format === "time") {
      out = fmt.dateTime(new Date(value), {
        timeStyle: "short",
        ...userOptions,
      } as unknown as DateTimeFormatOptions)
    } else if (format === "datetime") {
      out = fmt.dateTime(new Date(value), {
        dateStyle: "medium",
        timeStyle: "short",
        ...userOptions,
      } as unknown as DateTimeFormatOptions)
    } else if (format === "relative") {
      out = fmt.relativeTime(new Date(value), new Date())
    }
  } catch {
    out = String(value)
  }
  return <span data-slot="format">{out}</span>
}
