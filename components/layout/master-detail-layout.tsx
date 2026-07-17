"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FilterIcon } from "@/components/ui/icons";

/**
 * @component MasterDetailLayout
 * @category layout
 * @since 0.5.0
 * @description 主从两栏布局 (master-detail)，左侧固定宽度侧边栏 + 右侧自适应主区域。
 *
 * 宽屏并排；窄屏默认堆叠为上下，开启 `collapsible` 或 `responsive` 后窄屏把
 * master 折叠成左侧抽屉（overlay + 遮罩），对齐 Sidebar 的 collapsible 行为。
 * `responsive` 是 `collapsible` 的语义化别名，默认为 `true`（移动端自动折叠）。
 *
 * FE-10 (#60/#61): slot `sidebar`/`main` may render `Card className="h-full"` —
 * the inner wrappers propagate the row stretch so the two Cards equalize height.
 * When slots are Cards, pass `chromeBorder={false}` so the Card border is the
 * only divider (avoids a double right border on the aside). The mobile toggle
 * defaults to a Filter glyph (not a hamburger) to avoid colliding with the
 * AdminShell mobile menu button.
 * / Master-detail two-column layout; mobile master collapses to a drawer.
 * @keywords layout, master-detail, sidebar, two-column, responsive, drawer
 * @example
 * <MasterDetailLayout
 *   sidebar={<TreeView />}
 *   main={<SearchTable />}
 *   sidebarWidth={320}
 *   responsive  // 移动端自动折叠为 Drawer
 * />
 */

interface MasterDetailLayoutProps extends React.ComponentProps<"div"> {
  /** Sidebar content / 侧边栏内容 */
  sidebar: React.ReactNode;
  /** Main area content / 主区域内容 */
  main: React.ReactNode;
  /**
   * Desktop master column target width in px (issue #53).
   * Applied as fixed `width` + `maxWidth` on open desktop; not a soft max only.
   * When `resizable` is enabled this becomes the **initial / reset** width.
   * / 桌面 master 目标固定宽（非仅 maxWidth）；resizable 时为初始/重置宽
   */
  sidebarWidth?: number;
  /**
   * Enable desktop drag-to-resize for the master sidebar (#67).
   * Renders a 4px handle on the aside right edge (md+ only). Double-click
   * resets to `sidebarWidth`. Mobile never shows the handle.
   * / 桌面侧栏可拖拽改宽（仅 md+）；双击重置
   */
  resizable?: boolean;
  /** Minimum sidebar width when dragging (default 200). / 拖拽最小宽 */
  minSidebarWidth?: number;
  /** Maximum sidebar width when dragging (default 600). / 拖拽最大宽 */
  maxSidebarWidth?: number;
  /** Gap between sidebar and main / 间距 */
  gap?: "sm" | "md" | "lg";
  /**
   * Collapse master into a drawer on narrow screens.
   * / 窄屏将 master 折叠为抽屉
   */
  collapsible?: boolean;
  /**
   * Responsive alias for `collapsible`. When `true` (default), the sidebar
   * automatically collapses to a Drawer on mobile. Set `false` to keep the
   * sidebar always visible (stacks on mobile instead).
   * / 响应式折叠：true=移动端自动折叠为 Drawer（默认），false=始终可见
   */
  responsive?: boolean;
  /** Controlled master drawer open state (mobile) / 受控抽屉展开 */
  masterOpen?: boolean;
  /** Uncontrolled default open / 非受控默认展开 */
  defaultMasterOpen?: boolean;
  /** Master open change callback / 展开状态变更回调 */
  onMasterOpenChange?: (open: boolean) => void;
  /** Custom toggle button (defaults to a hamburger Menu button) / 自定义切换按钮 */
  masterToggle?: React.ReactNode;
  /**
   * Also collapse master on desktop (not just mobile). / 桌面端也支持折叠 master
   */
  collapsibleDesktop?: boolean;
  /**
   * Render the aside right border (`md:border-r`) on desktop. Default `true`.
   * Set `false` when `sidebar`/`main` slots render their own `Card` (FE-10 §3 #60):
   * the Card border owns the divider, so the aside border would double up.
   * / 桌面侧栏右边框；子节点为 Card 时传 false 避免双竖线
   */
  chromeBorder?: boolean;
}

const gapMap = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

