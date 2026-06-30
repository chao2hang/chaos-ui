import { describe, it, expect } from "vitest";
import { StatusTag, statusConfig } from "./status-tag";
import type { Status, StatusTagProps } from "./status-tag";

describe("status-tag", () => {
  it("exports StatusTag", () => {
    expect(StatusTag).toBeDefined();
  });

  it("exports statusConfig", () => {
    expect(statusConfig).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: Status | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: StatusTagProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
