import { describe, it, expect } from "vitest";
import {
  PermissionProvider,
  usePermission,
  PermissionContext,
} from "./use-permission";

describe("use-permission", () => {
  it("exports PermissionProvider", () => {
    expect(PermissionProvider).toBeDefined();
  });
  it("exports usePermission", () => {
    expect(usePermission).toBeDefined();
  });
  it("exports PermissionContext", () => {
    expect(PermissionContext).toBeDefined();
  });
});
