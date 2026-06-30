import { describe, it, expect } from "vitest";
import { QuickEntryGrid } from "./quick-entry-grid";
import type { QuickEntryGridProps } from "./quick-entry-grid";

describe("quick-entry-grid", () => {
  it("exports QuickEntryGrid", () => {
    expect(QuickEntryGrid).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: QuickEntryGridProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
