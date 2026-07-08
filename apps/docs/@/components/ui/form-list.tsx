"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon, GripVerticalIcon } from "@/components/ui/icons";

interface FormListItem {
  id: string;
  [key: string]: unknown;
}

interface FormListProps<T extends FormListItem> {
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
  onAdd?: () => T;
  onRemove?: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  addButtonText?: string;
  addButtonVariant?: "default" | "outline" | "ghost";
  maxItems?: number;
  minItems?: number;
  disabled?: boolean;
  sortable?: boolean;
  className?: string;
}

/**
 * @component FormList
 * @category ui/data-entry
 * @since 0.2.0
 * @description A dynamic form list allowing users to add, remove, and optionally reorder repeated form items / 动态表单列表，允许用户添加、删除并可选择性地对重复的表单项进行排序
 * @keywords form, list, dynamic, add, remove, sortable
 * @example
 * <FormList renderItem={(item, index) => <Input placeholder={`Item ${index + 1}`} />} />
 */
function FormList<T extends FormListItem>({
  value: controlledValue,
  defaultValue = [],
  onChange,
  onAdd,
  onRemove,
  renderItem,
  addButtonText = "Add Item",
  addButtonVariant = "outline",
  maxItems,
  minItems = 0,
  disabled = false,
  sortable = false,
  className,
}: FormListProps<T>) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<T[]>(defaultValue);
  const value = controlledValue ?? uncontrolledValue;

  const handleAdd = () => {
    if (maxItems && value.length >= maxItems) return;
    const newItem = onAdd ? onAdd() : ({ id: `item-${Date.now()}` } as T);
    const newValue = [...value, newItem];
    setUncontrolledValue(newValue);
    onChange?.(newValue);
  };

  const handleRemove = (index: number) => {
    if (value.length <= minItems) return;
    const newValue = value.filter((_, i) => i !== index);
    setUncontrolledValue(newValue);
    onRemove?.(index);
    onChange?.(newValue);
  };

  const canAdd = !maxItems || value.length < maxItems;
  const canRemove = value.length > minItems;

  return (
    <div data-slot="form-list" className={cn("space-y-3", className)}>
      {value.map((item, index) => (
        <div
          key={item.id}
          data-slot="form-list-item"
          className="flex items-start gap-2 rounded-lg border p-4"
        >
          {sortable && !disabled && (
            <Button
              variant="ghost"
              size="icon-xs"
              className="mt-1 cursor-grab"
              tabIndex={-1}
            >
              <GripVerticalIcon className="size-3" />
              <span className="sr-only">Drag to reorder</span>
            </Button>
          )}
          <div className="min-w-0 flex-1">{renderItem(item, index)}</div>
          {!disabled && canRemove && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => handleRemove(index)}
              className="text-muted-foreground hover:text-destructive mt-1 shrink-0"
            >
              <TrashIcon className="size-3" />
              <span className="sr-only">Remove item</span>
            </Button>
          )}
        </div>
      ))}
      {!disabled && canAdd && (
        <Button
          variant={addButtonVariant}
          size="sm"
          onClick={handleAdd}
          className="w-full"
        >
          <PlusIcon className="mr-1 size-4" />
          {addButtonText}
        </Button>
      )}
    </div>
  );
}

export { FormList };
export type { FormListItem, FormListProps };
