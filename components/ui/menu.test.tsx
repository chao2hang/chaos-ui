import { describe, it, expect } from "vitest";
import {} from "./menu";
import type {
  MenuMode,
  MenuTheme,
  MenuSize,
  MenuItemConfig,
  MenuClickInfo,
  MenuProps,
} from "./menu";

describe("menu", () => {
  it("exports types", () => {
    const _tc1: MenuMode | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: MenuTheme | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: MenuSize | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: MenuItemConfig | undefined = undefined;
    expect(_tc4).toBeUndefined();
    const _tc5: MenuClickInfo | undefined = undefined;
    expect(_tc5).toBeUndefined();
    const _tc6: MenuProps | undefined = undefined;
    expect(_tc6).toBeUndefined();
  });
});
