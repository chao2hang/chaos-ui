// 弱缓存的 Intl 格式化器工厂:按 locale+options 稳定序列化后复用。
// Intl.DateTimeFormat/NumberFormat/RelativeTimeFormat 构造昂贵,
// 组件渲染中反复 new 会拖慢,缓存能显著降低开销。
const formatterCache = new Map<string, unknown>()

function cacheKey<Ctor extends new (...args: never[]) => unknown>(
  Ctor: Ctor,
  locale: string | undefined,
  options: object,
): string {
  return `${Ctor.name}|${locale ?? ""}|${JSON.stringify(options)}`
}

function getCached<Ctor extends new (...args: never[]) => unknown>(
  Ctor: Ctor,
  locale: string | undefined,
  options: object,
): InstanceType<Ctor> {
  const key = cacheKey(Ctor, locale, options)
  let cached = formatterCache.get(key) as InstanceType<Ctor> | undefined
  if (!cached) {
    cached = new Ctor(locale as never, options as never) as InstanceType<Ctor>
    formatterCache.set(key, cached)
  }
  return cached
}

function toDate(value: Date | number | string): Date {
  return value instanceof Date ? value : new Date(value)
}

export function formatDate(
  value: Date | number | string,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
  locale = "zh-CN",
): string {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return "-"
  return getCached(Intl.DateTimeFormat, locale, options).format(date)
}

export function formatTime(
  value: Date | number | string,
  options: Intl.DateTimeFormatOptions = { timeStyle: "short" },
  locale = "zh-CN",
): string {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return "-"
  return getCached(Intl.DateTimeFormat, locale, options).format(date)
}

export function formatDateTime(
  value: Date | number | string,
  locale = "zh-CN",
): string {
  return formatDate(value, { dateStyle: "medium", timeStyle: "short" }, locale)
}

const RELATIVE_DIVISORS: Partial<Record<Intl.RelativeTimeFormatUnit, number>> = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2592000,
  quarter: 7776000,
  year: 31536000,
}

const RELATIVE_RANGES: Array<[threshold: number, unit: Intl.RelativeTimeFormatUnit]> = [
  [60, "second"],
  [3600, "minute"],
  [86400, "hour"],
  [2592000, "day"],
  [31536000, "month"],
  [Infinity, "year"],
]

export function formatRelativeTime(
  value: Date | number | string,
  locale = "zh-CN",
): string {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return "-"
  const diff = (date.getTime() - Date.now()) / 1000
  const abs = Math.abs(diff)
  const unit = RELATIVE_RANGES.find(([threshold]) => abs < threshold)?.[1] ?? "second"
  const divisor = RELATIVE_DIVISORS[unit] ?? 1
  const rtf = getCached(Intl.RelativeTimeFormat, locale, { numeric: "auto" })
  return rtf.format(Math.round(diff / divisor), unit)
}

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale = "zh-CN",
): string {
  return getCached(Intl.NumberFormat, locale, options).format(value)
}

export function formatCompactNumber(value: number, locale = "zh-CN"): string {
  return formatNumber(value, { notation: "compact", maximumFractionDigits: 1 }, locale)
}

export function formatPercent(
  value: number,
  fractionDigits = 1,
  locale = "zh-CN",
): string {
  return formatNumber(
    value,
    {
      style: "percent",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    },
    locale,
  )
}

export function formatCurrency(
  value: number,
  currency = "CNY",
  locale = "zh-CN",
): string {
  return formatNumber(value, { style: "currency", currency }, locale)
}

const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB"] as const

export function formatFileSize(bytes: number, fractionDigits = 1): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "-"
  if (bytes === 0) return "0 B"
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    SIZE_UNITS.length - 1,
  )
  const value = bytes / Math.pow(1024, i)
  return `${value.toFixed(i === 0 ? 0 : fractionDigits)} ${SIZE_UNITS[i]}`
}

export function formatDuration(seconds: number, locale = "zh-CN"): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "-"
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return formatNumber(h, { style: "unit", unit: "hour", unitDisplay: "narrow" }, locale)
  if (m > 0) return formatNumber(m, { style: "unit", unit: "minute", unitDisplay: "narrow" }, locale)
  return formatNumber(s, { style: "unit", unit: "second", unitDisplay: "narrow" }, locale)
}

export function truncate(text: string, max = 50, suffix = "…"): string {
  if (text.length <= max) return text
  return text.slice(0, max - suffix.length) + suffix
}

export function initials(name: string): string {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("")
}
