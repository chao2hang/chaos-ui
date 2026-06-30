import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobilePageShell } from "./mobile-page-shell";
import type { MobilePageShellProps } from "./mobile-page-shell";

describe("MobilePageShell", () => {
  it("renders the title in the header", () => {
    render(<MobilePageShell title="订单详情" />);
    expect(screen.getByText("订单详情")).toBeDefined();
  });

  it("renders a back button when onBack is provided", () => {
    render(<MobilePageShell title="详情" onBack={() => undefined} />);
    expect(screen.getByRole("button", { name: "返回" })).toBeDefined();
  });

  it("renders children in the body", () => {
    render(
      <MobilePageShell title="页">
        <p>主体内容</p>
      </MobilePageShell>,
    );
    expect(screen.getByText("主体内容")).toBeDefined();
  });

  it("invokes onBack when the back button is clicked", () => {
    let called = false;
    render(<MobilePageShell title="x" onBack={() => (called = true)} />);
    fireEvent.click(screen.getByRole("button", { name: "返回" }));
    expect(called).toBe(true);
  });

  it("exports types", () => {
    const _t: MobilePageShellProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
