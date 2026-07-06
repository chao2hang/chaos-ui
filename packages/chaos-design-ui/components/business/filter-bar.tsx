"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, RotateCcwIcon, FilterIcon } from "lucide-react";

export interface FilterField {
  key: string;
  label: string;
  type?: "text" | "select" | "date";
  options?: { label: string; value: string }[];
  placeholder?: string;
}

interface FilterBarProps extends React.ComponentProps<"div"> {
  fields: FilterField[];
  onFilter?: (values: Record<string, string>) => void;
  onReset?: () => void;
  className?: string;
}

function FilterBar({
  fields,
  onFilter,
  onReset,
  className,
  ...props
}: FilterBarProps) {
  const [values, setValues] = React.useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilter = () => {
    onFilter?.(values);
  };

  const handleReset = () => {
    setValues({});
    onReset?.();
  };

  return (
    <div
      data-slot="filter-bar"
      className={cn("flex flex-wrap items-end gap-2", className)}
      {...props}
    >
      <FilterIcon className="text-muted-foreground mb-2 size-4" />
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-1">
          <label className="text-muted-foreground text-[11px]">
            {field.label}
          </label>
          {field.type === "select" && field.options ? (
            <Select
              value={values[field.key] ?? ""}
              onValueChange={(v) => handleChange(field.key, v)}
            >
              <SelectTrigger className="h-8 w-[140px]">
                <SelectValue placeholder={field.placeholder ?? field.label} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={field.type === "date" ? "date" : "text"}
              value={values[field.key] ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder ?? field.label}
              className="h-8 w-[160px]"
            />
          )}
        </div>
      ))}
      <div className="mb-[2px] flex gap-1">
        <Button size="sm" onClick={handleFilter} className="h-8">
          <SearchIcon className="size-3.5" />
          筛选
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          className="h-8"
        >
          <RotateCcwIcon className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

export { FilterBar };
export type { FilterBarProps, FilterField };
