export type Role = "admin" | "manager" | "editor" | "viewer" | "guest"

export const ROLE_RANK: Record<Role, number> = {
  guest: 0,
  viewer: 1,
  editor: 2,
  manager: 3,
  admin: 4,
}

export type Permission =
  | "read"
  | "create"
  | "update"
  | "delete"
  | "publish"
  | "export"
  | "import"
  | "manage_users"
  | "manage_roles"
  | "manage_settings"

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  guest: ["read"],
  viewer: ["read", "export"],
  editor: ["read", "create", "update", "export"],
  manager: ["read", "create", "update", "delete", "publish", "export", "import"],
  admin: [
    "read",
    "create",
    "update",
    "delete",
    "publish",
    "export",
    "import",
    "manage_users",
    "manage_roles",
    "manage_settings",
  ],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p))
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p))
}

export function isAtLeast(role: Role, min: Role): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[min]
}

export function canAccess(role: Role, min: Role): boolean {
  return isAtLeast(role, min)
}
