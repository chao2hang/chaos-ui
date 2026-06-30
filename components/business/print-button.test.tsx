import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PrintButton } from "./print-button";
import type { PrintButtonProps } from "./print-button";

describe("PrintButton", () => {
  it("exports PrintButton", () => {
    expect(PrintButton).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PrintButtonProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders default label", () => {
    render(<PrintButton />);
    expect(screen.getByRole("button", { name: /Print/ })).toBeDefined();
  });

  it("renders custom label", () => {
    render(<PrintButton label="打印" />);
    expect(screen.getByRole("button", { name: /打印/ })).toBeDefined();
  });

  it("renders children when provided (overrides label)", () => {
    render(<PrintButton>Print Now</PrintButton>);
    expect(screen.getByRole("button", { name: /Print Now/ })).toBeDefined();
  });

  it("calls onPrint handler when clicked", () => {
    const onPrint = vi.fn();
    render(<PrintButton onPrint={onPrint} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onPrint).toHaveBeenCalledTimes(1);
  });

  describe("window.print fallback", () => {
    const originalPrint = window.print;
    afterEach(() => {
      window.print = originalPrint;
    });

    it("calls window.print() when no onPrint handler", () => {
      const printSpy = vi.fn();
      window.print = printSpy;
      render(<PrintButton />);
      fireEvent.click(screen.getByRole("button"));
      expect(printSpy).toHaveBeenCalledTimes(1);
    });
  });

  it("forwards disabled prop", () => {
    render(<PrintButton disabled />);
    expect(
      (screen.getByRole("button") as HTMLButtonElement).disabled,
    ).toBe(true);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/print-button");
    expect(mod.PrintButton).toBeDefined();
  });
});
