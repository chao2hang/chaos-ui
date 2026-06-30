"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Separator } from "@/components/ui";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  FolderIcon,
  FolderOpenIcon,
  FileIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/icons";

/**
 * @component TreeCrudPage
 * @category Business
 * @since 1.0.0-beta.0
 * @description 左树右表 CRUD 布局。左侧分类树（可展开 / 选中 / 搜索），右侧承载对应分类的 CRUD 详情。
 * @param tree 左侧树数据；每项含 id / label / 可选 children
 * @param selected 当前选中节点 id（受控）
 * @param defaultSelected 默认选中节点 id（非受控）
 * @param onSelect 选中节点回调，携带节点 id
 * @param onCreate 点击“新增分类”回调；不传则隐藏按钮
 * @param onRefresh 点击“刷新”回调；不传则隐藏按钮
 * @param query 搜索关键字（受控）
 * @param onQueryChange 搜索关键字变化回调
 * @param children 由调用方按选中节点渲染的 CRUD 详情
 * @example
 * ```tsx
 * <TreeCrudPage
 *   tree={[{ id: "g1", label: "饮料", children: [{ id: "c1", label: "碳酸饮料" }] }]}
 *   defaultSelected="c1"
 * >
 *   详情内容
 * </TreeCrudPage>
 * ```
 * 左树右表 CRUD
 */

export interface TreeNodeData {
  id: string;
  label: string;
  children?: TreeNodeData[];
}

export interface TreeCrudPageProps {
  /** 左侧分类树 */
  tree?: TreeNodeData[];
  /** 当前选中节点 id（受控） */
  selected?: string;
  /** 默认选中节点 id（非受控） */
  defaultSelected?: string;
  /** 选中节点回调 */
  onSelect?: (id: string) => void;
  /** 点击“新增分类”回调；不传则隐藏按钮 */
  onCreate?: () => void;
  /** 点击“刷新”回调；不传则隐藏按钮 */
  onRefresh?: () => void;
  /** 搜索关键字（受控） */
  query?: string;
  /** 搜索关键字变化回调 */
  onQueryChange?: (value: string) => void;
  /** 由调用方按选中节点渲染的 CRUD 详情 */
  children?: React.ReactNode;
  className?: string;
}

function flatten(nodes: TreeNodeData[]): TreeNodeData[] {
  const out: TreeNodeData[] = [];
  const walk = (list: TreeNodeData[]) => {
    for (const n of list) {
      out.push(n);
      if (n.children?.length) walk(n.children);
    }
  };
  walk(nodes);
  return out;
}

function filterTree(nodes: TreeNodeData[], q: string): TreeNodeData[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return nodes;
  const walk = (list: TreeNodeData[]): TreeNodeData[] => {
    const out: TreeNodeData[] = [];
    for (const n of list) {
      const kids = n.children?.length ? walk(n.children) : [];
      if (n.label.toLowerCase().includes(needle) || kids.length > 0) {
        const next: TreeNodeData = { ...n };
        if (kids.length > 0) {
          next.children = kids;
        } else if (n.children) {
          next.children = n.children;
        }
        out.push(next);
      }
    }
    return out;
  };
  return walk(nodes);
}

