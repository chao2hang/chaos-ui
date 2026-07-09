"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @component Tag
 * @category ui/data-display
 * @since 0.5.0
 * @description Read-only display tag. Unlike TagsInput which is editable,
 * Tag is for pure display / show-only scenarios.
 * / 只读展示标签，区别于 TagsInput 的输入形态
 * @keywords tag, label, display, badge
 * @example
 * <Tag>Active</Tag>
 * <Tag color="success" closable onClose={() => {}}>VIP</Tag>
 */

type TagColor = "default" | "primary" | "success" | "warning" | "error" | "info";

const tagColorMap: Record<TagColor, string> = {
  default: "bg-muted text-muted-foreground border-muted",
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900",
  warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
  error: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
  info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
};

interface TagProps extends React.ComponentProps<"span"> {
  /** Color variant / 颜色变体 */
  color?: TagColor | string;
  /** Whether the tag is closable / 是否可关闭 */
  closable?: boolean;
  /** Close callback / 关闭回调 */
  onClose?: () => void;
  /** Whether the tag is bordered / 是否显示边框 */
  bordered?: boolean;
  /** Icon before content / 前置图标 */
  icon?: React.ReactNode;
}

function Tag({
  className,
  color = "default",
  closable = false,
  onClose,
  bordered = true,
  icon,
  children,
  ...props
}: TagProps) {
  const colorClass = (tagColorMap as Record<string, string>)[color] ?? tagColorMap.default;

  const computedClassName = React.useMemo(
    () => cn(
      "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
      bordered && "border",
      colorClass,
      className,
    ),
    [colorClass, bordered, className],
  );

  const handleClose = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose?.();
    },
    [onClose],
  );

  return (
    <span
      data-slot="tag"
      className={computedClassName}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className="ml-0.5 shrink-0 rounded-sm p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
          aria-label="Close"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  );
}

/** Tag.Group — wraps a list of tags */
function TagGroup({
  className,
  children,
  gap = "sm",
}: {
  className?: string;
  children?: React.ReactNode;
  gap?: "sm" | "md" | "lg";
}) {
  const gapClass = gap === "sm" ? "gap-1" : gap === "lg" ? "gap-3" : "gap-2";
  return (
    <div data-slot="tag-group" className={cn("flex flex-wrap", gapClass, className)}>
      {children}
    </div>
  );
}

export { Tag, TagGroup };
export type { TagProps, TagColor };

const MemoizedTag = React.memo(Tag);
export { MemoizedTag as TagMemo };