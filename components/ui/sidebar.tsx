"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { PanelLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

/**
 * @component SidebarProvider
 * @category ui/navigation
 * @since 0.2.0
 * @description Context provider for sidebar state management with keyboard shortcut support / 侧边栏状态管理的上下文提供者，支持键盘快捷键
 * @keywords sidebar, provider, context, navigation, 侧边栏
 * @example
 * <SidebarProvider>
 *   <Sidebar>...</Sidebar>
 *   <SidebarInset>...</SidebarInset>
 * </SidebarProvider>
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state. Guard for SSR / non-browser.
      if (typeof document !== "undefined") {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      }
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar relative flex h-dvh w-full overflow-hidden",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

/**
 * @component Sidebar
 * @category ui/navigation
 * @since 0.2.0
 * @description Collapsible sidebar navigation panel with mobile sheet support and icon-only mode / 可折叠侧边栏导航面板，支持移动端抽屉和只显示图标模式
 * @keywords sidebar, navigation, collapsible, mobile, 侧边栏
 * @example
 * <SidebarProvider>
 *   <Sidebar>
 *     <SidebarHeader />
 *     <SidebarContent>
 *       <SidebarMenu>
 *         <SidebarMenuItem>
 *           <SidebarMenuButton>Item</SidebarMenuButton>
 *         </SidebarMenuItem>
 *       </SidebarMenu>
 *     </SidebarContent>
 *   </Sidebar>
 * </SidebarProvider>
 */
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "absolute inset-y-0 z-10 hidden h-full w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:ring-sidebar-border flex size-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * @component SidebarTrigger
 * @category ui/navigation
 * @since 0.2.0
 * @description Button to toggle the sidebar open/collapsed state / 用于切换侧边栏展开/折叠状态的按钮
 * @keywords sidebar, trigger, toggle, hamburger, 侧边栏触发
 * @example
 * <SidebarTrigger />
 */
function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

/**
 * @component SidebarRail
 * @category ui/navigation
 * @since 0.2.0
 * @description Thin drag handle along the sidebar edge for resizing / 侧边栏边缘的细拖动条，用于调整宽度
 * @keywords sidebar, rail, resize, drag, 侧边栏拖拽
 * @example
 * <SidebarRail />
 */
function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component SidebarInset
 * @category ui/navigation
 * @since 0.2.0
 * @description Main content area adjacent to the sidebar that adapts to sidebar state / 侧边栏旁边的主内容区域，自适应侧边栏状态
 * @keywords sidebar, inset, main, content, 侧边栏内容区
 * @example
 * <SidebarInset>
 *   <main>Content</main>
 * </SidebarInset>
 */
function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col overflow-auto md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component SidebarInput
 * @category ui/navigation
 * @since 0.2.0
 * @description Search input field styled for the sidebar / 侧边栏中的搜索输入框
 * @keywords sidebar, input, search, 侧边栏搜索
 * @example
 * <SidebarInput placeholder="Search..." />
 */
function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  );
}

/**
 * @component SidebarHeader
 * @category ui/navigation
 * @since 0.2.0
 * @description Header section within the sidebar / 侧边栏的头部区域
 * @keywords sidebar, header, 侧边栏头部
 * @example
 * <SidebarHeader>
 *   <SidebarMenuButton>App Name</SidebarMenuButton>
 * </SidebarHeader>
 */
function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

/**
 * @component SidebarFooter
 * @category ui/navigation
 * @since 0.2.0
 * @description Footer section within the sidebar, typically for user info or actions / 侧边栏的底部区域，通常放置用户信息或操作按钮
 * @keywords sidebar, footer, 侧边栏底部
 * @example
 * <SidebarFooter>
 *   <SidebarMenuButton>Settings</SidebarMenuButton>
 * </SidebarFooter>
 */
function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

/**
 * @component SidebarSeparator
 * @category ui/navigation
 * @since 0.2.0
 * @description Visual separator line within the sidebar / 侧边栏内的视觉分割线
 * @keywords sidebar, separator, divider, 侧边栏分割线
 * @example
 * <SidebarSeparator />
 */
function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
}

/**
 * @component SidebarContent
 * @category ui/navigation
 * @since 0.2.0
 * @description Scrollable content area of the sidebar / 侧边栏的可滚动内容区域
 * @keywords sidebar, content, scrollable, 侧边栏内容
 * @example
 * <SidebarContent>
 *   <SidebarMenu>...</SidebarMenu>
 * </SidebarContent>
 */
