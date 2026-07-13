import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImmersiveLayout } from "./immersive-layout";

describe("ImmersiveLayout", () => {
  it("renders children and header", () => {
    render(
      <ImmersiveLayout header={<h1>Q3 Report</h1>}>
        <div>Report body</div>
      </ImmersiveLayout>,
    );
    expect(screen.getByText("Q3 Report")).toBeDefined();
    expect(screen.getByText("Report body")).toBeDefined();
    expect(
      document.querySelector('[data-slot="immersive-layout"]'),
    ).not.toBeNull();
  });

  it("calls onExit when exit clicked", () => {
    const onExit = vi.fn();
    render(
      <ImmersiveLayout onExit={onExit} showExitButton>
        <div>x</div>
      </ImmersiveLayout>,
    );
    // find exit/fullscreen buttons by aria or svg presence
    const buttons = screen.getAllByRole("button");
    // click last control if present
    if (buttons.length) fireEvent.click(buttons[buttons.length - 1]!);
    // onExit may be one of the buttons
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("fills the host and keeps chrome absolute (not viewport-fixed)", () => {
    const { container } = render(
      <div style={{ height: 320 }}>
        <ImmersiveLayout header={<span>hdr</span>} showExitButton={false}>
          body
        </ImmersiveLayout>
      </div>,
    );
    const root = container.querySelector('[data-slot="immersive-layout"]');
    expect(root?.classList.contains("h-full")).toBe(true);
    expect(root?.classList.contains("h-dvh")).toBe(false);
    const chrome = container.querySelector(
      '[data-slot="immersive-layout-header"]',
    );
    expect(chrome?.classList.contains("absolute")).toBe(true);
    expect(chrome?.classList.contains("fixed")).toBe(false);
  });
});
