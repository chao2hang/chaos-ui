import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IconPicker } from "./icon-picker";
import type { IconItem, IconPickerProps } from "./icon-picker";
import * as React from "react";
import { StarIcon, HeartIcon, HomeIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// jsdom does not implement scrollIntoView (required by cmdk)
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal custom icon set for deterministic tests. */
const testIcons: IconItem[] = [
  { name: "Star", icon: StarIcon, category: "Shapes", keywords: ["favorite"] },
  { name: "Heart", icon: HeartIcon, category: "Shapes", keywords: ["love", "like"] },
  { name: "Home", icon: HomeIcon, category: "Navigation", keywords: ["house", "main"] },
];

function renderPicker(props: Partial<IconPickerProps> = {}) {
  return render(<IconPicker icons={testIcons} {...props} />);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("IconPicker", () => {
  it("exports IconPicker and type symbols are importable", () => {
    expect(IconPicker).toBeDefined();
    const _p: IconPickerProps = {};
    const _i: IconItem = { name: "x", icon: StarIcon };
    expect(_p).toBeDefined();
    expect(_i.name).toBe("x");
  });

  it("renders the trigger button with data-slot on the root", () => {
    const { container } = renderPicker();
    const root = container.querySelector('[data-slot="icon-picker"]');
    expect(root).not.toBeNull();
    // Default trigger text is "Select Icon"
    expect(screen.getByText("Select Icon")).toBeDefined();
  });

  it("shows the selected icon name in the trigger when value is provided", () => {
    renderPicker({ value: "Star" });
    expect(screen.getByText("Star")).toBeDefined();
    expect(screen.queryByText("Select Icon")).toBeNull();
  });

  it("clicking the trigger opens the dialog and shows icon groups", async () => {
    renderPicker();
    fireEvent.click(screen.getByText("Select Icon"));
    await waitFor(() => {
      expect(screen.getByText("Select Icon", { selector: "h2" })).toBeDefined();
    });
    // Category headings from our test set
    await waitFor(() => {
      expect(screen.getByText("Shapes")).toBeDefined();
      expect(screen.getByText("Navigation")).toBeDefined();
    });
    // Individual icon names rendered in the list
    expect(screen.getAllByText("Star").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Heart").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
  });

  it("search filters icons by name", async () => {
    renderPicker();
    fireEvent.click(screen.getByText("Select Icon"));
    await waitFor(() => {
      expect(screen.getByText("Shapes")).toBeDefined();
    });

    // Type in the search input
    const input = screen.getByPlaceholderText("Search icons...");
    fireEvent.change(input, { target: { value: "Star" } });

    await waitFor(() => {
      // Star should still be visible
      expect(screen.getAllByText("Star").length).toBeGreaterThanOrEqual(1);
    });
    // Heart should be filtered out
    expect(screen.queryByText("Heart")).toBeNull();
    expect(screen.queryByText("Home")).toBeNull();
  });

  it("search matches against keywords", async () => {
    renderPicker();
    fireEvent.click(screen.getByText("Select Icon"));
    await waitFor(() => {
      expect(screen.getByText("Shapes")).toBeDefined();
    });

    const input = screen.getByPlaceholderText("Search icons...");
    // "love" is a keyword for Heart
    fireEvent.change(input, { target: { value: "love" } });

    await waitFor(() => {
      expect(screen.getAllByText("Heart").length).toBeGreaterThanOrEqual(1);
    });
    expect(screen.queryByText("Star")).toBeNull();
  });

  it("selecting an icon fires onChange with the icon name", async () => {
    const onChange = vi.fn();
    renderPicker({ onChange });
    fireEvent.click(screen.getByText("Select Icon"));
    await waitFor(() => {
      expect(screen.getByText("Shapes")).toBeDefined();
    });

    // Click on the Heart icon item
    const heartItems = screen.getAllByText("Heart");
    // The icon item text (not a heading)
    const heartItem = heartItems.find(
      (el) => el.closest('[data-slot="command-item"]') != null,
    );
    expect(heartItem).toBeDefined();
    fireEvent.click(heartItem!.closest('[data-slot="command-item"]')!);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith("Heart");
    });
  });

  it("dialog closes after selecting an icon", async () => {
    const onChange = vi.fn();
    renderPicker({ onChange });
    fireEvent.click(screen.getByText("Select Icon"));
    await waitFor(() => {
      expect(screen.getByText("Shapes")).toBeDefined();
    });

    const heartItem = screen
      .getAllByText("Heart")
      .find((el) => el.closest('[data-slot="command-item"]') != null)!;
    fireEvent.click(heartItem.closest('[data-slot="command-item"]')!);

    await waitFor(() => {
      expect(screen.queryByText("Shapes")).toBeNull();
    });
  });

  it("recent icons appear after selection", async () => {
    // Use a stateful wrapper so the value updates after selection
    function StatefulPicker() {
      const [val, setVal] = React.useState<string | undefined>(undefined);
      return <IconPicker icons={testIcons} value={val!} onChange={setVal} />;
    }
    render(<StatefulPicker />);

    fireEvent.click(screen.getByText("Select Icon"));
    await waitFor(() => {
      expect(screen.getByText("Shapes")).toBeDefined();
    });

    // Select Star
    const starItem = screen
      .getAllByText("Star")
      .find((el) => el.closest('[data-slot="command-item"]') != null)!;
    fireEvent.click(starItem.closest('[data-slot="command-item"]')!);

    // Dialog should close and trigger should now show "Star"
    await waitFor(() => {
      expect(screen.queryByText("Shapes")).toBeNull();
    });
    expect(screen.getByText("Star")).toBeDefined();

    // Reopen dialog
    fireEvent.click(screen.getByText("Star"));
    await waitFor(() => {
      expect(screen.getByText("Recent")).toBeDefined();
    });
    // Star should appear in the Recent group
    expect(screen.getAllByText("Star").length).toBeGreaterThanOrEqual(1);
  });

  it("disabled state prevents opening the dialog", () => {
    renderPicker({ disabled: true });
    // The trigger button should be disabled
    const btn = screen.getByText("Select Icon").closest("button");
    expect(btn?.disabled).toBe(true);
  });

  it("shows no-results message when search has no matches", async () => {
    renderPicker();
    fireEvent.click(screen.getByText("Select Icon"));
    await waitFor(() => {
      expect(screen.getByText("Shapes")).toBeDefined();
    });

    const input = screen.getByPlaceholderText("Search icons...");
    fireEvent.change(input, { target: { value: "zzzznonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No icons found.")).toBeDefined();
    });
  });

  it("accepts a custom trigger element", () => {
    renderPicker({
      trigger: <button type="button">Custom Trigger</button>,
    });
    expect(screen.getByText("Custom Trigger")).toBeDefined();
    expect(screen.queryByText("Select Icon")).toBeNull();
  });

  it("renders custom title in the dialog header", async () => {
    renderPicker({ title: "Pick an Icon" });
    fireEvent.click(screen.getByText("Select Icon"));
    await waitFor(() => {
      expect(screen.getByText("Pick an Icon")).toBeDefined();
    });
  });

  it("supports controlled open state", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = renderPicker({ open: false, onOpenChange });

    // Dialog should not be visible
    expect(screen.queryByText("Shapes")).toBeNull();

    // Open via controlled prop
    rerender(<IconPicker icons={testIcons} open={true} onOpenChange={onOpenChange} />);
    await waitFor(() => {
      expect(screen.getByText("Shapes")).toBeDefined();
    });
  });

  it("applies custom className to the root element", () => {
    const { container } = renderPicker({ className: "my-picker" });
    const root = container.querySelector('[data-slot="icon-picker"]');
    expect(root?.className).toContain("my-picker");
  });

  it("custom placeholder is rendered in the search input", async () => {
    renderPicker({ placeholder: "Find an icon..." });
    fireEvent.click(screen.getByText("Select Icon"));
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Find an icon...")).toBeDefined();
    });
  });
});
