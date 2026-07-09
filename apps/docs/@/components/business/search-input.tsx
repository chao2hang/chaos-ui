"use client";
import * as React from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  group?: string;
  href?: string;
  icon?: React.ReactNode;
}

interface SearchInputProps extends Omit<
  React.ComponentProps<"div">,
  "onChange" | "results" | "onSubmit"
> {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  results?: SearchResult[];
  onResultClick?: (result: SearchResult) => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
}

export function SearchInput({
  value: valueProp,
  onChange,
  onSubmit,
  results = [],
  onResultClick,
  placeholder = "搜索...",
  loading,
  className,
  ...props
}: SearchInputProps) {
  const [value, setValue] = React.useState(valueProp ?? "");
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    if (valueProp !== undefined) setValue(valueProp);
  }, [valueProp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  const showResults = focused && value.length > 0;
  const grouped = React.useMemo(() => {
    const map = new Map<string, SearchResult[]>();
    results.forEach((r) => {
      const key = r.group ?? "结果";
      const arr = map.get(key) ?? [];
      arr.push(r);
      map.set(key, arr);
    });
    return Array.from(map.entries());
  }, [results]);

  return (
    <div
      data-slot="search-input"
      className={cn("relative w-full", className)}
      {...props}
    >
      <div className="relative">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit?.(value)}
          placeholder={placeholder}
          className="pr-9 pl-9"
        />
        {value && (
          <button
            type="button"
            aria-label="清除"
            onClick={() => {
              setValue("");
              onChange?.("");
            }}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded p-1"
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>
      {showResults && (
        <div className="bg-popover absolute top-full right-0 left-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-md border p-1 shadow-lg">
          {loading ? (
            <div className="text-muted-foreground px-3 py-6 text-center text-xs">
              搜索中...
            </div>
          ) : grouped.length === 0 ? (
            <div className="text-muted-foreground px-3 py-6 text-center text-xs">
              无结果
            </div>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group}>
                <div className="text-muted-foreground px-2 py-1 text-xs font-medium">
                  {group}
                </div>
                {items.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onResultClick?.(r)}
                    className="hover:bg-accent flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm"
                  >
                    {r.icon}
                    <div className="min-w-0 flex-1">
                      <div className="truncate">{r.title}</div>
                      {r.description && (
                        <div className="text-muted-foreground truncate text-xs">
                          {r.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
