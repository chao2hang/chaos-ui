import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type {
  SelectTriggerProps,
  SelectItemProps,
  SelectValueProps,
} from "@/components/ui/select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

describe("Select", () => {
  it("exports all sub-components", () => {
    expect(Select).toBeDefined();
    expect(SelectContent).toBeDefined();
    expect(SelectGroup).toBeDefined();
    expect(SelectItem).toBeDefined();
    expect(SelectLabel).toBeDefined();
    expect(SelectSeparator).toBeDefined();
    expect(SelectTrigger).toBeDefined();
    expect(SelectValue).toBeDefined();
  });

  it("Select*Props types are importable", () => {
    const _t: SelectTriggerProps = { size: "sm" };
    const _i: SelectItemProps = { value: "a" };
    const _v: SelectValueProps = {};
    expect(_t.size).toBe("sm");
    expect(_i.value).toBe("a");
    expect(_v).toBeDefined();
  });

  it("renders the trigger with a placeholder", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
      </Select>,
    );
    const trigger = document.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    expect(trigger).not.toBeNull();
    expect(trigger.getAttribute("data-size")).toBe("default");
    expect(screen.getByText("Pick a fruit")).toBeDefined();
  });

  it("applies sm size data attribute", () => {
    render(
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="pick" />
        </SelectTrigger>
      </Select>,
    );
    const trigger = document.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    expect(trigger.getAttribute("data-size")).toBe("sm");
  });

  it("opens the content and lists items on trigger click", async () => {
    const onValueChange = vi.fn();
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectSeparator />
        </SelectContent>
      </Select>,
    );
    fireEvent.click(screen.getByText("pick"));
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeDefined();
    });
    expect(screen.getByText("Banana")).toBeDefined();
    expect(screen.getByText("Fruits")).toBeDefined();
    fireEvent.click(screen.getByText("Banana"));
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalled();
    });
    expect(onValueChange.mock.calls[0]?.[0]).toBe("banana");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/select");
    expect(mod.Select).toBeDefined();
    expect(mod.SelectTrigger).toBeDefined();
    expect(mod.SelectItem).toBeDefined();
  });
});
