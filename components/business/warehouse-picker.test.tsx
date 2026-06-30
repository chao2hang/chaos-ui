import { describe, it, expect } from "vitest";
import { WarehousePicker } from "./warehouse-picker";
import type { WarehousePickerProps } from "./warehouse-picker";

describe("warehouse-picker", () => {
  it("exports WarehousePicker", () => {
    expect(WarehousePicker).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WarehousePickerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
