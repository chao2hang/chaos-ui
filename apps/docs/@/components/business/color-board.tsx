"use client";

import * as React from "react";
import { HexColorPicker } from "react-colorful";
import { PipetteIcon, CheckIcon, XIcon } from "@chaos_team/chaos-ui/ui-icons";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";

/**
 * @component ColorBoard
 * @category business/form
 * @since 1.0.0
 * @description 高级颜色选择器,基于 react-colorful 实现,支持 HEX/RGB/HSL 输入、预设色板、历史记录(localStorage 持久化)、浏览器吸管(EyeDropper API)、透明度滑块。
 * @keywords color, picker, colorboard, eyedropper, palette
 * @example
 * <ColorBoard value="#3b82f6" onChange={setColor} presets={["#ef4444", "#22c55e"]} history enableEyeDropper />
 */

// --- EyeDropper API type declaration ---
interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}
interface EyeDropperResult {
  sRGBHex: string;
}
interface EyeDropperConstructor {
  new (): {
    open: (options?: EyeDropperOpenOptions) => Promise<EyeDropperResult>;
  };
}
declare global {
  interface Window {
    EyeDropper?: EyeDropperConstructor;
  }
}

type ColorFormat = "hex" | "rgb" | "hsl";

interface ColorBoardProps {
  /** 当前颜色值(HEX 格式,如 #3b82f6) */
  value?: string;
  /** 颜色变化回调 */
  onChange?: (color: string) => void;
  /** 显示格式标签 */
  format?: ColorFormat;
  /** 预设颜色列表 */
  presets?: string[];
  /** 是否启用历史记录(localStorage 持久化) */
  history?: boolean;
  /** 是否启用吸管按钮(需浏览器支持 EyeDropper API) */
  enableEyeDropper?: boolean;
  /** 是否启用透明度滑块 */
  enableAlpha?: boolean;
  /** 是否显示预设色板 */
  showSwatches?: boolean;
  className?: string;
}

const DEFAULT_PRESETS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#6b7280",
  "#000000",
  "#ffffff",
];

const HISTORY_KEY = "chaos-ui-color-history";
const MAX_HISTORY = 12;

// --- Color conversion utilities ---
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return {
    r: parseInt(m[1]!, 16),
    g: parseInt(m[2]!, 16),
    b: parseInt(m[3]!, 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function normalizeHex(input: string): string {
  let hex = input.trim();
  if (!hex.startsWith("#")) hex = `#${hex}`;
  return hex;
}

function isValidHex(hex: string): boolean {
  return /^#?[a-f\d]{6}$/i.test(hex.trim());
}

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr)
      ? arr.filter((v: unknown) => typeof v === "string")
      : [];
  } catch {
    return [];
  }
}

function saveHistory(colors: string[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(colors));
  } catch {
    // localStorage not available
  }
}

