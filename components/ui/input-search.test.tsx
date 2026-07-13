import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputSearch } from "@/components/ui/input-search";
import type { InputSearchProps } from "@/components/ui/input-search";

describe("InputSearch", () => {
  it("renders with default placeholder", () => {
    render(<InputSearch />);
    expect(screen.getByPlaceholderText("Search...")).toBeDefined();
  });

  it("renders with custom placeholder", () => {
    render(<InputSearch placeholder="Find items..." />);
    expect(screen.getByPlaceholderText("Find items...")).toBeDefined();
  });

  it("renders with data-slot attribute", () => {
    const { container } = render(<InputSearch />);
    expect(
      container.querySelector('[data-slot="input-search"]'),
    ).not.toBeNull();
  });

  it("calls onSearch when Enter is pressed", () => {
    const onSearch = vi.fn();
    render(<InputSearch onSearch={onSearch} defaultValue="hello" />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSearch).toHaveBeenCalledWith("hello", expect.any(Object));
  });

  it("calls onChange when input value changes", () => {
    const onChange = vi.fn();
    render(<InputSearch onChange={onChange} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledWith("test", expect.any(Object));
  });

  it("shows clear button when allowClear is true and value exists", () => {
    render(<InputSearch allowClear defaultValue="hello" />);
    expect(screen.getByLabelText("Clear")).toBeDefined();
  });

  it("does not show clear button when allowClear is false", () => {
    render(<InputSearch allowClear={false} defaultValue="hello" />);
    expect(screen.queryByLabelText("Clear")).toBeNull();
  });

  it("does not show clear button when value is empty", () => {
    render(<InputSearch allowClear defaultValue="" />);
    expect(screen.queryByLabelText("Clear")).toBeNull();
  });

  it("clears value when clear button is clicked", () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();
    render(
      <InputSearch
        allowClear
        defaultValue="hello"
        onChange={onChange}
        onSearch={onSearch}
      />,
    );
    fireEvent.click(screen.getByLabelText("Clear"));
    expect(onChange).toHaveBeenCalledWith("");
    expect(onSearch).toHaveBeenCalledWith("");
  });

  it("renders with enterButton as boolean (shows search icon button)", () => {
    render(<InputSearch enterButton />);
    // The enter button should render a button with a search icon
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("keeps the clear control positioned relative to the enterButton root", () => {
    // enterButton branch used absolute clear without relative on the root.
    const { container } = render(
      <InputSearch enterButton allowClear defaultValue="q" />,
    );
    const root = container.querySelector(
      '[data-slot="input-search"]',
    ) as HTMLElement;
    expect(root.className.split(/\s+/)).toContain("relative");
    expect(root.contains(screen.getByLabelText("Clear"))).toBe(true);
  });

  it("renders with enterButton as custom ReactNode", () => {
    render(<InputSearch enterButton={<span>Search</span>} />);
    expect(screen.getByText("Search")).toBeDefined();
  });

  it("calls onSearch when enter button is clicked", () => {
    const onSearch = vi.fn();
    render(
      <InputSearch enterButton onSearch={onSearch} defaultValue="query" />,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith("query", expect.any(Object));
  });

  it("shows loading spinner when loading is true with enterButton", () => {
    render(<InputSearch enterButton loading />);
    expect(screen.getByText("⏳")).toBeDefined(); // ⏳ hourglass
  });

  it("shows loading spinner when loading is true without enterButton", () => {
    render(<InputSearch loading />);
    expect(screen.getByText("⏳")).toBeDefined();
  });

  it("does not show clear button when loading", () => {
    render(<InputSearch allowClear loading defaultValue="hello" />);
    expect(screen.queryByLabelText("Clear")).toBeNull();
  });

  it("works in controlled mode", () => {
    const onSearch = vi.fn();
    render(<InputSearch value="controlled" onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    expect((input as HTMLInputElement).value).toBe("controlled");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSearch).toHaveBeenCalledWith("controlled", expect.any(Object));
  });

  it("applies size classes", () => {
    const { container: smContainer } = render(<InputSearch size="sm" />);
    const smInput = smContainer.querySelector("input");
    expect(smInput?.className).toContain("h-7");

    const { container: lgContainer } = render(<InputSearch size="lg" />);
    const lgInput = lgContainer.querySelector("input");
    expect(lgInput?.className).toContain("h-9");
  });

  it("merges custom className", () => {
    const { container } = render(<InputSearch className="my-search" />);
    const wrapper = container.querySelector('[data-slot="input-search"]');
    expect(wrapper?.className).toContain("my-search");
  });

  it("forwards onKeyDown prop", () => {
    const onKeyDown = vi.fn();
    render(<InputSearch onKeyDown={onKeyDown} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it("InputSearchProps type is importable", () => {
    const _props: InputSearchProps = {
      placeholder: "test",
      allowClear: true,
      enterButton: true,
      size: "sm",
      loading: false,
    };
    expect(_props.placeholder).toBe("test");
  });
});
