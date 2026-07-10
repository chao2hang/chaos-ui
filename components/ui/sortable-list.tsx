"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SortableListProps<T> extends React.ComponentProps<"div"> {
  /** Array of items to render and reorder / 要渲染和排序的项数组 */
  items: T[];
  /** Callback fired when items are reordered / 排序时的回调 */
  onReorder: (oldIndex: number, newIndex: number) => void;
  /** Render function for each item / 每个项的渲染函数 */
  renderItem: (item: T, index: number, isDragging: boolean) => React.ReactNode;
  /** Field name to use as the React key / 用作 React key 的字段名 */
  keyField: string;
  /** Disable drag-and-drop reordering / 禁用拖拽排序 */
  disabled?: boolean;
  /** Layout orientation / 布局方向 */
  orientation?: "vertical" | "horizontal";
  /** Class applied to each list item wrapper / 每个列表项容器的类名 */
  itemClassName?: string;
}

/**
 * @component SortableList
 * @category ui/interaction
 * @since 0.2.0
 * @description Generic drag-to-reorder list using native HTML5 drag and drop API with visual feedback / 使用原生 HTML5 拖放 API 的通用拖拽排序列表，带视觉反馈
 * @keywords sortable, drag, drop, reorder, list, html5
 * @example
 * <SortableList
 *   items={items}
 *   keyField="id"
 *   onReorder={(old, next) => move(old, next)}
 *   renderItem={(item) => <div>{item.label}</div>}
 * />
 */
function SortableList<T>({
  items = [],
  onReorder,
  renderItem,
  keyField,
  disabled = false,
  orientation = "vertical",
  className,
  itemClassName,
  ...props
}: SortableListProps<T>) {
  const dragIndexRef = React.useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = React.useState<number | null>(null);
  const [overIndex, setOverIndex] = React.useState<number | null>(null);

  const handleDragStart = React.useCallback(
    (index: number) => (e: React.DragEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      dragIndexRef.current = index;
      setDraggingIndex(index);
      e.dataTransfer.effectAllowed = "move";
      // Required for Firefox to initiate drag
      e.dataTransfer.setData("text/plain", String(index));
    },
    [disabled],
  );

  const handleDragOver = React.useCallback(
    (index: number) => (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (overIndex !== index) {
        setOverIndex(index);
      }
    },
    [disabled, overIndex],
  );

  const handleDrop = React.useCallback(
    (index: number) => (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      const oldIndex = dragIndexRef.current;
      if (oldIndex != null && oldIndex !== index) {
        onReorder(oldIndex, index);
      }
    },
    [disabled, onReorder],
  );

  const handleDragEnd = React.useCallback(() => {
    dragIndexRef.current = null;
    setDraggingIndex(null);
    setOverIndex(null);
  }, []);

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      data-slot="sortable-list"
      className={cn(
        "flex",
        isHorizontal ? "flex-row gap-2" : "flex-col gap-2",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => {
        const key = String(
          (item as Record<string, unknown>)[keyField] ?? index,
        );
        const isDragging = draggingIndex === index;
        const isOver = overIndex === index && draggingIndex !== index;

        return (
          <SortableListItem
            key={key}
            index={index}
            isDragging={isDragging}
            isOver={isOver}
            disabled={disabled}
            isHorizontal={isHorizontal}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            className={itemClassName}
          >
            {renderItem(item, index, isDragging)}
          </SortableListItem>
        );
      })}
    </div>
  );
}

export interface SortableListItemProps extends Omit<
  React.ComponentProps<"div">,
  "onDragStart" | "onDragOver" | "onDrop" | "onDragEnd"
> {
  index: number;
  isDragging: boolean;
  isOver: boolean;
  disabled: boolean;
  isHorizontal: boolean;
  onDragStart: (index: number) => (e: React.DragEvent) => void;
  onDragOver: (index: number) => (e: React.DragEvent) => void;
  onDrop: (index: number) => (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

/**
 * @component SortableListItem
 * @category ui/interaction
 * @since 0.2.0
 * @description Individual draggable item wrapper for SortableList with drag state styling / SortableList 的可拖拽项容器，带拖拽状态样式
 * @keywords sortable, item, draggable, drag, drop
 * @example
 * <SortableListItem index={0} isDragging={false} isOver={false} disabled={false}>
 *   <span>Item</span>
 * </SortableListItem>
 */
function SortableListItem({
  index,
  isDragging,
  isOver,
  disabled,
  isHorizontal,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  className,
  children,
  ...props
}: SortableListItemProps) {
  return (
    <div
      data-slot="sortable-list-item"
      draggable={!disabled}
      onDragStart={onDragStart(index)}
      onDragOver={onDragOver(index)}
      onDrop={onDrop(index)}
      onDragEnd={onDragEnd}
      className={cn(
        "relative transition-opacity",
        isDragging && "opacity-50",
        isOver &&
          (isHorizontal ? "border-ring border-l-2" : "border-ring border-t-2"),
        disabled && "cursor-not-allowed opacity-60",
        !disabled && "cursor-grab active:cursor-grabbing",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { SortableList, SortableListItem };
// SortableListProps is exported via the interface declaration above
