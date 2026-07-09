"use client";

import * as React from "react";
import cronstrue from "cronstrue";
import { ClockIcon } from "@chaos_team/chaos-ui/ui-icons";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { SegmentedControl } from "@chaos_team/chaos-ui/ui";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@chaos_team/chaos-ui/ui";

/**
 * @component CronEditor
 * @category business/form
 * @since 1.0.0
 * @description Cron 表达式编辑器,支持 5 段(分/时/日/月/周)可视化编辑,实时生成人类可读描述(中文),提供常用预设。
 * @keywords cron, editor, schedule, cronstrue
 * @example
 * <CronEditor value="0 9 * * 1-5" onChange={setCron} showDescription />
 */

type CronSegment = "minute" | "hour" | "day" | "month" | "weekday";

type SegmentMode = "every" | "step" | "specific" | "range";

interface CronSegmentConfig {
  label: string;
  tab: string;
  min: number;
  max: number;
  options: { value: string; label: string }[];
}

const SEGMENT_CONFIGS: Record<CronSegment, CronSegmentConfig> = {
  minute: {
    label: "分钟",
    tab: "分",
    min: 0,
    max: 59,
    options: Array.from({ length: 60 }, (_, i) => ({
      value: String(i),
      label: String(i),
    })),
  },
  hour: {
    label: "小时",
    tab: "时",
    min: 0,
    max: 23,
    options: Array.from({ length: 24 }, (_, i) => ({
      value: String(i),
      label: String(i),
    })),
  },
  day: {
    label: "日",
    tab: "日",
    min: 1,
    max: 31,
    options: Array.from({ length: 31 }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    })),
  },
  month: {
    label: "月",
    tab: "月",
    min: 1,
    max: 12,
    options: [
      { value: "1", label: "1月" },
      { value: "2", label: "2月" },
      { value: "3", label: "3月" },
      { value: "4", label: "4月" },
      { value: "5", label: "5月" },
      { value: "6", label: "6月" },
      { value: "7", label: "7月" },
      { value: "8", label: "8月" },
      { value: "9", label: "9月" },
      { value: "10", label: "10月" },
      { value: "11", label: "11月" },
      { value: "12", label: "12月" },
    ],
  },
  weekday: {
    label: "周",
    tab: "周",
    min: 0,
    max: 6,
    options: [
      { value: "0", label: "周日" },
      { value: "1", label: "周一" },
      { value: "2", label: "周二" },
      { value: "3", label: "周三" },
      { value: "4", label: "周四" },
      { value: "5", label: "周五" },
      { value: "6", label: "周六" },
    ],
  },
};

const SEGMENT_ORDER: CronSegment[] = [
  "minute",
  "hour",
  "day",
  "month",
  "weekday",
];

const PRESETS: { label: string; value: string }[] = [
  { label: "每 5 分钟", value: "*/5 * * * *" },
  { label: "每 10 分钟", value: "*/10 * * * *" },
  { label: "每 30 分钟", value: "*/30 * * * *" },
  { label: "每小时", value: "0 * * * *" },
  { label: "每天 0 点", value: "0 0 * * *" },
  { label: "每天 9 点", value: "0 9 * * *" },
  { label: "工作日 9 点", value: "0 9 * * 1-5" },
  { label: "每周一 9 点", value: "0 9 * * 1" },
  { label: "每月 1 号 0 点", value: "0 0 1 * *" },
  { label: "每月最后一天 23:59", value: "59 23 28-31 * *" },
];

interface CronSegmentState {
  mode: SegmentMode;
  stepValue: number;
  specificValues: string[];
  rangeStart: number;
  rangeEnd: number;
}

function parseSegmentValue(
  segment: string,
  config: CronSegmentConfig,
): CronSegmentState {
  if (segment === "*") {
    return {
      mode: "every",
      stepValue: 1,
      specificValues: [],
      rangeStart: config.min,
      rangeEnd: config.max,
    };
  }

  // */N
  const stepMatch = /^\*\/(\d+)$/.exec(segment);
  if (stepMatch) {
    return {
      mode: "step",
      stepValue: Number(stepMatch[1]!),
      specificValues: [],
      rangeStart: config.min,
      rangeEnd: config.max,
    };
  }

  // N-M
  const rangeMatch = /^(\d+)-(\d+)$/.exec(segment);
  if (rangeMatch) {
    return {
      mode: "range",
      stepValue: 1,
      specificValues: [],
      rangeStart: Number(rangeMatch[1]!),
      rangeEnd: Number(rangeMatch[2]!),
    };
  }

  // N,M,K
  if (segment.includes(",")) {
    return {
      mode: "specific",
      stepValue: 1,
      specificValues: segment.split(","),
      rangeStart: config.min,
      rangeEnd: config.max,
    };
  }

  // Single value — treat as specific
  return {
    mode: "specific",
    stepValue: 1,
    specificValues: [segment],
    rangeStart: config.min,
    rangeEnd: config.max,
  };
}

