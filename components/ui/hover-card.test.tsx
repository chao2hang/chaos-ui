import { describe, it, expect } from "vitest";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";

describe("hover-card", () => {
  it("exports HoverCard", () => {
    expect(HoverCard).toBeDefined();
  });

  it("exports HoverCardTrigger", () => {
    expect(HoverCardTrigger).toBeDefined();
  });

  it("exports HoverCardContent", () => {
    expect(HoverCardContent).toBeDefined();
  });
});
