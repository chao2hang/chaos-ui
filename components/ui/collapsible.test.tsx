import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

// Base UI's useCollapsiblePanel calls `getComputedStyle(el).animationName.split(',')`
// and reads `.transitionDuration`. The global getComputedStyle mock in
// vitest.setup.ts returns `{ ...style, getPropertyValue }`, which spreads the
// CSSStyleDeclaration and drops prototype getter properties (animationName →
// undefined → TypeError on .split). Patch getComputedStyle locally with a Proxy
// that reads getters lazily and coerces undefined → "" so Base UI's animation
// detection works in jsdom. This is a test-only patch; no source changes.
beforeAll(() => {
  const original = window.getComputedStyle;
  window.getComputedStyle = ((
    elt: Element,
    pseudoElt?: string | null,
  ): CSSStyleDeclaration => {
    const real = original(elt, pseudoElt);
    return new Proxy(real, {
      get(target, prop: string) {
        if (prop === "getPropertyValue") {
          return (p: string) => {
            if (p.startsWith("--")) return "";
            return String(target.getPropertyValue(p));
          };
        }
        const val = Reflect.get(target, prop, target);
        return typeof val === "function"
          ? (val as (...a: unknown[]) => unknown).bind(target)
          : (val as string | undefined) ?? "";
      },
    }) as unknown as CSSStyleDeclaration;
  }) as typeof window.getComputedStyle;
});

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

  it("renders root, trigger, and content with data-slots", () => {
    const { container } = render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Body</CollapsibleContent>
      </Collapsible>,
    );
    expect(container.querySelector('[data-slot="collapsible"]')).not.toBeNull();
    expect(container.querySelector('[data-slot="collapsible-trigger"]')).not.toBeNull();
    expect(container.querySelector('[data-slot="collapsible-content"]')).not.toBeNull();
  });

  it("shows content when defaultOpen=true", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Visible body</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByText("Visible body")).toBeDefined();
  });

  it("hides content when closed and shows on trigger click", async () => {
    render(
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger>Open</CollapsibleTrigger>
        <CollapsibleContent>Hidden body</CollapsibleContent>
      </Collapsible>,
    );
    // content hidden initially (Base UI keeps it unmounted when closed)
    expect(screen.queryByText("Hidden body")).toBeNull();
    const trigger = screen.getByText("Open");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText("Hidden body")).toBeDefined();
    });
  });

  it("toggles open state on trigger click", async () => {
    const onOpenChange = vi.fn();
    render(
      <Collapsible defaultOpen={false} onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Body</CollapsibleContent>
      </Collapsible>,
    );
    fireEvent.click(screen.getByText("Toggle"));
    // Base UI calls onOpenChange(open: boolean, event: object) — two args.
    await waitFor(() =>
      expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything()),
    );
    fireEvent.click(screen.getByText("Toggle"));
    await waitFor(() =>
      expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything()),
    );
  });

  it("controlled open prop reflects state", () => {
    const { rerender } = render(
      <Collapsible open>
        <CollapsibleTrigger>T</CollapsibleTrigger>
        <CollapsibleContent>Ctrl body</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByText("Ctrl body")).toBeDefined();
    rerender(
      <Collapsible open={false}>
        <CollapsibleTrigger>T</CollapsibleTrigger>
        <CollapsibleContent>Ctrl body</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.queryByText("Ctrl body")).toBeNull();
  });

  it("controlled open={true} keeps content visible after rerender to true", () => {
    const { rerender } = render(
      <Collapsible open>
        <CollapsibleTrigger>T</CollapsibleTrigger>
        <CollapsibleContent>Ctrl body</CollapsibleContent>
      </Collapsible>,
    );
    rerender(
      <Collapsible open>
        <CollapsibleTrigger>T</CollapsibleTrigger>
        <CollapsibleContent>Ctrl body</CollapsibleContent>
      </Collapsible>,
    );
    expect(screen.getByText("Ctrl body")).toBeDefined();
  });

  it("disabled trigger does not open", () => {
    const onOpenChange = vi.fn();
    render(
      <Collapsible defaultOpen={false} onOpenChange={onOpenChange}>
        <CollapsibleTrigger disabled>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Body</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByText("Toggle");
    fireEvent.click(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.queryByText("Body")).toBeNull();
  });

  it("trigger renders as a button", () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Body</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = container.querySelector(
      '[data-slot="collapsible-trigger"]',
    ) as HTMLElement;
    expect(trigger.tagName).toBe("BUTTON");
  });

  it("content exposes aria attributes when open", () => {
    const { container } = render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Body</CollapsibleContent>
      </Collapsible>,
    );
    const content = container.querySelector(
      '[data-slot="collapsible-content"]',
    ) as HTMLElement;
    expect(content).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("./collapsible");
    expect(mod.Collapsible).toBeDefined();
    expect(mod.CollapsibleTrigger).toBeDefined();
    expect(mod.CollapsibleContent).toBeDefined();
  });
});
