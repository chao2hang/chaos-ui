import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";

describe("Sheet", () => {
  it("exports all sub-components", () => {
    expect(Sheet).toBeDefined();
    expect(SheetTrigger).toBeDefined();
    expect(SheetClose).toBeDefined();
    expect(SheetContent).toBeDefined();
    expect(SheetHeader).toBeDefined();
    expect(SheetFooter).toBeDefined();
    expect(SheetTitle).toBeDefined();
    expect(SheetDescription).toBeDefined();
  });

  it("renders the trigger (closed by default)", () => {
    render(
      <Sheet>
        <SheetTrigger
          render={<button type="button">open menu</button>}
        />
      </Sheet>,
    );
    expect(screen.getByText("open menu")).toBeDefined();
  });

  it("renders content with header/title/description when open (controlled)", async () => {
    render(
      <Sheet open onOpenChange={() => undefined}>
        <SheetTrigger render={<button type="button">t</button>} />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Update your details</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <button type="button">save</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("Edit profile")).toBeDefined();
    });
    expect(screen.getByText("Update your details")).toBeDefined();
    expect(screen.getByText("save")).toBeDefined();
    expect(screen.getByText("Close")).toBeDefined();
  });

  it("sets data-side to right by default", async () => {
    render(
      <Sheet open onOpenChange={() => undefined}>
        <SheetContent>
          <span>side-body</span>
        </SheetContent>
      </Sheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("side-body")).toBeDefined();
    });
    const content = document.querySelector(
      '[data-slot="sheet-content"]',
    ) as HTMLElement;
    expect(content.getAttribute("data-side")).toBe("right");
  });

  it("supports left side", async () => {
    render(
      <Sheet open onOpenChange={() => undefined}>
        <SheetContent side="left">
          <span>left-body</span>
        </SheetContent>
      </Sheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("left-body")).toBeDefined();
    });
    const content = document.querySelector(
      '[data-slot="sheet-content"]',
    ) as HTMLElement;
    expect(content.getAttribute("data-side")).toBe("left");
  });

  it("hides the close button when showCloseButton=false", async () => {
    render(
      <Sheet open onOpenChange={() => undefined}>
        <SheetContent showCloseButton={false}>
          <span>no-close</span>
        </SheetContent>
      </Sheet>,
    );
    await waitFor(() => {
      expect(screen.getByText("no-close")).toBeDefined();
    });
    expect(screen.queryByText("Close")).toBeNull();
  });

  it("opens on trigger click and notifies onOpenChange", async () => {
    const onOpenChange = vi.fn();
    render(
      <Sheet onOpenChange={onOpenChange}>
        <SheetTrigger
          render={<button type="button">open</button>}
        />
        <SheetContent>
          <span>opened</span>
        </SheetContent>
      </Sheet>,
    );
    fireEvent.click(screen.getByText("open"));
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
    await waitFor(() => {
      expect(screen.getByText("opened")).toBeDefined();
    });
  });
});
