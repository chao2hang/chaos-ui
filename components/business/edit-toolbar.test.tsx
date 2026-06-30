import { describe, it, expect } from "vitest";
import { EditToolbar } from "./edit-toolbar";
import type { EditToolbarProps } from "./edit-toolbar";

describe("edit-toolbar", () => {
  it("exports EditToolbar", () => {
    expect(EditToolbar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: EditToolbarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
