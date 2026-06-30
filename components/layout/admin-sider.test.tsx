import { describe, it, expect } from "vitest";
import { AdminSider } from "./admin-sider";
import type { AdminSiderProps, MenuItem } from "./admin-sider";

describe("admin-sider", () => {
  it("exports AdminSider", () => {
    expect(AdminSider).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AdminSiderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: MenuItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
