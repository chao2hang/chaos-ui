import { describe, it, expect, vi } from "vitest";
import {
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  ChartContainer,
  ChartTooltip,
  defaultColors,
  brandColors,
  statusColors,
} from "./chart";

// Mock recharts to avoid canvas/SVG rendering issues in jsdom
vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({
    children,
    data,
  }: {
    children: React.ReactNode;
    data: unknown[];
  }) => (
    <div data-testid="line-chart" data-len={data?.length}>
      {children}
    </div>
  ),
  Line: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="line" data-key={dataKey} />
  ),
  BarChart: ({
    children,
    data,
  }: {
    children: React.ReactNode;
    data: unknown[];
  }) => (
    <div data-testid="bar-chart" data-len={data?.length}>
      {children}
    </div>
  ),
  Bar: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="bar" data-key={dataKey} />
  ),
  AreaChart: ({
    children,
    data,
  }: {
    children: React.ReactNode;
    data: unknown[];
  }) => (
    <div data-testid="area-chart" data-len={data?.length}>
      {children}
    </div>
  ),
  Area: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="area" data-key={dataKey} />
  ),
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: ({ data, dataKey }: { data: unknown[]; dataKey: string }) => (
    <div data-testid="pie" data-key={dataKey} data-len={data?.length} />
  ),
  Cell: ({ fill }: { fill: string }) => (
    <div data-testid="cell" data-fill={fill} />
  ),
  Tooltip: ({ content }: { content: React.ReactNode }) => (
    <div data-testid="tooltip">{content}</div>
  ),
  Legend: () => <div data-testid="legend" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  XAxis: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="x-axis" data-key={dataKey} />
  ),
  YAxis: () => <div data-testid="y-axis" />,
}));

import { render, screen } from "@testing-library/react";

const sampleData = [
  { month: "Jan", sales: 100, profit: 40 },
  { month: "Feb", sales: 120, profit: 50 },
];

describe("chart", () => {
  it("exports LineChart", () => {
    expect(LineChart).toBeDefined();
  });

  it("exports BarChart", () => {
    expect(BarChart).toBeDefined();
  });

  it("exports AreaChart", () => {
    expect(AreaChart).toBeDefined();
  });

  it("exports PieChart", () => {
    expect(PieChart).toBeDefined();
  });

  it("exports ChartContainer", () => {
    expect(ChartContainer).toBeDefined();
  });

  it("exports ChartTooltip", () => {
    expect(ChartTooltip).toBeDefined();
  });

  it("exports defaultColors", () => {
    expect(defaultColors).toBeDefined();
    expect(Array.isArray(defaultColors)).toBe(true);
    expect(defaultColors.length).toBe(5);
  });

  it("exports brandColors", () => {
    expect(brandColors).toBeDefined();
    expect(Array.isArray(brandColors)).toBe(true);
    expect(brandColors.length).toBe(5);
  });

  it("exports statusColors", () => {
    expect(statusColors).toBeDefined();
    expect(Array.isArray(statusColors)).toBe(true);
    expect(statusColors.length).toBe(5);
  });

  it("renders LineChart with data", () => {
    render(
      <LineChart
        data={sampleData}
        categories={["sales", "profit"]}
        index="month"
      />,
    );
    expect(screen.getByTestId("line-chart")).toBeDefined();
    expect(screen.getByTestId("line-chart").getAttribute("data-len")).toBe("2");
  });

  it("renders BarChart with data", () => {
    render(
      <BarChart
        data={sampleData}
        categories={["sales", "profit"]}
        index="month"
      />,
    );
    expect(screen.getByTestId("bar-chart")).toBeDefined();
  });

  it("renders BarChart with stacked prop", () => {
    render(
      <BarChart
        data={sampleData}
        categories={["sales"]}
        index="month"
        stacked
      />,
    );
    expect(screen.getByTestId("bar-chart")).toBeDefined();
  });

  it("renders AreaChart with data", () => {
    render(
      <AreaChart data={sampleData} categories={["sales"]} index="month" />,
    );
    expect(screen.getByTestId("area-chart")).toBeDefined();
  });

  it("renders PieChart with data", () => {
    render(<PieChart data={sampleData} category="sales" index="month" />);
    expect(screen.getByTestId("pie-chart")).toBeDefined();
  });

  it("renders ChartContainer with children", () => {
    render(
      <ChartContainer>
        <div data-testid="child">content</div>
      </ChartContainer>,
    );
    expect(screen.getByTestId("child")).toBeDefined();
    expect(screen.getByTestId("responsive-container")).toBeDefined();
  });

  it("renders ChartContainer with custom className", () => {
    const { container } = render(
      <ChartContainer className="my-chart">
        <div>content</div>
      </ChartContainer>,
    );
    expect(container.querySelector(".my-chart")).not.toBeNull();
  });

  it("ChartTooltip returns null when inactive", () => {
    const { container } = render(
      <ChartTooltip active={false} payload={[]} label="" />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("ChartTooltip returns null when payload is empty", () => {
    const { container } = render(
      <ChartTooltip active payload={[]} label="Jan" />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("ChartTooltip renders with active payload", () => {
    render(
      <ChartTooltip
        active
        payload={[{ color: "#ff0000", name: "Sales", value: 100 }]}
        label="Jan"
      />,
    );
    expect(screen.getByText("Jan")).toBeDefined();
    expect(screen.getByText("Sales:")).toBeDefined();
    expect(screen.getByText("100")).toBeDefined();
  });

  it("ChartTooltip uses custom formatter", () => {
    render(
      <ChartTooltip
        active
        payload={[{ color: "#ff0000", name: "Sales", value: 100 }]}
        label="Jan"
        formatter={(v) => `$${v}`}
      />,
    );
    expect(screen.getByText("$100")).toBeDefined();
  });

  it("ChartTooltip handles undefined value with formatter", () => {
    render(
      <ChartTooltip
        active
        payload={[{ color: "#000", name: "Test", value: undefined }]}
        label="X"
      />,
    );
    expect(screen.getByText("Test:")).toBeDefined();
  });

  it("renders LineChart with custom colors", () => {
    render(
      <LineChart
        data={sampleData}
        categories={["sales"]}
        index="month"
        colors={brandColors}
      />,
    );
    expect(screen.getByTestId("line-chart")).toBeDefined();
  });

  it("renders charts with custom className", () => {
    const { container } = render(
      <LineChart
        data={sampleData}
        categories={["sales"]}
        index="month"
        className="my-line-chart"
      />,
    );
    expect(container.querySelector(".my-line-chart")).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/chart");
    expect(mod.LineChart).toBeDefined();
    expect(mod.BarChart).toBeDefined();
    expect(mod.AreaChart).toBeDefined();
    expect(mod.PieChart).toBeDefined();
  });
});
