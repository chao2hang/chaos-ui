"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";

/**
 * @component Popover
 * @category ui/overlay
 * @since 0.2.0
 * @description Root component for a floating popover dialog triggered by user interaction / 弹出框根组件，由用户交互触发的浮动弹窗
 * @keywords popover, overlay, floating, tooltip, dialog
 * @example
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Content</PopoverContent>
 * </Popover>
 */
function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

/**
 * @component PopoverTrigger
 * @category ui/overlay
 * @since 0.2.0
 * @description Trigger element that toggles the popover visibility / 触发弹出框显示/隐藏的触发器元素
 * @keywords popover, trigger, button, toggle
 * @example
 * <PopoverTrigger>Click me</PopoverTrigger>
 */
function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/**
 * @component PopoverContent
 * @category ui/overlay
 * @since 0.2.0
 * @description The floating popover panel with positioning and animation / 浮动弹出面板，包含定位和动画效果
 * @keywords popover, content, panel, floating, positioning
 * @example
 * <PopoverContent side="bottom" align="center">
 *   <PopoverHeader>...</PopoverHeader>
 * </PopoverContent>
 */
function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 outline-hidden duration-100",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

/**
 * @component PopoverHeader
 * @category ui/overlay
 * @since 0.2.0
 * @description Header section inside a popover, typically containing title and description / 弹出框头部区域，通常包含标题和描述
 * @keywords popover, header, title, heading
 * @example
 * <PopoverHeader>
 *   <PopoverTitle>Settings</PopoverTitle>
 *   <PopoverDescription>Configure your preferences</PopoverDescription>
 * </PopoverHeader>
 */
function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  );
}

/**
 * @component PopoverTitle
 * @category ui/overlay
 * @since 0.2.0
 * @description Title text for the popover / 弹出框标题文本
 * @keywords popover, title, heading
 * @example
 * <PopoverTitle>Account Settings</PopoverTitle>
 */
function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  );
}

/**
 * @component PopoverDescription
 * @category ui/overlay
 * @since 0.2.0
 * @description Descriptive text below the popover title / 弹出框标题下方的描述文本
 * @keywords popover, description, text, subtitle
 * @example
 * <PopoverDescription>Change your notification preferences below.</PopoverDescription>
 */
function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
