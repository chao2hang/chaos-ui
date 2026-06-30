import { describe, it, expect } from "vitest";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  isAtLeast,
  canAccess,
  ROLE_RANK,
} from "@/lib/permissions";

describe("lib/permissions", () => {
  it("hasPermission", () => {
    expect(hasPermission("admin", "delete")).toBe(true);
    expect(hasPermission("guest", "create")).toBe(false);
  });
  it("hasAnyPermission", () => {
    expect(hasAnyPermission("viewer", ["read", "delete"])).toBe(true);
    expect(hasAnyPermission("guest", ["create", "delete"])).toBe(false);
  });
  it("hasAllPermissions", () => {
    expect(hasAllPermissions("editor", ["read", "create", "update"])).toBe(true);
    expect(hasAllPermissions("editor", ["read", "delete"])).toBe(false);
  });
  it("isAtLeast", () => {
    expect(isAtLeast("manager", "editor")).toBe(true);
    expect(isAtLeast("viewer", "editor")).toBe(false);
  });
  it("canAccess", () => {
    expect(canAccess("admin", "manager")).toBe(true);
    expect(canAccess("guest", "admin")).toBe(false);
  });
  it("ROLE_RANK ordering", () => {
    expect(ROLE_RANK.admin).toBeGreaterThan(ROLE_RANK.guest);
  });
});
