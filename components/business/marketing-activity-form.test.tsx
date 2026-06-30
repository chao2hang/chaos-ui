import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MarketingActivityForm } from "./marketing-activity-form";
import type { MarketingActivityFormProps } from "./marketing-activity-form";

describe("MarketingActivityForm", () => {
  it("exports a Props type", () => {
    const t: MarketingActivityFormProps = { initial: { name: "x" } };
    expect(t.initial).toBeDefined();
  });

  it("renders the activity heading and submit button", () => {
    render(<MarketingActivityForm />);
    expect(screen.getByText("营销活动")).toBeDefined();
    expect(screen.getByRole("button", { name: "提交" })).toBeDefined();
  });

  it("renders labels for the form fields", () => {
    render(<MarketingActivityForm />);
    expect(screen.getByText("活动名称")).toBeDefined();
    expect(screen.getByText("活动类型")).toBeDefined();
    expect(screen.getByText("预算（元）")).toBeDefined();
    expect(screen.getByText("开始日期")).toBeDefined();
    expect(screen.getByText("结束日期")).toBeDefined();
    expect(screen.getByText("立即启用")).toBeDefined();
    expect(screen.getByText("备注")).toBeDefined();
  });
});
