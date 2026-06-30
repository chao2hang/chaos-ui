import { describe, it, expect } from "vitest";
import { Combobox } from "./combobox";
import type { ComboboxOption } from "./combobox";

describe("combobox", () => {
  it("exports Combobox", () => {
    expect(Combobox).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ComboboxOption | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
