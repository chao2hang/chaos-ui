"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CheckIcon,
  ChevronDownIcon,
  MapPinIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * A single node in the address hierarchy tree.
 */
interface AddressOption {
  code: string;
  name: string;
  children?: AddressOption[];
}

/**
 * Props for the AddressPicker component.
 */
interface AddressPickerProps {
  /** Selected address codes (array from province to street). */
  value?: string[];
  /** Change handler - receives selected codes and their display labels. */
  onChange?: (codes: string[], labels: string[]) => void;
  /** Level depth: 3 = province/city/district, 4 = adds street. */
  level?: 3 | 4;
  /** Custom address data. When omitted a small built-in sample dataset is used. */
  options?: AddressOption[];
  /** Lazy load children for level 4+ (street-level data). */
  onLoad?: (parentCode: string) => Promise<AddressOption[]>;
  /** Placeholder text shown when no address is selected. */
  placeholder?: string;
  /** Disable the picker. */
  disabled?: boolean;
  /** Show as input trigger (true) or button trigger (false). Default: true. */
  inputTrigger?: boolean;
  /** Allow clearing the selection. */
  clearable?: boolean;
  className?: string;
  /** Trigger height: default h-8; sm aligns with Button/SelectTrigger h-7 */
  size?: "sm" | "default";
}

/* ------------------------------------------------------------------ */
/*  Built-in sample data (demo only - pass a full dataset via options) */
/* ------------------------------------------------------------------ */

