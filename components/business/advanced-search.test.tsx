import { describe, it, expect } from "vitest";
import { AdvancedSearch } from "./advanced-search";
import type {
  AdvancedSearchField,
  AdvancedSearchValues,
  SavedSearch,
  AdvancedSearchProps,
} from "./advanced-search";

describe("advanced-search", () => {
  it("exports AdvancedSearch", () => {
    expect(AdvancedSearch).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AdvancedSearchField | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: AdvancedSearchValues | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: SavedSearch | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: AdvancedSearchProps | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });
});
