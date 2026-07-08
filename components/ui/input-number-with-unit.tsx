"use client";

import { cn } from "@/lib/utils";
import { InputNumber, type InputNumberProps } from "@/components/ui/input-number";

/**
 * @component InputNumberWithUnit
 * @category ui/data-entry
 * @since 1.1.0
 * @description 带单位的数字输入框，基于 InputNumber 扩展。常用于金额、数量、重量等带单位的数值输入场景。
 *   Numeric input with a unit label, built on top of InputNumber. Common in ERP
 *   contexts: amount (元), quantity (件), weight (kg), etc.
 * @keywords input, number, unit, currency, quantity, weight, prefix, suffix, 单位, 金额, 数量
 * @example
 * <InputNumberWithUnit unit="元" min={0} max={99999} value={100} onChange={setValue} />
 * <InputNumberWithUnit unit="件" unitPosition="suffix" min={0} step={1} />
 */

interface InputNumberWithUnitProps
  extends Omit<InputNumberProps, "className" | "controls"> {
  /** Unit label displayed alongside the input / 单位标签，如 "元"、"件"、"kg" */
  unit: string;
  /** Whether the unit appears before (prefix) or after (suffix) the input / 单位位于输入框前方还是后方 */
  unitPosition?: "prefix" | "suffix";
  /** Additional class for the wrapper / 外层容器类名 */
  className?: string;
  /** Additional class for the unit label / 单位标签类名 */
  unitClassName?: string;
  /** Whether to show the controls (up/down buttons). Defaults to false when a unit is present / 是否显示增减按钮，默认关闭 */
  controls?: boolean;
}

function InputNumberWithUnit({
  unit,
  unitPosition = "suffix",
  className,
  unitClassName,
  controls = false,
  ...rest
}: InputNumberWithUnitProps) {
  return (
    <div
      data-slot="input-number-with-unit"
      className={cn(
        "relative inline-flex w-full items-stretch rounded-lg",
        "border border-input bg-transparent shadow-xs transition-colors",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        rest.disabled && "opacity-50",
        className,
      )}
    >
      {unitPosition === "prefix" && (
        <span
          data-slot="input-number-unit"
          className={cn(
            "flex items-center rounded-l-[7px] border-r border-input bg-muted/50 px-2.5 text-sm text-muted-foreground select-none whitespace-nowrap",
            unitClassName,
          )}
        >
          {unit}
        </span>
      )}
      <InputNumber
        {...rest}
        controls={controls}
        className="border-none bg-transparent shadow-none focus-within:ring-0 focus-within:ring-offset-0 rounded-none flex-1"
      />
      {unitPosition === "suffix" && (
        <span
          data-slot="input-number-unit"
          className={cn(
            "flex items-center rounded-r-[7px] border-l border-input bg-muted/50 px-2.5 text-sm text-muted-foreground select-none whitespace-nowrap",
            unitClassName,
          )}
        >
          {unit}
        </span>
      )}
    </div>
  );
}

export { InputNumberWithUnit };
export type { InputNumberWithUnitProps };
