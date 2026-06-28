import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @component MasterDetailLayout
 * @category layout
 * @since 0.5.0
 * @description 主从两栏布局 (master-detail)，左侧固定宽度侧边栏 + 右侧自适应主区域。
 * 移动端自动堆叠为上下布局。
 * / Master-detail two-column layout with fixed sidebar and fluid main area.
 * @keywords layout, master-detail, sidebar, two-column
 * @example
 * <MasterDetailLayout
 *   sidebar={<TreeView />}
 *   main={<SearchTable />}
 *   sidebarWidth={320}
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
  ...props
}: MasterDetailLayoutProps) {
  return (
    <div
      data-slot="master-detail-layout"
      className={cn("flex flex-col md:flex-row", gapMap[gap], className)}
      {...props}
    >
      <aside
        className="w-full shrink-0 md:overflow-y-auto md:border-r"
        style={{ maxWidth: sidebarWidth }}
      >
        <div style={{ width: "100%", maxWidth: sidebarWidth }}>{sidebar}</div>
      </aside>
      <div className="min-w-0 flex-1">{main}</div>
    </div>
  )
}

export { MasterDetailLayout }
export type { MasterDetailLayoutProps }
