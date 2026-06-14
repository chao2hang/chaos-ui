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
          <div className="flex-1 min-w-0">{renderItem(item, index)}</div>
          {!disabled && canRemove && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => handleRemove(index)}
              className="mt-1 shrink-0 text-muted-foreground hover:text-destructive"
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
          <PlusIcon className="size-4 mr-1" />
          {addButtonText}
        </Button>
      )}
    </div>
  );
}

export { FormList };
export type { FormListItem, FormListProps };
