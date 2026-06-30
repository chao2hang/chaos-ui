import { describe, it, expect } from "vitest";
import {
  PermissionWrapper,
  PermissionButton,
  withPermission,
} from "./permission-wrapper";
import type {
  PermissionWrapperProps,
  PermissionButtonProps,
} from "./permission-wrapper";

describe("permission-wrapper", () => {
  it("exports PermissionWrapper", () => {
    expect(PermissionWrapper).toBeDefined();
  });

  it("exports PermissionButton", () => {
    expect(PermissionButton).toBeDefined();
  });

  it("exports withPermission", () => {
    expect(withPermission).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PermissionWrapperProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: PermissionButtonProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
