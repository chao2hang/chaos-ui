let _locale = "zh-CN";

export function setFormatLocale(locale: string) {
  _locale = locale;
}

export function getFormatLocale(): string {
  return _locale;
}

export function formatDate(
  value: Date | number | string,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
  locale = getFormatLocale(),
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatTime(
  value: Date | number | string,
  options: Intl.DateTimeFormatOptions = { timeStyle: "short" },
  locale = getFormatLocale(),
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatDateTime(
  value: Date | number | string,
  locale = getFormatLocale(),
): string {
  return formatDate(value, { dateStyle: "medium", timeStyle: "short" }, locale);
}

export function formatRelativeTime(
  value: Date | number | string,
  locale = getFormatLocale(),
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  const diff = (date.getTime() - Date.now()) / 1000;
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const ranges: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [3600, "minute"],
    [86400, "hour"],
    [2592000, "day"],
    [31536000, "month"],
    [Infinity, "year"],
  ];
  let unit: Intl.RelativeTimeFormatUnit = "second";
  let divisor = 1;
  for (const [seconds, u] of ranges) {
    if (abs < seconds) {
      unit = u;
      divisor =
        unit === "second"
          ? 1
          : unit === "minute"
            ? 60
            : unit === "hour"
              ? 3600
              : unit === "day"
                ? 86400
                : unit === "month"
                  ? 2592000
                  : 31536000;
      break;
    }
  }
  return rtf.format(Math.round(diff / divisor), unit);
}

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale = getFormatLocale(),
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCompactNumber(
  value: number,
  locale = getFormatLocale(),
): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(
  value: number,
  fractionDigits = 1,
  locale = getFormatLocale(),
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatCurrency(
  value: number,
  currency = "CNY",
  locale = getFormatLocale(),
): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value,
  );
}

const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB"] as const;

export function formatFileSize(bytes: number, fractionDigits = 1): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "-";
  if (bytes === 0) return "0 B";
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    SIZE_UNITS.length - 1,
  );
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i === 0 ? 0 : fractionDigits)} ${SIZE_UNITS[i]}`;
}

export function formatDuration(
  seconds: number,
  locale = getFormatLocale(),
): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "-";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0)
    return new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      unitDisplay: "narrow",
    }).format(h);
  if (m > 0)
    return new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "narrow",
    }).format(m);
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "second",
    unitDisplay: "narrow",
  }).format(s);
}

export function truncate(text: string, max = 50, suffix = "…"): string {
  if (text.length <= max) return text;
  return text.slice(0, max - suffix.length) + suffix;
}

export function initials(name: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}