function segmentStateToValue(state: CronSegmentState): string {
  switch (state.mode) {
    case "every":
      return "*";
    case "step":
      return `*/${state.stepValue}`;
    case "range":
      return `${state.rangeStart}-${state.rangeEnd}`;
    case "specific":
      return state.specificValues.length > 0
        ? state.specificValues.join(",")
        : "*";
    default:
      return "*";
  }
}

function parseCronParts(cron: string): string[] {
  const parts = cron.trim().split(/\s+/);
  while (parts.length < 5) parts.push("*");
  return parts.slice(0, 5);
}

function getCronDescription(cron: string): string {
  try {
    return cronstrue.toString(cron, {
      locale: "zh_CN",
      use24HourTimeFormat: true,
    });
  } catch {
    try {
      return cronstrue.toString(cron);
    } catch {
      return "无效的 Cron 表达式";
    }
  }
}

interface CronEditorProps {
  /** 5 段 Cron 表达式 */
  value: string;
  /** 表达式变化回调 */
  onChange?: (value: string) => void;
  /** 是否显示人类可读描述 */
  showDescription?: boolean;
  /** 只读模式 */
  readOnly?: boolean;
  className?: string;
}

function CronEditor({
  value = "* * * * *",
  onChange,
  showDescription = true,
  readOnly = false,
  className,
}: CronEditorProps) {
  const parts = React.useMemo(() => parseCronParts(value), [value]);

  const [segmentStates, setSegmentStates] = React.useState<
    Record<CronSegment, CronSegmentState>
  >(() => {
    const result = {} as Record<CronSegment, CronSegmentState>;
    SEGMENT_ORDER.forEach((seg, i) => {
      result[seg] = parseSegmentValue(parts[i] ?? "*", SEGMENT_CONFIGS[seg]);
    });
    return result;
  });

  // Sync internal state when value prop changes
  React.useEffect(() => {
    const newParts = parseCronParts(value);
    setSegmentStates((prev) => {
      const next = {} as Record<CronSegment, CronSegmentState>;
      SEGMENT_ORDER.forEach((seg, i) => {
        const current = prev[seg];
        const parsed = parseSegmentValue(
          newParts[i] ?? "*",
          SEGMENT_CONFIGS[seg],
        );
        // Only update if the raw value changed to avoid loops
        const currentRaw = segmentStateToValue(current);
        const parsedRaw = segmentStateToValue(parsed);
        next[seg] =
          currentRaw === parsedRaw && currentRaw === newParts[i]
            ? current
            : parsed;
      });
      return next;
    });
  }, [value]);

  const updateSegment = (
    seg: CronSegment,
    state: Partial<CronSegmentState>,
  ) => {
    if (readOnly) return;
    setSegmentStates((prev) => {
      const newStates = {
        ...prev,
        [seg]: { ...prev[seg], ...state },
      };
      const newParts = SEGMENT_ORDER.map((s) =>
        segmentStateToValue(newStates[s]),
      );
      onChange?.(newParts.join(" "));
      return newStates;
    });
  };

  const description = React.useMemo(() => getCronDescription(value), [value]);

  const handlePreset = (presetValue: string) => {
    if (readOnly) return;
    onChange?.(presetValue);
  };

  const modeOptions: { value: string; label: string }[] = [
    { value: "every", label: "每" },
    { value: "step", label: "间隔" },
    { value: "specific", label: "指定" },
    { value: "range", label: "范围" },
  ];

  return (
    <div
      data-slot="cron-editor"
      className={cn("bg-background rounded-md border p-3", className)}
    >
      {/* Raw cron expression display */}
      <div className="bg-muted/30 mb-3 flex items-center gap-2 rounded-md px-3 py-2">
        <ClockIcon className="text-muted-foreground size-4 shrink-0" />
        <code className="flex-1 font-mono text-sm font-medium">{value}</code>
      </div>

      {/* Presets */}
      <div className="mb-3">
        <Label className="text-muted-foreground mb-1.5 text-xs">常用预设</Label>
        <div className="flex flex-wrap gap-1">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              disabled={readOnly}
              onClick={() => handlePreset(preset.value)}
              className={cn(
                "rounded-md border px-2 py-1 text-xs transition-colors",
                "hover:border-primary hover:bg-primary/5",
                "disabled:cursor-not-allowed disabled:opacity-50",
                value === preset.value &&
                  "border-primary bg-primary/10 text-primary",
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Segment editors */}
      <Tabs defaultValue="minute">
        <TabsList className="mb-2">
          {SEGMENT_ORDER.map((seg) => (
            <TabsTrigger key={seg} value={seg}>
              {SEGMENT_CONFIGS[seg].tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {SEGMENT_ORDER.map((seg) => {
          const config = SEGMENT_CONFIGS[seg];
          const state = segmentStates[seg];

          return (
            <TabsContent key={seg} value={seg} className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">{config.label}</Label>
                <SegmentedControl
                  options={modeOptions}
                  value={state.mode}
                  onChange={(v) =>
                    updateSegment(seg, { mode: v as SegmentMode })
                  }
                  size="sm"
                  disabled={readOnly}
                />
              </div>

              {state.mode === "every" && (
                <p className="text-muted-foreground text-sm">
                  每{config.label}都执行
                </p>
              )}

              {state.mode === "step" && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">每</span>
                  <Input
                    type="number"
                    min={1}
                    max={config.max - config.min + 1}
                    value={state.stepValue}
                    onChange={(e) =>
                      updateSegment(seg, {
                        stepValue: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                    disabled={readOnly}
                    className="w-20"
                    aria-label={`${config.label}间隔值`}
                  />
                  <span className="text-muted-foreground text-sm">
                    个{config.label}执行一次
                  </span>
                </div>
              )}

              {state.mode === "specific" && (
                <div className="space-y-1.5">
                  <p className="text-muted-foreground text-xs">
                    选择多个{config.label}(可多选)
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {config.options.map((opt) => {
                      const selected = state.specificValues.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          disabled={readOnly}
                          onClick={() => {
                            const newValues = selected
                              ? state.specificValues.filter(
                                  (v) => v !== opt.value,
                                )
                              : [...state.specificValues, opt.value].sort(
                                  (a, b) => Number(a) - Number(b),
                                );
                            updateSegment(seg, { specificValues: newValues });
                          }}
                          className={cn(
                            "min-w-8 rounded border px-1.5 py-1 text-xs transition-colors",
                            selected
                              ? "border-primary bg-primary/10 text-primary"
                              : "hover:border-primary/50",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                          )}
                          aria-pressed={selected}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {state.mode === "range" && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">从</span>
                  <Input
                    type="number"
                    min={config.min}
                    max={config.max}
                    value={state.rangeStart}
                    onChange={(e) =>
                      updateSegment(seg, {
                        rangeStart: Math.max(
                          config.min,
                          Math.min(
                            config.max,
                            Number(e.target.value) || config.min,
                          ),
                        ),
                      })
                    }
                    disabled={readOnly}
                    className="w-20"
                    aria-label={`${config.label}范围起始`}
                  />
                  <span className="text-muted-foreground text-sm">到</span>
                  <Input
                    type="number"
                    min={config.min}
                    max={config.max}
                    value={state.rangeEnd}
                    onChange={(e) =>
                      updateSegment(seg, {
                        rangeEnd: Math.max(
                          config.min,
                          Math.min(
                            config.max,
                            Number(e.target.value) || config.max,
                          ),
                        ),
                      })
                    }
                    disabled={readOnly}
                    className="w-20"
                    aria-label={`${config.label}范围结束`}
                  />
                  <span className="text-muted-foreground text-sm">
                    每{config.label}执行
                  </span>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Description */}
      {showDescription && (
        <div className="bg-primary/5 mt-3 rounded-md px-3 py-2">
          <Label className="text-muted-foreground mb-0.5 block text-xs">
            执行描述
          </Label>
          <p className="text-foreground text-sm font-medium">{description}</p>
        </div>
      )}
    </div>
  );
}

CronEditor.displayName = "CronEditor";

export { CronEditor };
export type { CronEditorProps, CronSegment, SegmentMode };
