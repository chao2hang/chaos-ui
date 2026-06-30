import { describe, it, expect } from "vitest";
import { SerialNumberManager } from "./serial-number-manager";
import type { SerialNumberManagerProps } from "./serial-number-manager";

describe("serial-number-manager", () => {
  it("exports SerialNumberManager", () => {
    expect(SerialNumberManager).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SerialNumberManagerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
