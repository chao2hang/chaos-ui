import { describe, it, expect } from "vitest";
import { CommandPalette } from "./command-palette";
import type { CommandItem, CommandGroup } from "./command-palette";

describe("command-palette", () => {
  it("exports CommandPalette", () => {
    expect(CommandPalette).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CommandItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CommandGroup | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
