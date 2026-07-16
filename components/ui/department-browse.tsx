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
import { BuildingIcon, ChevronRightIcon, SearchIcon, XIcon } from "./icons";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

interface Department {
  id: string;
  name: string;
  code?: string;
  parentId?: string;
  children?: Department[];
  level?: number;
}

interface DepartmentBrowseProps {
  value?: Department | Department[];
  defaultValue?: Department | Department[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  maxCount?: number;
  departments?: Department[];
  onChange?: (value: Department | Department[] | undefined) => void;
  className?: string;
  /** Trigger height: default min-h-8; sm aligns with Button/SelectTrigger h-7 */
  size?: "sm" | "default";
}

const defaultDepartments: Department[] = [
  {
    id: "1",
    name: "Head Office",
    code: "HQ",
    children: [
      {
        id: "1-1",
        name: "Engineering",
        code: "ENG",
        parentId: "1",
        children: [
          { id: "1-1-1", name: "Frontend", code: "FE", parentId: "1-1" },
          { id: "1-1-2", name: "Backend", code: "BE", parentId: "1-1" },
          { id: "1-1-3", name: "DevOps", code: "DO", parentId: "1-1" },
        ],
      },
      {
        id: "1-2",
        name: "Design",
        code: "DES",
        parentId: "1",
        children: [
          { id: "1-2-1", name: "UI Design", code: "UI", parentId: "1-2" },
          { id: "1-2-2", name: "UX Research", code: "UX", parentId: "1-2" },
        ],
      },
      {
        id: "1-3",
        name: "Marketing",
        code: "MKT",
        parentId: "1",
      },
      {
        id: "1-4",
        name: "Sales",
        code: "SAL",
        parentId: "1",
      },
    ],
  },
];

/**
 * @component DepartmentTreeItem
 * @category ui/user
 * @since 0.2.0
 * @description Internal recursive tree item for rendering a department node with expand/collapse and checkbox / 内部递归树项，渲染带展开/折叠和复选框的部门节点
 * @keywords department, tree, item, internal, recursive
 */
function DepartmentTreeItem({
  department,
  selectedIds,
  onSelect,
  level = 0,
}: {
  department: Department;
  selectedIds: Set<string>;
  onSelect: (dept: Department) => void;
  level?: number;
}) {
  const [expanded, setExpanded] = React.useState(level < 2);
  const hasChildren = department.children && department.children.length > 0;
  const isSelected = selectedIds.has(department.id);

  return (
    <div>
      <div
        className={cn(
          "hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5",
          isSelected && "bg-muted",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(department)}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="shrink-0"
          >
            <ChevronRightIcon
              className={cn(
                "size-3 transition-transform",
                expanded && "rotate-90",
              )}
            />
          </Button>
        ) : (
          <div className="size-4" />
        )}
        <Checkbox checked={isSelected} />
        <BuildingIcon className="text-muted-foreground size-4" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{department.name}</p>
          {department.code && (
            <p className="text-muted-foreground text-xs">{department.code}</p>
          )}
        </div>
      </div>
      {hasChildren && expanded && (
        <div>
          {department.children!.map((child) => (
            <DepartmentTreeItem
              key={child.id}
              department={child}
              selectedIds={selectedIds}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * @component DepartmentBrowse
 * @category ui/user
 * @since 0.2.0
 * @description Department tree picker with search, single/multiple selection, and hierarchical tree view / 部门树选择器，支持搜索、单选/多选和层级树视图
 * @keywords department, browse, tree, picker, organization, hierarchy
 * @example
 * <DepartmentBrowse
 *   departments={departments}
 *   value={selected}
 *   onChange={setSelected}
 *   multiple
 * />
 */
function DepartmentBrowse({
  value: controlledValue,
  defaultValue,
  placeholder,
  disabled,
  multiple = false,
  maxCount,
  departments = defaultDepartments,
  onChange,
  className,
  size = "default",
}: DepartmentBrowseProps) {
  const { t } = useTranslation("ui");
  const resolvedPlaceholder =
    placeholder ??
    t("departmentBrowse.placeholder", { defaultValue: "选择部门..." });
  const dialogTitle = t("departmentBrowse.title", {
    defaultValue: "选择部门",
  });
  const searchPlaceholder = t("departmentBrowse.searchPlaceholder", {
    defaultValue: "搜索部门...",
  });
  const emptyText = t("departmentBrowse.empty", {
    defaultValue: "未找到部门",
  });
  const removeLabel = t("departmentBrowse.remove", { defaultValue: "移除" });
  const clearAllLabel = t("departmentBrowse.clearAll", {
    defaultValue: "清除全部",
  });
  const isSm = size === "sm";
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    Department[]
  >(
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

  const selectedIds = React.useMemo(
    () => new Set(value.map((d) => d.id)),
    [value],
  );

  const filteredDepartments = React.useMemo(() => {
    if (!search) return departments;
    const q = search.toLowerCase();
    const filter = (depts: Department[]): Department[] => {
      return depts.reduce<Department[]>((acc, dept) => {
        const matches =
          dept.name.toLowerCase().includes(q) ||
          dept.code?.toLowerCase().includes(q);
        const filteredChildren = dept.children ? filter(dept.children) : [];
        if (matches || filteredChildren.length > 0) {
          acc.push({
            ...dept,
            children:
              filteredChildren.length > 0
                ? filteredChildren
                : (dept.children ?? []),
          });
        }
        return acc;
      }, []);
    };
    return filter(departments);
  }, [departments, search]);

  const handleSelect = (dept: Department) => {
    let newValue: Department[];
    if (multiple) {
      const isSelected = value.some((d) => d.id === dept.id);
      newValue = isSelected
        ? value.filter((d) => d.id !== dept.id)
        : [...value, dept];
    } else {
      newValue = [dept];
      setOpen(false);
    }
    setUncontrolledValue(newValue);
    onChange?.(multiple ? newValue : newValue[0]);
  };

  const handleRemove = (deptId: string) => {
    const newValue = value.filter((d) => d.id !== deptId);
    setUncontrolledValue(newValue);
    onChange?.(multiple ? newValue : newValue[0]);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUncontrolledValue([]);
    onChange?.(multiple ? [] : undefined);
  };

  return (
    <div
      data-slot="department-browse"
      data-size={size}
      className={cn("w-full", className)}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          // #45 sibling: custom div trigger is not a native <button>
          nativeButton={false}
          render={
            <div
              data-size={size}
              className={cn(
                "border-input flex w-full items-center gap-1 border bg-transparent px-2.5 text-sm transition-colors",
                "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-3",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:bg-input/30",
                isSm
                  ? cn(
                      "min-h-7 rounded-[min(var(--radius-md),10px)] py-0",
                      !multiple && "h-7",
                    )
                  : "min-h-8 rounded-lg py-1",
                disabled && "cursor-not-allowed opacity-50",
              )}
            />
          }
          disabled={disabled}
        >
          {value.length > 0 ? (
            <div className="flex flex-1 flex-wrap gap-1">
              {value.map((dept) => (
                <Badge
                  key={dept.id}
                  variant="secondary"
                  className={cn(
                    "gap-1",
                    isSm && "h-4 px-1.5 py-0 text-[10px] leading-none",
                  )}
                >
                  <BuildingIcon className={cn(isSm ? "size-2.5" : "size-3")} />
                  <span>{dept.name}</span>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(dept.id);
                      }}
                      className="hover:bg-muted ml-0.5 rounded-full"
                    >
                      <XIcon className={cn(isSm ? "size-2.5" : "size-3")} />
                      <span className="sr-only">{removeLabel}</span>
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground flex-1">
              {resolvedPlaceholder}
            </span>
          )}
          {value.length > 0 && !disabled && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleClear}
              className="shrink-0"
            >
              <XIcon className="size-3" />
              <span className="sr-only">{clearAllLabel}</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-8"
            />
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {filteredDepartments.map((dept) => (
                <DepartmentTreeItem
                  key={dept.id}
                  department={dept}
                  selectedIds={selectedIds}
                  onSelect={handleSelect}
                />
              ))}
              {filteredDepartments.length === 0 && (
                <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
                  <BuildingIcon className="mb-2 size-8" />
                  <p className="text-sm">{emptyText}</p>
                </div>
              )}
            </div>
          </ScrollArea>
          {multiple && (
            <div className="text-muted-foreground flex items-center justify-between text-sm">
              <span>
                {t("departmentBrowse.selectedCount", {
                  count: value.length,
                  defaultValue: `已选 ${value.length} 个部门`,
                })}
              </span>
              {maxCount && (
                <span>
                  {t("departmentBrowse.maxCount", {
                    count: maxCount,
                    defaultValue: `最多 ${maxCount}`,
                  })}
                </span>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { DepartmentBrowse };
export type { Department, DepartmentBrowseProps };
