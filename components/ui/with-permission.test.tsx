import { describe, it, expect } from "vitest";
import { WithPermission } from "./with-permission";
import type { WithPermissionProps } from "./with-permission";

describe("with-permission", () => {
  it("exports WithPermission", () => {
    expect(WithPermission).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WithPermissionProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
