"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import { Badge } from "@/components/ui";
import { Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface RoleAssignmentPrincipal {
  id: string;
  name: string;
  description?: string;
}

export interface RoleAssignmentRole {
  id: string;
  label: string;
  description?: string;
}

export type RoleAssignmentValue = Record<string, string[]>;

export interface RoleAssignmentProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  principals: RoleAssignmentPrincipal[];
  roles: RoleAssignmentRole[];
  value: RoleAssignmentValue;
  onChange?: (value: RoleAssignmentValue) => void;
  readOnly?: boolean;
}

/**
 * @component RoleAssignment
 * @category business/bill
 * @since 0.2.0
 * @description Assign roles to principals (users/groups) with checkbox toggles / 为主体质（用户/组）分配角色，支持复选框切换
 * @keywords role, assignment, principal, user, group, permission
 * @example
 * <RoleAssignment principals={users} roles={roles} value={assignments} onChange={setAssignments} />
 */
export function RoleAssignment({
  principals,
  roles,
  value,
  onChange,
  readOnly,
  className,
  ...props
}: RoleAssignmentProps) {
  const { t } = useTranslation("transfer");
  const toggle = (principalId: string, roleId: string) => {
    if (readOnly) return;
    const current = value[principalId] ?? [];
    const next = current.includes(roleId)
      ? current.filter((item) => item !== roleId)
      : [...current, roleId];
    onChange?.({ ...value, [principalId]: next });
  };

  return (
    <div
      data-slot="role-assignment"
      className={cn("space-y-3", className)}
      {...props}
    >
      {principals.map((principal) => (
        <div key={principal.id} className="rounded-lg border p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{principal.name}</p>
              {principal.description && (
                <p className="text-muted-foreground text-xs">
                  {principal.description}
                </p>
              )}
            </div>
            <Badge variant="outline">
              {(value[principal.id] ?? []).length} {t("roleAssignment.roles")}
            </Badge>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {roles.map((role) => (
              <label
                key={role.id}
                className="flex items-start gap-2 rounded-md border p-3"
              >
                <Checkbox
                  checked={(value[principal.id] ?? []).includes(role.id)}
                  disabled={readOnly}
                  onCheckedChange={() => toggle(principal.id, role.id)}
                />
                <span>
                  <span className="block text-sm font-medium">
                    {role.label}
                  </span>
                  {role.description && (
                    <span className="text-muted-foreground block text-xs">
                      {role.description}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
