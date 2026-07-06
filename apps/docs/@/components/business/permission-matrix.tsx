"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface PermissionItem {
  key: string;
  label: string;
  children?: PermissionItem[];
}

interface PermissionMatrixProps extends React.ComponentProps<"div"> {
  permissions: PermissionItem[];
  roles: string[];
  value: Record<string, string[]>;
  onChange?: (value: Record<string, string[]>) => void;
  className?: string;
}

function PermissionMatrix({
  permissions,
  roles,
  value,
  onChange,
  className,
  ...props
}: PermissionMatrixProps) {
  const toggle = (permKey: string, role: string) => {
    const current = value[permKey] ?? [];
    const next = current.includes(role)
      ? current.filter((r) => r !== role)
      : [...current, role];
    onChange?.({ ...value, [permKey]: next });
  };

  const flatten = (
    items: PermissionItem[],
    depth = 0,
  ): Array<{ item: PermissionItem; depth: number }> => {
    const result: Array<{ item: PermissionItem; depth: number }> = [];
    for (const item of items) {
      result.push({ item, depth });
      if (item.children) result.push(...flatten(item.children, depth + 1));
    }
    return result;
  };

  const flatPerms = flatten(permissions);

  return (
    <div
      data-slot="permission-matrix"
      className={cn("overflow-auto rounded-md border", className)}
      {...props}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[180px]">权限</TableHead>
            {roles.map((role) => (
              <TableHead key={role} className="text-center">
                {role}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {flatPerms.map(({ item, depth }) => (
            <TableRow key={item.key} className={depth > 0 ? "bg-muted/20" : ""}>
              <TableCell className="text-sm font-medium">
                <span style={{ paddingLeft: depth * 20 }}>{item.label}</span>
              </TableCell>
              {roles.map((role) => {
                const checked = (value[item.key] ?? []).includes(role);
                return (
                  <TableCell key={role} className="text-center">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggle(item.key, role)}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { PermissionMatrix };
export type { PermissionMatrixProps, PermissionItem };
