import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TagsInput } from "./tags-input";

describe("tags-input", () => {
  it("exports TagsInput", () => {
    expect(TagsInput).toBeDefined();
  });

  it("renders placeholder when empty", () => {
    render(<TagsInput value={[]} placeholder="Add tag..." />);
    expect(screen.getByPlaceholderText("Add tag...")).toBeDefined();
  });

  it("renders existing tags as badges", () => {
    render(<TagsInput value={["alpha", "beta"]} />);
    expect(screen.getByText("alpha")).toBeDefined();
    expect(screen.getByText("beta")).toBeDefined();
  });

  it("adds a tag on Enter and fires onChange", () => {
    const onChange = vi.fn();
    render(<TagsInput value={[]} onChange={onChange} placeholder="p" />);
    const input = screen.getByPlaceholderText("p");
    fireEvent.change(input, { target: { value: "gamma" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0]?.[0]).toEqual(["gamma"]);
  });

  it("adds a tag on comma key", () => {
    const onChange = vi.fn();
    render(<TagsInput value={[]} onChange={onChange} placeholder="p" />);
    const input = screen.getByPlaceholderText("p");
    fireEvent.change(input, { target: { value: "delta" } });
    fireEvent.keyDown(input, { key: "," });
    expect(onChange).toHaveBeenCalledWith(["delta"]);
  });

  it("trims whitespace when adding a tag", () => {
    const onChange = vi.fn();
    render(<TagsInput value={[]} onChange={onChange} placeholder="p" />);
    const input = screen.getByPlaceholderText("p");
    fireEvent.change(input, { target: { value: "  spaced  " } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(["spaced"]);
  });

  it("does not add an empty tag", () => {
    const onChange = vi.fn();
    render(<TagsInput value={[]} onChange={onChange} placeholder="p" />);
    const input = screen.getByPlaceholderText("p");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not add a duplicate tag", () => {
    const onChange = vi.fn();
    const { unmount } = render(<TagsInput value={[]} onChange={onChange} placeholder="p" />);
    const input = screen.getByPlaceholderText("p");
    fireEvent.change(input, { target: { value: "dup" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalled();
    unmount();
    const onChange2 = vi.fn();
    render(<TagsInput value={["dup"]} onChange={onChange2} placeholder="q" />);
    const input2 = document.querySelector("input") as HTMLInputElement;
    expect(input2).not.toBeNull();
    fireEvent.change(input2, { target: { value: "dup" } });
    fireEvent.keyDown(input2, { key: "Enter" });
    expect(onChange2).not.toHaveBeenCalled();
  });

  it("removes the last tag on Backspace when input is empty", () => {
    const onChange = vi.fn();
    render(
      <TagsInput value={["one", "two"]} onChange={onChange} />,
    );
    const input = document.querySelector("input") as HTMLInputElement;
    expect(input).not.toBeNull();
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0]?.[0]).toEqual(["one"]);
  });

  it("removes a tag via its remove button", () => {
    const onChange = vi.fn();
    render(
      <TagsInput value={["keep", "remove"]} onChange={onChange} placeholder="p" />,
    );
    const removeButtons = screen.getAllByRole("button");
    // remove button for "remove" tag (last badge's X)
    fireEvent.click(removeButtons[removeButtons.length - 1]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0]?.[0]).toEqual(["keep"]);
  });

  it("respects max tag limit", () => {
    const onChange = vi.fn();
    render(
      <TagsInput value={["a", "b"]} max={2} onChange={onChange} />,
    );
    const input = document.querySelector("input") as HTMLInputElement;
    expect(input).not.toBeNull();
    // input is disabled when at max
    expect(input.disabled).toBe(true);
    fireEvent.change(input, { target: { value: "c" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disables input and hides remove buttons when disabled", () => {
    render(<TagsInput value={["x"]} disabled />);
    const input = document.querySelector("input") as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.disabled).toBe(true);
    // no remove buttons when disabled
    expect(screen.queryAllByRole("button").length).toBe(0);
  });

  it("clears the input after adding a tag", () => {
    const onChange = vi.fn();
    render(<TagsInput value={[]} onChange={onChange} placeholder="p" />);
    const input = screen.getByPlaceholderText("p") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "newtag" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0]?.[0]).toEqual(["newtag"]);
    expect(input.value).toBe("");
  });

  it("focuses the input when the container is clicked", () => {
    render(<TagsInput value={[]} placeholder="p" />);
    const input = screen.getByPlaceholderText("p");
    const container = input.parentElement as HTMLElement;
    fireEvent.click(container);
    expect(document.activeElement).toBe(input);
  });

  it("merges custom className", () => {
    const { container } = render(
      <TagsInput value={[]} className="my-tags" placeholder="p" />,
    );
    expect(container.firstChild?.parentElement).not.toBeNull();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("my-tags");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/tags-input");
    expect(mod.TagsInput).toBeDefined();
  });
});
