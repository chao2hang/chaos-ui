import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";
import { Search, X } from "lucide-react";

/**
 * @component InputSearch
 * @category ui/primitives
 * @since 0.2.0
 * @description 搜索输入框 / Search input with enter button
 * @keywords input, search, filter, onSearch
 * @example
 * <InputSearch onSearch={(value) => console.log(value)} allowClear enterButton />
 */

interface InputSearchProps extends Omit<
  React.ComponentProps<"input">,
  "onChange" | "size"
> {
  /** Placeholder text / 占位文本 */
  placeholder?: string;
  /** Whether to show clear button / 是否显示清除按钮 */
  allowClear?: boolean;
  /** Whether to show enter button / 是否显示搜索按钮 */
  enterButton?: boolean | React.ReactNode;
  /** Search callback / 搜索回调 */
  onSearch?: (value: string, event?: React.SyntheticEvent) => void;
  /** Change callback / 变更回调 */
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /** Input size / 输入框大小 */
  size?: "sm" | "default" | "lg";
  /** Whether input is loading / 是否加载中 */
  loading?: boolean;
}

function InputSearch({
  className,
  placeholder = "Search...",
  allowClear = false,
  enterButton = false,
  onSearch,
  onChange,
  size = "default",
  loading = false,
  defaultValue,
  value: controlledValue,
  ...props
}: InputSearchProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!isControlled) setInternalValue(v);
    onChange?.(v, e);
  };

  const handleSearch = (e?: React.SyntheticEvent) => {
    onSearch?.(String(value), e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
    props.onKeyDown?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    onSearch?.("");
  };

  const sizeClass = size === "sm" ? "h-7" : size === "lg" ? "h-9" : "h-8";

  if (enterButton) {
    return (
      <div
        data-slot="input-search"
        className={cn("relative flex w-full items-stretch", className)}
      >
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            sizeClass,
            "rounded-r-none",
            allowClear && value && "pr-7",
          )}
          {...props}
        />
        {allowClear && value && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-12 -translate-y-1/2"
            aria-label="Clear"
          >
            <X className="size-3.5" />
          </button>
        )}
        <Button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className={cn("rounded-l-none border-l-0", sizeClass)}
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : typeof enterButton === "boolean" ? (
            <Search className="size-4" />
          ) : (
            enterButton
          )}
        </Button>
      </div>
    );
  }

  return (
    <div data-slot="input-search" className={cn("relative w-full", className)}>
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(sizeClass, "pl-8", allowClear && value && "pr-7")}
        {...props}
      />
      {allowClear && value && !loading && (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
          aria-label="Clear"
        >
          <X className="size-3.5" />
        </button>
      )}
      {loading && (
        <span className="absolute top-1/2 right-2 -translate-y-1/2 animate-spin">
          ⏳
        </span>
      )}
    </div>
  );
}

export { InputSearch };
export type { InputSearchProps };
