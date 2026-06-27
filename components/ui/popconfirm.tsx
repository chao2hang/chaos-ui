"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverDescription,
  PopoverTitle,
} from "./popover";
import { Button } from "./button";

/**
 * @component Popconfirm
 * @category ui/primitives
 * @since 0.2.0
 * @description 气泡确认框 / Popconfirm component for confirmation actions
 * @keywords popconfirm, confirm, popover, delete, action
 * @example
 * <Popconfirm title="Are you sure?" onConfirm={handleDelete}>
 *   <Button>Delete</Button>
 * </Popconfirm>
 */

interface PopconfirmProps {
  /** Title text / 标题 */
  title?: React.ReactNode;
  /** Description text / 描述文本 */
  description?: React.ReactNode;
  /** Trigger element / 触发元素 */
  children: React.ReactNode;
  /** Confirm button text / 确认按钮文本 */
  okText?: string;
  /** Cancel button text / 取消按钮文本 */
  cancelText?: string;
  /** OK button variant / 确认按钮变体 */
  okVariant?: "default" | "destructive";
  /** Whether popconfirm is disabled / 是否禁用 */
  disabled?: boolean;
  /** Whether to show cancel button / 是否显示取消按钮 */
  showCancel?: boolean;
  /** Placement / 位置 */
  side?: "top" | "bottom" | "left" | "right";
  /** Confirm callback / 确认回调 */
  onConfirm?: (e?: React.SyntheticEvent) => void;
  /** Cancel callback / 取消回调 */
  onCancel?: (e?: React.SyntheticEvent) => void;
  /** Controlled open state / 受控的打开状态 */
  open?: boolean;
  /** Default open state / 默认打开状态 */
  defaultOpen?: boolean;
  /** Open change callback / 打开状态变更回调 */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function Popconfirm({
  title,
  description,
  children,
  okText = "OK",
  cancelText = "Cancel",
  okVariant = "default",
  disabled = false,
  showCancel = true,
  side = "top",
  onConfirm,
  onCancel,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
}: PopconfirmProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) setInternalOpen(value);
    onOpenChange?.(value);
  };

  const handleConfirm = (e: React.SyntheticEvent) => {
    onConfirm?.(e);
    setOpen(false);
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    onCancel?.(e);
    setOpen(false);
  };

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={children as React.ReactElement} />
      <PopoverContent
        side={side}
        align="center"
        className={cn("w-72 max-w-[90vw]", className)}
      >
        <div className="flex flex-col gap-1">
          {title && <PopoverTitle>{title}</PopoverTitle>}
          {description && <PopoverDescription>{description}</PopoverDescription>}
        </div>
        <div className="mt-3 flex justify-end gap-2">
          {showCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
          )}
          <Button
            variant={okVariant === "destructive" ? "destructive" : "default"}
            size="sm"
            onClick={handleConfirm}
          >
            {okText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { Popconfirm };
export type { PopconfirmProps };
