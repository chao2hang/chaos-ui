"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { cn } from "@/lib/utils";

/**
 * @component Avatar
 * @category ui/user
 * @since 0.2.0
 * @description Renders a user avatar with configurable image, fallback text, and badge / 渲染用户头像，支持图片、回退文字和角标
 * @keywords avatar, user, profile, image
 * @example
 * <Avatar size="default">
 *   <AvatarImage src="avatar.jpg" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 */
function Avatar({
  className,
  size = "default",
  fontSize,
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg";
  /** Custom font size override / 自定义字号 */
  fontSize?: number | string;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar after:border-border relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className,
      )}
      style={
        fontSize
          ? {
              fontSize:
                typeof fontSize === "number" ? `${fontSize}px` : fontSize,
            }
          : undefined
      }
      {...props}
    />
  );
}

/**
 * @component AvatarImage
 * @category ui/user
 * @since 0.2.0
 * @description The image element displayed inside an Avatar / 头像中显示的图片元素
 * @keywords avatar, image, profile
 * @example
 * <AvatarImage src="user.jpg" alt="User Name" />
 */
function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component AvatarFallback
 * @category ui/user
 * @since 0.2.0
 * @description The text fallback shown when the avatar image is missing or loading / 头像图片缺失或加载时显示的文字回退
 * @keywords avatar, fallback, initials, placeholder
 * @example
 * <AvatarFallback>JD</AvatarFallback>
 */
function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component AvatarBadge
 * @category ui/user
 * @since 0.2.0
 * @description A status indicator dot or icon overlaid on an Avatar / 头像上的状态指示点或图标角标
 * @keywords avatar, badge, status, indicator, online
 * @example
 * <AvatarBadge />
 */
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component AvatarGroup
 * @category ui/user
 * @since 0.2.0
 * @description Stacks multiple Avatars together with overlapping spacing / 将多个头像重叠排列在一起
 * @keywords avatar, group, stack, users
 * @example
 * <AvatarGroup>
 *   <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
 *   <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
 *   <AvatarGroupCount>+3</AvatarGroupCount>
 * </AvatarGroup>
 */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component AvatarGroupCount
 * @category ui/user
 * @since 0.2.0
 * @description Displays the remaining count of hidden avatars in an AvatarGroup / 显示头像组中超出可见范围的剩余数量
 * @keywords avatar, group, count, overflow, remaining
 * @example
 * <AvatarGroupCount>+5</AvatarGroupCount>
 */
function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "bg-muted text-muted-foreground ring-background relative flex size-8 shrink-0 items-center justify-center rounded-full text-sm ring-2 group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};
