"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SearchIcon,
  XIcon,
  ChevronRightIcon,
  FolderIcon,
  FileIcon,
} from "@/components/ui/icons";

interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

interface TreeSelectProps {
  value?: string | string[];
  defaultValue?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  maxCount?: number;
  data: TreeNode[];
  onChange?: (value: string | string[] | undefined) => void;
  className?: string;
}

function TreeSelectItem({
  node,
  level = 0,
  selectedIds,
  expandedIds,
  onToggleExpand,
  onSelect,
  multiple,
}: {
  node: TreeNode;
  level?: number;
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onSelect: (node: TreeNode) => void;
  multiple?: boolean;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedIds.has(node.id);
  const isDisabled = node.disabled;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer hover:bg-muted transition-colors",
          isSelected && "bg-muted",
          isDisabled && "opacity-50 cursor-not-allowed",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => !isDisabled && onSelect(node)}
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
        {multiple && <Checkbox checked={isSelected} disabled={isDisabled} />}
        <span className="shrink-0 text-muted-foreground">
          {node.icon ||
            (hasChildren ? (
              <FolderIcon className="size-4" />
            ) : (
              <FileIcon className="size-4" />
            ))}
        </span>
        <span className="flex-1 text-sm truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeSelectItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              {...(multiple !== undefined ? { multiple } : {})}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function findNodeById(nodes: TreeNode[], id: string): TreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

function TreeSelect({
  value: controlledValue,
  defaultValue,
  placeholder = "Select...",
  disabled,
  multiple = false,
  maxCount,
  data,
  onChange,
  className,
}: TreeSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
    Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? [defaultValue]
        : [],
  );

  const value = React.useMemo(() => {
    if (controlledValue !== undefined) {
      return Array.isArray(controlledValue)
        ? controlledValue
        : [controlledValue];
    }
    return uncontrolledValue;
  }, [controlledValue, uncontrolledValue]);

  const selectedIdsSet = React.useMemo(() => new Set(value), [value]);

  const filteredData = React.useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    const filter = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.reduce<TreeNode[]>((acc, node) => {
        const matches = node.label.toLowerCase().includes(q);
        const filteredChildren = node.children ? filter(node.children) : [];
        if (matches || filteredChildren.length > 0) {
          acc.push({
            ...node,
            children:
              filteredChildren.length > 0
                ? filteredChildren
                : (node.children ?? []),
          });
        }
        return acc;
      }, []);
    };
    return filter(data);
  }, [data, search]);

  const handleToggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelect = (node: TreeNode) => {
    let newValue: string[];
    if (multiple) {
      const isSelected = value.includes(node.id);
      newValue = isSelected
        ? value.filter((id) => id !== node.id)
        : [...value, node.id];
    } else {
      newValue = [node.id];
      setOpen(false);
    }
    setUncontrolledValue(newValue);
    onChange?.(multiple ? newValue : newValue[0]);
  };

  const handleRemove = (id: string) => {
    const newValue = value.filter((v) => v !== id);
    setUncontrolledValue(newValue);
    onChange?.(multiple ? newValue : newValue[0]);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUncontrolledValue([]);
    onChange?.(multiple ? [] : undefined);
  };

  const getLabelById = (id: string): string => {
    const node = findNodeById(data, id);
    return node?.label || id;
  };

  return (
    <div data-slot="tree-select" className={cn("w-full", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <div
              className={cn(
                "flex min-h-8 w-full items-center gap-1 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors",
                "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:bg-input/30",
                disabled && "cursor-not-allowed opacity-50",
              )}
            />
          }
          disabled={disabled}
        >
          {value.length > 0 ? (
            <div className="flex flex-1 flex-wrap gap-1">
              {value.map((id) => (
                <Badge key={id} variant="secondary" className="gap-1">
                  <span>{getLabelById(id)}</span>
                  {!disabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(id);
                      }}
                      className="ml-0.5 rounded-full hover:bg-muted"
                    >
                      <XIcon className="size-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="flex-1 text-muted-foreground">{placeholder}</span>
          )}
          {value.length > 0 && !disabled && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleClear}
              className="shrink-0"
            >
              <XIcon className="size-3" />
              <span className="sr-only">Clear all</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-8"
            />
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-0.5">
              {filteredData.map((node) => (
                <TreeSelectItem
                  key={node.id}
                  node={node}
                  selectedIds={selectedIdsSet}
                  expandedIds={new Set(expandedIds)}
                  onToggleExpand={handleToggleExpand}
                  onSelect={handleSelect}
                  multiple={multiple}
                />
              ))}
              {filteredData.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <FolderIcon className="size-8 mb-2" />
                  <p className="text-sm">No items found</p>
                </div>
              )}
            </div>
          </ScrollArea>
          {multiple && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{value.length} item(s) selected</span>
              {maxCount && <span>Max: {maxCount}</span>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { TreeSelect };
export type { TreeNode, TreeSelectProps };
