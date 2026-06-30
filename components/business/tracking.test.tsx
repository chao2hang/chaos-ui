import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tracking } from "./tracking";

describe("Tracking", () => {
  it("renders the label and actual/target values", () => {
    render(<Tracking target={100} actual={76} label="回款率" />);
    expect(screen.getByText("回款率")).toBeDefined();
    expect(screen.getByText("76")).toBeDefined();
    expect(screen.getByText(/100/)).toBeDefined();
  });

  it("renders the achievement percentage", () => {
    render(<Tracking target={100} actual={76} label="回款率" />);
    expect(screen.getByText("76.0%")).toBeDefined();
  });

  it("renders an accessible group labelled with the tracking name", () => {
    render(<Tracking target={100} actual={76} label="回款率" />);
    expect(screen.getByRole("group", { name: "回款率 追踪" })).toBeDefined();
  });

  it("uses a default label when none is provided", () => {
    render(<Tracking target={100} actual={76} />);
    expect(screen.getByText("追踪项")).toBeDefined();
  });
});
