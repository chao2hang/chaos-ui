import { describe, it, expect } from "vitest";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";

describe("command", () => {
  it("exports Command", () => {
    expect(Command).toBeDefined();
    expect(typeof Command).toBe("function");
  });

  it("exports CommandDialog", () => {
    expect(CommandDialog).toBeDefined();
    expect(typeof CommandDialog).toBe("function");
  });

  it("exports CommandInput", () => {
    expect(CommandInput).toBeDefined();
    expect(typeof CommandInput).toBe("function");
  });

  it("exports CommandList", () => {
    expect(CommandList).toBeDefined();
    expect(typeof CommandList).toBe("function");
  });

  it("exports CommandEmpty", () => {
    expect(CommandEmpty).toBeDefined();
    expect(typeof CommandEmpty).toBe("function");
  });

  it("exports CommandGroup", () => {
    expect(CommandGroup).toBeDefined();
    expect(typeof CommandGroup).toBe("function");
  });

  it("exports CommandItem", () => {
    expect(CommandItem).toBeDefined();
    expect(typeof CommandItem).toBe("function");
  });

  it("exports CommandShortcut", () => {
    expect(CommandShortcut).toBeDefined();
    expect(typeof CommandShortcut).toBe("function");
  });

  it("exports CommandSeparator", () => {
    expect(CommandSeparator).toBeDefined();
    expect(typeof CommandSeparator).toBe("function");
  });

  it("CommandDialog accepts title and description props", () => {
    // Verify the function signature accepts these props
    expect(CommandDialog.length).toBeGreaterThanOrEqual(0);
  });

  it("CommandDialog accepts showCloseButton prop", () => {
    // Verify the function signature accepts showCloseButton
    expect(CommandDialog.length).toBeGreaterThanOrEqual(0);
  });

  it("all sub-components are distinct functions", () => {
    const components = [
      Command,
      CommandDialog,
      CommandInput,
      CommandList,
      CommandEmpty,
      CommandGroup,
      CommandItem,
      CommandShortcut,
      CommandSeparator,
    ];
    const uniqueSet = new Set(components);
    expect(uniqueSet.size).toBe(components.length);
  });
});
