"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface RangeSliderProps {
  /** Selected range [min, max] / 选中的范围 */
  value?: [number, number];
  /** Default value / 默认值 */
  defaultValue?: [number, number];
  /** Change callback / 变更回调 */
  onChange?: (value: [number, number]) => void;
  /** Minimum value / 最小值 (default: 0) */
  min?: number;
  /** Maximum value / 最大值 (default: 100) */
  max?: number;
  /** Step / 步长 (default: 1) */
  step?: number;
  /** Disabled / 是否禁用 */
  disabled?: boolean;
  /** Whether to show value labels / 是否显示值标签 (default: false) */
  showValue?: boolean;
  /** Format value function / 值格式化函数 */
  formatValue?: (value: number) => string;
  className?: string;
}

/**
 * @component RangeSlider
 * @category ui/data-entry
 * @since 0.2.0
 * @description Dual-handle range slider with filled track between handles / 双滑块范围滑块，两个手柄之间显示填充轨道
 * @keywords range, slider, dual, handle, min, max
 * @example
 * <RangeSlider value={[20, 80]} onChange={([min, max]) => console.log(min, max)} />
 * <RangeSlider min={0} max={1000} step={50} showValue />
 */
function RangeSlider({
  className,
  value: controlledValue,
  defaultValue = [0, 100],
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
  formatValue,
}: RangeSliderProps) {
  const [internalValue, setInternalValue] =
    React.useState<[number, number]>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const [valMin, valMax] = value;

  const range = max - min;
  const minPercent = ((valMin - min) / range) * 100;
  const maxPercent = ((valMax - min) / range) * 100;

  const handleChange = (newRange: [number, number]) => {
    if (!isControlled) setInternalValue(newRange);
    onChange?.(newRange);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    // Ensure min doesn't exceed max
    const clampedMin = Math.min(newMin, valMax - step);
    handleChange([clampedMin, valMax]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    // Ensure max doesn't go below min
    const clampedMax = Math.max(newMax, valMin + step);
    handleChange([valMin, clampedMax]);
  };

  const format = (v: number) => (formatValue ? formatValue(v) : String(v));

  return (
    <div
      data-slot="range-slider"
      className={cn(
        "flex flex-col gap-2",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <div className="relative flex h-5 w-full items-center">
        {/* Track background */}
        <div className="bg-muted absolute h-1 w-full rounded-full" />
        {/* Filled track */}
        <div
          className="bg-primary absolute h-1 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        {/* Min handle */}
        <div
          className="border-primary bg-background absolute size-4 -translate-x-1/2 rounded-full border-2 shadow-sm transition-transform hover:scale-110"
          style={{ left: `${minPercent}%` }}
        />
        {/* Max handle */}
        <div
          className="border-primary bg-background absolute size-4 -translate-x-1/2 rounded-full border-2 shadow-sm transition-transform hover:scale-110"
          style={{ left: `${maxPercent}%` }}
        />
        {/* Hidden range inputs for interaction */}
        <input
          type="range"
          value={valMin}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={handleMinChange}
          className="absolute h-5 w-full cursor-pointer appearance-none bg-transparent opacity-0"
          aria-label="Range minimum"
          style={{ zIndex: valMin > (min + max) / 2 ? 5 : 3 }}
        />
        <input
          type="range"
          value={valMax}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={handleMaxChange}
          className="absolute h-5 w-full cursor-pointer appearance-none bg-transparent opacity-0"
          aria-label="Range maximum"
          style={{ zIndex: valMin > (min + max) / 2 ? 3 : 5 }}
        />
      </div>
      {showValue && (
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <span>{format(valMin)}</span>
          <span>{format(valMax)}</span>
        </div>
      )}
    </div>
  );
}

export { RangeSlider };
export type { RangeSliderProps };
