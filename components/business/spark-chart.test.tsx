import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SparkChart } from "./spark-chart";
import type { SparkChartProps } from "./spark-chart";

describe("SparkChart", () => {
  it("renders an svg with data-slot", () => {
    const { container } = render(<SparkChart data={[3, 6, 4, 8, 7, 10]} />);
    const svg = container.querySelector('[data-slot="spark-chart"]');
    expect(svg).not.toBeNull();
    expect(svg?.tagName.toLowerCase()).toBe("svg");
  });

  it("renders default data when omitted", () => {
    const { container } = render(<SparkChart />);
    const svg = container.querySelector('[data-slot="spark-chart"]');
    expect(svg).not.toBeNull();
  });

  it("exports types", () => {
    const _t: SparkChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
