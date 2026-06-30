import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FieldMask } from "./field-mask";
import type { FieldMaskProps, MaskRule } from "./field-mask";

describe("field-mask", () => {
  it("exports FieldMask", () => {
    expect(FieldMask).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FieldMaskProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: MaskRule | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("masks phone by default", () => {
    render(<FieldMask value="13812345678" />);
    expect(screen.getByText("138****5678")).toBeDefined();
  });

  it("masks idcard", () => {
    render(<FieldMask value="110101199001011234" mask="idcard" />);
    expect(screen.getByText("1101**********1234")).toBeDefined();
  });

  it("masks bankcard", () => {
    render(<FieldMask value="6225880123456789" mask="bankcard" />);
    expect(screen.getByText("6225 **** **** 6789")).toBeDefined();
  });

  it("masks email", () => {
    render(<FieldMask value="alice@example.com" mask="email" />);
    expect(screen.getByText("a***@example.com")).toBeDefined();
  });

  it("masks name (3+ chars keeps first and last)", () => {
    render(<FieldMask value="张三丰" mask="name" />);
    expect(screen.getByText("张*丰")).toBeDefined();
  });

  it("masks name (2 chars)", () => {
    render(<FieldMask value="张三" mask="name" />);
    expect(screen.getByText("张*")).toBeDefined();
  });

  it("returns short values unchanged when below mask threshold", () => {
    render(<FieldMask value="123" mask="phone" />);
    expect(screen.getByText("123")).toBeDefined();
  });

  it("uses custom mask function", () => {
    render(<FieldMask value="secret" mask={(v) => v.toUpperCase()} />);
    expect(screen.getByText("SECRET")).toBeDefined();
  });

  it("custom mask rule returns value as-is", () => {
    render(<FieldMask value="abc" mask="custom" />);
    expect(screen.getByText("abc")).toBeDefined();
  });

  it("shows plaintext when canView is true", () => {
    render(<FieldMask value="13812345678" canView />);
    expect(screen.getByText("13812345678")).toBeDefined();
    // no toggle button when canView
    expect(screen.queryByTitle("查看")).toBeNull();
    expect(screen.queryByTitle("隐藏")).toBeNull();
  });

  it("toggles visibility on eye button click", () => {
    render(<FieldMask value="13812345678" />);
    expect(screen.getByText("138****5678")).toBeDefined();
    fireEvent.click(screen.getByTitle("查看"));
    expect(screen.getByText("13812345678")).toBeDefined();
    expect(screen.getByTitle("隐藏")).toBeDefined();
    fireEvent.click(screen.getByTitle("隐藏"));
    expect(screen.getByText("138****5678")).toBeDefined();
  });

  it("renders copy button and does not throw on click", () => {
    render(<FieldMask value="13812345678" />);
    const copyBtn = screen.getByTitle("复制");
    expect(() => fireEvent.click(copyBtn)).not.toThrow();
  });
});
