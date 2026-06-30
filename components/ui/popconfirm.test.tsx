import { describe, it, expect } from "vitest";
import { Popconfirm } from "./popconfirm";
import type { PopconfirmProps } from "./popconfirm";

describe("popconfirm", () => {
  it("exports Popconfirm", () => {
    expect(Popconfirm).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PopconfirmProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
