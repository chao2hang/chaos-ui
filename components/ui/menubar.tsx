"use client";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";

import { cn } from "@/lib/utils";

/**
 * @component Menubar
 * @category ui/overlay
 * @since 0.2.0
 * @description A horizontal menu bar built on @base-ui/react Menubar primitive for desktop application menus / 基于 @base-ui/react Menubar 的水平菜单栏，用于桌面应用菜单
 * @keywords menubar, menu, navigation, desktop, base-ui
 * @example
 * <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent>...</MenubarContent></MenubarMenu></Menubar>
 */
function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-lg border p-1 shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

export { Menubar };
