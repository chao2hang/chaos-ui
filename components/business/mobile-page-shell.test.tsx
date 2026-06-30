import { describe, it, expect } from "vitest";
import { MobilePageShell } from "./mobile-page-shell";
import type { MobilePageShellProps } from "./mobile-page-shell";

describe("mobile-page-shell", () => {
  it("exports MobilePageShell", () => {
    expect(MobilePageShell).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobilePageShellProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
