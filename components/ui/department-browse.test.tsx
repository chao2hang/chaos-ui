import { describe, it, expect } from "vitest";
import { DepartmentBrowse } from "./department-browse";
import type { Department, DepartmentBrowseProps } from "./department-browse";

describe("department-browse", () => {
  it("exports DepartmentBrowse", () => {
    expect(DepartmentBrowse).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: Department | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: DepartmentBrowseProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
