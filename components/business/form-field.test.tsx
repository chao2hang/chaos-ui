import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LabeledField } from "./form-field";

describe("form-field", () => {
  it("exports LabeledField", () => {
    expect(LabeledField).toBeDefined();
  });

  it("renders label and children", () => {
    render(
      <LabeledField label="用户名">
        <input data-testid="i" />
      </LabeledField>,
    );
    expect(screen.getByText("用户名")).toBeDefined();
    expect(screen.getByTestId("i")).toBeDefined();
  });

  it("renders required asterisk when required", () => {
    const { container } = render(
      <LabeledField label="邮箱" required>
        <input />
      </LabeledField>,
    );
    expect(container.querySelector("span.text-destructive")).not.toBeNull();
  });

  it("renders description when provided and no error", () => {
    render(
      <LabeledField label="f" description="帮助文本">
        <input />
      </LabeledField>,
    );
    expect(screen.getByText("帮助文本")).toBeDefined();
  });

  it("hides description when error is present", () => {
    render(
      <LabeledField label="f" description="帮助文本" error="出错了">
        <input />
      </LabeledField>,
    );
    expect(screen.queryByText("帮助文本")).toBeNull();
    expect(screen.getByText("出错了")).toBeDefined();
  });

  it("renders error message when error provided", () => {
    const { container } = render(
      <LabeledField label="f" error="必填项">
        <input />
      </LabeledField>,
    );
    expect(container.querySelector("p.text-destructive")).not.toBeNull();
  });

  it("renders children only when no label/description/error", () => {
    render(
      <LabeledField>
        <span data-testid="only">child</span>
      </LabeledField>,
    );
    expect(screen.getByTestId("only")).toBeDefined();
  });
});
