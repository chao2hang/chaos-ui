import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeltaBar } from "./delta-bar";
import type { DeltaBarProps } from "./delta-bar";

describe("DeltaBar", () => {
  it("renders label and positive delta", () => {
    render(<DeltaBar value={42} maxValue={100} label="增长率" />);
    expect(screen.getByText("增长率")).toBeDefined();
  });

  it("renders without a label", () => {
    render(<DeltaBar value={-10} maxValue={50} />);
    const bar = document.querySelector('[data-slot="delta-bar"]');
    expect(bar).not.toBeNull();
  });

  it("exports types", () => {
    const _t: DeltaBarProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
