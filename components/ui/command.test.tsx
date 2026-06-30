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
} from "./command";

describe("command", () => {
  it("exports Command", () => {
    expect(Command).toBeDefined();
  });

  it("exports CommandDialog", () => {
    expect(CommandDialog).toBeDefined();
  });

  it("exports CommandInput", () => {
    expect(CommandInput).toBeDefined();
  });

  it("exports CommandList", () => {
    expect(CommandList).toBeDefined();
  });

  it("exports CommandEmpty", () => {
    expect(CommandEmpty).toBeDefined();
  });

  it("exports CommandGroup", () => {
    expect(CommandGroup).toBeDefined();
  });

  it("exports CommandItem", () => {
    expect(CommandItem).toBeDefined();
  });

  it("exports CommandShortcut", () => {
    expect(CommandShortcut).toBeDefined();
  });

  it("exports CommandSeparator", () => {
    expect(CommandSeparator).toBeDefined();
  });
});
