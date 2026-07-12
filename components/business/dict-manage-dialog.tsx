"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  SearchIcon,
} from "@/components/ui/icons";

/**
 * @component DictManageDialog
 * @category business/picker
 * @since 1.6.0
 * @description Dictionary item CRUD dialog that pairs with DictSelect. Supports controlled
 * `items`, optional remote load/create/update/delete callbacks, and inline search.
 * / 字典项管理对话框，与 DictSelect 配套。支持受控 `items`、可选远程 CRUD 回调与搜索过滤。
 * @keywords dict, dictionary, manage, crud, dialog, admin
 * @example
 * <DictManageDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   categoryCode="order_status"
 *   items={items}
 *   onChange={setItems}
 *   onCreate={async (item) => api.createDict("order_status", item)}
 * />
 */

export interface DictManageItem {
  /** Unique value within the category / 分类内唯一值 */
  value: string | number;
  /** Display label / 展示文案 */
  label: string;
  /** Disabled options are still listed but marked inactive / 停用项仍展示 */
  disabled?: boolean;
  /** Optional stable id (falls back to value) / 可选稳定 id */
  id?: string;
}

export type DictManageFetcher = (
  categoryCode: string,
) => Promise<DictManageItem[]>;

export interface DictManageDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Dialog title / 标题 */
  title?: string;
  /** Optional description under title / 副标题说明 */
  description?: string;
  /** Dictionary category code (for remote ops) / 字典分类编码 */
  categoryCode?: string;
  /** Controlled items / 受控字典项 */
  items?: DictManageItem[];
  /** Uncontrolled default items / 非受控初始项 */
  defaultItems?: DictManageItem[];
  /** Fired after local list mutates / 本地列表变更 */
  onChange?: (items: DictManageItem[]) => void;
  /** Load items when dialog opens (categoryCode required) / 打开时加载 */
  onLoad?: DictManageFetcher;
  /** Create handler; return item to merge server fields / 新增回调 */
  onCreate?: (
    item: DictManageItem,
    categoryCode?: string,
  ) => Promise<DictManageItem | void> | DictManageItem | void;
  /** Update handler / 更新回调 */
  onUpdate?: (
    item: DictManageItem,
    categoryCode?: string,
  ) => Promise<DictManageItem | void> | DictManageItem | void;
  /** Delete handler / 删除回调 */
  onDelete?: (
    item: DictManageItem,
    categoryCode?: string,
  ) => Promise<void> | void;
  /** Allow editing value field on existing rows / 是否允许改 value */
  allowEditValue?: boolean;
  addLabel?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  className?: string;
}

type EditorMode = "create" | "edit" | null;

function itemKey(item: DictManageItem): string {
  return item.id != null ? String(item.id) : String(item.value);
}

