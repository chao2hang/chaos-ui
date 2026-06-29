import { describe, it, expect } from "vitest";
import type { CascaderProps, CascaderOption } from "@/components/ui/cascader";

describe("Cascader", () => {
  it("CascaderProps/Option types are importable", () => {
    const _p: CascaderProps = {
      options: [{ value: "a", label: "A" }],
      changeOnSelect: true,
    };
    const _o: CascaderOption = { value: "a", label: "A", children: [] };
    expect(_p.changeOnSelect).toBe(true);
    expect(_o.children?.length).toBe(0);
  });

  it("module is importable with changeOnSelect prop", async () => {
    const mod = await import("@/components/ui/cascader");
    expect(mod.Cascader).toBeDefined();
  });
});