function ColorBoard({
  value = "#3b82f6",
  onChange,
  format = "hex",
  presets = DEFAULT_PRESETS,
  history = true,
  enableEyeDropper = true,
  enableAlpha = false,
  showSwatches = true,
  className,
}: ColorBoardProps) {
  const [open, setOpen] = React.useState(false);
  const [hexInput, setHexInput] = React.useState(value);
  const [alpha, setAlpha] = React.useState(100);
  const [historyColors, setHistoryColors] = React.useState<string[]>([]);

  React.useEffect(() => {
    setHexInput(value);
  }, [value]);

  React.useEffect(() => {
    if (history && open) {
      setHistoryColors(loadHistory());
    }
  }, [history, open]);

  const rgb = React.useMemo(() => hexToRgb(value), [value]);
  const hsl = React.useMemo(
    () => (rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null),
    [rgb],
  );

  const commitColor = React.useCallback(
    (color: string) => {
      onChange?.(color);
      setHexInput(color);
    },
    [onChange],
  );

  const addToHistory = React.useCallback(
    (color: string) => {
      if (!history) return;
      setHistoryColors((prev) => {
        const filtered = prev.filter((c) => c !== color);
        const next = [color, ...filtered].slice(0, MAX_HISTORY);
        saveHistory(next);
        return next;
      });
    },
    [history],
  );

  const handleHexInputChange = (input: string) => {
    setHexInput(input);
    const normalized = normalizeHex(input);
    if (isValidHex(normalized)) {
      commitColor(normalized.toLowerCase());
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", val: number) => {
    if (!rgb) return;
    const clamped = Math.max(0, Math.min(255, val));
    const newRgb = { ...rgb, [channel]: clamped };
    commitColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleEyeDropper = async () => {
    if (typeof window === "undefined" || !window.EyeDropper) return;
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      commitColor(result.sRGBHex);
      addToHistory(result.sRGBHex);
    } catch {
      // User cancelled
    }
  };

  const handleSelect = (color: string) => {
    commitColor(color);
    addToHistory(color);
  };

  const formatLabel = React.useMemo(() => {
    if (!rgb) return value;
    switch (format) {
      case "rgb":
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case "hsl":
        return hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : value;
      default:
        return value;
    }
  }, [rgb, hsl, format, value]);

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o && value) addToHistory(value);
      }}
    >
      <PopoverTrigger
        className={cn(
          "border-input inline-flex h-10 w-full items-center gap-2 rounded-md border bg-transparent px-3 text-sm",
          className,
        )}
      >
        <div
          className="border-border size-5 shrink-0 rounded border"
          style={{ backgroundColor: value }}
        />
        <span className="truncate font-mono text-xs">{formatLabel}</span>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-3">
          {/* Color picker panel */}
          <HexColorPicker
            color={value}
            onChange={handleSelect}
            style={{ width: "100%", height: 140 }}
          />

          {/* Alpha slider */}
          {enableAlpha && (
            <div className="space-y-1">
              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span>透明度</span>
                <span className="tabular-nums">{alpha}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={alpha}
                onChange={(e) => setAlpha(Number(e.target.value))}
                className="accent-primary w-full"
                aria-label="透明度"
              />
            </div>
          )}

          {/* HEX input */}
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">HEX</label>
            <div className="flex items-center gap-1">
              <Input
                value={hexInput}
                onChange={(e) => handleHexInputChange(e.target.value)}
                className="h-8 font-mono text-xs"
                aria-label="HEX 颜色值"
              />
              {enableEyeDropper &&
                typeof window !== "undefined" &&
                window.EyeDropper && (
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={handleEyeDropper}
                    aria-label="使用吸管取色"
                    title="吸管取色"
                  >
                    <PipetteIcon />
                  </Button>
                )}
            </div>
          </div>

          {/* RGB inputs */}
          {rgb && format === "rgb" && (
            <div className="grid grid-cols-3 gap-1">
              {(["r", "g", "b"] as const).map((ch) => (
                <div key={ch} className="space-y-0.5">
                  <label className="text-muted-foreground text-[0.65rem] uppercase">
                    {ch}
                  </label>
                  <Input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb[ch]}
                    onChange={(e) =>
                      handleRgbChange(ch, Number(e.target.value))
                    }
                    className="h-7 text-xs"
                    aria-label={`${ch} 通道`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* HSL display */}
          {hsl && format === "hsl" && (
            <div className="grid grid-cols-3 gap-1">
              <div className="space-y-0.5">
                <label className="text-muted-foreground text-[0.65rem] uppercase">
                  H
                </label>
                <Input
                  type="number"
                  min={0}
                  max={360}
                  value={hsl.h}
                  readOnly
                  className="h-7 text-xs"
                  aria-label="色相"
                />
              </div>
              <div className="space-y-0.5">
                <label className="text-muted-foreground text-[0.65rem] uppercase">
                  S
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.s}
                  readOnly
                  className="h-7 text-xs"
                  aria-label="饱和度"
                />
              </div>
              <div className="space-y-0.5">
                <label className="text-muted-foreground text-[0.65rem] uppercase">
                  L
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.l}
                  readOnly
                  className="h-7 text-xs"
                  aria-label="亮度"
                />
              </div>
            </div>
          )}

          {/* Preset swatches */}
          {showSwatches && presets.length > 0 && (
            <div className="space-y-1">
              <label className="text-muted-foreground text-xs">预设</label>
              <div className="flex flex-wrap gap-1">
                {presets.map((color) => (
                  <button
                    key={color}
                    type="button"
                    role="button"
                    aria-label={`选择颜色 ${color}`}
                    className={cn(
                      "size-6 rounded border transition-transform hover:scale-110",
                      value.toLowerCase() === color.toLowerCase() &&
                        "ring-primary ring-2 ring-offset-1",
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSelect(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* History colors */}
          {history && historyColors.length > 0 && (
            <div className="space-y-1">
              <label className="text-muted-foreground text-xs">历史</label>
              <div className="flex flex-wrap gap-1">
                {historyColors.map((color, i) => (
                  <button
                    key={`${color}-${i}`}
                    type="button"
                    role="button"
                    aria-label={`历史颜色 ${color}`}
                    className={cn(
                      "size-6 rounded border transition-transform hover:scale-110",
                      value.toLowerCase() === color.toLowerCase() &&
                        "ring-primary ring-2 ring-offset-1",
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSelect(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-1 border-t pt-2">
            <Button variant="ghost" size="xs" onClick={() => setOpen(false)}>
              <XIcon />
              关闭
            </Button>
            <Button
              size="xs"
              onClick={() => {
                addToHistory(value);
                setOpen(false);
              }}
            >
              <CheckIcon />
              确认
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

ColorBoard.displayName = "ColorBoard";

export { ColorBoard };
export type { ColorBoardProps, ColorFormat };
