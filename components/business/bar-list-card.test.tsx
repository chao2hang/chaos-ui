import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BarListCard } from "./bar-list-card";
import type { BarListCardProps } from "./bar-list-card";

describe("BarListCard", () => {
  it("renders title and ranked entries", () => {
    render(
      <BarListCard
        title="销量榜"
        data={[
          { label: "华北", value: 80 },
          { label: "华东", value: 42 },
        ]}
      />,
    );
    expect(screen.getByText("销量榜")).toBeDefined();
    expect(screen.getByText("华北")).toBeDefined();
    expect(screen.getByText("华东")).toBeDefined();
  });

  it("exports types", () => {
    const _t: BarListCardProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
