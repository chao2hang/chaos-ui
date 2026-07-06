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
} from "lucide-react";

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

const TreeSelectItem = React.memo(function TreeSelectItem({
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
          "hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
          isSelected && "bg-muted",
          isDisabled && "cursor-not-allowed opacity-50",
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
        <span className="text-muted-foreground shrink-0">
          {node.icon ||
            (hasChildren ? (
              <FolderIcon className="size-4" />
            ) : (
              <FileIcon className="size-4" />
            ))}
        </span>
        <span className="flex-1 truncate text-sm">{node.label}</span>
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
              multiple={multiple}
            />
          ))}
        </div>
      )}
    </div>
  );
});

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
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
    Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? [defaultValue]
        : [],
  );

  const value = controlledValue
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : uncontrolledValue;

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
              filteredChildren.length > 0 ? filteredChildren : undefined,
          });
        }
        return acc;
      }, []);
    };
    return filter(data);
  }, [data, search]);

  const handleToggleExpand = React.useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelect = React.useCallback(
    (node: TreeNode) => {
      let newValue: string[];
      if (multiple) {
        const isSelected = value.includes(node.id);
        if (isSelected) {
          newValue = value.filter((id) => id !== node.id);
        } else {
          if (maxCount && value.length >= maxCount) return;
          newValue = [...value, node.id];
        }
      } else {
        newValue = [node.id];
        setOpen(false);
      }
      setUncontrolledValue(newValue);
      onChange?.(multiple ? newValue : newValue[0]);
    },
    [multiple, value, maxCount, onChange],
  );

  const handleRemove = React.useCallback(
    (id: string) => {
      const newValue = value.filter((v) => v !== id);
      setUncontrolledValue(newValue);
      onChange?.(multiple ? newValue : newValue[0]);
    },
    [value, multiple, onChange],
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setUncontrolledValue([]);
      onChange?.(multiple ? [] : undefined);
    },
    [multiple, onChange],
  );

  const labelMap = React.useMemo(() => {
    const map = new Map<string, string>();
    const walk = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        map.set(node.id, node.label);
        if (node.children) walk(node.children);
      }
    };
    walk(data);
    return map;
  }, [data]);

  return (
    <div data-slot="tree-select" className={cn("w-full", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <div
              className={cn(
                "border-input flex min-h-8 w-full items-center gap-1 rounded-lg border bg-transparent px-2.5 py-1 text-sm transition-colors",
                "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-3",
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
                  <span>{labelMap.get(id) ?? id}</span>
                  {!disabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(id);
                      }}
                      className="hover:bg-muted ml-0.5 rounded-full"
                    >
                      <XIcon className="size-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground flex-1">{placeholder}</span>
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
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
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
                  expandedIds={expandedIds}
                  onToggleExpand={handleToggleExpand}
                  onSelect={handleSelect}
                  multiple={multiple}
                />
              ))}
              {filteredData.length === 0 && (
                <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
                  <FolderIcon className="mb-2 size-8" />
                  <p className="text-sm">No items found</p>
                </div>
              )}
            </div>
          </ScrollArea>
          {multiple && (
            <div className="text-muted-foreground flex items-center justify-between text-sm">
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
