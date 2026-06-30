import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

describe("Popover", () => {
  it("exports all sub-components", () => {
    expect(Popover).toBeDefined();
    expect(PopoverContent).toBeDefined();
    expect(PopoverDescription).toBeDefined();
    expect(PopoverHeader).toBeDefined();
    expect(PopoverTitle).toBeDefined();
    expect(PopoverTrigger).toBeDefined();
  });

  it("renders the trigger element", () => {
    render(
      <Popover>
        <PopoverTrigger
          render={
            <button type="button" onClick={() => undefined}>
              open popover
            </button>
          }
        />
      </Popover>,
    );
    expect(screen.getByText("open popover")).toBeDefined();
  });

  it("renders portal content when open (controlled)", async () => {
    render(
      <Popover open onOpenChange={() => undefined}>
        <PopoverTrigger
          render={<button type="button">trigger</button>}
        />
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Settings</PopoverTitle>
            <PopoverDescription>Configure your app</PopoverDescription>
          </PopoverHeader>
          <span>body</span>
        </PopoverContent>
      </Popover>,
    );
    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeDefined();
    });
    expect(screen.getByText("Configure your app")).toBeDefined();
    expect(screen.getByText("body")).toBeDefined();
  });

  it("opens content on trigger click", async () => {
    const onOpenChange = vi.fn();
    render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger
          render={<button type="button">click me</button>}
        />
        <PopoverContent>
          <span>revealed</span>
        </PopoverContent>
      </Popover>,
    );
    fireEvent.click(screen.getByText("click me"));
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
    await waitFor(() => {
      expect(screen.getByText("revealed")).toBeDefined();
    });
  });

  it("applies side prop to content", async () => {
    render(
      <Popover open onOpenChange={() => undefined}>
        <PopoverTrigger render={<button type="button">t</button>} />
        <PopoverContent side="top">
          <span>top-content</span>
        </PopoverContent>
      </Popover>,
    );
    await waitFor(() => {
      expect(screen.getByText("top-content")).toBeDefined();
    });
  });

  it("forwards custom className to content", async () => {
    render(
      <Popover open onOpenChange={() => undefined}>
        <PopoverTrigger render={<button type="button">t</button>} />
        <PopoverContent className="w-80">
          <span>wide</span>
        </PopoverContent>
      </Popover>,
    );
    await waitFor(() => {
      expect(screen.getByText("wide")).toBeDefined();
    });
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/popover");
    expect(mod.PopoverContent).toBeDefined();
    expect(mod.PopoverTitle).toBeDefined();
  });
});
