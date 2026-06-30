import { describe, it, expect } from "vitest";
import {} from "./bill-page";
import type { BillStatus } from "./bill-page";

describe("bill-page", () => {
  it("exports types", () => {
    const _tc1: BillStatus | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
