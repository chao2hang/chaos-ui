"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  Button,
  Card,
  CardContent,
  Input,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@chaos_team/chaos-ui/ui";
import { PlusIcon, SearchIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component TabCrudPage
 * @category Business
 * @since 1.0.0-beta.0
 * @description 标签页切换 CRUD 页面布局。顶部工具栏 + 选项卡分组，每个选项卡承载一组 CRUD 列表/表单。
 * @param tabs 选项卡定义（id / label），至少一项
 * @param active 当前激活选项卡 id（受控）
 * @param defaultActive 默认激活选项卡 id（非受控）
 * @param onTabChange 切换选项卡回调，携带 id
 * @param onCreate 点击“新建”回调
 * @param query 搜索关键字（受控）
 * @param onQueryChange 搜索关键字变化回调
 * @param children 由调用方按选项卡渲染的 CRUD 内容
 * @example
 * ```tsx
 * <TabCrudPage
 *   tabs={[{ id: "all", label: "全部" }, { id: "draft", label: "草稿" }]}
 *   defaultActive="all"
 * >
 *   <TabsContent value="all">列表内容</TabsContent>
 * </TabCrudPage>
 * ```
 * 标签页切换 CRUD
 */

export interface TabCrudPageProps {
  /** 选项卡定义列表 */
  tabs?: Array<{ id: string; label: string }>;
  /** 当前激活选项卡 id（受控） */
  active?: string;
  /** 默认激活选项卡 id（非受控） */
  defaultActive?: string;
  /** 切换选项卡回调 */
  onTabChange?: (id: string) => void;
  /** 点击“新建”回调；不传则隐藏按钮 */
  onCreate?: () => void;
  /** 搜索关键字（受控） */
  query?: string;
  /** 搜索关键字变化回调 */
  onQueryChange?: (value: string) => void;
  /** 由调用方按选项卡渲染的内容 */
  children?: React.ReactNode;
  className?: string;
}

function TabCrudPage({
  tabs = [{ id: "all", label: "全部" }],
  active,
  defaultActive,
  onTabChange,
  onCreate,
  query,
  onQueryChange,
  children,
  className,
}: TabCrudPageProps) {
  const isControlled = active !== undefined;
  const [internalActive, setInternalActive] = React.useState(
    defaultActive ?? tabs[0]?.id ?? "all",
  );
  const currentActive = isControlled ? (active as string) : internalActive;

  const [internalQuery, setInternalQuery] = React.useState("");
  const currentQuery = query !== undefined ? query : internalQuery;

  const handleTabChange = (id: string) => {
    if (!isControlled) setInternalActive(id);
    onTabChange?.(id);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (query === undefined) setInternalQuery(value);
    onQueryChange?.(value);
  };

  return (
    <div data-slot="tab-crud-page" className={cn("flex flex-col gap-3", className)}>
      <Card>
        <CardContent className="flex flex-wrap items-center gap-2 p-3">
          <div className="relative min-w-[12rem] flex-1">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={currentQuery}
              onChange={handleQueryChange}
              placeholder="搜索..."
              aria-label="搜索"
              className="pl-8"
            />
          </div>
          {onCreate && (
            <Button type="button" onClick={onCreate} aria-label="新建">
              <PlusIcon /> 新建
            </Button>
          )}
        </CardContent>
      </Card>

      <Tabs
        value={currentActive}
        onValueChange={(v) => handleTabChange(String(v))}
        className="gap-3"
      >
        <TabsList aria-label="CRUD 分组">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Separator />
        <div className="min-h-0 flex-1">{children}</div>
      </Tabs>
    </div>
  );
}

export { TabCrudPage };
