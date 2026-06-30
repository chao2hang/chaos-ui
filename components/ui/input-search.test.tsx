import { describe, it, expect } from "vitest";
import { InputSearch } from "./input-search";
import type { InputSearchProps } from "./input-search";

describe("input-search", () => {
  it("exports InputSearch", () => {
    expect(InputSearch).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: InputSearchProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
