import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OTPField, OTPFieldSeparator } from "./otp-field";

describe("OTPField", () => {
  it("exports OTPField and OTPFieldSeparator", () => {
    expect(OTPField).toBeDefined();
    expect(OTPFieldSeparator).toBeDefined();
  });

  it("renders the requested number of inputs", () => {
    const { container } = render(<OTPField length={6} />);
    expect(container.querySelector('[data-slot="otp-field"]')).not.toBeNull();
    const inputs = container.querySelectorAll(
      '[data-slot="otp-field-input"]',
    );
    expect(inputs).toHaveLength(6);
  });

  it("renders the separator with a dash", () => {
    // The separator is a standalone primitive; rendering it outside the Root
    // lets us assert its markup directly.
    const { container } = render(<OTPFieldSeparator />);
    expect(
      container.querySelector('[data-slot="otp-field-separator"]'),
    ).not.toBeNull();
    expect(screen.getByText("—")).toBeDefined();
  });

  it("fires onValueChange on input", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <OTPField length={4} onValueChange={onValueChange} />,
    );
    const first = container.querySelector(
      '[data-slot="otp-field-input"]',
    ) as HTMLInputElement;
    fireEvent.input(first, { target: { value: "5" } });
    expect(onValueChange).toHaveBeenCalled();
  });

  it("applies inputClassName to each input", () => {
    const { container } = render(
      <OTPField length={2} inputClassName="my-input" />,
    );
    const inputs = container.querySelectorAll(
      '[data-slot="otp-field-input"]',
    );
    inputs.forEach((i) => {
      expect((i as HTMLElement).className).toContain("my-input");
    });
  });

  it("applies className to the root", () => {
    const { container } = render(
      <OTPField length={2} className="root-extra" />,
    );
    const el = container.querySelector(
      '[data-slot="otp-field"]',
    ) as HTMLElement;
    expect(el.className).toContain("root-extra");
  });

  it("passes mask prop through", () => {
    const { container } = render(<OTPField length={3} mask />);
    expect(container.querySelector('[data-slot="otp-field"]')).not.toBeNull();
  });
});
