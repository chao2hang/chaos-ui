"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/**
 * @component I18nFormField
 * @category business/i18n
 * @since 1.0.0
 * @description Multi-language translation form field with locale tabs,
 * translation completeness indicator, and side-by-side source / target editing.
 * @keywords i18n, translation, locale, multilingual, l10n, language, field
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** A translation entry for one locale. */
interface LocaleTranslation {
  /** Locale code, e.g. "en-US", "zh-CN". */
  locale: string;
  /** Display label for the locale. */
  label: string;
  /** Translated text. */
  text: string;
  /** Whether this locale is the source / reference. */
  isSource?: boolean;
  /** Flag emoji. */
  flag?: string;
}

/** Props for I18nFormField. */
interface I18nFormFieldProps {
  /** Field key / identifier. */
  fieldKey: string;
  /** Field label. */
  label?: string;
  /** Translations for each locale. */
  translations: LocaleTranslation[];
  /** On translation change. */
  onTranslationChange?: (locale: string, text: string) => void;
  /** Textarea mode for long text. */
  multiline?: boolean;
  /** Max character limit. */
  maxLength?: number;
  /** Read-only mode. */
  readOnly?: boolean;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function completionPct(translations: LocaleTranslation[]): number {
  const nonSource = translations.filter((t) => !t.isSource);
  if (nonSource.length === 0) return 100;
  const completed = nonSource.filter((t) => t.text.trim().length > 0).length;
  return (completed / nonSource.length) * 100;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function I18nFormField({
  fieldKey,
  label,
  translations = [],
  onTranslationChange,
  multiline = false,
  maxLength,
  readOnly = false,
  className,
}: I18nFormFieldProps) {
  const [activeLocale, setActiveLocale] = React.useState(
    translations[0]?.locale ?? "",
  );

  const activeTranslation =
    translations.find((t) => t.locale === activeLocale) ?? translations[0];
  const sourceTranslation = translations.find((t) => t.isSource);
  const completion = completionPct(translations);

  const completionColor =
    completion === 100
      ? "text-emerald-600"
      : completion >= 50
        ? "text-amber-600"
        : "text-destructive";

  return (
    <div
      data-slot="i18n-form-field"
      data-field-key={fieldKey}
      className={cn(
        "border-border bg-card space-y-2 rounded-lg border p-4",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {label && (
            <label className="text-foreground text-sm font-medium">
              {label}
            </label>
          )}
          <span className="text-muted-foreground font-mono text-xs">
            {fieldKey}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">Translation:</span>
          <Badge variant="outline" className={cn("text-xs", completionColor)}>
            {completion.toFixed(0)}%
          </Badge>
        </div>
      </div>

      {/* Locale tabs */}
      <div
        className="border-border flex flex-wrap gap-1 border-b pb-2"
        data-slot="locale-tabs"
      >
        {translations.map((t) => {
          const isActive = t.locale === activeLocale;
          const isFilled = t.text.trim().length > 0;
          return (
            <button
              key={t.locale}
              type="button"
              data-slot="locale-tab"
              data-active={isActive}
              data-locale={t.locale}
              onClick={() => setActiveLocale(t.locale)}
              className={cn(
                "flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors",
                isActive
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted/30",
              )}
            >
              {t.flag && <span className="text-sm">{t.flag}</span>}
              <span className="font-medium">{t.label}</span>
              {t.isSource && (
                <span className="rounded-full bg-blue-100 px-1 text-[9px] text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  SRC
                </span>
              )}
              {!t.isSource && (
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    isFilled ? "bg-emerald-500" : "bg-muted-foreground/30",
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Editing area */}
      <div className="space-y-2">
        {/* Source reference (if not editing source) */}
        {sourceTranslation &&
          activeTranslation &&
          !activeTranslation.isSource && (
            <div
              data-slot="source-reference"
              className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 dark:border-blue-900 dark:bg-blue-950/30"
            >
              <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                <span>{sourceTranslation.flag}</span>
                <span className="font-medium">
                  Source ({sourceTranslation.label}):
                </span>
              </div>
              <div className="text-foreground mt-0.5 text-sm">
                {sourceTranslation.text || "—"}
              </div>
            </div>
          )}

        {/* Input */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              {activeTranslation?.flag} {activeTranslation?.label}
              {activeTranslation?.isSource && " (Source)"}
            </span>
            {maxLength && (
              <span
                className={cn(
                  "text-xs tabular-nums",
                  (activeTranslation?.text.length ?? 0) > maxLength
                    ? "text-destructive"
                    : "text-muted-foreground",
                )}
              >
                {activeTranslation?.text.length ?? 0} / {maxLength}
              </span>
            )}
          </div>
          {multiline ? (
            <textarea
              className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none"
              rows={3}
              value={activeTranslation?.text ?? ""}
              onChange={(e) =>
                onTranslationChange?.(activeLocale, e.target.value)
              }
              disabled={readOnly}
              aria-label={`Translation for ${activeTranslation?.label}`}
              maxLength={maxLength}
            />
          ) : (
            <Input
              className="text-sm"
              value={activeTranslation?.text ?? ""}
              onChange={(e) =>
                onTranslationChange?.(activeLocale, e.target.value)
              }
              disabled={readOnly}
              aria-label={`Translation for ${activeTranslation?.label}`}
              maxLength={maxLength}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { I18nFormField };
export type { I18nFormFieldProps, LocaleTranslation };
