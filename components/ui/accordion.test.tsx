import { describe, it, expect } from "vitest";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

describe("accordion", () => {
  it("exports Accordion", () => {
    expect(Accordion).toBeDefined();
  });

  it("exports AccordionItem", () => {
    expect(AccordionItem).toBeDefined();
  });

  it("exports AccordionTrigger", () => {
    expect(AccordionTrigger).toBeDefined();
  });

  it("exports AccordionContent", () => {
    expect(AccordionContent).toBeDefined();
  });
});
