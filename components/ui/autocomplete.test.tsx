import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AutoComplete } from "@/components/ui/autocomplete";
import type { AutoCompleteProps, AutoCompleteOption } from "@/components/ui/autocomplete";

// NOTE on the typing path:
// AutoComplete renders its <Input> via Base UI's <PopoverTrigger render={<Input/>}>.
// Base UI treats the render child as a button trigger and intercepts native input
// events, so `fireEvent.change` / `userEvent.type` on the rendered <input> do NOT
// reach AutoComplete's `handleChange` (onChange/onSearch never fire from typing).
// This is a real limitation of the Base UI `render`-prop composition in jsdom
// (and arguably a source smell). To exercise the dropdown / selection / keyboard
// branches we drive the component through a *controlled* `value` prop, which
// triggers the open-via-effect path and renders the option buttons in the portal.

describe("AutoComplete", () => {
  it("AutoCompleteProps/Option types are importable", () => {
    const _p: AutoCompleteProps = {
      options: [{ value: "a" }],
      onSearch: () => {},
    };
    const _o: AutoCompleteOption = { value: "a", label: "A", disabled: false };
    expect(_p.options.length).toBe(1);
    expect(_o.value).toBe("a");
  });

  it("renders an input element with placeholder", () => {
    render(<AutoComplete options={[{ value: "a" }]} placeholder="Search fruit" />);
    const input = screen.getByPlaceholderText("Search fruit");
    expect(input).toBeDefined();
  });

  it("uses default placeholder when none provided", () => {
    render(<AutoComplete options={[]} />);
    expect(screen.getByPlaceholderText("Type to search...")).toBeDefined();
  });

  it("does not crash with empty options", () => {
    const { container } = render(<AutoComplete options={[]} />);
    expect(container.querySelector("input")).not.toBeNull();
  });

  it("does not crash with disabled option", () => {
    const { container } = render(
      <AutoComplete options={[{ value: "a", disabled: true }]} />,
    );
    expect(container.querySelector("input")).not.toBeNull();
  });

  it("controlled value is reflected in the input", () => {
    render(
      <AutoComplete
        value="preset"
        options={[{ value: "preset", label: "Preset" }]}
      />,
    );
    expect(screen.getByDisplayValue("preset")).toBeDefined();
  });

  it("opens dropdown (via controlled value) and shows option labels", async () => {
    render(
      <AutoComplete
        value="a"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ]}
      />,
    );
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeDefined();
    });
    expect(screen.getByText("Banana")).toBeDefined();
  });

  it("shows option.value when label is not provided", async () => {
    render(
      <AutoComplete value="g" options={[{ value: "grape" }]} />,
    );
    await waitFor(() => {
      expect(screen.getByText("grape")).toBeDefined();
    });
  });

  it("selecting an option fires onSelect and updates the value (controlled)", async () => {
    const onSelect = vi.fn();
    const onChange = vi.fn();
    render(
      <AutoComplete
        value="a"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ]}
        onSelect={onSelect}
        onChange={onChange}
      />,
    );
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeDefined();
    });
    fireEvent.click(screen.getByText("Apple"));
    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith(
        "apple",
        expect.objectContaining({ value: "apple", label: "Apple" }),
      );
    });
    expect(onChange).toHaveBeenCalledWith("apple");
  });

  it("clearOnSelect resets the value to empty", async () => {
    const onChange = vi.fn();
    render(
      <AutoComplete
        value="a"
        options={[{ value: "apple", label: "Apple" }]}
        clearOnSelect
        onChange={onChange}
      />,
    );
    await waitFor(() => expect(screen.getByText("Apple")).toBeDefined());
    fireEvent.click(screen.getByText("Apple"));
    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith("");
    });
  });

  it("disabled option does not fire onSelect when clicked", async () => {
    const onSelect = vi.fn();
    render(
      <AutoComplete
        value="a"
        options={[{ value: "apple", label: "Apple", disabled: true }]}
        onSelect={onSelect}
      />,
    );
    await waitFor(() => expect(screen.getByText("Apple")).toBeDefined());
    fireEvent.click(screen.getByText("Apple"));
    // onSelect should not be called for disabled option
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("disabled option renders with pointer-events-none class", async () => {
    render(
      <AutoComplete
        value="a"
        options={[{ value: "apple", label: "Apple", disabled: true }]}
      />,
    );
    await waitFor(() => expect(screen.getByText("Apple")).toBeDefined());
    const btn = screen.getByText("Apple").closest("button") as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.className).toContain("pointer-events-none");
  });

  it("keyboard navigation: ArrowDown highlights, Enter selects", async () => {
    const onSelect = vi.fn();
    render(
      <AutoComplete
        value="a"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ]}
        onSelect={onSelect}
      />,
    );
    await waitFor(() => expect(screen.getByText("Apple")).toBeDefined());
    const input = screen.getByDisplayValue("a");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    // first option should now be highlighted (bg-accent)
    const firstBtn = screen.getByText("Apple").closest("button") as HTMLElement;
    expect(firstBtn.className).toContain("bg-accent");
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith(
        "apple",
        expect.objectContaining({ value: "apple" }),
      );
    });
  });

  it("keyboard ArrowDown stops at last option", async () => {
    render(
      <AutoComplete
        value="a"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ]}
      />,
    );
    await waitFor(() => expect(screen.getByText("Banana")).toBeDefined());
    const input = screen.getByDisplayValue("a");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const lastBtn = screen.getByText("Banana").closest("button") as HTMLElement;
    expect(lastBtn.className).toContain("bg-accent");
  });

  it("keyboard ArrowUp clamps at first option", async () => {
    render(
      <AutoComplete
        value="a"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ]}
      />,
    );
    await waitFor(() => expect(screen.getByText("Apple")).toBeDefined());
    const input = screen.getByDisplayValue("a");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    const firstBtn = screen.getByText("Apple").closest("button") as HTMLElement;
    expect(firstBtn.className).toContain("bg-accent");
  });

  it("keyboard Escape closes the dropdown", async () => {
    render(
      <AutoComplete value="a" options={[{ value: "apple", label: "Apple" }]} />,
    );
    await waitFor(() => expect(screen.getByText("Apple")).toBeDefined());
    const input = screen.getByDisplayValue("a");
    fireEvent.keyDown(input, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByText("Apple")).toBeNull();
    });
  });

  it("keyboard navigation is a no-op when dropdown is closed", () => {
    const onSelect = vi.fn();
    render(
      <AutoComplete options={[{ value: "apple", label: "Apple" }]} onSelect={onSelect} />,
    );
    const input = screen.getByPlaceholderText("Type to search...");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("mouseEnter sets the highlighted index", async () => {
    render(
      <AutoComplete
        value="a"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ]}
      />,
    );
    await waitFor(() => expect(screen.getByText("Banana")).toBeDefined());
    const secondBtn = screen.getByText("Banana").closest("button") as HTMLElement;
    fireEvent.mouseEnter(secondBtn);
    expect(secondBtn.className).toContain("bg-accent");
  });

  it("closes the dropdown after selecting a leaf option", async () => {
    render(
      <AutoComplete value="a" options={[{ value: "apple", label: "Apple" }]} />,
    );
    await waitFor(() => expect(screen.getByText("Apple")).toBeDefined());
    fireEvent.click(screen.getByText("Apple"));
    await waitFor(() => expect(screen.queryByText("Apple")).toBeNull());
  });

  it("dropdown closes when value is cleared (empty options branch)", async () => {
    const { rerender } = render(
      <AutoComplete value="a" options={[{ value: "apple", label: "Apple" }]} />,
    );
    await waitFor(() => expect(screen.getByText("Apple")).toBeDefined());
    rerender(<AutoComplete value="a" options={[]} />);
    await waitFor(() => expect(screen.queryByText("Apple")).toBeNull());
  });

  it("disabled input renders with disabled attribute", () => {
    render(<AutoComplete options={[{ value: "a" }]} disabled />);
    const input = screen.getByPlaceholderText("Type to search...") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("applies custom className to the input", () => {
    render(
      <AutoComplete options={[]} className="my-ac" />,
    );
    const input = screen.getByPlaceholderText("Type to search...");
    expect(input.className).toContain("my-ac");
  });

  it("module is importable with expected exports", async () => {
    const mod = await import("@/components/ui/autocomplete");
    expect(mod.AutoComplete).toBeDefined();
  });
});
