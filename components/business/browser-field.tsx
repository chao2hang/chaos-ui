"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  BrowseDialog,
  type BrowseColumn,
  type BrowseDialogProps,
  type BrowseLoadParams,
  type BrowseLoadResult,
  type BrowseTreeNode,
} from "@/components/business/browse-dialog";
import { PlusIcon, SearchIcon, XIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

/** A browse item carries at least an id and a human label. */
export interface BrowseItem extends Record<string, unknown> {
  id: string | number;
  name?: string;
  code?: string;
}

/** Built-in browser type keys (extensible via `registerBrowserType`). */
export type BrowserType =
  | "employee"
  | "department"
  | "company"
  | "product"
  | "distributor"
  | "warehouse"
  | "feeType"
  | "custom"
  | (string & {});

/** Label descriptor used to render the trigger display without a full object. */
export interface BrowserLabel {
  id: string;
  label: string;
}

/** A registered default configuration for a browser type. */
export interface BrowserTypeConfig<T extends BrowseItem = BrowseItem> {
  loadData?: (params: BrowseLoadParams) => Promise<BrowseLoadResult<T>>;
  complete?: (keyword: string) => Promise<T[]>;
  completeMinChars?: number;
  completeDebounceMs?: number;
  completeAdvancedSearch?: boolean;
  columns?: BrowseColumn<T>[];
  multiple?: boolean;
  tree?: BrowseDialogProps<T>["tree"];
  items?: T[];
  rowKey?: string;
  title?: string;
  pageSize?: number;
}

const registry = new Map<BrowserType, BrowserTypeConfig>();

/**
 * Register default configuration for a browser type so consumers can inject
 * REST fetchers without the library binding to any backend. / 注册浏览类型默认配置。
 *
 * @example
 * ```ts
 * registerBrowserType('employee', {
 *   loadData: async (p) => ({ rows: await api.searchEmployees(p), total: 100 }),
 *   columns: [{ key: 'name', title: '姓名' }, { key: 'code', title: '工号' }],
 * });
 * ```
 */
export function registerBrowserType<T extends BrowseItem = BrowseItem>(
  type: BrowserType,
  config: BrowserTypeConfig<T>,
): void {
  registry.set(type, config as unknown as BrowserTypeConfig);
}

/** Read a registered config (internal + tests). */
export function getBrowserTypeConfig(
  type: BrowserType,
): BrowserTypeConfig | undefined {
  return registry.get(type);
}

/* ------------------------------------------------------------------ */
/*  BrowserField                                                        */
/* ------------------------------------------------------------------ */

export interface BrowserFieldProps<T extends BrowseItem = BrowseItem> {
  /** Browser type key — pulls defaults from `registerBrowserType`. */
  type?: BrowserType;
  /** Selected value: id string (single) or id array (multiple). */
  value?: string | string[];
  /** Display labels for the current value (id → text). */
  labels?: BrowserLabel[];
  /** Fired with the new value (ids) and full item objects. */
  onChange?: (value: string | string[], items: T[]) => void;

  /* --- selection --- */
  multiple?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  size?: "sm" | "default";

  /* --- dialog passthrough --- */
  loadData?: (params: BrowseLoadParams) => Promise<BrowseLoadResult<T>>;
  columns?: BrowseColumn<T>[];
  tree?: {
    loadTree: () => Promise<BrowseTreeNode[]>;
    defaultExpandedKeys?: string[];
  };
  items?: T[];
  rowKey?: keyof T & string;
  pageSize?: number;
  title?: string;
  searchPlaceholder?: string;

  /* --- autocomplete --- */
  /** Remote autocomplete fetcher (debounced). When set, the trigger becomes a
   *  type-ahead combobox; the magnifier button still opens the full dialog. */
  complete?: (keyword: string) => Promise<T[]>;
  /** Minimum keyword length before invoking `complete` (default: 1). */
  completeMinChars?: number;
  /** Debounce delay for `complete` in milliseconds (default: 300). */
  completeDebounceMs?: number;
  /** Show the advanced browse action in the suggestion footer (default: true). */
  completeAdvancedSearch?: boolean;

  /* --- add --- */
  /** Render a "＋" add button; resolved item is appended to the selection. */
  onAdd?: () => void | Promise<T | void>;

  /* --- display --- */
  /** When set, selected items render as clickable links. */
  linkHref?: (item: T) => string;

  className?: string;
}

/**
 * Form-level browse button field — the chaos-ui counterpart of Ecology
 * `WeaBrowser`. Renders an input-like trigger (magnifier + selected labels)
 * that opens a `BrowseDialog` for remote/local selection. / 表单级浏览按钮字段，
 * 对齐泛微 WeaBrowser：放大镜触发器 + 已选回显，内部复用 BrowseDialog 弹层。
 *
 * @component BrowserField
 * @category business/picker
 * @since 1.14.0
 * @description 表单级浏览选择字段，支持单/多选、分类树、联想、新增按钮与链接回显。
 * 内部复用 BrowseDialog，不重复实现弹层。
 *
 * @example
 * ```tsx
 * <BrowserField
 *   type="employee"
 *   multiple
 *   value={['E1']}
 *   labels={[{ id: 'E1', label: '张三' }]}
 *   loadData={async (p) => ({ rows: await api.search(p), total: 100 })}
 *   columns={[{ key: 'name', title: '姓名' }, { key: 'code', title: '工号' }]}
 *   onChange={(val, items) => console.log(val, items)}
 * />
 * ```
 */
function BrowserField<T extends BrowseItem = BrowseItem>({
  type,
  value,
  labels,
  onChange,
  multiple: multipleProp,
  disabled = false,
  clearable = true,
  placeholder,
  size = "default",
  loadData: loadDataProp,
  columns: columnsProp,
  tree,
  items,
  rowKey = "id" as keyof T & string,
  pageSize,
  title,
  searchPlaceholder,
  complete,
  completeMinChars: completeMinCharsProp,
  completeDebounceMs: completeDebounceMsProp,
  completeAdvancedSearch: completeAdvancedSearchProp,
  onAdd,
  linkHref,
  className,
}: BrowserFieldProps<T>) {
  const { t } = useTranslation("ui");

  const cfg = type ? registry.get(type) : undefined;
  const multiple = multipleProp ?? cfg?.multiple ?? false;
  const loadData =
    loadDataProp ??
    (cfg?.loadData as
      ((params: BrowseLoadParams) => Promise<BrowseLoadResult<T>>) | undefined);
  const columns = columnsProp ?? cfg?.columns ?? [];
  const resolvedItems = items ?? cfg?.items;
  const resolvedTree = tree ?? cfg?.tree;
  const resolvedRowKey = (rowKey ?? cfg?.rowKey ?? "id") as keyof T & string;
  const resolvedPageSize = pageSize ?? cfg?.pageSize ?? 10;
  const resolvedTitle = title ?? cfg?.title;
  const resolvedComplete = (complete ?? cfg?.complete) as
    ((keyword: string) => Promise<T[]>) | undefined;
  const completeMinChars = Math.max(
    0,
    completeMinCharsProp ?? cfg?.completeMinChars ?? 1,
  );
  const completeDebounceMs = Math.max(
    0,
    completeDebounceMsProp ?? cfg?.completeDebounceMs ?? 300,
  );
  const completeAdvancedSearch =
    completeAdvancedSearchProp ?? cfg?.completeAdvancedSearch ?? true;

  const [open, setOpen] = React.useState(false);
  const [acOpen, setAcOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [acItems, setAcItems] = React.useState<T[]>([]);
  const [acLoading, setAcLoading] = React.useState(false);
  const [acActiveIndex, setAcActiveIndex] = React.useState(-1);
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const autocompleteId = React.useId();
  const listboxId = `browser-field-listbox-${autocompleteId}`;

  /* ---- derive labels from value ---- */
  const valueIds: string[] = React.useMemo(() => {
    if (value == null) return [];
    return (Array.isArray(value) ? value : [value]).filter((id) => id !== "");
  }, [value]);

  const labelMap = React.useMemo(() => {
    const m = new Map<string, string>();
    for (const l of labels ?? []) m.set(l.id, l.label);
    return m;
  }, [labels]);

  const displayItems: BrowserLabel[] = React.useMemo(
    () =>
      valueIds.map((id) => ({
        id,
        label: labelMap.get(id) ?? id,
      })),
    [valueIds, labelMap],
  );

  const resolvedPlaceholder =
    placeholder ?? t("browserField.placeholder", { defaultValue: "请选择" });

  /* ---- autocomplete ---- */
  const acTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const acRequestId = React.useRef(0);
  const closeAutocomplete = React.useCallback(() => {
    if (acTimer.current) {
      clearTimeout(acTimer.current);
      acTimer.current = null;
    }
    acRequestId.current += 1;
    setAcItems([]);
    setAcOpen(false);
    setAcActiveIndex(-1);
    setAcLoading(false);
  }, []);
  const runComplete = React.useCallback(
    (kw: string) => {
      const trimmed = kw.trim();
      acRequestId.current += 1;
      const requestId = acRequestId.current;
      if (acTimer.current) {
        clearTimeout(acTimer.current);
        acTimer.current = null;
      }
      if (!resolvedComplete || trimmed.length < completeMinChars) {
        closeAutocomplete();
        return;
      }
      acTimer.current = setTimeout(() => {
        acTimer.current = null;
        setAcLoading(true);
        setAcOpen(true);
        resolvedComplete(trimmed)
          .then((res) => {
            if (requestId !== acRequestId.current) return;
            setAcItems(res);
            setAcActiveIndex(-1);
          })
          .catch(() => {
            if (requestId !== acRequestId.current) return;
            setAcItems([]);
            setAcActiveIndex(-1);
          })
          .finally(() => {
            if (requestId === acRequestId.current) setAcLoading(false);
          });
      }, completeDebounceMs);
    },
    [closeAutocomplete, completeDebounceMs, completeMinChars, resolvedComplete],
  );

  React.useEffect(
    () => () => {
      if (acTimer.current) clearTimeout(acTimer.current);
      acRequestId.current += 1;
    },
    [],
  );

  /* ---- change helpers ---- */
  const emit = (items: T[]) => {
    const ids = items.map((it) => String(it[resolvedRowKey]));
    const next = multiple ? ids : (ids[0] ?? "");
    onChange?.(next as string | string[], items);
  };

  const removeOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    if (!multiple) {
      onChange?.("", []);
      return;
    }
    const kept = valueIds.filter((v) => v !== id);
    const keptItems = displayItems
      .filter((d) => kept.includes(d.id))
      .map((d) => ({ [resolvedRowKey]: d.id, name: d.label }) as unknown as T);
    onChange?.(kept, keptItems);
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange?.(multiple ? [] : "", []);
  };

  const pickAutocomplete = (item: T) => {
    const id = String(item[resolvedRowKey]);
    if (multiple) {
      if (!valueIds.includes(id)) {
        const nextItems = [
          ...valueIds.map(
            (v) =>
              ({ [resolvedRowKey]: v, name: labelMap.get(v) }) as unknown as T,
          ),
          item,
        ];
        emit(nextItems);
      }
    } else {
      onChange?.(id, [item]);
    }
    closeAutocomplete();
    setKeyword("");
    if (!multiple) setEditing(false);
  };

  const handleAdd = async () => {
    const created = await onAdd?.();
    if (created) {
      if (multiple) {
        const exists = valueIds.includes(String(created[resolvedRowKey]));
        if (!exists)
          emit([
            ...valueIds.map(
              (v) =>
                ({
                  [resolvedRowKey]: v,
                  name: labelMap.get(v),
                }) as unknown as T,
            ),
            created,
          ]);
      } else {
        onChange?.(String(created[resolvedRowKey]), [created]);
      }
    }
  };

  const sizeClass =
    size === "sm" ? "h-7 min-h-7 text-sm" : "h-9 min-h-9 text-sm";
  const hasValue = valueIds.length > 0;
  const useCombo = !!resolvedComplete && !disabled;

  /* ---- labels region (shared) ---- */
  const labelsRegion = hasValue ? (
    multiple ? (
      <span className="flex flex-1 flex-wrap items-center gap-1 overflow-hidden">
        {displayItems.slice(0, 10).map((d) => (
          <Badge key={d.id} variant="secondary" className="gap-1 py-0 pr-1">
            {linkHref ? (
              <a
                href={linkHref({
                  [resolvedRowKey]: d.id,
                  name: d.label,
                } as T)}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline"
              >
                {d.label}
              </a>
            ) : (
              <span className="max-w-[140px] truncate">{d.label}</span>
            )}
            {clearable && !disabled && (
              <button
                type="button"
                aria-label={t("browserField.remove", { defaultValue: "移除" })}
                onClick={(e) => removeOne(d.id, e)}
                className="hover:bg-muted-foreground/20 inline-flex size-3.5 items-center justify-center rounded-full"
              >
                <XIcon className="size-2.5" />
              </button>
            )}
          </Badge>
        ))}
        {displayItems.length > 10 && (
          <span className="text-muted-foreground text-xs">
            +{displayItems.length - 10}
          </span>
        )}
      </span>
    ) : (
      <span className="flex flex-1 items-center gap-1 overflow-hidden">
        {(() => {
          const first = displayItems[0];
          if (!first) return null;
          return linkHref ? (
            <a
              href={linkHref({
                [resolvedRowKey]: first.id,
                name: first.label,
              } as T)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:text-primary hover:underline"
            >
              {first.label}
            </a>
          ) : (
            <span className="truncate">{first.label}</span>
          );
        })()}
      </span>
    )
  ) : useCombo ? null : (
    <span className="text-muted-foreground flex-1 truncate">
      {resolvedPlaceholder}
    </span>
  );

  /* ---- trailing icons (magnifier always opens dialog) ---- */
  const trailing = (
    <span className="flex shrink-0 items-center gap-0.5">
      {hasValue && clearable && !disabled && (
        <button
          type="button"
          aria-label={t("browserField.clear", { defaultValue: "清空" })}
          onClick={(e) => {
            e.stopPropagation();
            clearAll(e);
          }}
          className="text-muted-foreground hover:text-foreground inline-flex size-4 items-center justify-center"
        >
          <XIcon className="size-3.5" />
        </button>
      )}
      {onAdd && !disabled && (
        <button
          type="button"
          aria-label={t("browserField.add", { defaultValue: "新增" })}
          onClick={(e) => {
            e.stopPropagation();
            void handleAdd();
          }}
          className="text-muted-foreground hover:text-foreground inline-flex size-4 items-center justify-center"
        >
          <PlusIcon className="size-3.5" />
        </button>
      )}
      <button
        type="button"
        aria-label={t("browserField.openDialog", {
          defaultValue: "打开选择弹窗",
        })}
        onClick={(e) => {
          e.stopPropagation();
          closeAutocomplete();
          setOpen(true);
        }}
        className="text-muted-foreground hover:text-foreground inline-flex size-4 cursor-pointer items-center justify-center"
      >
        <SearchIcon className="size-4 shrink-0" />
      </button>
    </span>
  );

  const shellClass = cn(
    "border-input bg-background hover:border-input/70 flex w-full items-center gap-1 rounded-md border px-2 text-sm transition-colors",
    useCombo
      ? "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-2 focus-within:outline-none"
      : "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    sizeClass,
  );

  return (
    <div
      data-slot="browser-field"
      className={cn("relative block w-full", className)}
    >
      {useCombo ? (
        <div
          className={cn(shellClass, "cursor-text")}
          onClick={() => {
            setOpen(false);
            if (hasValue && !multiple) {
              setEditing(true);
              requestAnimationFrame(() => inputRef.current?.focus());
            }
          }}
        >
          {multiple && hasValue ? labelsRegion : null}
          {hasValue && !multiple && !keyword && !editing ? (
            labelsRegion
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                runComplete(e.target.value);
              }}
              onFocus={() => keyword && runComplete(keyword)}
              onBlur={() => {
                closeAutocomplete();
                if (hasValue && !multiple) setKeyword("");
                setEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  if (acItems.length === 0) return;
                  setAcActiveIndex((current) => {
                    const delta = e.key === "ArrowDown" ? 1 : -1;
                    return (current + delta + acItems.length) % acItems.length;
                  });
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  if (acOpen && acItems.length > 0) {
                    pickAutocomplete(
                      acItems[acActiveIndex >= 0 ? acActiveIndex : 0]!,
                    );
                  } else {
                    closeAutocomplete();
                    setOpen(true);
                  }
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  closeAutocomplete();
                  setKeyword("");
                  setEditing(false);
                } else if (e.key === "Tab") {
                  closeAutocomplete();
                  if (hasValue && !multiple) {
                    setKeyword("");
                  }
                  setEditing(false);
                }
              }}
              placeholder={resolvedPlaceholder}
              className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
              aria-label={t("browserField.autocomplete", {
                defaultValue: "联想搜索",
              })}
              aria-controls={acOpen ? listboxId : undefined}
              role="combobox"
              aria-expanded={acOpen}
              aria-activedescendant={
                acActiveIndex >= 0
                  ? `${listboxId}-option-${String(acItems[acActiveIndex]?.[resolvedRowKey])}`
                  : undefined
              }
            />
          )}
          {trailing}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          onClick={() => {
            if (!disabled) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className={cn(
            shellClass,
            "text-left",
            disabled && "pointer-events-none opacity-50",
          )}
        >
          {labelsRegion}
          {trailing}
        </div>
      )}

      {/* autocomplete dropdown */}
      {useCombo && acOpen && (
        <div className="bg-popover absolute top-full z-50 mt-1 w-full overflow-hidden rounded-md border shadow-md">
          {acLoading ? (
            <div className="text-muted-foreground px-3 py-2 text-sm">
              {t("browserField.searching", { defaultValue: "搜索中…" })}
            </div>
          ) : acItems.length === 0 ? (
            <div className="text-muted-foreground px-3 py-2 text-sm">
              {t("browserField.noMatch", { defaultValue: "无匹配项" })}
            </div>
          ) : (
            <ul
              id={listboxId}
              role="listbox"
              className="max-h-60 overflow-y-auto"
            >
              {acItems.map((item, itemIndex) => {
                const id = String(item[resolvedRowKey]);
                const lbl =
                  (typeof item.name === "string" ? item.name : undefined) ??
                  (typeof item.code === "string" ? item.code : undefined) ??
                  id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      id={`${listboxId}-option-${id}`}
                      role="option"
                      aria-selected={itemIndex === acActiveIndex}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        pickAutocomplete(item);
                      }}
                      onMouseEnter={() => setAcActiveIndex(itemIndex)}
                      className={cn(
                        "hover:bg-muted flex w-full items-center justify-between px-3 py-1.5 text-left text-sm",
                        itemIndex === acActiveIndex && "bg-muted",
                      )}
                    >
                      <span className="truncate">{lbl}</span>
                      {typeof item.code === "string" && item.code !== lbl && (
                        <span className="text-muted-foreground ml-2 shrink-0 text-xs">
                          {item.code}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {completeAdvancedSearch && !acLoading && (
            <button
              type="button"
              aria-label={t("browserField.advancedSearch", {
                defaultValue: "高级搜索",
              })}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                closeAutocomplete();
                setOpen(true);
              }}
              className="text-primary hover:bg-muted w-full border-t px-3 py-2 text-left text-sm"
            >
              {t("browserField.advancedSearch", { defaultValue: "高级搜索" })}
            </button>
          )}
        </div>
      )}

      <BrowseDialog<T>
        open={open}
        onOpenChange={(next) => {
          if (next) closeAutocomplete();
          setOpen(next);
        }}
        {...(loadData ? { loadData } : {})}
        {...(resolvedItems ? { items: resolvedItems as T[] } : {})}
        columns={columns as BrowseColumn<T>[]}
        {...(resolvedTree ? { tree: resolvedTree } : {})}
        rowKey={resolvedRowKey}
        value={
          valueIds.map((id) => {
            const source = resolvedItems?.find(
              (item) => String(item[resolvedRowKey]) === id,
            );
            return (
              source ??
              ({ [resolvedRowKey]: id, name: labelMap.get(id) ?? id } as T)
            );
          }) as T[]
        }
        pageSize={resolvedPageSize}
        {...(resolvedTitle ? { title: resolvedTitle } : {})}
        {...(searchPlaceholder ? { searchPlaceholder } : {})}
        selectionMode={multiple ? "multiple" : "single"}
        onChange={(selected: T[]) => emit(selected)}
      />
    </div>
  );
}

export { BrowserField };
