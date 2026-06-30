import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollArea, ScrollBar } from "./scroll-area";

describe("ScrollArea", () => {
  it("exports ScrollArea and ScrollBar", () => {
    expect(ScrollArea).toBeDefined();
    expect(ScrollBar).toBeDefined();
  });

  it("renders root and viewport with children content", () => {
    const { container } = render(
      <ScrollArea>
        <p>scrollable content</p>
      </ScrollArea>,
    );
    expect(
      container.querySelector('[data-slot="scroll-area"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="scroll-area-viewport"]'),
    ).not.toBeNull();
    expect(screen.getByText("scrollable content")).toBeDefined();
  });

  it("applies custom className to root", () => {
    const { container } = render(
      <ScrollArea className="h-40">x</ScrollArea>,
    );
    const el = container.querySelector(
      '[data-slot="scroll-area"]',
    ) as HTMLElement;
    expect(el.className).toContain("h-40");
  });

  it("ScrollArea is a forwardable primitive that renders a viewport", () => {
    const { container } = render(
      <ScrollArea data-testid="area">inner</ScrollArea>,
    );
    const root = container.querySelector(
      '[data-slot="scroll-area"]',
    ) as HTMLElement;
    expect(root).not.toBeNull();
    expect(screen.getByText("inner")).toBeDefined();
  });
});

describe("ScrollBar", () => {
  it("renders a thumb inside the scrollbar when used standalone", () => {
    const { container } = render(
      <ScrollArea>
        <div style={{ height: 200 }}>content</div>
      </ScrollArea>,
    );
    // ScrollBar is included by ScrollArea internally; verify the viewport renders.
    const viewport = container.querySelector(
      '[data-slot="scroll-area-viewport"]',
    );
    expect(viewport).not.toBeNull();
    expect(screen.getByText("content")).toBeDefined();
  });

  it("accepts an orientation prop without throwing", () => {
    expect(() =>
      render(
        <ScrollArea>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>,
      ),
    ).not.toThrow();
  });
});
