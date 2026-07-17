/**
 * @module date
 * @category Utility
 * @since 1.0.0-beta.0
 * @description Date helpers that complement @/lib/format — parsing, comparison, arithmetic, and query predicates. For user-facing formatting use `formatDate`/`formatDateTime` from `@/lib/format`.
 * @example
 * parseDate("2026-06-30");      // Date
 * addDays(new Date(), 7);       // Date +7d
 * isSameDay(a, b);              // boolean
 * startOfDay(new Date());       // Date at 00:00:00
 */

/** Parse a value into a Date, returning `undefined` for invalid input (does not throw). */
export function parseDate(
  value: Date | number | string | undefined | null,
): Date | undefined {
  if (value === undefined || value === null) return undefined;
  if (value instanceof Date)
    return Number.isNaN(value.getTime()) ? undefined : value;
  if (typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }
  // Date-only (YYYY-MM-DD) as local calendar day — avoid UTC midnight skew.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [ys, ms, ds] = value.split("-");
    const d = new Date(Number(ys), Number(ms) - 1, Number(ds));
    return Number.isNaN(d.getTime()) ? undefined : d;
  }
  // string: try ISO first, then Date.parse
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/** Returns true if the value is a valid Date. */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/** Add a number of units to a date. Returns a new Date. */
export function add(
  date: Date,
  amount: number,
  unit:
    "year" | "month" | "week" | "day" | "hour" | "minute" | "second" = "day",
): Date {
  const d = new Date(date);
  switch (unit) {
    case "year":
      d.setFullYear(d.getFullYear() + amount);
      break;
    case "month":
      d.setMonth(d.getMonth() + amount);
      break;
    case "week":
      d.setDate(d.getDate() + amount * 7);
      break;
    case "day":
      d.setDate(d.getDate() + amount);
      break;
    case "hour":
      d.setHours(d.getHours() + amount);
      break;
    case "minute":
      d.setMinutes(d.getMinutes() + amount);
      break;
    case "second":
      d.setSeconds(d.getSeconds() + amount);
      break;
  }
  return d;
}

/** Shorthand for add(date, amount, "day"). */
export function addDays(date: Date, amount: number): Date {
  return add(date, amount, "day");
}

/** Difference between two dates in the given unit (truncated, integer). */
export function diff(
  a: Date,
  b: Date,
  unit: "day" | "hour" | "minute" | "second" = "day",
): number {
  const ms = a.getTime() - b.getTime();
  switch (unit) {
    case "day":
      return Math.trunc(ms / 86_400_000);
    case "hour":
      return Math.trunc(ms / 3_600_000);
    case "minute":
      return Math.trunc(ms / 60_000);
    case "second":
      return Math.trunc(ms / 1000);
  }
}

/** Reset a date to 00:00:00.000 local time. */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Set a date to 23:59:59.999 local time. */
export function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/** True if the two dates fall on the same calendar day. */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** True if `date` is today. */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/** True if `date` is within the current calendar week (Mon–Sun, ISO/business). */
export function isThisWeek(date: Date): boolean {
  const now = new Date();
  const day = now.getDay(); // 0=Sun..6=Sat
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const start = startOfDay(addDays(now, diffToMonday));
  const end = addDays(start, 7);
  return date >= start && date < end;
}

/** Format a date as an ISO `YYYY-MM-DD` string (local time). */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Backward-compat default export name — returns the helper bag. */
export function date() {
  return {
    parseDate,
    isValidDate,
    add,
    addDays,
    diff,
    startOfDay,
    endOfDay,
    isSameDay,
    isToday,
    isThisWeek,
    toISODate,
  };
}
