import { describe, it, expect } from "vitest";
import { AuthGuard } from "./auth-guard";
import type { AuthGuardProps } from "./auth-guard";

describe("auth-guard", () => {
  it("exports AuthGuard", () => {
    expect(AuthGuard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AuthGuardProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
