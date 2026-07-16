"use client";

import * as React from "react";
import {
  ChevronRightIcon,
  SearchIcon,
  XIcon,
  ChevronDownIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OrgTreeNode {
  /** Unique identifier / 唯一标识 */
  id: string;
  /** Display label / 显示名称 */
  label: string;
  /** Optional secondary text (e.g. headcount, role) / 辅助文字 */
  description?: string;
  /** Optional avatar URL / 头像 */
  avatar?: string;
  /** Children nodes / 子节点 */
  children?: OrgTreeNode[];
  /** Whether children are being loaded asynchronously / 是否异步加载子节点 */
  loading?: boolean;
  /** Whether the node is disabled / 是否禁用 */
  disabled?: boolean;
  /** Arbitrary metadata / 额外数据 */
  meta?: Record<string, unknown>;
}

interface OrgTreeProps {
  /** Tree data / 树数据 */
  data: OrgTreeNode[];
  /** Selected node IDs (controlled) / 受控选中节点 */
  selectedKeys?: string[];
  /** Default selected node IDs (uncontrolled) / 默认选中节点 */
  defaultSelectedKeys?: string[];
  /** Default expanded node IDs (uncontrolled) / 默认展开节点 */
  defaultExpandedKeys?: string[];
  /** Expanded node IDs (controlled) / 受控展开节点 */
  expandedKeys?: string[];
  /** Called when selection changes / 选中变更回调 */
  onSelect?: (selectedKeys: string[]) => void;
  /** Called when expansion changes / 展开变更回调 */
  onExpand?: (expandedKeys: string[]) => void;
  /** Called when a node is clicked / 节点点击回调 */
  onNodeClick?: (node: OrgTreeNode) => void;
  /** Called to load children asynchronously / 异步加载子节点 */
  onLoadChildren?: (node: OrgTreeNode) => Promise<OrgTreeNode[]>;
  /** Selection mode / 选择模式 */
  selectable?: "none" | "single" | "multiple";
  /** Whether to show checkboxes (multiple selection) / 是否显示复选框 */
  checkable?: boolean;
  /** Whether to show a search input / 是否显示搜索框 */
  searchable?: boolean;
  /** Search placeholder / 搜索占位文字 */
  searchPlaceholder?: string;
  /** Whether to show connecting lines / 是否显示连接线 */
  showLine?: boolean;
  /** Whether nodes are draggable / 是否可拖拽 */
  draggable?: boolean;
  /** Called when a node is dropped / 拖拽放置回调 */
  onDrop?: (dragNode: OrgTreeNode, dropNode: OrgTreeNode) => void;
  /** Additional class / 额外类名 */
  className?: string;
  /** Custom render for node label / 自定义节点渲染 */
  renderNode?: (node: OrgTreeNode, expanded: boolean) => React.ReactNode;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Collect all node IDs from a tree (flat list). */
function collectAllIds(nodes: OrgTreeNode[]): string[] {
  const ids: string[] = [];
  const walk = (list: OrgTreeNode[]) => {
    for (const n of list) {
      ids.push(n.id);
      if (n.children) walk(n.children);
    }
  };
  walk(nodes);
  return ids;
}

/** Flatten the tree into a visible list of { node, depth, hasChildren, isLast } objects. */
function flattenTree(
  nodes: OrgTreeNode[],
  expandedKeys: Set<string>,
  depth = 0,
): FlatNode[] {
  const result: FlatNode[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]!;
    const hasChildren = !!node.children && node.children.length > 0;
    const isLast = i === nodes.length - 1;
    result.push({ node, depth, hasChildren, isLast });
    if (hasChildren && expandedKeys.has(node.id)) {
      result.push(...flattenTree(node.children!, expandedKeys, depth + 1));
    }
  }
  return result;
}

interface FlatNode {
  node: OrgTreeNode;
  depth: number;
  hasChildren: boolean;
  isLast: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function OrgTree({
  data,
  selectedKeys: controlledSelected,
  defaultSelectedKeys = [],
  defaultExpandedKeys = [],
  expandedKeys: controlledExpanded,
  onSelect,
  onExpand,
  onNodeClick,
  onLoadChildren,
  selectable = "none",
  checkable = false,
  searchable = false,
  searchPlaceholder = "搜索...",
  showLine = true,
  draggable = false,
  onDrop,
  className,
  renderNode,
}: OrgTreeProps) {
  // Selection state
  const [internalSelected, setInternalSelected] = React.useState<Set<string>>(
    new Set(defaultSelectedKeys),
  );
  const selected = React.useMemo(
    () => (controlledSelected ? new Set(controlledSelected) : internalSelected),
    [controlledSelected, internalSelected],
  );

  // Expansion state
  const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
    new Set(defaultExpandedKeys),
  );
  const expanded = React.useMemo(
    () => (controlledExpanded ? new Set(controlledExpanded) : internalExpanded),
    [controlledExpanded, internalExpanded],
  );

  // Search
  const [searchQuery, setSearchQuery] = React.useState("");

  // Loading states for async children
  const [loadingKeys, setLoadingKeys] = React.useState<Set<string>>(new Set());

  // Drag state
  const [dragOverId, setDragOverId] = React.useState<string | null>(null);

  const updateSelected = (newSelected: Set<string>) => {
    if (!controlledSelected) setInternalSelected(newSelected);
    onSelect?.(Array.from(newSelected));
  };

  const updateExpanded = (newExpanded: Set<string>) => {
    if (!controlledExpanded) setInternalExpanded(newExpanded);
    onExpand?.(Array.from(newExpanded));
  };

  const toggleExpand = async (nodeId: string) => {
    const next = new Set(expanded);
    if (next.has(nodeId)) {
      next.delete(nodeId);
    } else {
      next.add(nodeId);
      // Trigger async load if needed
      if (onLoadChildren) {
        const node = findNodeById(data, nodeId);
        if (node && !node.children && !node.loading) {
          setLoadingKeys((prev) => new Set(prev).add(nodeId));
          try {
            const children = await onLoadChildren(node);
            node.children = children;
          } finally {
            setLoadingKeys((prev) => {
              const s = new Set(prev);
              s.delete(nodeId);
              return s;
            });
          }
        }
      }
    }
    updateExpanded(next);
  };

  const toggleSelect = (nodeId: string) => {
    if (selectable === "none" && !checkable) return;

    const next = new Set(selected);

    if (selectable === "single" && !checkable) {
      next.clear();
      next.add(nodeId);
    } else {
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
    }

    updateSelected(next);
  };

  const handleNodeClick = (flatNode: FlatNode) => {
    onNodeClick?.(flatNode.node);
    // In checkable mode, selection is handled by the checkbox click
    // In selectable mode, clicking the row toggles selection
    if (!checkable && selectable !== "none") {
      toggleSelect(flatNode.node.id);
    }
    if (flatNode.hasChildren) {
      toggleExpand(flatNode.node.id);
    }
  };

  // Filter data by search
  const visibleData = React.useMemo(() => {
    if (!searchQuery.trim()) return data;

    // When searching, auto-expand all nodes that match
    const q = searchQuery.toLowerCase();

    const filterTree = (nodes: OrgTreeNode[]): OrgTreeNode[] => {
      const result: OrgTreeNode[] = [];
      for (const node of nodes) {
        const selfMatch =
          node.label.toLowerCase().includes(q) ||
          node.description?.toLowerCase().includes(q);
        const filteredChildren = node.children ? filterTree(node.children) : [];

        if (selfMatch || filteredChildren.length > 0) {
          result.push({
            id: node.id,
            label: node.label,
            ...(node.description != null
              ? { description: node.description }
              : {}),
            ...(node.avatar != null ? { avatar: node.avatar } : {}),
            ...(node.loading != null ? { loading: node.loading } : {}),
            ...(node.disabled != null ? { disabled: node.disabled } : {}),
            ...(node.meta != null ? { meta: node.meta } : {}),
            children:
              filteredChildren.length > 0 ? filteredChildren : node.children,
          } as OrgTreeNode);
        }
      }
      return result;
    };

    return filterTree(data);
  }, [data, searchQuery]);

  // Auto-expand when searching
  const searchExpandedKeys = React.useMemo(() => {
    if (!searchQuery.trim()) return expanded;
    // Expand everything when searching
    const ids = collectAllIds(visibleData);
    return new Set(ids);
  }, [searchQuery, visibleData, expanded]);

  const effectiveExpanded = searchQuery.trim() ? searchExpandedKeys : expanded;

  const flatNodes = React.useMemo(
    () => flattenTree(visibleData, effectiveExpanded),
    [visibleData, effectiveExpanded],
  );

  // Click outside to clear selection (optional, keeping it minimal)
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, node: OrgTreeNode) => {
    e.dataTransfer.setData("text/plain", node.id);
    e.dataTransfer.effectAllowed = "move";
    (e.currentTarget as HTMLElement).classList.add("opacity-50");
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent, nodeId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(nodeId);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, dropNode: OrgTreeNode) => {
    e.preventDefault();
    setDragOverId(null);
    const dragId = e.dataTransfer.getData("text/plain");
    const dragNode = findNodeById(data, dragId);
    if (dragNode && onDrop) {
      onDrop(dragNode, dropNode);
    }
  };

  return (
    <div
      ref={containerRef}
      data-slot="org-tree"
      className={cn("w-full", className)}
    >
      {/* Search */}
      {searchable && (
        <div className="relative mb-2">
          <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className={cn(
              "border-input h-8 w-full rounded-lg border bg-transparent pr-8 pl-8",
              "text-sm transition-colors outline-none",
              "placeholder:text-muted-foreground",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3",
            )}
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="清除搜索"
              onClick={() => setSearchQuery("")}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
            >
              <XIcon className="size-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Empty state */}
      {flatNodes.length === 0 && (
        <div className="text-muted-foreground py-8 text-center text-sm">
          {searchQuery ? "无匹配结果" : "暂无数据"}
        </div>
      )}

      {/* Tree list */}
      <div role="tree" aria-label="组织架构树" className="select-none">
        {flatNodes.map(({ node, depth, hasChildren, isLast }) => {
          const isExpanded = effectiveExpanded.has(node.id);
          const isSelected = selected.has(node.id);
          const isLoading = loadingKeys.has(node.id);

          return (
            <div
              key={node.id}
              role="treeitem"
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-selected={isSelected}
              draggable={draggable && !node.disabled}
              onDragStart={
                draggable ? (e) => handleDragStart(e, node) : undefined
              }
              onDragOver={
                draggable ? (e) => handleDragOver(e, node.id) : undefined
              }
              onDragLeave={draggable ? handleDragLeave : undefined}
              onDrop={draggable ? (e) => handleDrop(e, node) : undefined}
              className={cn(
                "group/tree-node flex cursor-pointer items-center gap-0.5 rounded-md px-1.5 py-1 transition-colors",
                isSelected && "bg-accent text-accent-foreground",
                !isSelected && "hover:bg-muted/50",
                node.disabled && "cursor-not-allowed opacity-50",
                dragOverId === node.id &&
                  "bg-primary/10 ring-primary/30 ring-1",
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleNodeClick({ node, depth, hasChildren, isLast });
              }}
            >
              {/* Indent + Lines */}
              <div
                className="flex shrink-0 items-center"
                style={{ width: depth * 20 + (hasChildren ? 0 : 16) }}
              >
                {showLine &&
                  Array.from({ length: depth }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "border-border/60 inline-block w-5 border-l",
                        i === depth - 1 && !isLast && "h-full",
                      )}
                      style={{ height: "100%" }}
                    />
                  ))}
              </div>

              {/* Expand/Collapse toggle */}
              {hasChildren ? (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(node.id);
                  }}
                  className="text-muted-foreground hover:text-foreground flex size-5 shrink-0 items-center justify-center rounded"
                >
                  {isLoading ? (
                    <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : isExpanded ? (
                    <ChevronDownIcon className="size-3.5" />
                  ) : (
                    <ChevronRightIcon className="size-3.5" />
                  )}
                </button>
              ) : (
                <span className="w-5 shrink-0" />
              )}

              {/* Checkbox */}
              {checkable && (
                <label
                  className="flex shrink-0 items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!node.disabled) toggleSelect(node.id);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={node.disabled}
                    onChange={() => {}}
                    className="accent-primary size-3.5 shrink-0 rounded"
                  />
                </label>
              )}

              {/* Avatar (optional) */}
              {node.avatar && (
                <img
                  src={node.avatar}
                  alt={node.label}
                  className="ml-1 size-5 shrink-0 rounded-full object-cover"
                />
              )}

              {/* Node content */}
              <span className="ml-1 min-w-0 truncate">
                {renderNode ? (
                  renderNode(node, isExpanded)
                ) : (
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span
                      className="truncate text-sm"
                      title={
                        typeof node.label === "string" ? node.label : undefined
                      }
                    >
                      {node.label}
                    </span>
                    {node.description && (
                      <span
                        className="text-muted-foreground truncate text-xs"
                        title={
                          typeof node.description === "string"
                            ? node.description
                            : undefined
                        }
                      >
                        {node.description}
                      </span>
                    )}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Find a node by ID in the tree (recursive). */
function findNodeById(
  nodes: OrgTreeNode[],
  id: string,
): OrgTreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

export { OrgTree };
export type { OrgTreeProps, OrgTreeNode };