const SAMPLE_DATA: AddressOption[] = [
  {
    code: "110000",
    name: "\u5317\u4eac\u5e02",
    children: [
      {
        code: "110100",
        name: "\u5317\u4eac\u5e02",
        children: [
          { code: "110101", name: "\u4e1c\u57ce\u533a" },
          { code: "110102", name: "\u897f\u57ce\u533a" },
          { code: "110105", name: "\u671d\u9633\u533a" },
        ],
      },
    ],
  },
  {
    code: "310000",
    name: "\u4e0a\u6d77\u5e02",
    children: [
      {
        code: "310100",
        name: "\u4e0a\u6d77\u5e02",
        children: [
          { code: "310101", name: "\u9ec4\u6d66\u533a" },
          { code: "310104", name: "\u5f90\u6c47\u533a" },
          { code: "310105", name: "\u957f\u5b81\u533a" },
        ],
      },
    ],
  },
  {
    code: "330000",
    name: "\u6d59\u6c5f\u7701",
    children: [
      {
        code: "330100",
        name: "\u676d\u5dde\u5e02",
        children: [
          { code: "330102", name: "\u4e0a\u57ce\u533a" },
          { code: "330105", name: "\u62f1\u5885\u533a" },
          { code: "330106", name: "\u897f\u6e56\u533a" },
        ],
      },
      {
        code: "330200",
        name: "\u5b81\u6ce2\u5e02",
        children: [
          { code: "330203", name: "\u6d77\u66d9\u533a" },
          { code: "330204", name: "\u6c5f\u4e1c\u533a" },
        ],
      },
    ],
  },
  {
    code: "440000",
    name: "\u5e7f\u4e1c\u7701",
    children: [
      {
        code: "440100",
        name: "\u5e7f\u5dde\u5e02",
        children: [
          { code: "440103", name: "\u8354\u6e7e\u533a" },
          { code: "440104", name: "\u8d8a\u79c0\u533a" },
          { code: "440106", name: "\u5929\u6cb3\u533a" },
        ],
      },
      {
        code: "440300",
        name: "\u6df1\u5733\u5e02",
        children: [
          { code: "440303", name: "\u7f57\u6e56\u533a" },
          { code: "440304", name: "\u798f\u7530\u533a" },
          { code: "440305", name: "\u5357\u5c71\u533a" },
        ],
      },
    ],
  },
  {
    code: "510000",
    name: "\u56db\u5ddd\u7701",
    children: [
      {
        code: "510100",
        name: "\u6210\u90fd\u5e02",
        children: [
          { code: "510104", name: "\u9526\u6c5f\u533a" },
          { code: "510105", name: "\u9752\u7f8a\u533a" },
          { code: "510106", name: "\u91d1\u725b\u533a" },
        ],
      },
      {
        code: "510700",
        name: "\u7ef5\u9633\u5e02",
        children: [
          { code: "510703", name: "\u6daa\u57ce\u533a" },
          { code: "510704", name: "\u6e38\u4ed9\u533a" },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper: resolve labels from codes                                 */
/* ------------------------------------------------------------------ */

function resolveLabels(codes: string[], tree: AddressOption[]): string[] {
  const labels: string[] = [];
  let current = tree;
  for (const code of codes) {
    const found = current.find((n) => n.code === code);
    if (found) {
      labels.push(found.name);
      current = found.children ?? [];
    } else {
      break;
    }
  }
  return labels;
}

/* ------------------------------------------------------------------ */
/*  AddressColumn - single scrollable list with search filter         */
/* ------------------------------------------------------------------ */

interface AddressColumnProps {
  nodes: AddressOption[];
  selectedCode?: string;
  onSelect: (node: AddressOption) => void;
  levelLabel: string;
}

/**
 * @component AddressColumn
 * @category Business
 * @description A single column inside the AddressPicker panel, displaying a
 *   searchable scrollable list of options for one administrative level.
 */
function AddressColumn({
  nodes,
  selectedCode,
  onSelect,
  levelLabel,
}: AddressColumnProps) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(
    () =>
      query
        ? nodes.filter((n) =>
            n.name.toLowerCase().includes(query.toLowerCase()),
          )
        : nodes,
    [nodes, query],
  );

  return (
    <div className="flex min-w-[160px] flex-col border-r last:border-r-0">
      <div className="border-b px-2 py-1.5">
        <div className="relative">
          <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
          <Input
            className="h-7 pl-7 text-xs"
            placeholder={"\u641c\u7d22" + levelLabel}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={"\u641c\u7d22" + levelLabel}
          />
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="text-muted-foreground px-3 py-4 text-center text-xs">
            {"\u65e0\u6570\u636e"}
          </div>
        )}
        {filtered.map((node) => {
          const isSelected = node.code === selectedCode;
          return (
            <button
              key={node.code}
              type="button"
              className={cn(
                "hover:bg-accent flex w-full items-center justify-between px-3 py-1.5 text-left text-sm",
                isSelected && "bg-accent font-medium",
              )}
              onClick={() => onSelect(node)}
            >
              <span className="truncate">{node.name}</span>
              {isSelected && (
                <CheckIcon className="text-primary size-3.5 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AddressPanel - the multi-column cascade UI                        */
/* ------------------------------------------------------------------ */

const LEVEL_LABELS = [
  "\u7701/\u5e02",
  "\u5e02/\u533a",
  "\u533a/\u53bf",
  "\u8857\u9053",
];

interface AddressPanelProps {
  tree: AddressOption[];
  codes: string[];
  level: 3 | 4;
  onSelect: (colIndex: number, node: AddressOption) => void;
  onLoad?: (parentCode: string) => Promise<AddressOption[]>;
}

/**
 * @component AddressPanel
 * @category Business
 * @description The multi-column cascading panel used internally by AddressPicker.
 *   Renders one column per administrative level with lazy-load support for streets.
 */
function AddressPanel({
  tree,
  codes,
  level,
  onSelect,
  onLoad,
}: AddressPanelProps) {
  const columns = React.useMemo(() => {
    const cols: AddressOption[][] = [tree];
    let current = tree;
    for (let i = 0; i < codes.length && i < level - 1; i++) {
      const found = current.find((n) => n.code === codes[i]);
      if (found?.children?.length) {
        cols.push(found.children);
        current = found.children;
      } else {
        break;
      }
    }
    return cols;
  }, [tree, codes, level]);

  const [lazyColumns, setLazyColumns] = React.useState<
    Record<string, AddressOption[]>
  >({});
  const [loadingCode, setLoadingCode] = React.useState<string | null>(null);

  const districtCode = level === 4 && codes.length >= 3 ? codes[2] : undefined;

  React.useEffect(() => {
    if (!districtCode || !onLoad || lazyColumns[districtCode]) return;
    setLoadingCode(districtCode);
    onLoad(districtCode)
      .then((nodes) => {
        setLazyColumns((prev) => ({ ...prev, [districtCode]: nodes }));
      })
      .finally(() => setLoadingCode(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtCode]);

  const streetNodes =
    districtCode && lazyColumns[districtCode]
      ? lazyColumns[districtCode]
      : undefined;

  return (
    <div data-slot="address-picker-panel" className="flex">
      {columns.map((col, idx) => (
        <AddressColumn
          key={idx}
          nodes={col}
          selectedCode={codes[idx] ?? ""}
          levelLabel={LEVEL_LABELS[idx] ?? "\u7b2c" + (idx + 1) + "\u7ea7"}
          onSelect={(node) => onSelect(idx, node)}
        />
      ))}
      {level === 4 && districtCode && (
        <AddressColumn
          nodes={streetNodes ?? []}
          selectedCode={codes[3] ?? ""}
          levelLabel={LEVEL_LABELS[3] ?? ""}
          onSelect={(node) => onSelect(3, node)}
        />
      )}
      {level === 4 && districtCode && loadingCode === districtCode && (
        <div className="text-muted-foreground flex min-w-[160px] items-center justify-center border-r px-3 py-4 text-xs last:border-r-0">
          {"\u52a0\u8f7d\u4e2d\u2026"}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AddressPicker - main export                                       */
/* ------------------------------------------------------------------ */

/**
 * @component AddressPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @description Multi-level cascading address selector for China administrative
 *   regions (province / city / district / street). Renders a popover with 3-4
 *   scrollable columns, each with per-column search filtering. Supports lazy-loading
 *   for street-level data via the `onLoad` callback.
 * @example
 * ```tsx
 * <AddressPicker
 *   value={["330000", "330100", "330106"]}
 *   onChange={(codes, labels) => console.log(codes, labels)}
 * />
 * ```
 */
function AddressPicker({
  value = [],
  onChange,
  level = 3,
  options,
  onLoad,
  placeholder = "\u8bf7\u9009\u62e9\u5730\u5740",
  disabled = false,
  inputTrigger = true,
  clearable = false,
  className,
  size = "default",
}: AddressPickerProps) {
  const isSm = size === "sm";
  const [open, setOpen] = React.useState(false);
  const [internalCodes, setInternalCodes] = React.useState<string[]>(value);

  // Sync external value
  React.useEffect(() => {
    setInternalCodes(value);
  }, [value]);

  const tree = options ?? SAMPLE_DATA;

  const labels = React.useMemo(
    () => resolveLabels(internalCodes, tree),
    [internalCodes, tree],
  );

  const displayText = labels.join(" / ") || placeholder;
  const hasSelection = labels.length > 0;

  const handleSelect = (colIndex: number, node: AddressOption) => {
    const nextCodes = internalCodes.slice(0, colIndex);
    nextCodes[colIndex] = node.code;

    const hasChildren = (node.children?.length ?? 0) > 0;
    const maxDepth = level;
    const isLeaf = !hasChildren || nextCodes.length >= maxDepth;

    // For lazy-load (level=4), district without embedded children is intermediate
    const isLazyIntermediate = level === 4 && colIndex === 2 && !hasChildren;

    setInternalCodes(nextCodes);

    if (isLeaf && !isLazyIntermediate) {
      const nextLabels = resolveLabels(nextCodes, tree);
      onChange?.(nextCodes, nextLabels);
      setOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalCodes([]);
    onChange?.([], []);
    setOpen(false);
  };

  const panel = (
    <AddressPanel
      tree={tree}
      codes={internalCodes}
      level={level}
      onSelect={handleSelect}
      {...(onLoad ? { onLoad } : {})}
    />
  );

  // Trigger element shared between input and button modes
  const triggerContent = (
    <div className="flex items-center gap-1.5 truncate">
      <MapPinIcon className="text-muted-foreground size-3.5 shrink-0" />
      <span
        className={cn("truncate", !hasSelection && "text-muted-foreground")}
      >
        {displayText}
      </span>
    </div>
  );

  const clearButton =
    clearable && hasSelection && !disabled ? (
      <span
        role="button"
        tabIndex={0}
        className="hover:bg-accent flex shrink-0 cursor-pointer items-center justify-center rounded-full p-0.5"
        onClick={handleClear}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            handleClear(e as unknown as React.MouseEvent);
          }
        }}
        aria-label={"\u6e05\u9664\u9009\u62e9"}
      >
        <XIcon className="text-muted-foreground size-3.5" />
      </span>
    ) : null;

  // Input trigger mode
  if (inputTrigger) {
    return (
      <Popover open={open} onOpenChange={setOpen} data-size={size}>
        <PopoverTrigger
          render={
            <button
              type="button"
              disabled={disabled}
              data-slot="address-picker"
              data-size={size}
              className={cn(
                "border-input dark:bg-input/30 flex w-full items-center justify-between gap-2 border bg-transparent px-3 text-sm",
                isSm
                  ? "h-7 rounded-[min(var(--radius-md),10px)]"
                  : "h-8 rounded-lg",
                "placeholder:text-muted-foreground",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none",
                disabled && "cursor-not-allowed opacity-50",
                className,
              )}
            />
          }
        >
          {triggerContent}
          <div className="flex shrink-0 items-center gap-1">
            {clearButton}
            <ChevronDownIcon className="size-4 opacity-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          {panel}
        </PopoverContent>
      </Popover>
    );
  }

  // Button trigger mode
  return (
    <Popover open={open} onOpenChange={setOpen} data-size={size}>
      <PopoverTrigger
        render={
          <button
            type="button"
            disabled={disabled}
            data-slot="address-picker"
            data-size={size}
            className={cn(
              "border-input dark:bg-input/30 inline-flex items-center justify-between gap-2 border bg-transparent px-3 text-sm",
              isSm
                ? "h-7 rounded-[min(var(--radius-md),10px)]"
                : "h-8 rounded-lg",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none",
              disabled && "cursor-not-allowed opacity-50",
              className,
            )}
          />
        }
      >
        {triggerContent}
        <div className="flex shrink-0 items-center gap-1">
          {clearButton}
          <ChevronDownIcon className="size-4 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        {panel}
      </PopoverContent>
    </Popover>
  );
}

export { AddressPicker, AddressColumn, AddressPanel };
export type { AddressPickerProps, AddressOption };
