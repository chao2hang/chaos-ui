import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChartCard } from "./chart-card";
import type { ChartCardProps } from "./chart-card";

describe("ChartCard", () => {
  it("renders title, description and children", () => {
    render(
      <ChartCard title="月度营收" description="单位：万元">
        <p>图表区域</p>
      </ChartCard>,
    );
    expect(screen.getByText("月度营收")).toBeDefined();
    expect(screen.getByText("单位：万元")).toBeDefined();
    expect(screen.getByText("图表区域")).toBeDefined();
  });

  it("renders footer when provided", () => {
    render(
      <ChartCard title="T" footer={<span>数据来源</span>}>
        body
      </ChartCard>,
    );
    expect(screen.getByText("数据来源")).toBeDefined();
  });

  it("exports types", () => {
    const _t: ChartCardProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
