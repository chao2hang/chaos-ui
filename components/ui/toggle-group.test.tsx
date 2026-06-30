import { describe, it, expect } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("toggle-group", () => {
  it("exports ToggleGroup", () => {
    expect(ToggleGroup).toBeDefined();
  });

  it("exports ToggleGroupItem", () => {
    expect(ToggleGroupItem).toBeDefined();
  });
});
