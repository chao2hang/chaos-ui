import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WizardLayout } from "./wizard-layout";

const steps = [
  { id: "info", title: "信息", description: "填写信息" },
  { id: "confirm", title: "确认", description: "确认信息" },
  { id: "done", title: "完成" },
];

describe("WizardLayout", () => {
  it("renders all step titles", () => {
    render(
      <WizardLayout steps={steps} current={0}>
        <p>Body</p>
      </WizardLayout>,
    );
    expect(screen.getByText("信息")).toBeDefined();
    expect(screen.getByText("确认")).toBeDefined();
    expect(screen.getByText("完成")).toBeDefined();
  });

  it("marks the current step with aria-current=step", () => {
    render(
      <WizardLayout steps={steps} current={1}>
        <p>Body</p>
      </WizardLayout>,
    );
    const currentItems = screen
      .getAllByRole("listitem")
      .filter((li) => li.getAttribute("aria-current") === "step");
    expect(currentItems).toHaveLength(1);
    expect(currentItems[0]!.textContent).toContain("确认");
  });

  it("shows check icon for completed steps", () => {
    render(
      <WizardLayout steps={steps} current={2}>
        <p>Body</p>
      </WizardLayout>,
    );
    const svg = document.querySelectorAll("svg");
    expect(svg.length).toBeGreaterThanOrEqual(2);
  });

  it("renders children content", () => {
    render(
      <WizardLayout steps={steps} current={0}>
        <p>Step body</p>
      </WizardLayout>,
    );
    expect(screen.getByText("Step body")).toBeDefined();
  });
});
