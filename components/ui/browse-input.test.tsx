import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { BrowseInput, browseInputVariants } from "./browse-input";
import type { BrowseInputProps } from "./browse-input";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("browse-input", () => {
  it("exports BrowseInput", () => {
    expect(BrowseInput).toBeDefined();
  });

  it("exports browseInputVariants", () => {
    expect(browseInputVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BrowseInputProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders an input with placeholder", () => {
    const { container } = render(<BrowseInput placeholder="Search..." />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe("Search...");
  });

  it("uses i18n placeholder by default", () => {
    const { container } = render(<BrowseInput />);
    expect((container.querySelector("input") as HTMLInputElement).placeholder).toBe(
      "browseInput.placeholder",
    );
  });

  it("renders browse button by default", () => {
    const { container } = render(<BrowseInput value="x" />);
    // browse + clear buttons present
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("hides browse button when showBrowseButton=false", () => {
    const { container } = render(
      <BrowseInput value="x" showBrowseButton={false} />,
    );
    // only clear button
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(1);
  });

  it("hides clear button when showClearButton=false", () => {
    const { container } = render(
      <BrowseInput value="x" showClearButton={false} />,
    );
    // only browse button
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(1);
  });

  it("clear button not rendered when value is empty", () => {
    const { container } = render(<BrowseInput value="" />);
    // only browse button
    expect(container.querySelectorAll("button").length).toBe(1);
  });

  it("clear button not rendered when disabled", () => {
    const { container } = render(<BrowseInput value="x" disabled />);
    // browse button is disabled but still rendered; clear hidden because disabled
    expect(container.querySelectorAll("button").length).toBe(1);
  });

  it("clear button not rendered when readOnly", () => {
    const { container } = render(<BrowseInput value="x" readOnly />);
    expect(container.querySelectorAll("button").length).toBe(1);
  });

  it("typing fires onChange with new value (uncontrolled)", () => {
    const onChange = vi.fn();
    const { container } = render(
      <BrowseInput defaultValue="" onChange={onChange} />,
    );
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalledWith("hello");
    expect(input.value).toBe("hello");
  });

  it("clicking clear resets value and fires onClear + onChange", () => {
    const onClear = vi.fn();
    const onChange = vi.fn();
    const { container } = render(
      <BrowseInput defaultValue="data" onChange={onChange} onClear={onClear} />,
    );
    // clear button is the first button (X icon), browse is the second.
    const buttons = container.querySelectorAll("button");
    const clearBtn = buttons[0] as HTMLButtonElement;
    fireEvent.click(clearBtn);
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("");
    expect((container.querySelector("input") as HTMLInputElement).value).toBe("");
  });

  it("clicking browse fires onBrowse", () => {
    const onBrowse = vi.fn();
    const { container } = render(
      <BrowseInput value="x" onBrowse={onBrowse} showClearButton={false} />,
    );
    const browseBtn = container.querySelector("button") as HTMLButtonElement;
    fireEvent.click(browseBtn);
    expect(onBrowse).toHaveBeenCalledTimes(1);
  });

  it("applies aria-invalid attribute", () => {
    const { container } = render(<BrowseInput aria-invalid={true} />);
    const root = container.querySelector('[data-slot="browse-input"]') as HTMLElement;
    expect(root.getAttribute("aria-invalid")).toBe("true");
  });

  it("applies size variant to root (data-size)", () => {
    const { container } = render(<BrowseInput size="lg" />);
    const root = container.querySelector('[data-slot="browse-input"]') as HTMLElement;
    expect(root.getAttribute("data-size")).toBe("lg");
    expect(root.className).toContain("h-9");
  });

  it("disables input and browse button when disabled", () => {
    const { container } = render(<BrowseInput disabled />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.disabled).toBe(true);
    const browseBtn = container.querySelector("button") as HTMLButtonElement;
    expect(browseBtn.disabled).toBe(true);
  });

  it("controlled value overrides internal state", () => {
    const { container, rerender } = render(<BrowseInput value="fixed" />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("fixed");
    // typing does not change controlled value
    fireEvent.change(input, { target: { value: "ignored" } });
    expect(input.value).toBe("fixed");
    rerender(<BrowseInput value="updated" />);
    expect(input.value).toBe("updated");
  });
});
