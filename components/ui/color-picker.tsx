"use client";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const presetColors = [
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
];

/**
 * @component ColorPicker
 * @category ui/data-entry
 * @since 0.2.0
 * @description Color picker with hex input and preset color swatches / 颜色选择器，支持十六进制输入和预设色块
 * @keywords color, picker, hex, swatch, palette
 * @example
 * <ColorPicker value="#3b82f6" onChange={(color) => console.log(color)} />
 */
function ColorPicker({
  value = "#000000",
  onChange,
  presets = presetColors,
  className,
}: {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  className?: string;
}) {
  return (
    <Popover data-slot="color-picker">
      <PopoverTrigger
        className={cn(
          "border-input inline-flex h-10 w-10 items-center justify-center rounded-md border-2 bg-transparent",
          className,
        )}
      >
        <div className="size-6 rounded-sm" style={{ backgroundColor: value }} />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div className="space-y-3">
          <HexColorPicker
            color={value}
            onChange={onChange ?? (() => {})}
            style={{ width: "100%", height: 160 }}
          />
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">#</span>
            <HexColorInput
              color={value}
              onChange={onChange ?? (() => {})}
              className="border-input flex h-8 w-full rounded-md border bg-transparent px-2 text-sm"
              prefixed
            />
          </div>
          {presets && presets.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {presets.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "size-6 rounded-md border transition-transform hover:scale-110",
                    value === color && "ring-primary ring-2 ring-offset-1",
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => onChange?.(color)}
                />
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { ColorPicker };
