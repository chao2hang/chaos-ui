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
import { SearchIcon, RotateCcwIcon, ChevronDownIcon } from "lucide-react";

export interface SearchField {
  key: string;
  label: string;
  type?: "text" | "select" | "number" | "date";
  options?: { label: string; value: string }[];
  placeholder?: string;
}

interface AdvancedSearchProps extends React.ComponentProps<"div"> {
  fields: SearchField[];
  onSearch?: (values: Record<string, string>) => void;
  onReset?: () => void;
  loading?: boolean;
  className?: string;
  compact?: boolean;
}

function AdvancedSearch({
  fields,
  onSearch,
  onReset,
  loading = false,
  className,
  compact = false,
  ...props
}: AdvancedSearchProps) {
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [expanded, setExpanded] = React.useState(!compact);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    onSearch?.(values);
  };

  const handleReset = () => {
    setValues({});
    onReset?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      data-slot="advanced-search"
      className={cn("space-y-3", className)}
      {...props}
    >
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))` }}
      >
        {fields.slice(0, expanded ? fields.length : 3).map((field) => (
          <div key={field.key} className="flex flex-col gap-1.5">
            <label className="text-muted-foreground text-xs font-medium">
              {field.label}
            </label>
            {field.type === "select" && field.options ? (
              <Select
                value={values[field.key] ?? ""}
                onValueChange={(v) => handleChange(field.key, v)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder={field.placeholder ?? field.label} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={
                  field.type === "number"
                    ? "number"
                    : field.type === "date"
                      ? "date"
                      : "text"
                }
                placeholder={field.placeholder ?? field.label}
                value={values[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-9"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={handleSearch} disabled={loading}>
          <SearchIcon />
          搜索
        </Button>
        <Button size="sm" variant="outline" onClick={handleReset}>
          <RotateCcwIcon />
          重置
        </Button>
        {compact && fields.length > 3 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
            className="ml-auto"
          >
            {expanded ? "收起" : `展开 (${fields.length - 3})`}
            <ChevronDownIcon
              className={cn("transition-transform", expanded && "rotate-180")}
            />
          </Button>
        )}
      </div>
    </div>
  );
}

export { AdvancedSearch };
export type { AdvancedSearchProps };