function MasterDetailLayout({
  className,
  sidebar,
  main,
  sidebarWidth = 300,
  resizable = false,
  minSidebarWidth = 200,
  maxSidebarWidth = 600,
  gap = "md",
  collapsible,
  responsive = true,
  masterOpen,
  defaultMasterOpen = false,
  onMasterOpenChange,
  masterToggle,
  collapsibleDesktop = false,
  chromeBorder = true,
  ...props
}: MasterDetailLayoutProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultMasterOpen);
  const isControlled = masterOpen !== undefined;
  const open = isControlled ? masterOpen : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onMasterOpenChange?.(next);
    },
    [isControlled, onMasterOpenChange],
  );

  // Resizable sidebar width (#67): starts from sidebarWidth; drag handle adjusts.
  const [resizeW, setResizeW] = React.useState(sidebarWidth);
  const onHandlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX;
      const startW = resizeW;
      const move = (ev: PointerEvent) => {
        const delta = ev.clientX - startX;
        const next = Math.min(
          Math.max(startW + delta, minSidebarWidth),
          maxSidebarWidth,
        );
        setResizeW(next);
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
    },
    [resizeW, minSidebarWidth, maxSidebarWidth],
  );

  const resizeHandle = resizable ? (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
      onPointerDown={onHandlePointerDown}
      onDoubleClick={() => setResizeW(sidebarWidth)}
      className="hover:bg-primary/30 absolute top-0 right-0 bottom-0 z-20 hidden w-1 cursor-col-resize bg-transparent transition-colors md:block"
    />
  ) : null;

  // Desktop master is a fixed target width (issue #53): content must not drive
  // aside width. Mobile drawer keeps 85vw; md+ uses CSS var from sidebarWidth.
  const effectiveWidth = resizable ? resizeW : sidebarWidth;
  const sidebarStyle = {
    ["--master-sidebar-width" as string]: `${effectiveWidth}px`,
  } as React.CSSProperties;
  const sidebarInnerStyle = {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
  } as React.CSSProperties;
  const desktopFixedWidthClass =
    "md:w-(--master-sidebar-width) md:max-w-(--master-sidebar-width)";

  // Explicit `collapsible` wins; otherwise fall back to `responsive` (default true).
  const shouldCollapse = collapsible !== undefined ? collapsible : responsive;
  if (!shouldCollapse) {
    return (
      <div
        data-slot="master-detail-layout"
        className={cn("flex flex-col md:flex-row", gapMap[gap], className)}
        {...props}
      >
        <aside
          className={cn(
            "relative w-full shrink-0 overflow-x-hidden md:overflow-y-auto",
            chromeBorder !== false && "md:border-r",
            desktopFixedWidthClass,
          )}
          style={sidebarStyle}
        >
          {/* #59/#60 M1: inner wrapper propagates row stretch so slot Card h-full resolves */}
          <div className="h-full min-h-0" style={sidebarInnerStyle}>
            {sidebar}
          </div>
          {resizeHandle}
        </aside>
        <div className="h-full min-h-0 min-w-0 flex-1">{main}</div>
      </div>
    );
  }

  // Collapsible: desktop row; mobile drawer (overlay + backdrop).
  // #61: default toggle uses a Filter glyph (not a hamburger) so it does not
  // collide with the AdminShell mobile menu button. aria-label is unchanged.
  const toggle = masterToggle ?? (
    <button
      type="button"
      aria-label="Toggle master"
      onClick={() => setOpen(!open)}
      className={cn(
        "bg-background text-foreground hover:bg-muted inline-flex size-9 items-center justify-center rounded-md border",
        collapsibleDesktop ? "" : "md:hidden",
      )}
    >
      <FilterIcon className="size-4" />
    </button>
  );

  return (
    <div
      data-slot="master-detail-layout"
      className={cn("flex flex-col md:flex-row", gapMap[gap], className)}
      {...props}
    >
      {/* Toggle: always visible on mobile; on desktop only when collapsibleDesktop */}
      <div className={collapsibleDesktop ? "" : "md:hidden"}>{toggle}</div>

      {/* Master: desktop static aside + mobile drawer overlay */}
      <aside
        style={sidebarStyle}
        className={cn(
          // desktop: fixed-width column (issue #53); collapses to 0 when collapsibleDesktop + closed
          "relative shrink-0 overflow-x-hidden md:static md:overflow-y-auto md:bg-transparent md:p-0 md:transition-all md:duration-200",
          chromeBorder !== false && "md:border-r",
          collapsibleDesktop
            ? open
              ? cn(desktopFixedWidthClass, "md:translate-x-0 md:opacity-100")
              : "md:!w-0 md:!max-w-0 md:overflow-hidden md:border-r-0 md:opacity-0"
            : cn(desktopFixedWidthClass, "md:translate-x-0"),
          // mobile: fixed drawer; md+ uses --master-sidebar-width
          "bg-background fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] border-r p-3 shadow-lg transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* #59/#60 M1: height chain for slot Card h-full */}
        <div className="h-full min-h-0" style={sidebarInnerStyle}>
          {sidebar}
        </div>
        {resizeHandle}
      </aside>

      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close master"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <div className="h-full min-h-0 min-w-0 flex-1">{main}</div>
    </div>
  );
}

export { MasterDetailLayout };
export type { MasterDetailLayoutProps };
