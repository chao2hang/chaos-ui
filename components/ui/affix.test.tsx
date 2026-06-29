import { describe, it, expect } from "vitest";
import type { AffixProps } from "@/components/ui/affix";

describe("Affix", () => {
  it("AffixProps type is importable", () => {
    const _p: AffixProps = {
      children: <div>content</div>,
      offsetTop: 100,
      onChange: () => {},
    };
    expect(_p.offsetTop).toBe(100);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/affix");
    expect(mod.Affix).toBeDefined();
  });
});
