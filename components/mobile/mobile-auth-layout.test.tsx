import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileAuthLayout } from "./mobile-auth-layout";
import type { MobileAuthLayoutProps } from "./mobile-auth-layout";

describe("MobileAuthLayout", () => {
  it("renders children", () => {
    render(<MobileAuthLayout><p>Sign in</p></MobileAuthLayout>);
    expect(screen.getByText("Sign in")).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileAuthLayoutProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
