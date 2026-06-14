"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRightIcon, FolderIcon, FileIcon } from "@/components/ui/icons";

interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

interface TreeViewProps {
  data: TreeNode[];
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onSelect?: (ids: string[]) => void;
  onExpand?: (ids: string[]) => void;
  showCheckbox?: boolean;
  showIcon?: boolean;
  disabled?: boolean;
  className?: string;
}

function TreeViewItem({
  node,
  level = 0,
  selectedIds,
  expandedIds,
  onToggleExpand,
  onSelect,
  showCheckbox = false,
  showIcon = true,
  disabled = false,
}: {
  node: TreeNode;
  level?: number;
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
  showCheckbox?: boolean;
  showIcon?: boolean;
  disabled?: boolean;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedIds.has(node.id);
  const isDisabled = !!(disabled || node.disabled);

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer hover:bg-muted transition-colors",
          isSelected && "bg-muted",
          isDisabled && "opacity-50 cursor-not-allowed",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => !isDisabled && onSelect(node.id)}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.id);
            }}
            disabled={isDisabled}
            className="shrink-0"
          >
            <ChevronRightIcon
              className={cn(
                "size-3 transition-transform",
                isExpanded && "rotate-90",
              )}
            />
          </Button>
        ) : (
          <div className="size-4" />
        )}
        {showCheckbox && (
          <Checkbox checked={isSelected} disabled={isDisabled} />
        )}
        {showIcon && (
          <span className="shrink-0 text-muted-foreground">
            {node.icon ||
              (hasChildren ? (
                <FolderIcon className="size-4" />
              ) : (
                <FileIcon className="size-4" />
              ))}
          </span>
        )}
        <span className="flex-1 text-sm truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeViewItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              showCheckbox={showCheckbox}
              showIcon={showIcon}
              disabled={isDisabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TreeView({
  data,
  selectedIds: controlledSelectedIds,
  defaultSelectedIds = [],
  expandedIds: controlledExpandedIds,
  defaultExpandedIds = [],
  onSelect,
  onExpand,
  showCheckbox = false,
  showIcon = true,
  disabled = false,
  className,
}: TreeViewProps) {
  const [uncontrolledSelectedIds, setUncontrolledSelectedIds] =
    React.useState<string[]>(defaultSelectedIds);
  const [uncontrolledExpandedIds, setUncontrolledExpandedIds] =
    React.useState<string[]>(defaultExpandedIds);

  const selectedIds = controlledSelectedIds ?? uncontrolledSelectedIds;
  const expandedIds = controlledExpandedIds ?? uncontrolledExpandedIds;

  const selectedIdsSet = React.useMemo(
    () => new Set(selectedIds),
    [selectedIds],
  );
  const expandedIdsSet = React.useMemo(
    () => new Set(expandedIds),
    [expandedIds],
  );

  const handleToggleExpand = (id: string) => {
    const newExpandedIds = expandedIdsSet.has(id)
      ? expandedIds.filter((i) => i !== id)
      : [...expandedIds, id];
    setUncontrolledExpandedIds(newExpandedIds);
    onExpand?.(newExpandedIds);
  };

  const handleSelect = (id: string) => {
    const newSelectedIds = selectedIdsSet.has(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    setUncontrolledSelectedIds(newSelectedIds);
    onSelect?.(newSelectedIds);
  };

  return (
    <div data-slot="tree-view" className={cn("space-y-0.5", className)}>
      {data.map((node) => (
        <TreeViewItem
          key={node.id}
          node={node}
          selectedIds={selectedIdsSet}
          expandedIds={expandedIdsSet}
          onToggleExpand={handleToggleExpand}
          onSelect={handleSelect}
          showCheckbox={showCheckbox}
          showIcon={showIcon}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export { TreeView };
export type { TreeNode, TreeViewProps };
