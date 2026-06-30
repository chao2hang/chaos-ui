import { describe, it, expect } from "vitest";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

describe("popover", () => {
  it("exports Popover", () => {
    expect(Popover).toBeDefined();
  });

  it("exports PopoverContent", () => {
    expect(PopoverContent).toBeDefined();
  });

  it("exports PopoverDescription", () => {
    expect(PopoverDescription).toBeDefined();
  });

  it("exports PopoverHeader", () => {
    expect(PopoverHeader).toBeDefined();
  });

  it("exports PopoverTitle", () => {
    expect(PopoverTitle).toBeDefined();
  });

  it("exports PopoverTrigger", () => {
    expect(PopoverTrigger).toBeDefined();
  });
});
