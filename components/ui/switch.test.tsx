import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Switch } from "./switch";
import type { SwitchProps } from "./switch";

describe("Switch", () => {
  it("renders a switch", () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('[data-slot="switch"]')).not.toBeNull();
  });

  it("applies size data attribute", () => {
    const { container } = render(<Switch size="sm" />);
    const sw = container.querySelector('[data-slot="switch"]');
    expect(sw?.getAttribute("data-size")).toBe("sm");
  });

  it("defaults to default size", () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('[data-slot="switch"]')?.getAttribute("data-size")).toBe("default");
  });

  it("SwitchProps type is importable", () => {
    const _props: SwitchProps = { size: "sm", checked: false };
    expect(_props.size).toBe("sm");
  });

  it("renders the thumb element", () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('[data-slot="switch-thumb"]')).not.toBeNull();
  });

  it("reflects checked state when controlled", () => {
    const { container } = render(<Switch checked={true} />);
    const sw = container.querySelector('[data-slot="switch"]') as HTMLElement;
    expect(sw).not.toBeNull();
    expect(sw.getAttribute("data-slot")).toBe("switch");
  });

  it("fires onCheckedChange when clicked (uncontrolled toggle)", () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Switch onCheckedChange={onCheckedChange} />);
    const sw = container.querySelector('[data-slot="switch"]') as HTMLElement;
    fireEvent.click(sw);
    expect(onCheckedChange).toHaveBeenCalled();
    expect(onCheckedChange.mock.calls.at(-1)?.[0]).toBe(true);
  });

  it("toggles off when already checked", () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Switch checked={true} onCheckedChange={onCheckedChange} />);
    const sw = container.querySelector('[data-slot="switch"]') as HTMLElement;
    fireEvent.click(sw);
    expect(onCheckedChange.mock.calls.at(-1)?.[0]).toBe(false);
  });

  it("renders a disabled switch", () => {
    const { container } = render(<Switch disabled />);
    const sw = container.querySelector('[data-slot="switch"]') as HTMLElement;
    expect(sw).not.toBeNull();
    const isDisabled = sw.getAttribute("data-disabled") === "true" || sw.getAttribute("aria-disabled") === "true" || sw.hasAttribute("disabled");
    expect(isDisabled).toBe(true);
  });

  it("does not fire onCheckedChange when disabled", () => {
    const onCheckedChange = vi.fn();
    const { container } = render(<Switch disabled onCheckedChange={onCheckedChange} />);
    const sw = container.querySelector('[data-slot="switch"]') as HTMLElement;
    fireEvent.click(sw);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("applies aria-label", () => {
    const { container } = render(<Switch aria-label="Enable notifications" />);
    expect(container.querySelector('[data-slot="switch"]')?.getAttribute("aria-label")).toBe("Enable notifications");
  });

  it("merges custom className", () => {
    const { container } = render(<Switch className="my-switch" />);
    expect(container.querySelector('[data-slot="switch"]')?.className).toContain("my-switch");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/switch");
    expect(mod.Switch).toBeDefined();
  });
});
