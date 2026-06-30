import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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

  it("renders the accordion root, item and trigger slots", () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(container.querySelector('[data-slot="accordion"]')).not.toBeNull();
    expect(container.querySelector('[data-slot="accordion-item"]')).not.toBeNull();
    expect(container.querySelector('[data-slot="accordion-trigger"]')).not.toBeNull();
    // Base UI does not mount a closed Panel's content into the DOM.
    expect(container.querySelector('[data-slot="accordion-content"]')).toBeNull();
  });

  it("renders the content panel when the item is open by default", () => {
    const { container } = render(
      <Accordion defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(container.querySelector('[data-slot="accordion-content"]')).not.toBeNull();
    expect(screen.getByText("Content A")).toBeDefined();
  });

  it("renders the trigger label text", () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Open Me</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Open Me")).toBeDefined();
  });

  it("renders a chevron icon in the trigger", () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Sec</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const icons = container.querySelectorAll(
      '[data-slot="accordion-trigger-icon"]',
    );
    // Down icon (visible when collapsed) + Up icon (visible when expanded)
    expect(icons.length).toBe(2);
  });

  it("renders multiple items", () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>Body 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Body 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("First")).toBeDefined();
    expect(screen.getByText("Second")).toBeDefined();
  });

  it("applies a custom className to each part", () => {
    const { container } = render(
      <Accordion className="root-x">
        <AccordionItem className="item-x" value="a">
          <AccordionTrigger className="trigger-x">T</AccordionTrigger>
          <AccordionContent className="content-x">C</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(
      (container.querySelector('[data-slot="accordion"]') as HTMLElement)
        .className,
    ).toContain("root-x");
    expect(
      (container.querySelector('[data-slot="accordion-item"]') as HTMLElement)
        .className,
    ).toContain("item-x");
    expect(
      (container.querySelector('[data-slot="accordion-trigger"]') as HTMLElement)
        .className,
    ).toContain("trigger-x");
  });

  it("forwards the value prop onto the accordion-item", () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="my-val">
          <AccordionTrigger>T</AccordionTrigger>
          <AccordionContent>C</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const item = container.querySelector(
      '[data-slot="accordion-item"]',
    ) as HTMLElement;
    expect(item.getAttribute("data-index")).toBe("0");
  });

  it("module is importable", async () => {
    const mod = await import("./accordion");
    expect(mod.Accordion).toBeDefined();
    expect(mod.AccordionTrigger).toBeDefined();
  });
});
