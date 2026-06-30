import { describe, it, expect } from "vitest";
import { AdminHeader } from "./admin-header";
import type { AdminHeaderProps, BreadcrumbItem } from "./admin-header";

describe("admin-header", () => {
  it("exports AdminHeader", () => {
    expect(AdminHeader).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AdminHeaderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: BreadcrumbItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
