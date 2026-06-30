import { describe, it, expect } from "vitest";
import { SettlementStatusTag } from "./settlement-status-tag";
import type { SettlementStatusTagProps } from "./settlement-status-tag";

describe("settlement-status-tag", () => {
  it("exports SettlementStatusTag", () => {
    expect(SettlementStatusTag).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SettlementStatusTagProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
