import { describe, it, expect } from "vitest";
import { PermissionButton } from "./permission-button";
import type { PermissionButtonProps } from "./permission-button";

describe("permission-button", () => {
  it("exports PermissionButton", () => {
    expect(PermissionButton).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PermissionButtonProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