function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component SidebarGroup
 * @category ui/navigation
 * @since 0.2.0
 * @description Logical grouping container for sidebar menu items / 侧边栏菜单项的逻辑分组容器
 * @keywords sidebar, group, 侧边栏分组
 * @example
 * <SidebarGroup>
 *   <SidebarGroupLabel>Navigation</SidebarGroupLabel>
 *   <SidebarMenu>...</SidebarMenu>
 * </SidebarGroup>
 */
function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

/**
 * @component SidebarGroupLabel
 * @category ui/navigation
 * @since 0.2.0
 * @description Label heading for a sidebar group, hidden in icon-collapsed mode / 侧边栏分组的标签标题，图标折叠模式下隐藏
 * @keywords sidebar, group, label, heading, 侧边栏分组标题
 * @example
 * <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
 */
function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  });
}

/**
 * @component SidebarGroupAction
 * @category ui/navigation
 * @since 0.2.0
 * @description Action button positioned at the top-right of a sidebar group / 侧边栏分组右上角的操作按钮
 * @keywords sidebar, group, action, button, 侧边栏分组操作
 * @example
 * <SidebarGroupAction>
 *   <PlusIcon />
 * </SidebarGroupAction>
 */
function SidebarGroupAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  });
}

/**
 * @component SidebarGroupContent
 * @category ui/navigation
 * @since 0.2.0
 * @description Content wrapper for a sidebar group / 侧边栏分组的内容包装器
 * @keywords sidebar, group, content, 侧边栏分组内容
 * @example
 * <SidebarGroupContent>
 *   <SidebarMenu>...</SidebarMenu>
 * </SidebarGroupContent>
 */
function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}

/**
 * @component SidebarMenu
 * @category ui/navigation
 * @since 0.2.0
 * @description Unordered list container for sidebar menu items / 侧边栏菜单项的无序列表容器
 * @keywords sidebar, menu, list, 侧边栏菜单
 * @example
 * <SidebarMenu>
 *   <SidebarMenuItem>
 *     <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *   </SidebarMenuItem>
 * </SidebarMenu>
 */
function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      {...props}
    />
  );
}

/**
 * @component SidebarMenuItem
 * @category ui/navigation
 * @since 0.2.0
 * @description Individual list item within a sidebar menu / 侧边栏菜单中的单个列表项
 * @keywords sidebar, menu, item, 侧边栏菜单项
 * @example
 * <SidebarMenuItem>
 *   <SidebarMenuButton>Settings</SidebarMenuButton>
 * </SidebarMenuItem>
 */
function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * @component SidebarMenuButton
 * @category ui/navigation
 * @since 0.2.0
 * @description Interactive button/link for a sidebar menu item with optional tooltip in collapsed mode / 侧边栏菜单项的可交互按钮/链接，折叠模式下可选工具提示
 * @keywords sidebar, menu, button, link, 侧边栏菜单按钮
 * @example
 * <SidebarMenuButton tooltip="Dashboard">
 *   <HomeIcon />
 *   <span>Dashboard</span>
 * </SidebarMenuButton>
 */
function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>) {
  const { isMobile, state } = useSidebar();
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      },
      props,
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  });

  if (!tooltip) {
    return comp;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      {comp}
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

/**
 * @component SidebarMenuAction
 * @category ui/navigation
 * @since 0.2.0
 * @description Small action button positioned within a sidebar menu item / 侧边栏菜单项中的小型操作按钮
 * @keywords sidebar, menu, action, button, 侧边栏菜单操作
 * @example
 * <SidebarMenuAction showOnHover>
 *   <MoreIcon />
 * </SidebarMenuAction>
 */
function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    showOnHover?: boolean;
  }) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
          showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  });
}

/**
 * @component SidebarMenuBadge
 * @category ui/navigation
 * @since 0.2.0
 * @description Badge/count indicator placed inside a sidebar menu item / 侧边栏菜单项内的徽章/计数指示器
 * @keywords sidebar, menu, badge, count, notification, 侧边栏菜单徽章
 * @example
 * <SidebarMenuBadge>3</SidebarMenuBadge>
 */
function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground peer-hover/menu-button:text-sidebar-accent-foreground peer-data-active/menu-button:text-sidebar-accent-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component SidebarMenuSkeleton
 * @category ui/navigation
 * @since 0.2.0
 * @description Loading placeholder skeleton for a sidebar menu item / 侧边栏菜单项的加载占位骨架
 * @keywords sidebar, menu, skeleton, loading, placeholder, 侧边栏菜单骨架
 * @example
 * <SidebarMenuSkeleton showIcon />
 */
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

