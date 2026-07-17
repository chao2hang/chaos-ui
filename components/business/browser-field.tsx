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
  "employee" | "department" | "company" | "product" | "custom";

/** Label descriptor used to render the trigger display without a full object. */
export interface BrowserLabel {
  id: string;
  label: string;
}

/** A registered default configuration for a browser type. */
export interface BrowserTypeConfig<T extends BrowseItem = BrowseItem> {
  loadData?: (params: BrowseLoadParams) => Promise<BrowseLoadResult<T>>;
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

  const [open, setOpen] = React.useState(false);
  const [acOpen, setAcOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [acItems, setAcItems] = React.useState<T[]>([]);
  const [acLoading, setAcLoading] = React.useState(false);

  /* ---- derive labels from value ---- */
  const valueIds: string[] = React.useMemo(() => {
    if (value == null) return [];
    return Array.isArray(value) ? value : [value];
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
  const runComplete = React.useCallback(
    (kw: string) => {
      if (!complete || !kw.trim()) {
        setAcItems([]);
        setAcOpen(false);
        return;
      }
      if (acTimer.current) clearTimeout(acTimer.current);
      acTimer.current = setTimeout(() => {
        setAcLoading(true);
        setAcOpen(true);
        complete(kw)
          .then((res) => setAcItems(res))
          .catch(() => setAcItems([]))
          .finally(() => setAcLoading(false));
      }, 300);
    },
    [complete],
  );

  React.useEffect(
    () => () => {
      if (acTimer.current) clearTimeout(acTimer.current);
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
    setAcOpen(false);
    setKeyword("");
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
  const useCombo = !!complete && !disabled;

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
              <span
                role="button"
                aria-label={t("browserField.remove", { defaultValue: "移除" })}
                onClick={(e) => removeOne(d.id, e)}
                className="hover:bg-muted-foreground/20 inline-flex size-3.5 items-center justify-center rounded-full"
              >
                <XIcon className="size-2.5" />
              </span>
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
        <span
          role="button"
          aria-label={t("browserField.clear", { defaultValue: "清空" })}
          onClick={clearAll}
          className="text-muted-foreground hover:text-foreground inline-flex size-4 items-center justify-center"
        >
          <XIcon className="size-3.5" />
        </span>
      )}
      {onAdd && !disabled && (
        <span
          role="button"
          aria-label={t("browserField.add", { defaultValue: "新增" })}
          onClick={(e) => {
            e.stopPropagation();
            void handleAdd();
          }}
          className="text-muted-foreground hover:text-foreground inline-flex size-4 items-center justify-center"
        >
          <PlusIcon className="size-3.5" />
        </span>
      )}
      <span
        role="button"
        aria-label={t("browserField.openDialog", {
          defaultValue: "打开选择弹窗",
        })}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="text-muted-foreground hover:text-foreground inline-flex size-4 cursor-pointer items-center justify-center"
      >
        <SearchIcon className="size-4 shrink-0" />
      </span>
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
          onClick={() => setOpen(false)}
        >
          {hasValue && !keyword ? (
            labelsRegion
          ) : (
            <input
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                runComplete(e.target.value);
              }}
              onFocus={() => keyword && runComplete(keyword)}
              onBlur={() => setTimeout(() => setAcOpen(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
              placeholder={resolvedPlaceholder}
              className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
              aria-label={t("browserField.autocomplete", {
                defaultValue: "联想搜索",
              })}
            />
          )}
          {trailing}
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(true)}
          className={cn(shellClass, "text-left")}
        >
          {labelsRegion}
          {trailing}
        </button>
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
            <ul className="max-h-60 overflow-y-auto">
              {acItems.map((item) => {
                const id = String(item[resolvedRowKey]);
                const lbl =
                  (typeof item.name === "string" ? item.name : undefined) ??
                  (typeof item.code === "string" ? item.code : undefined) ??
                  id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        pickAutocomplete(item);
                      }}
                      className="hover:bg-muted flex w-full items-center justify-between px-3 py-1.5 text-left text-sm"
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
        </div>
      )}

      <BrowseDialog<T>
        open={open}
        onOpenChange={setOpen}
        {...(loadData ? { loadData } : {})}
        {...(resolvedItems ? { items: resolvedItems as T[] } : {})}
        columns={columns as BrowseColumn<T>[]}
        {...(resolvedTree ? { tree: resolvedTree } : {})}
        rowKey={resolvedRowKey}
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
