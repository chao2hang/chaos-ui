"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Button,
  Input,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/icons";

/**
 * Tree node for OrgAdminPage (issue #49).
 * Extends simple id/label trees with org chrome (badges, count, readOnly).
 */
export interface OrgAdminTreeNode {
  id: string;
  label: string;
  children?: OrgAdminTreeNode[];
  /** Optional badges after the label (OA bound, etc.) */
  badges?: React.ReactNode;
  /** Optional headcount / member count shown muted */
  count?: number;
  /** Node is view-only in the business sense (still selectable) */
  readOnly?: boolean;
  disabled?: boolean;
}

export interface OrgAdminTab {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface OrgAdminPageProps {
  treeData?: OrgAdminTreeNode[];
  selectedId?: string;
  defaultSelectedId?: string;
  onSelect?: (id: string | undefined, node?: OrgAdminTreeNode) => void;

  /** Top filter slot (e.g. company Select) */
  filterSlot?: React.ReactNode;
  /** Extra header actions (sync OA, …) */
  headerActions?: React.ReactNode;
  onRefresh?: () => void;
  onCreate?: () => void;

  treeSearchPlaceholder?: string;
  emptyTree?: React.ReactNode;
  emptySelection?: React.ReactNode;

  /** Right-top summary for the selected node */
  summary?: React.ReactNode;
  /** Right-bottom tabs; when empty, `children` is used as main body */
  tabs?: OrgAdminTab[];
  children?: React.ReactNode;

  defaultTabKey?: string;
  tabKey?: string;
  onTabChange?: (key: string) => void;