/**
 * @component SidebarMenuSub
 * @category ui/navigation
 * @since 0.2.0
 * @description Nested sub-menu list within the sidebar, supports collapsible mode and dropdown fallback in icon-only mode / 侧边栏内的嵌套子菜单列表，支持折叠模式和图标模式下的下拉菜单回退
 * @keywords sidebar, sub-menu, nested, collapsible, dropdown, 侧边栏子菜单
 * @example
 * <SidebarMenuSub collapsible trigger={<SidebarMenuButton>Products</SidebarMenuButton>}>
 *   <SidebarMenuSubItem>
 *     <SidebarMenuSubButton>Category A</SidebarMenuSubButton>
 *   </SidebarMenuSubItem>
 * </SidebarMenuSub>
 */
function SidebarMenuSub({
  className,
  children,
  icon,
  label,
  collapsible = false,
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<"ul"> & {
  /** Icon for the trigger in icon-mode / icon 折叠模式 trigger 图标 */
  icon?: React.ReactNode;
  /** Label for the trigger in icon-mode / icon 折叠模式 trigger 文案 */
  label?: React.ReactNode;
  /**
   * Enable collapsible sub-menu (expanded mode only).
   * 开启后子 <ul> 包一层 Collapsible，trigger 由 `trigger` prop 提供。
   */
  collapsible?: boolean;
  /** Trigger content (usually a <SidebarMenuButton>). / trigger 内容 */
  trigger?: React.ReactNode;
  /** Controlled open state / 受控展开状态 */
  open?: boolean;
  /** Uncontrolled default open / 非受控默认展开 */
  defaultOpen?: boolean;
  /** Open change callback / 展开状态变更回调 */
  onOpenChange?: (open: boolean) => void;
}) {
  const { state } = useSidebar();

  // In icon-collapsed mode, render sub-items inside a DropdownMenu
  // instead of hiding them entirely
  if (state === "collapsed") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuSubButton size="md" isActive={false}>
              {icon ?? <span className="size-4" />}
              {label && <span>{label}</span>}
            </SidebarMenuSubButton>
          }
        />
        <DropdownMenuContent side="right" align="start" className="min-w-48">
          {React.Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              child.type === SidebarMenuSubItem
            ) {
              return (
                <DropdownMenuItem className="cursor-pointer">
                  {child}
                </DropdownMenuItem>
              );
            }
            return child;
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Collapsible sub-menu: wrap trigger + <ul> in a Collapsible.
  // 手风琴（多组互斥）由消费方在 SidebarMenu 层维护 openKeys，组件不内置。
  if (collapsible) {
    return (
      <Collapsible
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        className="group/menu-sub-collapsible"
      >
        <CollapsibleTrigger
          render={<SidebarMenuButton className="w-full justify-between" />}
        >
          {trigger ?? (
            <>
              {icon ?? <span className="size-4" />}
              {label && <span>{label}</span>}
            </>
          )}
          <ChevronRightIcon className="ml-auto size-4 transition-transform duration-200 group-data-[panel-open]/menu-sub-collapsible:rotate-90" />
        </CollapsibleTrigger>
        <CollapsibleContent keepMounted={false}>
          <ul
            data-slot="sidebar-menu-sub"
            data-sidebar="menu-sub"
            className={cn(
              "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
              className,
            )}
            {...props}
          >
            {children}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

/**
 * @component SidebarMenuSubItem
 * @category ui/navigation
 * @since 0.2.0
 * @description Individual list item within a sidebar sub-menu / 侧边栏子菜单中的单个列表项
 * @keywords sidebar, sub-menu, item, 侧边栏子菜单项
 * @example
 * <SidebarMenuSubItem>
 *   <SidebarMenuSubButton>Item</SidebarMenuSubButton>
 * </SidebarMenuSubItem>
 */
function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

const sidebarMenuSubButtonVariants = cva(
  "flex min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
  {
    variants: {
      size: {
        sm: "h-6 text-xs gap-1 px-1.5",
        md: "h-8 text-sm",
        lg: "h-10 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * @component SidebarMenuSubButton
 * @category ui/navigation
 * @since 0.2.0
 * @description Interactive link/button for a sidebar sub-menu item / 侧边栏子菜单项的可交互链接/按钮
 * @keywords sidebar, sub-menu, button, link, 侧边栏子菜单按钮
 * @example
 * <SidebarMenuSubButton href="/products/category-a">
 *   <span>Category A</span>
 * </SidebarMenuSubButton>
 */
function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<"a"> &
  React.ComponentProps<"a"> & {
    size?: "sm" | "md" | "lg";
    isActive?: boolean;
  } & VariantProps<typeof sidebarMenuSubButtonVariants>) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(sidebarMenuSubButtonVariants({ size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  });
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  sidebarMenuSubButtonVariants,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