function DictManageDialog({
  open = false,
  onOpenChange,
  title = "字典管理",
  description,
  categoryCode,
  items: controlledItems,
  defaultItems = [],
  onChange,
  onLoad,
  onCreate,
  onUpdate,
  onDelete,
  allowEditValue = false,
  addLabel = "新增",
  emptyText = "暂无字典项",
  searchPlaceholder = "搜索标签或值…",
  className,
}: DictManageDialogProps) {
  const isControlled = controlledItems !== undefined;
  const [internalItems, setInternalItems] =
    React.useState<DictManageItem[]>(defaultItems);
  const items = isControlled ? (controlledItems ?? []) : internalItems;

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");
  const [mode, setMode] = React.useState<EditorMode>(null);
  const [draft, setDraft] = React.useState<DictManageItem>({
    label: "",
    value: "",
    disabled: false,
  });
  const [editingKey, setEditingKey] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const setItems = React.useCallback(
    (
      next: DictManageItem[] | ((prev: DictManageItem[]) => DictManageItem[]),
    ) => {
      const resolved = typeof next === "function" ? next(items) : next;
      if (!isControlled) setInternalItems(resolved);
      onChange?.(resolved);
    },
    [isControlled, items, onChange],
  );

  React.useEffect(() => {
    if (!open) {
      setMode(null);
      setEditingKey(null);
      setQuery("");
      setFormError(null);
      setError(null);
      return;
    }
    if (!onLoad || !categoryCode) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    onLoad(categoryCode)
      .then((data) => {
        if (cancelled) return;
        setItems(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "加载字典失败");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // Intentionally only re-load when open/category changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, categoryCode, onLoad]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        String(it.label).toLowerCase().includes(q) ||
        String(it.value).toLowerCase().includes(q),
    );
  }, [items, query]);

  const openCreate = () => {
    setMode("create");
    setEditingKey(null);
    setDraft({ label: "", value: "", disabled: false });
    setFormError(null);
  };

  const openEdit = (item: DictManageItem) => {
    setMode("edit");
    setEditingKey(itemKey(item));
    const next: DictManageItem = {
      label: item.label,
      value: item.value,
      disabled: item.disabled ?? false,
    };
    if (item.id !== undefined) next.id = item.id;
    setDraft(next);
    setFormError(null);
  };

  const cancelEditor = () => {
    setMode(null);
    setEditingKey(null);
    setFormError(null);
  };

  const validateDraft = (): string | null => {
    if (!String(draft.label).trim()) return "标签不能为空";
    if (
      draft.value === "" ||
      draft.value === undefined ||
      draft.value === null
    ) {
      return "值不能为空";
    }
    const valueTaken = items.some((it) => {
      if (mode === "edit" && itemKey(it) === editingKey) return false;
      return String(it.value) === String(draft.value);
    });
    if (valueTaken) return "值已存在";
    return null;
  };

  const handleSave = async () => {
    const err = validateDraft();
    if (err) {
      setFormError(err);
      return;
    }
    setPending(true);
    setFormError(null);
    try {
      const payload: DictManageItem = {
        ...draft,
        label: String(draft.label).trim(),
        value:
          typeof draft.value === "number"
            ? draft.value
            : String(draft.value).trim(),
        disabled: Boolean(draft.disabled),
      };

      if (mode === "create") {
        const result = await onCreate?.(payload, categoryCode);
        const created = result ?? payload;
        setItems((prev) => [...prev, created]);
      } else if (mode === "edit" && editingKey) {
        const result = await onUpdate?.(payload, categoryCode);
        const updated = result ?? payload;
        setItems((prev) =>
          prev.map((it) =>
            itemKey(it) === editingKey ? { ...it, ...updated } : it,
          ),
        );
      }
      cancelEditor();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setPending(false);
    }
  };

  const handleDelete = async (item: DictManageItem) => {
    setPending(true);
    setError(null);
    try {
      await onDelete?.(item, categoryCode);
      setItems((prev) => prev.filter((it) => itemKey(it) !== itemKey(item)));
      if (editingKey === itemKey(item)) cancelEditor();
    } catch (e) {
      setError(e instanceof Error ? e.message : "删除失败");
    } finally {
      setPending(false);
    }
  };

  const handleToggleDisabled = async (item: DictManageItem) => {
    const next: DictManageItem = {
      ...item,
      disabled: !item.disabled,
    };
    setPending(true);
    try {
      const result = await onUpdate?.(next, categoryCode);
      const updated = result ?? next;
      setItems((prev) =>
        prev.map((it) =>
          itemKey(it) === itemKey(item) ? { ...it, ...updated } : it,
        ),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "更新失败");
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="dict-manage-dialog"
        className={cn("sm:max-w-lg", className)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {(description || categoryCode) && (
            <DialogDescription>
              {description ??
                (categoryCode ? `分类：${categoryCode}` : undefined)}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-8"
                aria-label="搜索字典项"
              />
            </div>
            <Button
              type="button"
              size="sm"
              onClick={openCreate}
              disabled={pending || mode === "create"}
              icon={<PlusIcon />}
            >
              {addLabel}
            </Button>
          </div>

          {error ? (
            <div
              role="alert"
              className="border-destructive/30 bg-destructive/5 text-destructive rounded-md border px-3 py-2 text-xs"
            >
              {error}
            </div>
          ) : null}

          {mode ? (
            <div
              data-slot="dict-manage-editor"
              className="border-border bg-muted/30 flex flex-col gap-3 rounded-md border p-3"
            >
              <div className="text-sm font-medium">
                {mode === "create" ? "新增字典项" : "编辑字典项"}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dict-item-label">标签</Label>
                  <Input
                    id="dict-item-label"
                    value={String(draft.label ?? "")}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, label: e.target.value }))
                    }
                    placeholder="显示名称"
                    disabled={pending}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dict-item-value">值</Label>
                  <Input
                    id="dict-item-value"
                    value={String(draft.value ?? "")}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, value: e.target.value }))
                    }
                    placeholder="唯一编码"
                    disabled={pending || (mode === "edit" && !allowEditValue)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label
                  htmlFor="dict-item-disabled"
                  className="flex items-center gap-2 font-normal"
                >
                  <Switch
                    id="dict-item-disabled"
                    checked={!draft.disabled}
                    onCheckedChange={(checked) =>
                      setDraft((d) => ({ ...d, disabled: !checked }))
                    }
                    disabled={pending}
                  />
                  启用
                </Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={cancelEditor}
                    disabled={pending}
                  >
                    取消
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSave}
                    loading={pending}
                  >
                    保存
                  </Button>
                </div>
              </div>
              {formError ? (
                <p className="text-destructive text-xs" role="alert">
                  {formError}
                </p>
              ) : null}
            </div>
          ) : null}

          <div
            data-slot="dict-manage-list"
            className="border-border max-h-72 overflow-y-auto rounded-md border"
          >
            {loading ? (
              <div className="flex flex-col gap-2 p-3">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground px-3 py-8 text-center text-sm">
                {emptyText}
              </p>
            ) : (
              <ul className="divide-border divide-y" role="list">
                {filtered.map((item) => {
                  const key = itemKey(item);
                  return (
                    <li
                      key={key}
                      className="flex items-center gap-2 px-3 py-2 text-sm"
                      data-disabled={item.disabled ? "true" : "false"}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium">
                            {item.label}
                          </span>
                          {item.disabled ? (
                            <Badge variant="secondary">停用</Badge>
                          ) : (
                            <Badge variant="outline">启用</Badge>
                          )}
                        </div>
                        <div className="text-muted-foreground truncate font-mono text-xs">
                          {String(item.value)}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label={`切换启用 ${item.label}`}
                          onClick={() => handleToggleDisabled(item)}
                          disabled={pending}
                        >
                          {item.disabled ? "启用" : "停用"}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`编辑 ${item.label}`}
                          onClick={() => openEdit(item)}
                          disabled={pending}
                        >
                          <PencilIcon className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`删除 ${item.label}`}
                          onClick={() => handleDelete(item)}
                          disabled={pending}
                        >
                          <Trash2Icon className="size-3.5" />
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange?.(false)}
          >
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DictManageDialog };