  sidebarWidth?: number;
  treeLoading?: boolean;
  className?: string;
}

function flattenOrg(nodes: OrgAdminTreeNode[]): OrgAdminTreeNode[] {
  const out: OrgAdminTreeNode[] = [];
  const walk = (list: OrgAdminTreeNode[]) => {
    for (const n of list) {
      out.push(n);
      if (n.children?.length) walk(n.children);
    }
  };
  walk(nodes);
  return out;
}

function filterOrgTree(
  nodes: OrgAdminTreeNode[],
  q: string,
): OrgAdminTreeNode[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return nodes;
  const walk = (list: OrgAdminTreeNode[]): OrgAdminTreeNode[] => {
    const out: OrgAdminTreeNode[] = [];
    for (const n of list) {
      const kids = n.children?.length ? walk(n.children) : [];
      if (n.label.toLowerCase().includes(needle) || kids.length > 0) {
        const next: OrgAdminTreeNode = { ...n };
        if (kids.length > 0) next.children = kids;
        out.push(next);
      }
    }
    return out;
  };
  return walk(nodes);
}

function OrgTreeRow({
  node,
  level,
  selectedId,
  expandedIds,
  onToggle,
  onSelect,
}: {
  node: OrgAdminTreeNode;
  level: number;
  selectedId: string | undefined;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const hasChildren = !!node.children?.length;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const isDisabled = !!node.disabled;

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        data-slot="org-admin-tree-item"
        data-selected={isSelected ? "true" : undefined}
        data-readonly={node.readOnly ? "true" : undefined}
        className={cn(
          "hover:bg-muted flex cursor-pointer items-center gap-1 rounded-md px-2 py-1.5 text-sm transition-colors",
          isSelected && "bg-muted font-medium",
          isDisabled && "pointer-events-none opacity-50",
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => !isDisabled && onSelect(node.id)}
        onKeyDown={(e) => {
          if (isDisabled) return;
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
        }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="text-muted-foreground hover:bg-background inline-flex size-5 shrink-0 items-center justify-center rounded text-xs"
            aria-label={isExpanded ? "Collapse" : "Expand"}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        ) : (
          <span className="inline-flex size-5 shrink-0" />
        )}
        <span className="min-w-0 flex-1 truncate">{node.label}</span>
        {typeof node.count === "number" && (
          <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
            {node.count}
          </span>
        )}
        {node.badges ? (
          <span className="flex shrink-0 items-center gap-1">
            {node.badges}
          </span>
        ) : null}
        {node.readOnly ? (
          <span className="text-muted-foreground shrink-0 text-[10px]">
            只读
          </span>
        ) : null}
      </div>
      {hasChildren && isExpanded && (
        <ul role="group" className="m-0 list-none p-0">
          {node.children!.map((child) => (
            <OrgTreeRow
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

/**
 * @component OrgAdminPage
 * @category business/org
 * @since 1.8.0
 * @description Organization admin workbench: left org tree + right summary/tabs.
 * For category CRUD use TreeCrudPage; for huge lazy geo trees use TreeTable + onExpandRow.
 * / 组织管理台：左树 + 右摘要/Tabs。分类 CRUD 用 TreeCrudPage；超大字典懒加载表用 TreeTable。
 * @keywords org, department, tree, workbench, admin, hr
 * @example
 * <OrgAdminPage
 *   treeData={depts}
 *   selectedId={id}
 *   onSelect={setId}
 *   summary={<DeptSummary id={id} />}
 *   tabs={[{ key: "members", label: "成员", children: <Members /> }]}
 * />
 */
function OrgAdminPage({
  treeData = [],
  selectedId: controlledSelectedId,
  defaultSelectedId,
  onSelect,
  filterSlot,
  headerActions,
  onRefresh,
  onCreate,
  treeSearchPlaceholder = "搜索部门",
  emptyTree = "暂无部门",
  emptySelection = "请选择左侧部门",
  summary,
  tabs,
  children,
  defaultTabKey,
  tabKey: controlledTabKey,
  onTabChange,
  sidebarWidth = 280,
  treeLoading = false,
  className,
}: OrgAdminPageProps) {
  const isControlledSelected = controlledSelectedId !== undefined;
  const [internalSelected, setInternalSelected] = React.useState<
    string | undefined
  >(defaultSelectedId);
  const selectedId = isControlledSelected
    ? controlledSelectedId
    : internalSelected;

  const [query, setQuery] = React.useState("");
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(() => {
    const out = new Set<string>();
    for (const n of treeData) if (n.children?.length) out.add(n.id);
    return out;
  });

  const filtered = React.useMemo(
    () => filterOrgTree(treeData, query),
    [treeData, query],
  );
  const flat = React.useMemo(() => flattenOrg(filtered), [filtered]);
  const selectedNode = flat.find((n) => n.id === selectedId);

  const effectiveExpanded = query.trim()
    ? new Set(flat.map((n) => n.id))
    : expandedIds;

  const firstTabKey = tabs?.[0]?.key;
  const defaultTab = defaultTabKey ?? firstTabKey;
  const [internalTab, setInternalTab] = React.useState(defaultTab);
  const activeTab = controlledTabKey ?? internalTab ?? defaultTab;

  const handleSelect = (id: string) => {
    if (!isControlledSelected) setInternalSelected(id);
    const node = flat.find((n) => n.id === id);
    onSelect?.(id, node);
  };

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      data-slot="org-admin-page"
      className={cn("flex h-full min-h-0 flex-col gap-3", className)}
      role="group"
      aria-label="组织管理台"
    >
      {/* Top bar */}
      <div
        data-slot="org-admin-header"
        className="flex flex-wrap items-center gap-2"
      >
        {filterSlot}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {headerActions}
          {onRefresh && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRefresh}
              aria-label="刷新"
            >
              <RefreshCwIcon className="size-3.5" />
              刷新
            </Button>
          )}
          {onCreate && (
            <Button type="button" size="sm" onClick={onCreate}>
              <PlusIcon className="size-3.5" />
              新增
            </Button>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        {/* Left tree */}
        <aside
          data-slot="org-admin-sidebar"
          className="border-border bg-card flex shrink-0 flex-col gap-2 rounded-lg border p-2"
          style={{ width: sidebarWidth }}
          aria-label="组织树"
        >
          <div className="relative">
            <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              size="sm"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={treeSearchPlaceholder}
              aria-label={treeSearchPlaceholder}
              className="pr-8 pl-8"
            />
            {query ? (
              <button
                type="button"
                aria-label="清除搜索"
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
                onClick={() => setQuery("")}
              >
                <XIcon className="size-4" />
              </button>
            ) : null}
          </div>
          <Separator />
          <div className="min-h-0 flex-1 overflow-auto">
            {treeLoading ? (
              <p className="text-muted-foreground py-6 text-center text-sm">
                加载中…
              </p>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground py-6 text-center text-sm">
                {emptyTree}
              </p>
            ) : (
              <ul role="tree" aria-label="组织" className="m-0 list-none p-0">
                {filtered.map((node) => (
                  <OrgTreeRow
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

        {/* Right panel */}
        <section
          data-slot="org-admin-main"
          className="flex min-w-0 flex-1 flex-col gap-3"
          aria-label="组织详情"
        >
          {!selectedId ? (
            <div className="text-muted-foreground border-border flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 text-sm">
              {emptySelection}
            </div>
          ) : (
            <>
              {summary ? (
                <div
                  data-slot="org-admin-summary"
                  className="border-border bg-card rounded-lg border p-4"
                >
                  {summary}
                </div>
              ) : (
                <div
                  data-slot="org-admin-summary"
                  className="border-border bg-card rounded-lg border px-4 py-3"
                >
                  <p className="text-sm font-medium">
                    {selectedNode?.label ?? selectedId}
                  </p>
                  {selectedNode?.readOnly ? (
                    <p className="text-muted-foreground text-xs">只读节点</p>
                  ) : null}
                </div>
              )}

              {tabs && tabs.length > 0 ? (
                <Tabs
                  value={activeTab}
                  onValueChange={(v) => {
                    if (controlledTabKey === undefined) setInternalTab(v);
                    onTabChange?.(v);
                  }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <TabsList>
                    {tabs.map((t) => (
                      <TabsTrigger
                        key={t.key}
                        value={t.key}
                        disabled={t.disabled}
                      >
                        {t.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {tabs.map((t) => (
                    <TabsContent
                      key={t.key}
                      value={t.key}
                      className="min-h-0 flex-1 overflow-auto"
                    >
                      {t.children}
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <div className="border-border bg-card min-h-0 flex-1 overflow-auto rounded-lg border p-4">
                  {children}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export { OrgAdminPage };
