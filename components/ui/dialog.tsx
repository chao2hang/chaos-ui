"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "./icons";

export type DialogProps = DialogPrimitive.Root.Props;

/**
 * @component Dialog
 * @category ui/overlay
 * @since 0.2.0
 * @description Root component for a modal dialog / 模态对话框的根组件
 * @keywords dialog, modal, overlay, popup, root
 * @example
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogTitle>Title</DialogTitle>
 *   </DialogContent>
 * </Dialog>
 */
function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * @component DialogTrigger
 * @category ui/overlay
 * @since 0.2.0
 * @description Element that opens the dialog when clicked / 点击时打开对话框的触发元素
 * @keywords dialog, trigger, open, button, activator
 * @example
 * <DialogTrigger>Open dialog</DialogTrigger>
 */
function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * @component DialogPortal
 * @category ui/overlay
 * @since 0.2.0
 * @description Portals the dialog content out of the DOM hierarchy / 将对话框内容传出门户到 DOM 外层
 * @keywords dialog, portal, dom, render, overlay
 * @example
 * <DialogPortal>
 *   <DialogContent>...</DialogContent>
 * </DialogPortal>
 */
function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * @component DialogClose
 * @category ui/overlay
 * @since 0.2.0
 * @description Button that closes the dialog when clicked / 点击时关闭对话框的按钮
 * @keywords dialog, close, dismiss, button, exit
 * @example
 * <DialogClose>Cancel</DialogClose>
 */
function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/**
 * @component DialogOverlay
 * @category ui/overlay
 * @since 0.2.0
 * @description Semi-transparent backdrop behind the dialog with fade animation / 对话框后面的半透明背景遮罩，带淡入淡出动画
 * @keywords dialog, overlay, backdrop, dim, modal
 * @example
 * <DialogOverlay />
 */
function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      {...props}
    />
  );
}

export type DialogContentProps = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
};

/**
 * @component DialogContent
 * @category ui/overlay
 * @since 0.2.0
 * @description The main content container of the dialog, centered on screen with a close button / 对话框的主要内容容器，居中显示并带关闭按钮
 * @keywords dialog, content, modal, overlay, container
 * @example
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Title</DialogTitle>
 *   </DialogHeader>
 * </DialogContent>
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  const { t } = useTranslation("ui");
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 text-sm ring-1 duration-100 outline-none sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">{t("dialog.close")}</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

export type DialogHeaderProps = React.ComponentProps<"div">;

/**
 * @component DialogHeader
 * @category ui/overlay
 * @since 0.2.0
 * @description Header area for dialog title and description / 对话框的标题和描述区域
 * @keywords dialog, header, title, description, layout
 * @example
 * <DialogHeader>
 *   <DialogTitle>Settings</DialogTitle>
 *   <DialogDescription>Manage your preferences</DialogDescription>
 * </DialogHeader>
 */
function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

export type DialogFooterProps = React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
};

/**
 * @component DialogFooter
 * @category ui/overlay
 * @since 0.2.0
 * @description Footer area with action buttons, optional built-in close button / 带操作按钮的底部区域，可选内置关闭按钮
 * @keywords dialog, footer, actions, buttons, submit
 * @example
 * <DialogFooter showCloseButton>
 *   <Button>Save</Button>
 * </DialogFooter>
 */
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  const { t } = useTranslation("ui");
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "bg-muted/50 -mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          {t("dialog.closeButton")}
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

export type DialogTitleProps = DialogPrimitive.Title.Props;

/**
 * @component DialogTitle
 * @category ui/overlay
 * @since 0.2.0
 * @description Accessible heading for the dialog / 对话框的无障碍标题
 * @keywords dialog, title, heading, accessible, a11y
 * @example
 * <DialogTitle>Delete file</DialogTitle>
 */
function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className,
      )}
      {...props}
    />
  );
}

export type DialogDescriptionProps = DialogPrimitive.Description.Props;

/**
 * @component DialogDescription
 * @category ui/overlay
 * @since 0.2.0
 * @description Accessible description text for the dialog / 对话框的无障碍描述文本
 * @keywords dialog, description, accessible, a11y, subtitle
 * @example
 * <DialogDescription>This action cannot be undone.</DialogDescription>
 */
function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component DialogBody
 * @category ui/overlay
 * @since 0.2.0
 * @description Content layout region between DialogHeader and DialogFooter with flex column + gap / 对话框头部和底部之间的内容布局区域，提供弹性列布局
 * @keywords dialog, body, content, layout, flex
 * @example
 * <DialogBody>
 *   <p>Main content goes here</p>
 * </DialogBody>
 */
export type DialogBodyProps = React.ComponentProps<"div">;

function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("flex flex-col gap-3 py-4", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
