import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  MobileSheet,
  type MobileSheetProps,
} from "@/components/mobile/mobile-sheet";

describe("MobileSheet", () => {
  it("is exported and type is importable", () => {
    expect(MobileSheet).toBeDefined();
    const _p: MobileSheetProps = { children: "x" };
    expect(_p.children).toBe("x");
  });

  it("renders trigger when provided", () => {
    render(
      <MobileSheet trigger={<button type="button">open</button>}>
        body
      </MobileSheet>,
    );
    expect(screen.getByText("open")).toBeDefined();
  });

  it("renders content (controlled open) with title and description", async () => {
    render(
      <MobileSheet
        open
        onOpenChange={() => undefined}
        title="Edit Profile"
        description="Update details"
      >
        sheet body
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("Edit Profile")).toBeDefined();
    });
    expect(screen.getByText("Update details")).toBeDefined();
    expect(screen.getByText("sheet body")).toBeDefined();
  });

  it("renders actions footer when provided (controlled open)", async () => {
    render(
      <MobileSheet open onOpenChange={() => undefined} title="T">
        body
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("body")).toBeDefined();
    });
  });

  it("does not render title/description when omitted (controlled open)", async () => {
    render(
      <MobileSheet open onOpenChange={() => undefined}>
        body-only
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("body-only")).toBeDefined();
    });
    expect(screen.queryByText("Close")).toBeDefined(); // close button present
  });

  it("opens on trigger click and notifies onOpenChange", async () => {
    const onOpenChange = vi.fn();
    render(
      <MobileSheet
        trigger={<button type="button">open</button>}
        onOpenChange={onOpenChange}
        title="Opened"
      >
        opened body
      </MobileSheet>,
    );
    fireEvent.click(screen.getByText("open"));
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
    await waitFor(() => {
      expect(screen.getByText("Opened")).toBeDefined();
    });
  });

  it("renders actions footer node when provided (controlled open)", async () => {
    render(
      <MobileSheet
        open
        onOpenChange={() => undefined}
        title="T"
        actions={<button type="button">Save</button>}
      >
        body
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("body")).toBeDefined();
    });
    expect(screen.getByText("Save")).toBeDefined();
  });

  it("applies custom className to sheet content", async () => {
    render(
      <MobileSheet open onOpenChange={() => undefined} className="sheet-custom">
        <span>cb</span>
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("cb")).toBeDefined();
    });
    const content = document.querySelector(
      '[data-slot="sheet-content"]',
    ) as HTMLElement;
    expect(content.className).toContain("sheet-custom");
  });

  it("default side is bottom", async () => {
    render(
      <MobileSheet open onOpenChange={() => undefined}>
        <span>side-body</span>
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("side-body")).toBeDefined();
    });
    const content = document.querySelector(
      '[data-slot="sheet-content"]',
    ) as HTMLElement;
    expect(content.getAttribute("data-side")).toBe("bottom");
  });

  it("supports top side", async () => {
    render(
      <MobileSheet open onOpenChange={() => undefined} side="top">
        <span>top-body</span>
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("top-body")).toBeDefined();
    });
    const content = document.querySelector(
      '[data-slot="sheet-content"]',
    ) as HTMLElement;
    expect(content.getAttribute("data-side")).toBe("top");
  });

  it("supports left and right sides", async () => {
    const { rerender } = render(
      <MobileSheet open onOpenChange={() => undefined} side="left">
        <span>left-body</span>
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("left-body")).toBeDefined();
    });
    let content = document.querySelector(
      '[data-slot="sheet-content"]',
    ) as HTMLElement;
    expect(content.getAttribute("data-side")).toBe("left");

    rerender(
      <MobileSheet open onOpenChange={() => undefined} side="right">
        <span>right-body</span>
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("right-body")).toBeDefined();
    });
    content = document.querySelector(
      '[data-slot="sheet-content"]',
    ) as HTMLElement;
    expect(content.getAttribute("data-side")).toBe("right");
  });

  it("renders children content area", async () => {
    render(
      <MobileSheet open onOpenChange={() => undefined} title="T">
        <div data-testid="child">child content</div>
      </MobileSheet>,
    );
    await waitFor(() => {
      expect(screen.getByTestId("child")).toBeDefined();
    });
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-sheet");
    expect(mod.MobileSheet).toBeDefined();
  });
});
