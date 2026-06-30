import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InlineEdit } from "./inline-edit";
import type { InlineEditProps } from "./inline-edit";

describe("InlineEdit", () => {
  it("renders the current value when not editing", () => {
    render(<InlineEdit value="hello" />);
    expect(screen.getByText("hello")).toBeDefined();
  });

  it("renders placeholder when value is empty", () => {
    render(<InlineEdit value="" placeholder="Enter name" />);
    expect(screen.getByText("Enter name")).toBeDefined();
  });

  it("uses custom renderValue", () => {
    render(
      <InlineEdit
        value="raw"
        renderValue={(v) => <span data-testid="rv">custom:{v}</span>}
      />,
    );
    expect(screen.getByTestId("rv").textContent).toBe("custom:raw");
  });

  it("hides the edit pencil button when disabled", () => {
    render(<InlineEdit value="x" disabled />);
    expect(screen.queryByLabelText("Edit value")).toBeNull();
  });

  it("enters edit mode when clicking the value button", () => {
    render(<InlineEdit value="title" />);
    fireEvent.click(screen.getByText("title"));
    expect(screen.getByLabelText("Save value")).toBeDefined();
    expect(screen.getByLabelText("Cancel editing")).toBeDefined();
  });

  it("cannot enter edit mode when disabled", () => {
    render(<InlineEdit value="title" disabled />);
    fireEvent.click(screen.getByText("title"));
    expect(screen.queryByLabelText("Save value")).toBeNull();
  });

  it("calls onSave with the draft on save click and exits edit mode", async () => {
    const onSave = vi.fn();
    render(<InlineEdit value="old" onSave={onSave} />);
    fireEvent.click(screen.getByText("old"));
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new" } });
    fireEvent.click(screen.getByLabelText("Save value"));
    await Promise.resolve();
    expect(onSave).toHaveBeenCalledWith("new");
  });

  it("shows validation error and blocks save when validate returns a message", async () => {
    const onSave = vi.fn();
    const validate = (v: string) => (v.trim() === "" ? "required" : undefined);
    render(<InlineEdit value="x" onSave={onSave} validate={validate} />);
    fireEvent.click(screen.getByText("x"));
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByLabelText("Save value"));
    await Promise.resolve();
    expect(screen.getByText("required")).toBeDefined();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("cancels editing via the cancel button", () => {
    render(<InlineEdit value="keep" />);
    fireEvent.click(screen.getByText("keep"));
    fireEvent.click(screen.getByLabelText("Cancel editing"));
    expect(screen.queryByLabelText("Save value")).toBeNull();
    expect(screen.getByText("keep")).toBeDefined();
  });

  it("cancels editing on Escape key", () => {
    render(<InlineEdit value="keep" />);
    fireEvent.click(screen.getByText("keep"));
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByLabelText("Save value")).toBeNull();
  });

  it("saves on Enter for single-line (non-multiline)", async () => {
    const onSave = vi.fn();
    render(<InlineEdit value="a" onSave={onSave} />);
    fireEvent.click(screen.getByText("a"));
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "b" } });
    fireEvent.keyDown(input, { key: "Enter" });
    await Promise.resolve();
    expect(onSave).toHaveBeenCalledWith("b");
  });

  it("renders a textarea when multiline", () => {
    render(<InlineEdit value="line" multiline />);
    fireEvent.click(screen.getByText("line"));
    const ta = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(ta.tagName).toBe("TEXTAREA");
  });

  it("exports types", () => {
    const _tc1: InlineEditProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
