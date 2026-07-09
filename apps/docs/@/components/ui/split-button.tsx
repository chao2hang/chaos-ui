"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, Loader2 } from "@/components/ui/icons";

/**
 * @component SplitButton
 * @category ui/actions
 * @since 0.2.0
 * @description A button with a main action area and a dropdown trigger for more actions / 带主操作区域和下拉菜单触发器的分割按钮
 */

/** A single action item displayed in the SplitButton dropdown */
export interface SplitButtonAction {
  /** Label text for the action */
  label: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Whether to render with destructive styling */
  destructive?: boolean;
  /** Show a separator before this item */
  separator?: boolean;
}

export interface SplitButtonProps {
  /** Main button label */
  children: React.ReactNode;
  /** Main button click handler */
  onClick?: () => void;
  /** Dropdown actions */
  actions?: SplitButtonAction[];
  /** Button variant (same as Button) */
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  /** Button size */
  size?: "default" | "xs" | "sm" | "lg";
  /** Disabled state */
  disabled?: boolean;
  /** Icon for main button */
  icon?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS class name */
  className?: string;
}

const triggerSizeMap: Record<string, "icon-xs" | "icon-sm" | "icon" | "icon-lg"> = {
  xs: "icon-xs",
  sm: "icon-sm",
  default: "icon",
  lg: "icon-lg",
};

function SplitButton({
  children,
  onClick,
  actions,
  variant = "default",
  size = "default",
  disabled = false,
  icon,
  loading = false,
  className,
}: SplitButtonProps) {
  const isDisabled = disabled || loading;
  const triggerIconSize = triggerSizeMap[size] ?? "icon";
  const hasActions = actions != null && actions.length > 0;

  return (
    <div
      data-slot="split-button"
      className={cn("inline-flex items-center", className)}
    >
      <Button
        variant={variant}
        size={size}
        disabled={isDisabled}
        onClick={onClick}
        icon={loading ? <Loader2 className="animate-spin" /> : icon}
        className="rounded-r-none"
      >
        {children}
      </Button>

      {hasActions && (
        <DropdownMenu disabled={isDisabled}>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant, size: triggerIconSize }),
              "-ml-px rounded-l-none"
            )}
          >
            <ChevronDownIcon />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {actions.map((action, index) => {
              const items: React.ReactNode[] = [];

              if (action.separator && index > 0) {
                items.push(
                  <DropdownMenuSeparator key={`sep-${index}`} />
                );
              }

              items.push(
                <DropdownMenuItem
                  key={action.label}
                  variant={action.destructive ? "destructive" : "default"}
                  disabled={action.disabled}
                  onClick={action.onClick}
                >
                  {action.icon != null && (
                    <span className="shrink-0">{action.icon}</span>
                  )}
                  {action.label}
                </DropdownMenuItem>
              );

              return items;
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

export { SplitButton };
