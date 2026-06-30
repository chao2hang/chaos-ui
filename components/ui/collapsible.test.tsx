import { describe, it, expect } from "vitest";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

describe("collapsible", () => {
  it("exports Collapsible", () => {
    expect(Collapsible).toBeDefined();
  });

  it("exports CollapsibleTrigger", () => {
    expect(CollapsibleTrigger).toBeDefined();
  });

  it("exports CollapsibleContent", () => {
    expect(CollapsibleContent).toBeDefined();
  });
});
