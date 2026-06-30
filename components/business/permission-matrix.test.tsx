import { describe, it, expect } from "vitest";
import { PermissionMatrix } from "./permission-matrix";
import type {
  PermissionMatrixRole,
  PermissionMatrixResource,
  PermissionMatrixValue,
  PermissionMatrixProps,
} from "./permission-matrix";

describe("permission-matrix", () => {
  it("exports PermissionMatrix", () => {
    expect(PermissionMatrix).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PermissionMatrixRole | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: PermissionMatrixResource | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: PermissionMatrixValue | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: PermissionMatrixProps | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });
});
