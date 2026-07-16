"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/ui/icons";

/**
 * @component Sheet
 * @category ui/overlay
 * @since 0.2.0
 * @description Root component for a slide-in panel dialog from any screen edge / 侧边滑出面板根组件，可从屏幕任意边缘滑入
 * @keywords sheet, drawer, panel, slide, dialog, side panel
 * @example
 * <Sheet>
 *   <SheetTrigger>Open</SheetTrigger>
 *   <SheetContent side="right">
 *     <SheetHeader>
 *       <SheetTitle>Panel Title</SheetTitle>
 *     </SheetHeader>
 *   </SheetContent>
 * </Sheet>
 */
function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/**
 * @component SheetTrigger
 * @category ui/overlay
 * @since 0.2.0
 * @description Trigger element that opens the sheet panel / 打开侧边面板的触发器元素
 * @keywords sheet, trigger, button, open, panel
 * @example
 * <SheetTrigger>Open Panel</SheetTrigger>
 */
function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * @component SheetClose
 * @category ui/overlay
 * @since 0.2.0
 * @description Button that programmatically closes the sheet panel / 可编程关闭侧边面板的按钮
 * @keywords sheet, close, dismiss, button
 * @example
 * <SheetClose>Close</SheetClose>
 */
function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * @component SheetPortal
 * @category ui/overlay
 * @since 0.2.0
 * @description Portal wrapper that renders the sheet into the document body / 传送门容器，将侧边面板渲染到文档 body
 * @keywords sheet, portal, teleport, body
 * @example
 * <SheetPortal>...</SheetPortal>
 */
function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/**
 * @component SheetOverlay
 * @category ui/overlay
 * @since 0.2.0
 * @description Semi-transparent backdrop overlay behind the sheet panel / 半透明背景遮罩，位于侧边面板后方
 * @keywords sheet, overlay, backdrop, mask, background
 * @example
 * <SheetOverlay />
 */
function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component SheetContent
 * @category ui/overlay
 * @since 0.2.0
 * @description The main sheet panel with configurable slide-in side, overlay, and close button / 侧边面板主体，支持配置滑入方向、遮罩和关闭按钮
 * @keywords sheet, content, panel, slide, side, drawer
 * @example
 * <SheetContent side="right" showCloseButton>
 *   <SheetHeader>
 *     <SheetTitle>Details</SheetTitle>
 *     <SheetDescription>View item details</SheetDescription>
 *   </SheetHeader>
 * </SheetContent>
 */
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-popover text-popover-foreground fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] motion-reduce:transition-none data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

/**
 * @component SheetHeader
 * @category ui/overlay
 * @since 0.2.0
 * @description Header section of the sheet panel containing title and description / 侧边面板头部区域，包含标题和描述
 * @keywords sheet, header, title, heading, panel
 * @example
 * <SheetHeader>
 *   <SheetTitle>Settings</SheetTitle>
 *   <SheetDescription>Manage preferences</SheetDescription>
 * </SheetHeader>
 */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  );
}

/**
 * @component SheetFooter
 * @category ui/overlay
 * @since 0.2.0
 * @description Bottom-aligned footer section of the sheet panel for action buttons / 侧边面板底部对齐的页脚区域，用于放置操作按钮
 * @keywords sheet, footer, actions, buttons, bottom
 * @example
 * <SheetFooter>
 *   <Button>Save</Button>
 * </SheetFooter>
 */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

/**
 * @component SheetTitle
 * @category ui/overlay
 * @since 0.2.0
 * @description Title heading for the sheet panel / 侧边面板标题
 * @keywords sheet, title, heading, text
 * @example
 * <SheetTitle>Account Settings</SheetTitle>
 */
function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-foreground text-base font-medium",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component SheetDescription
 * @category ui/overlay
 * @since 0.2.0
 * @description Descriptive text below the sheet title / 侧边面板标题下方的描述文本
 * @keywords sheet, description, text, subtitle
 * @example
 * <SheetDescription>Make changes to your account here.</SheetDescription>
 */
function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
