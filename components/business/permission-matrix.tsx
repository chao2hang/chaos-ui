"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import { Checkbox } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export interface PermissionMatrixRole {
  id: string;
  label: string;
}

export interface PermissionMatrixResource {
  id: string;
  label: string;
  description?: string;
  permissions: string[];
}

export type PermissionMatrixValue = Record<string, Record<string, string[]>>;

export interface PermissionMatrixProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  roles: PermissionMatrixRole[];
  resources: PermissionMatrixResource[];
  value: PermissionMatrixValue;
  onChange?: (value: PermissionMatrixValue) => void;
  readOnly?: boolean;
}

/**
 * @component PermissionMatrix
 * @category business/bill
 * @since 0.2.0
 * @description Role-based permission matrix with toggle checkboxes / 基于角色的权限矩阵，支持复选框切换
 * @keywords permission, role, matrix, checkbox, acl
 * @example
 * <PermissionMatrix roles={roles} resources={resources} value={value} onChange={setValue} />
 */
export function PermissionMatrix({
  roles,
  resources,
  value,
  onChange,
  readOnly,
  className,
  ...props
}: PermissionMatrixProps) {
  const { t } = useTranslation("transfer");
  const toggle = (roleId: string, resourceId: string, permission: string) => {
    if (readOnly) return;
    const roleValue = value[roleId] ?? {};
    const current = roleValue[resourceId] ?? [];
    const nextPermissions = current.includes(permission)
      ? current.filter((item) => item !== permission)
      : [...current, permission];

    onChange?.({
      ...value,
      [roleId]: {
        ...roleValue,
        [resourceId]: nextPermissions,
      },
    });
  };

  return (
    <div
      data-slot="permission-matrix"
      className={cn("overflow-x-auto rounded-lg border", className)}
      {...props}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-48">
              {t("permissionMatrix.resource")}
            </TableHead>
            {roles.map((role) => (
              <TableHead key={role.id} className="min-w-40 text-center">
                {role.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell>
                <div>
                  <p className="text-sm font-medium">{resource.label}</p>
                  {resource.description && (
                    <p className="text-muted-foreground text-xs">
                      {resource.description}
                    </p>
                  )}
                </div>
              </TableCell>
              {roles.map((role) => (
                <TableCell key={role.id} className="align-top">
                  <div className="flex flex-col gap-2">
                    {resource.permissions.map((permission) => (
                      <label
                        key={permission}
                        className="flex items-center justify-center gap-2 text-xs"
                      >
                        <Checkbox
                          checked={(
                            value[role.id]?.[resource.id] ?? []
                          ).includes(permission)}
                          disabled={readOnly}
                          onCheckedChange={() =>
                            toggle(role.id, resource.id, permission)
                          }
                        />
                        <span>{permission}</span>
                      </label>
                    ))}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
