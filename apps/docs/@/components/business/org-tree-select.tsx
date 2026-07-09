"use client";

import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chaos_team/chaos-ui/ui";
import { TreeView } from "@chaos_team/chaos-ui/ui";
import {
  Building2Icon,
  ChevronDownIcon,
  SearchIcon,
  XIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * A node in the organization tree.
 */
interface OrgNode {
  /** Unique key / 唯一键 */
  key: string;
  /** Display title / 显示标题 */
  title: string;
  /** Child nodes / 子节点 */
  children?: OrgNode[];
}

/**
 * Props for the OrgTreeSelect component.
 */
interface OrgTreeSelectProps {
  /** Selected key(s) / 选中的键 */
  value?: string | string[];
  /** Change callback / 变更回调 */
  onChange?: (value: string | string[]) => void;
  /** Organization tree data / 组织树数据 */
  treeData?: OrgNode[];
  /** Allow multiple selections (default: false) / 是否允许多选 */
  multiple?: boolean;
  /** Show search input (default: true) / 是否显示搜索 */
  showSearch?: boolean;
  /** Additional className / 额外类名 */
  className?: string;
  /** Placeholder text / 占位文本 */
  placeholder?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function findNodeTitle(nodes: OrgNode[], key: string): string | undefined {
  for (const node of nodes) {
    if (node.key === key) return node.title;
    if (node.children?.length) {
      const found = findNodeTitle(node.children, key);
      if (found) return found;
    }
  }
  return undefined;
}

function filterTree(nodes: OrgNode[], query: string): OrgNode[] {
  if (!query) return nodes;
  const q = query.toLowerCase();
  const result: OrgNode[] = [];
  for (const node of nodes) {
    const titleMatch = node.title.toLowerCase().includes(q);
    const filteredChildren = node.children
      ? filterTree(node.children, query)
      : [];
    if (titleMatch || filteredChildren.length > 0) {
      result.push({
        key: node.key,
        title: node.title,
        ...(filteredChildren.length > 0 ? { children: filteredChildren } : {}),
      });
    }
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  OrgTreeSelect - main export                                       */
/* ------------------------------------------------------------------ */

/**
 * @component OrgTreeSelect
 * @category business/org
 * @since 0.2.0
 * @description Organization tree selector with a trigger that shows
 *   selected org name(s) and a popover with tree and search. Supports
 *   single or multi-select. / 组织树选择器，触发器显示已选组织名称，
 *   弹出面板包含树和搜索，支持单选或多选。
 * @keywords org, tree, select, popover, organization, department
 * @example
 * ```tsx
 * <OrgTreeSelect
 *   treeData={orgData}
 *   value={selected}
 *   onChange={setSelected}
 *   multiple
 * />
 * ```
 */
function OrgTreeSelect({
  value,
  onChange,
  treeData = [],
  multiple = false,
  showSearch = true,
  className,
  placeholder = "请选择组织",
}: OrgTreeSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const selectedKeys = React.useMemo<string[]>(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const displayText = React.useMemo(() => {
    if (selectedKeys.length === 0) return "";
    const titles = selectedKeys
      .map((k) => findNodeTitle(treeData, k) ?? k)
      .filter(Boolean);
    return titles.join(", ");
  }, [selectedKeys, treeData]);

  const filteredData = React.useMemo(
    () => filterTree(treeData, query),
    [treeData, query],
  );

  // Convert to TreeView format
  const treeViewData = React.useMemo(
    () =>
      filteredData.map((node) => ({
        id: node.key,
        label: node.title,
        ...(node.children?.length
          ? {
              children: node.children.map((child) => ({
                id: child.key,
                label: child.title,
                ...(child.children?.length
                  ? {
                      children: child.children.map((gc) => ({
                        id: gc.key,
                        label: gc.title,
                      })),
                    }
                  : {}),
              })),
            }
          : {}),
      })),
    [filteredData],
  );

  const handleSelect = (ids: string[]) => {
    if (multiple) {
      onChange?.(ids);
    } else {
      const lastId = ids.length > 0 ? ids[ids.length - 1] : "";
      onChange?.(lastId ?? "");
      setOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : "");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            data-slot="org-tree-select"
            className={cn(
              "border-input focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full items-center justify-between gap-2 rounded-lg border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-3",
              className,
            )}
          />
        }
      >
        <span className="flex items-center gap-1.5 truncate">
          <Building2Icon className="text-muted-foreground size-4 shrink-0" />
          <span
            className={cn(
              "truncate",
              selectedKeys.length === 0 && "text-muted-foreground",
            )}
          >
            {displayText || placeholder}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1">
          {selectedKeys.length > 0 && (
            <button
              type="button"
              className="hover:bg-accent rounded-full p-0.5"
              onClick={handleClear}
              aria-label="清除选择"
            >
              <XIcon className="size-3.5" />
            </button>
          )}
          <ChevronDownIcon className="size-4 opacity-50" />
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-0">
        {showSearch && (
          <div className="border-b p-2">
            <div className="relative">
              <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
              <Input
                className="h-7 pl-7 text-xs"
                placeholder="搜索组织"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="max-h-64 overflow-y-auto p-2">
          {filteredData.length === 0 ? (
            <div className="text-muted-foreground py-4 text-center text-sm">
              暂无数据
            </div>
          ) : (
            <TreeView
              data={treeViewData}
              showIcon
              showCheckbox={multiple}
              selectedIds={selectedKeys}
              onSelect={handleSelect}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { OrgTreeSelect };
export type { OrgTreeSelectProps, OrgNode };
