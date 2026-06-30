import { describe, it, expect } from "vitest";
import { TabPin } from "./tab-pin";
import type { TabPinProps } from "./tab-pin";

describe("tab-pin", () => {
  it("exports TabPin", () => {
    expect(TabPin).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TabPinProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
