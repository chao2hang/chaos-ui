import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TargetProgress } from "./target-progress";

describe("TargetProgress", () => {
  it("renders the actual/target values and period", () => {
    render(<TargetProgress target={100000} actual={78000} period="2026 年 6 月" />);
    expect(screen.getByText("目标进度")).toBeDefined();
    expect(screen.getByText("2026 年 6 月")).toBeDefined();
    expect(screen.getByText("78,000")).toBeDefined();
    expect(screen.getByText(/100,000/)).toBeDefined();
  });

  it("renders the completion percentage", () => {
    render(<TargetProgress target={100000} actual={78000} />);
    expect(screen.getByText("78.0%")).toBeDefined();
  });

  it("shows the deficit message when below target", () => {
    render(<TargetProgress target={100000} actual={78000} />);
    expect(screen.getByText("还差 22,000 达成目标")).toBeDefined();
  });

  it("shows the achieved message and progressbar value when meeting target", () => {
    render(<TargetProgress target={100000} actual={100000} />);
    expect(screen.getByText("已达成目标")).toBeDefined();
    const bar = screen.getByRole("progressbar", { name: "目标完成率" });
    expect(bar.getAttribute("aria-valuenow")).toBe("100");
  });
});
