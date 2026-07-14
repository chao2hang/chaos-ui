import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
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
    expect(
      document.querySelector('[data-slot="select-trigger"]'),
    ).not.toBeNull();
  });

  it("defaults SelectTrigger to w-full for form layouts (issue #19)", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="pick" />
        </SelectTrigger>
      </Select>,
    );
    const trigger = document.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    expect(trigger.className.split(/\s+/)).toContain("w-full");
    expect(trigger.className.split(/\s+/)).not.toContain("w-fit");
  });

  it("applies sm size data attribute", () => {
    render(
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="pick" />
        </SelectTrigger>
      </Select>,
    );
    expect(
      (
        document.querySelector('[data-slot="select-trigger"]') as HTMLElement
      ).getAttribute("data-size"),
    ).toBe("sm");
  });

  it("renders with content (popover not testable in jsdom)", () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(
      container.querySelector('[data-slot="select-trigger"]'),
    ).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/select");
    expect(mod.Select).toBeDefined();
  });
});
