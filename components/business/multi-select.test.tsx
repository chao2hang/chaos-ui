import { describe, it, expect } from "vitest";
import { MultiSelect } from "./multi-select";
import type { MultiSelectOption } from "./multi-select";

describe("multi-select", () => {
  it("exports MultiSelect", () => {
    expect(MultiSelect).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MultiSelectOption | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
