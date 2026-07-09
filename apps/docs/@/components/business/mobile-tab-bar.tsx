"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";

/**
 * @component MobileTabBar
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端底部标签栏 — 等宽分布的导航项，支持图标 + 文字。
 * @keywords mobile, tab, bar
 * @param tabs 标签项集合；每项含 id、label 与可选图标。
 * @param activeId 当前激活项 id；未提供时默认激活第一项。
 * @param onSelect 切换标签回调，参数为目标 id。
 * @example
 * <MobileTabBar tabs={[{id:"home",label:"首页"},{id:"me",label:"我的"}]} activeId="home" onSelect={setTab} />
 */

interface MobileTabBarProps {
  tabs: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

function MobileTabBar({
  tabs = [],
  activeId,
  onSelect,
  className,
}: MobileTabBarProps) {
  const active = activeId ?? tabs[0]?.id;
  const tablistId = React.useId();

  return (
    <nav
      data-slot="mobile-tab-bar"
      aria-label="主导航"
      className={cn(
        "bg-background grid h-14 shrink-0 auto-cols-fr grid-flow-col border-t",
        className,
      )}
    >
      <ul
        role="tablist"
        aria-orientation="horizontal"
        className="contents"
        id={tablistId}
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          const buttonId = `${tablistId}-tab-${tab.id}`;
          const panelId = `${tablistId}-panel-${tab.id}`;
          return (
            <li key={tab.id} role="none" className="min-w-0">
              <button
                type="button"
                role="tab"
                id={buttonId}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => onSelect?.(tab.id)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    const delta = event.key === "ArrowRight" ? 1 : -1;
                    const idx = tabs.findIndex((t) => t.id === active);
                    const next =
                      tabs[(idx + delta + tabs.length) % tabs.length];
                    if (next) onSelect?.(next.id);
                  }
                }}
                className={cn(
                  "flex h-full w-full flex-col items-center justify-center gap-0.5 text-[0.7rem] transition-colors",
                  selected
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.icon ? (
                  <span className="[&>svg]:size-5" aria-hidden="true">
                    {tab.icon}
                  </span>
                ) : null}
                <span className="truncate leading-none">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { MobileTabBar };
export type { MobileTabBarProps };
