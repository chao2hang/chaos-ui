import { describe, it, expect } from "vitest";
import { InventorySnapshot } from "./inventory-snapshot";
import type { InventorySnapshotProps } from "./inventory-snapshot";

describe("inventory-snapshot", () => {
  it("exports InventorySnapshot", () => {
    expect(InventorySnapshot).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: InventorySnapshotProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
