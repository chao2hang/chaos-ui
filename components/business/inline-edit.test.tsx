import { describe, it, expect } from "vitest";
import { InlineEdit } from "./inline-edit";
import type { InlineEditProps } from "./inline-edit";

describe("inline-edit", () => {
  it("exports InlineEdit", () => {
    expect(InlineEdit).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: InlineEditProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
