import { describe, it, expect } from "vitest";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";

describe("tooltip", () => {
  it("exports Tooltip", () => {
    expect(Tooltip).toBeDefined();
  });

  it("exports TooltipTrigger", () => {
    expect(TooltipTrigger).toBeDefined();
  });

  it("exports TooltipContent", () => {
    expect(TooltipContent).toBeDefined();
  });

  it("exports TooltipProvider", () => {
    expect(TooltipProvider).toBeDefined();
  });
});
