import { describe, it, expect } from "vitest";
import { BizStatusTag, defaultStatusMap } from "./biz-status-tag";
import type { BizStatusTagProps, BizStatus } from "./biz-status-tag";

describe("biz-status-tag", () => {
  it("exports BizStatusTag", () => {
    expect(BizStatusTag).toBeDefined();
  });

  it("exports defaultStatusMap", () => {
    expect(defaultStatusMap).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BizStatusTagProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: BizStatus | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
