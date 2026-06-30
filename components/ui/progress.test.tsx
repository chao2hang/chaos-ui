import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
} from "./progress";

describe("Progress", () => {
  it("exports all sub-components", () => {
    expect(Progress).toBeDefined();
    expect(ProgressTrack).toBeDefined();
    expect(ProgressIndicator).toBeDefined();
    expect(ProgressLabel).toBeDefined();
    expect(ProgressValue).toBeDefined();
  });

  it("renders the progress root with track and indicator", () => {
    const { container } = render(<Progress value={50} />);
    expect(container.querySelector('[data-slot="progress"]')).not.toBeNull();
    expect(
      container.querySelector('[data-slot="progress-track"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="progress-indicator"]'),
    ).not.toBeNull();
  });

  it("renders custom children inside the root", () => {
    render(
      <Progress value={0}>
        <span>uploading</span>
      </Progress>,
    );
    expect(screen.getByText("uploading")).toBeDefined();
  });

  it("ProgressLabel renders text", () => {
    const { container } = render(
      <Progress value={30}>
        <ProgressLabel>Uploading files</ProgressLabel>
      </Progress>,
    );
    expect(screen.getByText("Uploading files")).toBeDefined();
    expect(
      container.querySelector('[data-slot="progress-label"]'),
    ).not.toBeNull();
  });

  it("ProgressValue renders value text", () => {
    const { container } = render(
      <Progress value={75}>
        <ProgressValue />
      </Progress>,
    );
    expect(
      container.querySelector('[data-slot="progress-value"]'),
    ).not.toBeNull();
  });

  it("applies custom className on root", () => {
    const { container } = render(
      <Progress value={10} className="extra" />,
    );
    const el = container.querySelector(
      '[data-slot="progress"]',
    ) as HTMLElement;
    expect(el.className).toContain("extra");
  });

  it("supports zero value", () => {
    const { container } = render(<Progress value={0} />);
    expect(
      container.querySelector('[data-slot="progress-track"]'),
    ).not.toBeNull();
  });
});
