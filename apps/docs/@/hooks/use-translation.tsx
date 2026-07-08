"use client";
import {
  useTranslations,
  useFormatter,
  useLocale,
  useNow,
  useTimeZone,
} from "next-intl";
import type {
  NumberFormatOptions,
  DateTimeFormatOptions,
  RelativeTimeFormatOptions,
} from "next-intl";
import * as React from "react";

export { useTranslations, useFormatter, useLocale, useNow, useTimeZone };

export function useT(namespace?: string) {
  return useTranslations(namespace);
}

export interface FormatProps {
  value: number | string | Date;
  format?: "number" | "currency" | "date" | "time" | "datetime" | "relative";
  style?: "decimal" | "currency" | "percent";
  currency?: string;
  options?: NumberFormatOptions &
    DateTimeFormatOptions &
    RelativeTimeFormatOptions;
}

export function Format({
  value,
  format = "number",
  style,
  currency,
  options,
}: FormatProps) {
  const fmt = useFormatter();
  let out = "";
  try {
    if (format === "number") {
      out = fmt.number(typeof value === "number" ? value : Number(value), {
        style,
        ...(options as NumberFormatOptions),
      });
    } else if (format === "currency") {
      out = fmt.number(typeof value === "number" ? value : Number(value), {
        style: "currency",
        currency: currency ?? "CNY",
        ...(options as NumberFormatOptions),
      });
    } else if (format === "date") {
      out = fmt.dateTime(new Date(value), {
        dateStyle: "medium",
        ...(options as DateTimeFormatOptions),
      });
    } else if (format === "time") {
      out = fmt.dateTime(new Date(value), {
        timeStyle: "short",
        ...(options as DateTimeFormatOptions),
      });
    } else if (format === "datetime") {
      out = fmt.dateTime(new Date(value), {
        dateStyle: "medium",
        timeStyle: "short",
        ...(options as DateTimeFormatOptions),
      });
    } else if (format === "relative") {
      out = fmt.relativeTime(new Date(value), new Date());
    }
  } catch {
    out = String(value);
  }
  return <span data-slot="format">{out}</span>;
}
