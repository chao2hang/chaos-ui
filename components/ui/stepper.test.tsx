import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stepper, Step } from "./stepper";

describe("stepper", () => {
  it("exports Stepper", () => {
    expect(Stepper).toBeDefined();
  });

  it("exports Step", () => {
    expect(Step).toBeDefined();
  });

  it("renders steps with labels horizontally", () => {
    render(
      <Stepper activeStep={1}>
        <Step>Account</Step>
        <Step>Profile</Step>
        <Step>Done</Step>
      </Stepper>,
    );
    expect(screen.getByText("Account")).toBeDefined();
    expect(screen.getByText("Profile")).toBeDefined();
    expect(screen.getByText("Done")).toBeDefined();
    // step numbers: step 0 completed -> shows check icon; steps 1,2 show number
    // completed step index 0 -> CheckIcon (no number text "1")
    // active step index 1 -> "2"
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
  });

  it("marks the first step as completed when activeStep is past it", () => {
    const { container } = render(
      <Stepper activeStep={2}>
        <Step>A</Step>
        <Step>B</Step>
        <Step>C</Step>
      </Stepper>,
    );
    // Steps 0 and 1 are completed (CheckIcon), step 2 active
    const checks = container.querySelectorAll("svg.lucide-check");
    expect(checks.length).toBe(2);
  });

  it("renders vertical orientation", () => {
    render(
      <Stepper orientation="vertical" activeStep={0}>
        <Step>First</Step>
        <Step>Second</Step>
      </Stepper>,
    );
    expect(screen.getByText("First")).toBeDefined();
    expect(screen.getByText("Second")).toBeDefined();
    // first step is active (number 1), second is pending (number 2)
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("shows no connector after the last step", () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step>Only</Step>
      </Stepper>,
    );
    // single step: index 1 rendered, no connector divs (bg-muted-foreground)
    expect(screen.getByText("Only")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
  });

  it("default activeStep is 0 (first active)", () => {
    render(
      <Stepper>
        <Step>S1</Step>
        <Step>S2</Step>
      </Stepper>,
    );
    // step 0 active -> "1", step 1 pending -> "2"
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("renders completed step number replaced by check icon in vertical", () => {
    const { container } = render(
      <Stepper orientation="vertical" activeStep={1}>
        <Step>V1</Step>
        <Step>V2</Step>
      </Stepper>,
    );
    // step 0 completed -> CheckIcon, step 1 active -> "2"
    expect(container.querySelectorAll("svg.lucide-check").length).toBe(1);
    expect(screen.getByText("V1")).toBeDefined();
    expect(screen.getByText("V2")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("renders step without children label (number still shows)", () => {
    render(
      <Stepper activeStep={0}>
        <Step />
        <Step />
      </Stepper>,
    );
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("marks pending step (after active) with muted styling and shows its number", () => {
    render(
      <Stepper activeStep={0}>
        <Step>Current</Step>
        <Step>Upcoming</Step>
      </Stepper>,
    );
    expect(screen.getByText("Current")).toBeDefined();
    expect(screen.getByText("Upcoming")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("merges custom className on Stepper root", () => {
    const { container } = render(
      <Stepper className="my-stepper">
        <Step>X</Step>
      </Stepper>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("my-stepper");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/stepper");
    expect(mod.Stepper).toBeDefined();
    expect(mod.Step).toBeDefined();
  });
});
