import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileButton } from "./mobile-button";
import type { MobileButtonProps } from "./mobile-button";

describe("MobileButton", () => {
  it("renders text", () => {
    render(<MobileButton>Click me</MobileButton>);
    expect(screen.getByText("Click me")).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileButtonProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
