import { describe, it, expect } from "vitest";
import { AuthLayout } from "./auth-layout";
import type { AuthLayoutProps } from "./auth-layout";

describe("auth-layout", () => {
  it("exports AuthLayout", () => {
    expect(AuthLayout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AuthLayoutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
