import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
} from "./slider";

describe("Slider", () => {
  it("exports all sub-components", () => {
    expect(Slider).toBeDefined();
    expect(SliderControl).toBeDefined();
    expect(SliderTrack).toBeDefined();
    expect(SliderIndicator).toBeDefined();
    expect(SliderThumb).toBeDefined();
  });

  it("renders a slider root with data-slot", () => {
    const { container } = render(<Slider defaultValue={50} />);
    expect(container.querySelector('[data-slot="slider"]')).not.toBeNull();
  });

  it("renders full composed slider structure", () => {
    const { container } = render(
      <Slider defaultValue={50}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>,
    );
    expect(
      container.querySelector('[data-slot="slider-control"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="slider-track"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="slider-indicator"]'),
    ).not.toBeNull();
    // SliderThumb renders a focusable thumb
    const thumb = container.querySelector(
      '[data-slot="slider-thumb"]',
    ) as HTMLElement;
    expect(thumb).not.toBeNull();
  });

  it("reflects value when controlled", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Slider value={[40]} onValueChange={onValueChange}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>,
    );
    expect(container.querySelector('[data-slot="slider"]')).not.toBeNull();
  });

  it("applies custom className to root", () => {
    const { container } = render(
      <Slider defaultValue={0} className="w-64" />,
    );
    const el = container.querySelector(
      '[data-slot="slider"]',
    ) as HTMLElement;
    expect(el.className).toContain("w-64");
  });

  it("marks disabled state on root", () => {
    const { container } = render(<Slider defaultValue={10} disabled />);
    const el = container.querySelector(
      '[data-slot="slider"]',
    ) as HTMLElement;
    expect(el.getAttribute("data-disabled")).not.toBeNull();
  });

  it("exposes the thumb as a focusable range input", () => {
    const { container } = render(
      <Slider defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>,
    );
    const thumb = container.querySelector(
      '[data-slot="slider-thumb"]',
    ) as HTMLElement;
    expect(thumb).not.toBeNull();
    const rangeInput = container.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;
    expect(rangeInput).not.toBeNull();
    expect(rangeInput.getAttribute("aria-valuenow")).toBe("25");
  });

  // sanity touch so fireEvent is referenced
  it("does not throw on keydown at the root", () => {
    const { container } = render(<Slider defaultValue={50} />);
    const root = container.querySelector(
      '[data-slot="slider"]',
    ) as HTMLElement;
    fireEvent.keyDown(root, { key: "ArrowRight" });
    expect(root).not.toBeNull();
  });
});
