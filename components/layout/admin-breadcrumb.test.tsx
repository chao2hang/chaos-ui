import { describe, it, expect } from "vitest";
import { AdminBreadcrumb } from "./admin-breadcrumb";
import type { AdminBreadcrumbProps } from "./admin-breadcrumb";

describe("admin-breadcrumb", () => {
  it("exports AdminBreadcrumb", () => {
    expect(AdminBreadcrumb).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AdminBreadcrumbProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
