import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock react-i18next so Combobox renders without a provider
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k: string) => k,
    i18n: { language: "en" },
  }),
}));

import { Combobox } from "@/components/ui/combobox";
import type { ComboboxOption } from "@/components/ui/combobox";

const sampleOptions: ComboboxOption[] = [
  {
    value: "apple",
    label: "Apple",
    description: "A red fruit",
    keywords: ["fruit", "red"],
    group: "Fruits",
  },
  {
    value: "banana",
    label: "Banana",
    description: "A yellow fruit",
    group: "Fruits",
  },
  { value: "carrot", label: "Carrot", group: "Vegetables" },
  { value: "disabled", label: "Disabled", disabled: true },
];

describe("Combobox", () => {
  it("exports Combobox", () => {
    expect(Combobox).toBeDefined();
    expect(typeof Combobox).toBe("function");
  });

  it("renders with placeholder text", () => {
    render(<Combobox options={sampleOptions} placeholder="Pick a fruit" />);
    expect(screen.getByText("Pick a fruit")).toBeDefined();
  });

  it("renders with selected value label", () => {
    render(<Combobox options={sampleOptions} value="apple" />);
    expect(screen.getByText("Apple")).toBeDefined();
  });

  it("renders as disabled when disabled prop is true", () => {
    const { container } = render(
      <Combobox options={sampleOptions} disabled placeholder="Pick" />,
    );
    const btn = container.querySelector("button");
    expect(btn?.hasAttribute("disabled")).toBe(true);
  });

  it("shows clear button when clearable and value is selected", () => {
    render(<Combobox options={sampleOptions} value="apple" clearable />);
    const clearBtn = screen.getByRole("button", { name: /combobox\.clear/i });
    expect(clearBtn).toBeDefined();
  });

  it("does not show clear button when clearable is false", () => {
    render(
      <Combobox options={sampleOptions} value="apple" clearable={false} />,
    );
    expect(
      screen.queryByRole("button", { name: /combobox\.clear/i }),
    ).toBeNull();
  });

  it("does not show clear button when no value is selected", () => {
    render(<Combobox options={sampleOptions} clearable />);
    expect(
      screen.queryByRole("button", { name: /combobox\.clear/i }),
    ).toBeNull();
  });

  it("calls onChange with undefined when clear button is clicked", () => {
    const onChange = vi.fn();
    render(
      <Combobox
        options={sampleOptions}
        value="apple"
        onChange={onChange}
        clearable
      />,
    );
    const clearBtn = screen.getByRole("button", { name: /combobox\.clear/i });
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("opens dropdown on trigger click and shows options", async () => {
    render(<Combobox options={sampleOptions} placeholder="Pick" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeDefined();
    });
    expect(screen.getByText("Banana")).toBeDefined();
    expect(screen.getByText("Carrot")).toBeDefined();
  });

  it("shows group headers in the dropdown", async () => {
    render(<Combobox options={sampleOptions} placeholder="Pick" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText("Fruits")).toBeDefined();
    });
    expect(screen.getByText("Vegetables")).toBeDefined();
  });

  it("calls onChange when an option is clicked", async () => {
    const onChange = vi.fn();
    render(
      <Combobox
        options={sampleOptions}
        onChange={onChange}
        placeholder="Pick"
      />,
    );
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText("Banana")).toBeDefined();
    });
    fireEvent.click(screen.getByText("Banana"));
    expect(onChange).toHaveBeenCalledWith("banana");
  });

  it("shows search input when searchable is true", async () => {
    render(<Combobox options={sampleOptions} placeholder="Pick" searchable />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("combobox.searchPlaceholder"),
      ).toBeDefined();
    });
  });

  it("does not show search input when searchable is false", async () => {
    render(
      <Combobox
        options={sampleOptions}
        placeholder="Pick"
        searchable={false}
      />,
    );
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeDefined();
    });
    expect(
      screen.queryByPlaceholderText("combobox.searchPlaceholder"),
    ).toBeNull();
  });

  it("shows empty text when no options match search", async () => {
    render(<Combobox options={sampleOptions} placeholder="Pick" searchable />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("combobox.searchPlaceholder"),
      ).toBeDefined();
    });
    const searchInput = screen.getByPlaceholderText(
      "combobox.searchPlaceholder",
    );
    fireEvent.change(searchInput, { target: { value: "zzzzz" } });
    await waitFor(() => {
      expect(screen.getByText("combobox.emptyText")).toBeDefined();
    });
  });

  it("filters options by search query (label)", async () => {
    render(<Combobox options={sampleOptions} placeholder="Pick" searchable />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("combobox.searchPlaceholder"),
      ).toBeDefined();
    });
    const searchInput = screen.getByPlaceholderText(
      "combobox.searchPlaceholder",
    );
    fireEvent.change(searchInput, { target: { value: "car" } });
    await waitFor(() => {
      expect(screen.getByText("Carrot")).toBeDefined();
    });
    expect(screen.queryByText("Apple")).toBeNull();
  });

  it("filters options by description", async () => {
    render(<Combobox options={sampleOptions} placeholder="Pick" searchable />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("combobox.searchPlaceholder"),
      ).toBeDefined();
    });
    const searchInput = screen.getByPlaceholderText(
      "combobox.searchPlaceholder",
    );
    fireEvent.change(searchInput, { target: { value: "yellow" } });
    await waitFor(() => {
      expect(screen.getByText("Banana")).toBeDefined();
    });
  });

  it("filters options by keywords", async () => {
    render(<Combobox options={sampleOptions} placeholder="Pick" searchable />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("combobox.searchPlaceholder"),
      ).toBeDefined();
    });
    const searchInput = screen.getByPlaceholderText(
      "combobox.searchPlaceholder",
    );
    fireEvent.change(searchInput, { target: { value: "red" } });
    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeDefined();
    });
  });

  it("shows check icon next to selected item", async () => {
    render(
      <Combobox options={sampleOptions} value="apple" placeholder="Pick" />,
    );
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      // Dropdown should be open with Apple visible
      expect(screen.getAllByText("Apple").length).toBeGreaterThan(1);
    });
    // The selected item in dropdown has bg-accent/50 and a check icon
    const allApples = screen.getAllByText("Apple");
    const dropdownApple = allApples.find(
      (el) =>
        el.closest("button") !== null &&
        el.closest("button")?.className.includes("bg-accent"),
    );
    expect(dropdownApple).toBeDefined();
  });

  it("renders disabled option with opacity class", async () => {
    render(<Combobox options={sampleOptions} placeholder="Pick" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText("Disabled")).toBeDefined();
    });
    const disabledBtn = screen.getByText("Disabled").closest("button");
    expect(disabledBtn?.className).toContain("opacity-50");
  });

  it("uses custom renderOption when provided", async () => {
    render(
      <Combobox
        options={sampleOptions}
        placeholder="Pick"
        renderOption={(opt) => <span>Custom: {opt.label}</span>}
      />,
    );
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText("Custom: Apple")).toBeDefined();
    });
  });

  it("ComboboxOption type supports all fields", () => {
    const option: ComboboxOption = {
      value: "apple",
      label: "Apple",
      description: "A fruit",
      disabled: false,
      keywords: ["fruit", "red"],
      group: "Fruits",
    };
    expect(option.value).toBe("apple");
    expect(option.group).toBe("Fruits");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/combobox");
    expect(mod.Combobox).toBeDefined();
  });
});
