import { describe, it, expect } from "vitest";
import { SavedFilters } from "./saved-filters";
import type { SavedFilter } from "./saved-filters";

describe("saved-filters", () => {
  it("exports SavedFilters", () => {
    expect(SavedFilters).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SavedFilter | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
