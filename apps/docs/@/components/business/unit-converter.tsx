"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRightIcon } from "lucide-react";

const UNITS: Record<
  string,
  {
    label: string;
    toBase: (v: number) => number;
    fromBase: (v: number) => number;
  }
> = {
  m: { label: "米 (m)", toBase: (v) => v, fromBase: (v) => v },
  km: {
    label: "千米 (km)",
    toBase: (v) => v * 1000,
    fromBase: (v) => v / 1000,
  },
  cm: { label: "厘米 (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  mm: {
    label: "毫米 (mm)",
    toBase: (v) => v / 1000,
    fromBase: (v) => v * 1000,
  },
  inch: {
    label: "英寸 (in)",
    toBase: (v) => v * 0.0254,
    fromBase: (v) => v / 0.0254,
  },
  ft: {
    label: "英尺 (ft)",
    toBase: (v) => v * 0.3048,
    fromBase: (v) => v / 0.3048,
  },
};

interface UnitConverterProps extends React.ComponentProps<"div"> {
  units?: string[];
  className?: string;
}

function UnitConverter({
  units = ["m", "km", "cm", "mm", "inch", "ft"],
  className,
  ...props
}: UnitConverterProps) {
  const [fromUnit, setFromUnit] = React.useState(units[0]);
  const [toUnit, setToUnit] = React.useState(units[1] ?? units[0]);
  const [fromValue, setFromValue] = React.useState("1");

  const fromConfig = UNITS[fromUnit];
  const toConfig = UNITS[toUnit];

  const toValue = React.useMemo(() => {
    const num = parseFloat(fromValue);
    if (isNaN(num) || !fromConfig || !toConfig) return "";
    const base = fromConfig.toBase(num);
    return toConfig
      .fromBase(base)
      .toFixed(4)
      .replace(/0+$/, "")
      .replace(/\.$/, "");
  }, [fromValue, fromUnit, toUnit, fromConfig, toConfig]);

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div
      data-slot="unit-converter"
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <div className="flex-1 space-y-1.5">
        <Input
          type="number"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          className="h-10 text-lg"
          placeholder="输入数值"
        />
        <Select value={fromUnit} onValueChange={setFromUnit}>
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((u) => (
              <SelectItem key={u} value={u}>
                {UNITS[u]?.label ?? u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button
        onClick={swap}
        className="text-muted-foreground hover:text-foreground mt-4 shrink-0"
      >
        <ArrowLeftRightIcon className="size-5" />
      </button>
      <div className="flex-1 space-y-1.5">
        <Input
          value={toValue}
          readOnly
          className="bg-muted/30 h-10 text-lg"
          placeholder="结果"
        />
        <Select value={toUnit} onValueChange={setToUnit}>
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((u) => (
              <SelectItem key={u} value={u}>
                {UNITS[u]?.label ?? u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export { UnitConverter };
export type { UnitConverterProps };
