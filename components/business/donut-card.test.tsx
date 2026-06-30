import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DonutCard } from "./donut-card";
import type { DonutCardProps } from "./donut-card";

describe("DonutCard", () => {
  it("renders segments and center label", () => {
    render(
      <DonutCard
        centerLabel="总计"
        data={[
          { label: "已完成", value: 60, color: "#3b82f6" },
          { label: "待处理", value: 30, color: "#f59e0b" },
        ]}
      />,
    );
    expect(screen.getByText("总计")).toBeDefined();
    expect(screen.getByText("已完成")).toBeDefined();
    expect(screen.getByText("待处理")).toBeDefined();
  });

  it("exports types", () => {
    const _t: DonutCardProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
