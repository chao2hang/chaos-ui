/**
 * @lib date-presets
 * @category ui/data-entry
 * @since 1.14.0
 * @description 常用日期区间预设（今天/昨天/本周/本月/上月/本年），供 FilterBar、
 * DateRangePicker、PresetDateRangePicker 共用同一组 token，避免业务各自硬编码。
 * / Common date-range presets shared across FilterBar and date pickers.
 * @keywords date, preset, range, today, week, month, year
 * @example
 * ```ts
 * import { DATE_PRESETS, getDateRange } from '@chaos_team/chaos-ui';
 * const { start, end } = getDateRange('thisMonth');
 * ```
 */

export type DatePresetKey =
  "today" | "yesterday" | "thisWeek" | "thisMonth" | "lastMonth" | "thisYear";

export interface DateRange {
  start: Date;
  end: Date;
}

export interface DatePreset {
  key: DatePresetKey;
  label: string;
  getRange: (now?: Date) => DateRange;
}

function startOfDay(d: Date): Date {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}

function endOfDay(d: Date): Date {
  const n = new Date(d);
  n.setHours(23, 59, 59, 999);
  return n;
}

/** Week starts on Monday. */
function startOfWeek(d: Date): Date {
  const n = startOfDay(d);
  const day = n.getDay(); // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day; // back to Monday
  n.setDate(n.getDate() + diff);
  return n;
}

function startOfMonth(d: Date): Date {
  const n = startOfDay(d);
  n.setDate(1);
  return n;
}

function startOfYear(d: Date): Date {
  const n = startOfDay(d);
  n.setMonth(0, 1);
  return n;
}

export const DATE_PRESETS: DatePreset[] = [
  {
    key: "today",
    label: "今天",
    getRange: (now = new Date()) => ({
      start: startOfDay(now),
      end: endOfDay(now),
    }),
  },
  {
    key: "yesterday",
    label: "昨天",
    getRange: (now = new Date()) => {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      return { start: startOfDay(y), end: endOfDay(y) };
    },
  },
  {
    key: "thisWeek",
    label: "本周",
    getRange: (now = new Date()) => {
      const start = startOfWeek(now);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return { start, end: endOfDay(end) };
    },
  },
  {
    key: "thisMonth",
    label: "本月",
    getRange: (now = new Date()) => {
      const start = startOfMonth(now);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { start, end: endOfDay(end) };
    },
  },
  {
    key: "lastMonth",
    label: "上月",
    getRange: (now = new Date()) => {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { start, end: endOfDay(end) };
    },
  },
  {
    key: "thisYear",
    label: "本年",
    getRange: (now = new Date()) => {
      const start = startOfYear(now);
      const end = new Date(now.getFullYear(), 11, 31);
      return { start, end: endOfDay(end) };
    },
  },
];

const PRESET_MAP = new Map(DATE_PRESETS.map((p) => [p.key, p]));

/** Resolve a preset key to a concrete `{ start, end }` range. */
export function getDateRange(key: DatePresetKey, now?: Date): DateRange | null {
  const preset = PRESET_MAP.get(key);
  return preset ? preset.getRange(now) : null;
}

export { DATE_PRESETS as default };