function TreeRow({
  node,
  level,
  selectedId,
  expandedIds,
  onToggle,
  onSelect,
}: {
  node: TreeNodeData;
  level: number;
  selectedId: string | null;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const hasChildren = !!node.children?.length;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(node.id);
    } else if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
      e.preventDefault();
      onToggle(node.id);
    } else if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
      e.preventDefault();
      onToggle(node.id);
    }
  };

  return (
    <li role="none">
      <div
        role="treeitem"
        tabIndex={0}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-level={level + 1}
        onKeyDown={handleRowKeyDown}
        onClick={() => onSelect(node.id)}
        className={cn(
          "flex cursor-pointer items-center gap-1 rounded-md py-1.5 pr-2 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
          isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted",
        )}
        style={{ paddingLeft: `${level * 16 + 4}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            aria-label={isExpanded ? `收起 ${node.label}` : `展开 ${node.label}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className="inline-flex size-4 shrink-0 items-center justify-center rounded outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {isExpanded ? (
              <ChevronDownIcon className="size-3.5" />
            ) : (
              <ChevronRightIcon className="size-3.5" />
            )}
          </button>
        ) : (
          <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden="true" />
        )}
        <span className="shrink-0 text-muted-foreground" aria-hidden="true">
          {hasChildren ? (
            isExpanded ? (
              <FolderOpenIcon className="size-4" />
            ) : (
              <FolderIcon className="size-4" />
            )
          ) : (
            <FileIcon className="size-4" />
          )}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <ul role="group" className="m-0 list-none p-0">
          {node.children!.map((child) => (
            <TreeRow
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function TreeCrudPage({
  tree = [],
  selected,
  defaultSelected,
  onSelect,
  onCreate,
  onRefresh,
  query,
  onQueryChange,
  children,
  className,
}: TreeCrudPageProps) {
  const isControlledSelected = selected !== undefined;
  const [internalSelected, setInternalSelected] = React.useState<string | null>(
    defaultSelected ?? null,
  );
  const selectedId = isControlledSelected ? (selected as string | null) : internalSelected;

  const [internalQuery, setInternalQuery] = React.useState("");
  const currentQuery = query !== undefined ? query : internalQuery;

  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(() => {
    // auto-expand top-level groups so children are visible
    const out = new Set<string>();
    for (const n of tree) if (n.children?.length) out.add(n.id);
    return out;
  });

  const filtered = React.useMemo(() => filterTree(tree, currentQuery), [tree, currentQuery]);
  const flat = React.useMemo(() => flatten(filtered), [filtered]);

  // When searching, expand all matches so they remain visible
  const effectiveExpanded = currentQuery.trim()
    ? new Set(flat.map((n) => n.id))
    : expandedIds;

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelect = (id: string) => {
    if (!isControlledSelected) setInternalSelected(id);
    onSelect?.(id);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (query === undefined) setInternalQuery(value);
    onQueryChange?.(value);
  };

  const selectedNode = flat.find((n) => n.id === selectedId) ?? null;

  return (
    <div
      data-slot="tree-crud-page"
      className={cn("flex h-full min-h-0 gap-3", className)}
      role="group"
      aria-label="左树右表 CRUD"
    >
      <aside
        className="flex w-64 shrink-0 flex-col gap-2 rounded-lg border bg-card p-2"
        aria-label="分类树"
      >
        <div className="flex items-center gap-1">
          {onCreate && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCreate}
              aria-label="新增分类"
            >
              <PlusIcon /> 新增分类
            </Button>
          )}
          {onRefresh && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onRefresh}
              aria-label="刷新"
            >
              <RefreshCwIcon />
            </Button>
          )}
        </div>

        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={currentQuery}
            onChange={handleQueryChange}
            placeholder="搜索分类"
            aria-label="搜索分类"
            className="pl-8 pr-8"
          />
          {currentQuery && (
            <button
              type="button"
              aria-label="清除搜索"
              onClick={() => {
                if (query === undefined) setInternalQuery("");
                onQueryChange?.("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>

        <Separator />

        <div className="min-h-0 flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">暂无分类</p>
          ) : (
            <ul role="tree" aria-label="分类" className="m-0 list-none p-0">
              {filtered.map((node) => (
                <TreeRow
                  key={node.id}
                  node={node}
                  level={0}
                  selectedId={selectedId}
                  expandedIds={effectiveExpanded}
                  onToggle={handleToggle}
                  onSelect={handleSelect}
                />
              ))}
            </ul>
          )}
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col gap-2" aria-label="CRUD 详情">
        <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-2">
          <span className="truncate text-sm font-medium">
            {selectedNode ? selectedNode.label : "未选择分类"}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            共 {flat.length} 项
          </span>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </section>
    </div>
  );
}

export { TreeCrudPage };
