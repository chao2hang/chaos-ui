import { describe, it, expect } from "vitest";
import { KeyboardShortcut } from "./keyboard-shortcut";
import type { KeyboardShortcutProps } from "./keyboard-shortcut";

describe("keyboard-shortcut", () => {
  it("exports KeyboardShortcut", () => {
    expect(KeyboardShortcut).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: KeyboardShortcutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
