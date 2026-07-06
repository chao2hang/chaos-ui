"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UsersIcon, ShieldIcon } from "lucide-react";

export interface Role {
  id: string;
  name: string;
  description?: string;
}

interface RoleAssignmentProps extends React.ComponentProps<"div"> {
  roles: Role[];
  assigned: string[];
  onChange?: (assigned: string[]) => void;
  className?: string;
}

function RoleAssignment({
  roles,
  assigned,
  onChange,
  className,
  ...props
}: RoleAssignmentProps) {
  const toggle = (roleId: string) => {
    const next = assigned.includes(roleId)
      ? assigned.filter((r) => r !== roleId)
      : [...assigned, roleId];
    onChange?.(next);
  };

  return (
    <div
      data-slot="role-assignment"
      className={cn("space-y-2", className)}
      {...props}
    >
      <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
        <ShieldIcon className="size-4" />
        <span>
          已分配 {assigned.length}/{roles.length} 个角色
        </span>
      </div>
      {roles.map((role) => (
        <label
          key={role.id}
          className={cn(
            "hover:bg-muted/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
            assigned.includes(role.id) && "border-primary/50 bg-primary/5",
          )}
        >
          <Checkbox
            checked={assigned.includes(role.id)}
            onCheckedChange={() => toggle(role.id)}
            className="mt-0.5"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <UsersIcon className="text-muted-foreground size-4" />
              <span className="text-sm font-medium">{role.name}</span>
            </div>
            {role.description && (
              <p className="text-muted-foreground mt-0.5 text-xs">
                {role.description}
              </p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

export { RoleAssignment };
export type { RoleAssignmentProps, Role };
