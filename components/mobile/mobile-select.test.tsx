import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  MobileSelect,
  type MobileSelectProps,
  type MobileSelectOption,
} from "@/components/mobile/mobile-select";

const options: MobileSelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("MobileSelect", () => {
  it("is exported and types are importable", () => {
    expect(MobileSelect).toBeDefined();
    const _p: MobileSelectProps = { options: [] };
    expect(_p.options).toEqual([]);
    const _o: MobileSelectOption = { value: "a", label: "A" };
    expect(_o.value).toBe("a");
  });

  it("renders the trigger with placeholder", () => {
    render(<MobileSelect options={options} placeholder="Pick fruit" />);
    expect(screen.getByText("Pick fruit")).toBeDefined();
  });

  it("renders trigger with data-slot select-trigger", () => {
    render(<MobileSelect options={options} placeholder="p" />);
    const trigger = document.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    expect(trigger).not.toBeNull();
  });

  it("applies mobile-first height className", () => {
    render(<MobileSelect options={options} placeholder="p" />);
    const trigger = document.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    expect(trigger.className).toContain("h-12");
  });

  it("applies custom className", () => {
    render(
      <MobileSelect options={options} placeholder="p" className="sel-custom" />,
    );
    const trigger = document.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    expect(trigger.className).toContain("sel-custom");
  });

  it("opens content and lists options on trigger click", async () => {
    render(<MobileSelect options={options} placeholder="pick" />);
    fireEvent.click(screen.getByText("pick"));
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeDefined();
    });
    expect(screen.getByText("Banana")).toBeDefined();
    expect(screen.getByText("Cherry")).toBeDefined();
  });

  it("fires onValueChange when an option is selected", async () => {
    const onValueChange = vi.fn();
    render(
      <MobileSelect
        options={options}
        placeholder="pick"
        onValueChange={onValueChange}
      />,
    );
    fireEvent.click(screen.getByText("pick"));
    await waitFor(() => {
      expect(screen.getByText("Banana")).toBeDefined();
    });
    fireEvent.click(screen.getByText("Banana"));
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalled();
    });
    expect(onValueChange.mock.calls[0]?.[0]).toBe("banana");
  });

  it("renders empty options list without error", () => {
    render(<MobileSelect options={[]} placeholder="none" />);
    expect(screen.getByText("none")).toBeDefined();
  });

  it("is disabled when disabled prop set", () => {
    render(<MobileSelect options={options} placeholder="p" disabled />);
    const trigger = document.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    // Base UI disabled trigger carries data-disabled or disabled attribute
    expect(trigger.getAttribute("data-disabled")).toBe("");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-select");
    expect(mod.MobileSelect).toBeDefined();
  });
});
