import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type {
  SelectTriggerProps,
  SelectItemProps,
  SelectValueProps,
} from "@/components/ui/select";

// Select sub-components require <Select.Root> context, so we test only the
// type exports here. Behavioral tests for Select live in Storybook stories.

describe("Select", () => {
  it("Select*Props types are importable", () => {
    const _t: SelectTriggerProps = { size: "sm" };
    const _i: SelectItemProps = { value: "a" };
    const _v: SelectValueProps = {};
    expect(_t.size).toBe("sm");
    expect(_i.value).toBe("a");
    expect(_v).toBeDefined();
  });

  it("Select module is importable", async () => {
    const mod = await import("@/components/ui/select");
    expect(mod.Select).toBeDefined();
    expect(mod.SelectTrigger).toBeDefined();
    expect(mod.SelectItem).toBeDefined();
  });
});

// keep render import used in case of future behavioral tests
void render;
