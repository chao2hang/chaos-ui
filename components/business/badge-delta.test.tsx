import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BadgeDelta } from "./badge-delta";
import type { BadgeDeltaProps } from "./badge-delta";

describe("BadgeDelta", () => {
  it("renders a positive value with the default percent suffix", () => {
    render(<BadgeDelta value={5} />);
    expect(screen.getByText("5%")).toBeDefined();
  });

  it("renders a negative value as its absolute magnitude", () => {
    render(<BadgeDelta value={-3} />);
    expect(screen.getByText("3%")).toBeDefined();
  });

  it("renders zero as flat", () => {
    render(<BadgeDelta value={0} />);
    expect(screen.getByText("0%")).toBeDefined();
  });

  it("renders a custom suffix and prefix", () => {
    render(<BadgeDelta value={12} suffix="pt" prefix="+" />);
    expect(screen.getByText("+12pt")).toBeDefined();
  });

  it("renders the data-slot on the root element", () => {
    const { container } = render(<BadgeDelta value={5} />);
    expect(container.querySelector('[data-slot="badge-delta"]')).toBeDefined();
  });

  it("exports types", () => {
    const _tc: BadgeDeltaProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
