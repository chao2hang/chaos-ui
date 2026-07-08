"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { PencilIcon, CheckIcon } from "./icons";

interface EditableDescriptionItem {
  /** Label text / 标签文本 */
  label: React.ReactNode;
  /** Value / 值 */
  value: unknown;
  /** Editor type / 编辑器类型 */
  type?: "text" | "number" | "select" | "date" | "boolean";
  /** Options for select type / 下拉选项 */
  options?: { label: React.ReactNode; value: string | number }[];
  /** Required field / 是否必填 */
  required?: boolean;
}

interface EditableDescriptionsProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  /** Description items / 描述项列表 */
  items?: EditableDescriptionItem[];
  /** Number of columns / 列数 */
  column?: number;
  /** Layout direction / 布局方向 */
  layout?: "horizontal" | "vertical";
  /** Enable editing / 启用编辑 */
  editable?: boolean;
  /** Change handler / 变更回调 */
  onChange?: (newItems: EditableDescriptionItem[]) => void;
}

function EditableDescriptions({
  className,
  items = [],
  column = 2,
  layout = "horizontal",
  editable = true,
  onChange,
  ...props
}: EditableDescriptionsProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [draft, setDraft] = React.useState<EditableDescriptionItem[]>(items);

  React.useEffect(() => {
    setDraft(items);
  }, [items]);

  const startEdit = () => {
    setDraft(items);
    setIsEditing(true);
  };

  const confirmEdit = () => {
    onChange?.(draft);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(items);
    setIsEditing(false);
  };

  const updateValue = (index: number, value: unknown) => {
    setDraft((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value } : item)),
    );
  };

  const renderItem = (item: EditableDescriptionItem, index: number) => {
    const isVertical = layout === "vertical";
    return (
      <div
        key={index}
        data-slot="editable-descriptions-item"
        className={cn(
          "flex gap-2",
          isVertical ? "flex-col" : "flex-row items-center",
        )}
      >
        <span
          className={cn(
            "text-muted-foreground shrink-0 text-sm font-medium",
            !isVertical && "min-w-24",
          )}
        >
          {item.label}
          {item.required && <span className="text-destructive ml-0.5">*</span>}:
        </span>
        {isEditing && editable ? (
          renderEditor(item, index)
        ) : (
          <span className="text-foreground text-sm">
            {item.type === "boolean"
              ? item.value
                ? "Yes"
                : "No"
              : item.type === "select"
                ? (item.options?.find((o) => o.value === item.value)?.label ??
                  String(item.value ?? "—"))
                : String(item.value ?? "—")}
          </span>
        )}
      </div>
    );
  };

  const renderEditor = (item: EditableDescriptionItem, index: number) => {
    const value = draft[index]?.value;
    const baseClass =
      "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-7 rounded-md border bg-transparent px-2 text-sm outline-none focus-visible:ring-3";

    switch (item.type) {
      case "select":
        return (
          <select
            value={String(value ?? "")}
            onChange={(e) =>
              updateValue(
                index,
                item.options?.find((o) => String(o.value) === e.target.value)
                  ?.value ?? e.target.value,
              )
            }
            className={cn(baseClass, "min-w-32")}
          >
            <option value="">Select...</option>
            {item.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            value={Number(value ?? 0)}
            onChange={(e) => updateValue(index, Number(e.target.value))}
            className={cn(baseClass, "min-w-32")}
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={String(value ?? "")}
            onChange={(e) => updateValue(index, e.target.value)}
            className={cn(baseClass, "min-w-32")}
          />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => updateValue(index, e.target.checked)}
            className="size-4"
          />
        );
      default:
        return (
          <input
            type="text"
            value={String(value ?? "")}
            onChange={(e) => updateValue(index, e.target.value)}
            className={cn(baseClass, "min-w-32 flex-1")}
          />
        );
    }
  };

  return (
    <div
      data-slot="editable-descriptions"
      className={cn("w-full", className)}
      {...props}
    >
      <div className="mb-3 flex items-center justify-end">
        {editable && !isEditing && (
          <button
            type="button"
            onClick={startEdit}
            className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors"
          >
            <PencilIcon className="size-3.5" />
            Edit
          </button>
        )}
        {isEditing && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={confirmEdit}
              className="text-primary hover:bg-primary/10 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors"
            >
              <CheckIcon className="size-3.5" />
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div
        className="grid gap-x-6 gap-y-3"
        style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}
      >
        {items.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
}

export { EditableDescriptions };
export type { EditableDescriptionItem, EditableDescriptionsProps };
