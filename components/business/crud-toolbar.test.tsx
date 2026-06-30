import { describe, it, expect } from "vitest";
import { CrudToolbar } from "./crud-toolbar";
import type { CrudToolbarProps, CrudToolbarAction } from "./crud-toolbar";

describe("crud-toolbar", () => {
  it("exports CrudToolbar", () => {
    expect(CrudToolbar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CrudToolbarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CrudToolbarAction | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
