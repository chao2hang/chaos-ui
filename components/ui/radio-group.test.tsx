import { describe, it, expect } from "vitest";
import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("radio-group", () => {
  it("exports RadioGroup", () => {
    expect(RadioGroup).toBeDefined();
  });

  it("exports RadioGroupItem", () => {
    expect(RadioGroupItem).toBeDefined();
  });
});
