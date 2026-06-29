"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MenuIcon } from "@/components/ui/icons"

/**
 * @component MasterDetailLayout
 * @category layout
 * @since 0.5.0
 * @description 主从两栏布局 (master-detail)，左侧固定宽度侧边栏 + 右侧自适应主区域。
 *
 * 宽屏并排；窄屏默认堆叠为上下，开启 `collapsible` 后窄屏把 master 折叠成
 * 左侧抽屉（overlay + 遮罩），对齐 Sidebar 的 collapsible 行为。
 * / Master-detail two-column layout; mobile master collapses to a drawer.
 * @keywords layout, master-detail, sidebar, two-column, responsive, drawer
 * @example
 * <MasterDetailLayout
 *   sidebar={<TreeView />}
 *   main={<SearchTable />}
 *   sidebarWidth={320}
 *   collapsible
 * />
 */

interface MasterDetailLayoutProps extends React.ComponentProps<"div"> {
  /** Sidebar content / 侧边栏内容 */
  sidebar: React.ReactNode
  /** Main area content / 主区域内容 */
  main: React.ReactNode
  /** Sidebar width in px / 侧边栏宽度 */
  sidebarWidth?: number
  /** Gap between sidebar and main / 间距 */
  gap?: "sm" | "md" | "lg"
  /**
   * Collapse master into a drawer on narrow screens.
   * / 窄屏将 master 折叠为抽屉
   */
  collapsible?: boolean
  /** Controlled master drawer open state (mobile) / 受控抽屉展开 */
  masterOpen?: boolean
  /** Uncontrolled default open / 非受控默认展开 */
  defaultMasterOpen?: boolean
  /** Master open change callback / 展开状态变更回调 */
  onMasterOpenChange?: (open: boolean) => void
  /** Custom toggle button (defaults to a hamburger Menu button) / 自定义切换按钮 */
  masterToggle?: React.ReactNode
}

const gapMap = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
}

function MasterDetailLayout({
  className,
  sidebar,
  main,
  sidebarWidth = 300,
  gap = "md",
  collapsible = false,
  masterOpen,
  defaultMasterOpen = false,
  onMasterOpenChange,
  masterToggle,
  ...props
}: MasterDetailLayoutProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultMasterOpen)
  const isControlled = masterOpen !== undefined
  const open = isControlled ? masterOpen : internalOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onMasterOpenChange?.(next)
    },
    [isControlled, onMasterOpenChange],
  )

  const sidebarStyle = { maxWidth: sidebarWidth } as React.CSSProperties
  const sidebarInnerStyle = { width: "100%", maxWidth: sidebarWidth } as React.CSSProperties

  // Non-collapsible: original behavior (stack on mobile, row on desktop).
  if (!collapsible) {
    return (
      <div
        data-slot="master-detail-layout"
        className={cn("flex flex-col md:flex-row", gapMap[gap], className)}
        {...props}
      >
        <aside
          className="w-full shrink-0 md:overflow-y-auto md:border-r"
          style={sidebarStyle}
        >
          <div style={sidebarInnerStyle}>{sidebar}</div>
        </aside>
        <div className="min-w-0 flex-1">{main}</div>
      </div>
    )
  }

  // Collapsible: desktop row; mobile drawer (overlay + backdrop).
  const toggle = masterToggle ?? (
    <button
      type="button"
      aria-label="Toggle master"
      onClick={() => setOpen(!open)}
      className="inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground hover:bg-muted md:hidden"
    >
      <MenuIcon className="size-4" />
    </button>
  )

  return (
    <div
      data-slot="master-detail-layout"
      className={cn("flex flex-col md:flex-row", gapMap[gap], className)}
      {...props}
    >
      {/* Mobile toggle (hidden on desktop where master is always visible) */}
      <div className="md:hidden">{toggle}</div>

      {/* Master: desktop static aside + mobile drawer overlay */}
      <aside
        style={sidebarStyle}
        className={cn(
          // desktop: static column
          "shrink-0 md:overflow-y-auto md:border-r md:w-auto md:static md:translate-x-0 md:bg-transparent md:p-0",
          // mobile: fixed drawer
          "fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] border-r bg-background p-3 shadow-lg transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
          "md:!translate-x-0",
        )}
      >
        <div style={sidebarInnerStyle}>{sidebar}</div>
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

      <div className="min-w-0 flex-1">{main}</div>
    </div>
  )
}

export { MasterDetailLayout }
export type { MasterDetailLayoutProps }
