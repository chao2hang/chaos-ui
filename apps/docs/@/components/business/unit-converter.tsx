"use client";

import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { InputNumber } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@chaos_team/chaos-ui/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@chaos_team/chaos-ui/ui";
import { ArrowUpDownIcon } from "@chaos_team/chaos-ui/ui-icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/** A single unit definition within a category. */
export interface Unit {
  /** Unit identifier */
  id: string;
  /** Display name */
  name: string;
  /** Abbreviation */
  abbr: string;
  /** Conversion factor to base unit (multiply) */
  toBase: number;
  /** Conversion factor from base unit (multiply) */
  fromBase: number;
  /** Custom conversion function (for non-linear like temperature) */
  convert?: (value: number, direction: "toBase" | "fromBase") => number;
}

/** A category of related units (e.g. Length, Weight). */
export interface UnitCategory {
  /** Category identifier */
  id: string;
  /** Display name */
  name: string;
  /** Units in this category */
  units: Unit[];
}

/** Props for the UnitConverter component. */
export interface UnitConverterProps {
  /** Available categories (defaults to built-in: length, weight, volume, temperature, area, pressure) */
  categories?: UnitCategory[];
  /** Default category */
  defaultCategory?: string;
  /** Default from unit */
  defaultFrom?: string;
  /** Default to unit */
  defaultTo?: string;
  /** Swap button visible */
  showSwap?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Built-in categories                                                       */
/* -------------------------------------------------------------------------- */

export const builtInCategories: UnitCategory[] = [
  {
    id: "length",
    name: "Length",
    units: [
      { id: "mm", name: "Millimeter", abbr: "mm", toBase: 0.001, fromBase: 1000 },
      { id: "cm", name: "Centimeter", abbr: "cm", toBase: 0.01, fromBase: 100 },
      { id: "m", name: "Meter", abbr: "m", toBase: 1, fromBase: 1 },
      { id: "km", name: "Kilometer", abbr: "km", toBase: 1000, fromBase: 0.001 },
      { id: "inch", name: "Inch", abbr: "in", toBase: 0.0254, fromBase: 1 / 0.0254 },
      { id: "foot", name: "Foot", abbr: "ft", toBase: 0.3048, fromBase: 1 / 0.3048 },
      { id: "yard", name: "Yard", abbr: "yd", toBase: 0.9144, fromBase: 1 / 0.9144 },
      { id: "mile", name: "Mile", abbr: "mi", toBase: 1609.344, fromBase: 1 / 1609.344 },
    ],
  },
  {
    id: "weight",
    name: "Weight",
    units: [
      { id: "mg", name: "Milligram", abbr: "mg", toBase: 0.000001, fromBase: 1000000 },
      { id: "g", name: "Gram", abbr: "g", toBase: 0.001, fromBase: 1000 },
      { id: "kg", name: "Kilogram", abbr: "kg", toBase: 1, fromBase: 1 },
      { id: "ton", name: "Metric Ton", abbr: "t", toBase: 1000, fromBase: 0.001 },
      { id: "oz", name: "Ounce", abbr: "oz", toBase: 0.0283495, fromBase: 1 / 0.0283495 },
      { id: "lb", name: "Pound", abbr: "lb", toBase: 0.453592, fromBase: 1 / 0.453592 },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    units: [
      { id: "ml", name: "Milliliter", abbr: "mL", toBase: 0.001, fromBase: 1000 },
      { id: "l", name: "Liter", abbr: "L", toBase: 1, fromBase: 1 },
      { id: "m3", name: "Cubic Meter", abbr: "m\u00B3", toBase: 1000, fromBase: 0.001 },
      { id: "gal_us", name: "Gallon (US)", abbr: "gal", toBase: 3.78541, fromBase: 1 / 3.78541 },
      { id: "qt", name: "Quart (US)", abbr: "qt", toBase: 0.946353, fromBase: 1 / 0.946353 },
      { id: "pt", name: "Pint (US)", abbr: "pt", toBase: 0.473176, fromBase: 1 / 0.473176 },
      { id: "cup", name: "Cup (US)", abbr: "cup", toBase: 0.236588, fromBase: 1 / 0.236588 },
      { id: "fl_oz", name: "Fluid Ounce", abbr: "fl oz", toBase: 0.0295735, fromBase: 1 / 0.0295735 },
    ],
  },
  {
    id: "temperature",
    name: "Temperature",
    units: [
      {
        id: "c",
        name: "Celsius",
        abbr: "\u00B0C",
        toBase: 1,
        fromBase: 1,
        convert(value, direction) {
          // Base unit is Celsius
          if (direction === "toBase") return value;
          return value;
        },
      },
      {
        id: "f",
        name: "Fahrenheit",
        abbr: "\u00B0F",
        toBase: 1,
        fromBase: 1,
        convert(value, direction) {
          if (direction === "toBase") {
            // F -> C
            return (value - 32) * (5 / 9);
          }
          // C -> F
          return value * (9 / 5) + 32;
        },
      },
      {
        id: "k",
        name: "Kelvin",
        abbr: "K",
        toBase: 1,
        fromBase: 1,
        convert(value, direction) {
          if (direction === "toBase") {
            // K -> C
            return value - 273.15;
          }
          // C -> K
          return value + 273.15;
        },
      },
    ],
  },
  {
    id: "area",
    name: "Area",
    units: [
      { id: "mm2", name: "Square Millimeter", abbr: "mm\u00B2", toBase: 1e-6, fromBase: 1 / 1e-6 },
      { id: "cm2", name: "Square Centimeter", abbr: "cm\u00B2", toBase: 1e-4, fromBase: 1 / 1e-4 },
      { id: "m2", name: "Square Meter", abbr: "m\u00B2", toBase: 1, fromBase: 1 },
      { id: "km2", name: "Square Kilometer", abbr: "km\u00B2", toBase: 1e6, fromBase: 1 / 1e6 },
      { id: "in2", name: "Square Inch", abbr: "in\u00B2", toBase: 0.00064516, fromBase: 1 / 0.00064516 },
      { id: "ft2", name: "Square Foot", abbr: "ft\u00B2", toBase: 0.092903, fromBase: 1 / 0.092903 },
      { id: "acre", name: "Acre", abbr: "ac", toBase: 4046.86, fromBase: 1 / 4046.86 },
      { id: "hectare", name: "Hectare", abbr: "ha", toBase: 10000, fromBase: 1 / 10000 },
    ],
  },
  {
    id: "pressure",
    name: "Pressure",
    units: [
      { id: "pa", name: "Pascal", abbr: "Pa", toBase: 1, fromBase: 1 },
      { id: "kpa", name: "Kilopascal", abbr: "kPa", toBase: 1000, fromBase: 0.001 },
      { id: "mpa", name: "Megapascal", abbr: "MPa", toBase: 1e6, fromBase: 1 / 1e6 },
      { id: "bar", name: "Bar", abbr: "bar", toBase: 100000, fromBase: 1 / 100000 },
      { id: "psi", name: "PSI", abbr: "psi", toBase: 6894.76, fromBase: 1 / 6894.76 },
      { id: "atm", name: "Atmosphere", abbr: "atm", toBase: 101325, fromBase: 1 / 101325 },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Convert a value from one unit to another within the same category. */
export function convertValue(
  value: number,
  fromUnit: Unit,
  toUnit: Unit,
): number {
  // Convert from source to base
  const baseValue = fromUnit.convert
    ? fromUnit.convert(value, "toBase")
    : value * fromUnit.toBase;

  // Convert from base to target
  return toUnit.convert
    ? toUnit.convert(baseValue, "fromBase")
    : baseValue * toUnit.fromBase;
}

/** Format a number to up to 6 significant digits. */
export function formatResult(num: number): string {
  if (!Number.isFinite(num)) return "\u2014";
  if (num === 0) return "0";

  // Use toPrecision(6) for significant digits, then clean up
  const precise = Number(num.toPrecision(6));
  return precise.toString();
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * @component UnitConverter
 * @category business/manufacturing
 * @since 1.0.0
 * @description Unit conversion component for manufacturing and ERP workflows.
 *   Supports Length, Weight, Volume, Temperature, Area, and Pressure with
 *   real-time conversion and swap functionality.
 * @keywords unit, converter, measurement, length, weight, volume, temperature, area, pressure, ERP
 * @example
 * <UnitConverter defaultCategory="length" showSwap />
 */
export function UnitConverter({
  categories,
  defaultCategory,
  defaultFrom,
  defaultTo,
  showSwap = true,
  compact = false,
  className,
}: UnitConverterProps) {
  const allCategories = categories && categories.length > 0
    ? categories
    : builtInCategories;

  const [activeCatId, setActiveCatId] = React.useState(
    defaultCategory ?? allCategories[0]?.id ?? "",
  );

  const activeCat = React.useMemo(
    () => allCategories.find((c) => c.id === activeCatId) ?? allCategories[0]!,
    [allCategories, activeCatId],
  );

  const [fromUnitId, setFromUnitId] = React.useState(
    defaultFrom ?? activeCat.units[0]?.id ?? "",
  );
  const [toUnitId, setToUnitId] = React.useState(
    defaultTo ?? activeCat.units[1]?.id ?? activeCat.units[0]?.id ?? "",
  );
  const [inputValue, setInputValue] = React.useState<number | null>(1);

  // Reset unit selections when category changes
  const prevCatRef = React.useRef(activeCatId);
  React.useEffect(() => {
    if (prevCatRef.current !== activeCatId) {
      prevCatRef.current = activeCatId;
      setFromUnitId(activeCat.units[0]?.id ?? "");
      setToUnitId(activeCat.units[1]?.id ?? activeCat.units[0]?.id ?? "");
      setInputValue(1);
    }
  }, [activeCatId, activeCat.units]);

  const fromUnit = activeCat.units.find((u) => u.id === fromUnitId);
  const toUnit = activeCat.units.find((u) => u.id === toUnitId);

  const resultValue = React.useMemo(() => {
    if (inputValue == null || !fromUnit || !toUnit) return NaN;
    return convertValue(inputValue, fromUnit, toUnit);
  }, [inputValue, fromUnit, toUnit]);

  const handleSwap = React.useCallback(() => {
    const prevFrom = fromUnitId;
    const prevTo = toUnitId;
    setFromUnitId(prevTo);
    setToUnitId(prevFrom);
    if (!isNaN(resultValue)) {
      setInputValue(Number(resultValue.toPrecision(6)));
    }
  }, [fromUnitId, toUnitId, resultValue]);

  return (
    <div
      data-slot="unit-converter"
      className={cn(
        "space-y-4 rounded-lg border bg-card p-4",
        compact && "space-y-3 p-3",
        className,
      )}
    >
      {/* Category selector */}
      {compact ? (
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Category</Label>
          <Select value={activeCatId} onValueChange={(v) => setActiveCatId(v ?? "")}>
            <SelectTrigger className="w-full" data-testid="category-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <Tabs
          defaultValue={activeCatId}
          value={activeCatId}
          onValueChange={(v: string | undefined) => v && setActiveCatId(v)}
        >
          <TabsList data-testid="category-tabs">
            {allCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} data-testid={`tab-${cat.id}`}>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Conversion row */}
      <div
        className={cn(
          "flex items-end gap-3",
          compact ? "flex-col" : "flex-wrap sm:flex-nowrap",
        )}
      >
        {/* From */}
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs text-muted-foreground">From</Label>
          <Select value={fromUnitId} onValueChange={(v) => setFromUnitId(v ?? "")}>
            <SelectTrigger className="w-full" data-testid="from-unit-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {activeCat.units.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.abbr} - {u.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputNumber
            value={inputValue}
            onChange={(v) => setInputValue(v ?? null)}
            data-testid="from-input"
            placeholder="Enter value"
            className="w-full"
          />
        </div>

        {/* Swap button */}
        {showSwap && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            data-testid="swap-button"
            className={cn("shrink-0", compact && "self-center")}
            aria-label="Swap units"
          >
            <ArrowUpDownIcon className="size-4" />
          </Button>
        )}

        {/* To */}
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs text-muted-foreground">To</Label>
          <Select value={toUnitId} onValueChange={(v) => setToUnitId(v ?? "")}>
            <SelectTrigger className="w-full" data-testid="to-unit-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {activeCat.units.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.abbr} - {u.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div
            data-testid="result-display"
            className="flex h-8 items-center rounded-lg border border-input bg-muted/30 px-2.5 font-mono text-sm"
          >
            {isNaN(resultValue) ? "\u2014" : formatResult(resultValue)}
          </div>
        </div>
      </div>
    </div>
  );
}
