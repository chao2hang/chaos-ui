import { describe, it, expect } from "vitest";
import { FormList } from "./form-list";
import type { FormListItem, FormListProps } from "./form-list";

describe("form-list", () => {
  it("exports FormList", () => {
    expect(FormList).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FormListItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FormListProps<FormListItem> | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
