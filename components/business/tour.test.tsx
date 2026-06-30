import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tour } from "./tour";
import type { TourStep } from "./tour";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("Tour", () => {
  it("exports Tour", () => {
    expect(Tour).toBeDefined();
  });

  it("exports types", () => {
    const _tc: TourStep | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the current step title and counter when open", () => {
    const targetEl = document.createElement("button");
    targetEl.textContent = "target";
    document.body.appendChild(targetEl);

    render(
      <Tour
        open
        steps={[
          { target: () => targetEl, title: "第一步", description: "描述一" },
          { target: () => targetEl, title: "第二步" },
        ]}
      />,
    );
    expect(screen.getByText("第一步")).toBeDefined();
    expect(screen.getByText("1 / 2")).toBeDefined();
    expect(screen.getByText("描述一")).toBeDefined();

    document.body.removeChild(targetEl);
  });

  it("renders nothing when open is false", () => {
    const targetEl = document.createElement("button");
    document.body.appendChild(targetEl);
    const { container } = render(
      <Tour open={false} steps={[{ target: () => targetEl, title: "X" }]} />,
    );
    expect(container.querySelector('[data-slot="tour"]')).toBeNull();
    document.body.removeChild(targetEl);
  });

  it("renders nothing when target element cannot be resolved", () => {
    const { container } = render(
      <Tour open steps={[{ target: ".does-not-exist", title: "X" }]} />,
    );
    expect(container.querySelector('[data-slot="tour"]')).toBeNull();
  });

  it("advances to the next step and shows complete button on last step", () => {
    const targetEl = document.createElement("button");
    document.body.appendChild(targetEl);
    render(
      <Tour
        open
        steps={[
          { target: () => targetEl, title: "一" },
          { target: () => targetEl, title: "二" },
        ]}
      />,
    );
    // First step: next button present.
    fireEvent.click(screen.getByText("tour.next"));
    expect(screen.getByText("二")).toBeDefined();
    // Last step: complete button present.
    expect(screen.getByText("tour.complete")).toBeDefined();
    document.body.removeChild(targetEl);
  });

  it("disables previous button on first step", () => {
    const targetEl = document.createElement("button");
    document.body.appendChild(targetEl);
    render(
      <Tour
        open
        steps={[
          { target: () => targetEl, title: "一" },
          { target: () => targetEl, title: "二" },
        ]}
      />,
    );
    const prev = screen.getByText("tour.previous").closest("button")!;
    expect(prev.disabled).toBe(true);
    document.body.removeChild(targetEl);
  });

  it("calls onComplete and closes when complete clicked", () => {
    const targetEl = document.createElement("button");
    document.body.appendChild(targetEl);
    const onComplete = vi.fn();
    const { container } = render(
      <Tour
        open
        onComplete={onComplete}
        steps={[{ target: () => targetEl, title: "一" }]}
      />,
    );
    fireEvent.click(screen.getByText("tour.complete"));
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[data-slot="tour"]')).toBeNull();
    document.body.removeChild(targetEl);
  });

  it("calls onSkip when skip clicked", () => {
    const targetEl = document.createElement("button");
    document.body.appendChild(targetEl);
    const onSkip = vi.fn();
    render(
      <Tour
        open
        onSkip={onSkip}
        steps={[{ target: () => targetEl, title: "一" }]}
      />,
    );
    fireEvent.click(screen.getByText("tour.skip"));
    expect(onSkip).toHaveBeenCalledTimes(1);
    document.body.removeChild(targetEl);
  });

  it("calls onOpenChange(false) when close button clicked", () => {
    const targetEl = document.createElement("button");
    document.body.appendChild(targetEl);
    const onOpenChange = vi.fn();
    render(
      <Tour
        open
        onOpenChange={onOpenChange}
        steps={[{ target: () => targetEl, title: "一" }]}
      />,
    );
    fireEvent.click(screen.getByLabelText("tour.close"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    document.body.removeChild(targetEl);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/tour");
    expect(mod.Tour).toBeDefined();
  });
});
