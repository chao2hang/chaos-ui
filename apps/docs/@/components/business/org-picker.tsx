"use client";

import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Checkbox } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@chaos_team/chaos-ui/ui";
import { TreeView } from "@chaos_team/chaos-ui/ui";
import { Building2Icon, SearchIcon, UsersIcon } from "@chaos_team/chaos-ui/ui-icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * A node in the organization department tree.
 */
interface OrgNode {
  /** Unique key / 唯一键 */
  key: string;
  /** Display title / 显示标题 */
  title: string;
  /** Child departments / 子部门 */
  children?: OrgNode[];
}

/**
 * A member in the organization.
 */
interface OrgMember {
  /** Unique key / 唯一键 */
  key: string;
  /** Member name / 成员名称 */
  name: string;
  /** Department name / 部门名称 */
  department: string;
  /** Avatar URL / 头像地址 */
  avatar?: string;
}

/**
 * Props for the OrgPicker component.
 */
interface OrgPickerProps {
  /** Whether the dialog is open / 对话框是否打开 */
  open?: boolean;
  /** Callback when open state changes / 打开状态变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** Callback when user confirms selection / 用户确认选择回调 */
  onConfirm?: (selected: string[]) => void;
  /** Allow multiple selections (default: true) / 是否允许多选 */
  multiple?: boolean;
  /** Currently selected keys / 当前选中的键 */
  selectedKeys?: string[];
  /** Department tree data / 部门树数据 */
  departments?: OrgNode[];
  /** Member list / 成员列表 */
  members?: OrgMember[];
  /** Additional className / 额外类名 */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  OrgPicker - main export                                           */
/* ------------------------------------------------------------------ */

/**
 * @component OrgPicker
 * @category business/org
 * @since 0.2.0
 * @description Organization selector dialog with department tree on the left
 *   and member list with checkboxes on the right, supporting search and
 *   multi-select. / 组织选择器对话框，左侧部门树，右侧带复选框的成员列表，支持搜索和多选。
 * @keywords org, organization, picker, dialog, tree, member, department, select
 * @example
 * ```tsx
 * <OrgPicker
 *   open={open}
 *   onOpenChange={setOpen}
 *   departments={deptData}
 *   members={memberList}
 *   onConfirm={(keys) => console.log(keys)}
 * />
 * ```
 */
function OrgPicker({
  open = false,
  onOpenChange,
  onConfirm,
  multiple = true,
  selectedKeys = [],
  departments = [],
  members = [],
  className,
}: OrgPickerProps) {
  const [internalSelected, setInternalSelected] =
    React.useState<string[]>(selectedKeys);
  const [deptQuery, setDeptQuery] = React.useState("");
  const [memberQuery, setMemberQuery] = React.useState("");
  const [activeDept, setActiveDept] = React.useState<string | null>(null);

  React.useEffect(() => {
    setInternalSelected(selectedKeys);
  }, [selectedKeys]);

  const filteredMembers = React.useMemo(() => {
    let result = members;
    if (activeDept) {
      result = result.filter((m) => m.department === activeDept);
    }
    if (memberQuery) {
      const q = memberQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.department.toLowerCase().includes(q),
      );
    }
    return result;
  }, [members, activeDept, memberQuery]);

  const toggleMember = (key: string) => {
    setInternalSelected((prev) => {
      if (multiple) {
        return prev.includes(key)
          ? prev.filter((k) => k !== key)
          : [...prev, key];
      }
      return prev.includes(key) ? [] : [key];
    });
  };

  const handleConfirm = () => {
    onConfirm?.(internalSelected);
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    setInternalSelected(selectedKeys);
    onOpenChange?.(false);
  };

  // Convert OrgNode[] to TreeView data format
  const treeData = React.useMemo(
    () =>
      departments.map((node) => ({
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
    [departments],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="org-picker"
        className={cn("sm:max-w-3xl", className)}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2Icon className="text-primary size-4" />
            <span>选择组织成员</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[420px] gap-3">
          {/* Left: department tree */}
          <div className="flex w-1/2 flex-col rounded-lg border">
            <div className="border-b p-2">
              <div className="relative">
                <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
                <Input
                  className="h-7 pl-7 text-xs"
                  placeholder="搜索部门"
                  value={deptQuery}
                  onChange={(e) => setDeptQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {departments.length === 0 ? (
                <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                  暂无部门数据
                </div>
              ) : (
                <TreeView
                  data={treeData}
                  showIcon
                  selectedIds={activeDept ? [activeDept] : []}
                  onSelect={(ids) => {
                    const lastId = ids.length > 0 ? ids[ids.length - 1] : null;
                    setActiveDept(lastId ?? null);
                  }}
                />
              )}
            </div>
          </div>

          {/* Right: member list */}
          <div className="flex w-1/2 flex-col rounded-lg border">
            <div className="border-b p-2">
              <div className="relative">
                <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2" />
                <Input
                  className="h-7 pl-7 text-xs"
                  placeholder="搜索成员"
                  value={memberQuery}
                  onChange={(e) => setMemberQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-1">
              {filteredMembers.length === 0 ? (
                <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                  <UsersIcon className="mr-1.5 size-4" />
                  暂无成员
                </div>
              ) : (
                filteredMembers.map((member) => {
                  const isSelected = internalSelected.includes(member.key);
                  return (
                    <button
                      key={member.key}
                      type="button"
                      className={cn(
                        "hover:bg-muted flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        isSelected && "bg-muted",
                      )}
                      onClick={() => toggleMember(member.key)}
                    >
                      <Checkbox checked={isSelected} />
                      <div className="bg-muted flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                        {member.name.slice(0, 1)}
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium">
                          {member.name}
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                          {member.department}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-muted-foreground text-sm">
            已选 {internalSelected.length} 人
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              取消
            </Button>
            <Button size="sm" onClick={handleConfirm}>
              确定
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { OrgPicker };
export type { OrgPickerProps, OrgNode, OrgMember };
