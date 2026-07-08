"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2Icon, SearchIcon } from "lucide-react";

export interface RemoteOption {
  value: string;
  label: string;
}

interface RemoteSelectProps extends Omit<
  React.ComponentProps<"button">,
  "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => Promise<RemoteOption[]>;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

function RemoteSelect({
  value,
  onChange,
  onSearch,
  placeholder = "搜索并选择...",
  className,
  debounceMs = 300,
  ...props
}: RemoteSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [options, setOptions] = React.useState<RemoteOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = React.useCallback(
    (q: string) => {
      setQuery(q);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        if (!q || !onSearch) {
          setOptions([]);
          return;
        }
        setLoading(true);
        try {
          const results = await onSearch(q);
          setOptions(results);
        } finally {
          setLoading(false);
        }
      }, debounceMs);
    },
    [onSearch, debounceMs],
  );

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div data-slot="remote-select" className={cn("relative", className)}>
      <Select
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setQuery("");
        }}
        value={value}
        onValueChange={(v) => {
          onChange?.(v);
          setOpen(false);
        }}
      >
        <SelectTrigger className="w-full" {...props}>
          <SelectValue placeholder={placeholder}>
            {selectedLabel ?? placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <div className="flex items-center gap-2 px-2 pb-2">
            <div className="relative flex-1">
              <SearchIcon className="text-muted-foreground absolute top-2 left-2 size-3.5" />
              <Input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="输入关键词搜索..."
                className="h-8 pl-7 text-sm"
              />
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2Icon className="text-muted-foreground size-4 animate-spin" />
            </div>
          ) : options.length === 0 ? (
            <p className="text-muted-foreground py-4 text-center text-sm">
              {query ? "未找到结果" : "请输入关键词搜索"}
            </p>
          ) : (
            options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

export { RemoteSelect };
export type { RemoteSelectProps };
