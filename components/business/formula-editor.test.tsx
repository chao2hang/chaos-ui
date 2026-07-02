import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormulaEditor, safeEvaluate } from "./formula-editor";
import type { FormulaVariable, FormulaFunction } from "./formula-editor";

const sampleVariables: FormulaVariable[] = [
  { name: "price", label: "Unit Price", type: "number", category: "Pricing", sampleValue: 100 },
  { name: "quantity", label: "Quantity", type: "number", category: "Inventory", sampleValue: 10 },
  { name: "discount", label: "Discount", type: "number", category: "Pricing", sampleValue: 0.1 },
  { name: "tax", label: "Tax Rate", type: "number", category: "Pricing", sampleValue: 0.08 },
];

const sampleFunctions: FormulaFunction[] = [
  {
    name: "SUM",
    label: "Sum",
    args: [{ name: "a", type: "number" }, { name: "b", type: "number" }],
    returnType: "number",
    description: "Add values together",
    category: "Math",
  },
  {
    name: "AVG",
    label: "Average",
    args: [{ name: "a", type: "number" }, { name: "b", type: "number" }],
    returnType: "number",
    description: "Calculate average",
    category: "Math",
  },
  {
    name: "ROUND",
    label: "Round",
    args: [{ name: "value", type: "number" }, { name: "decimals", type: "number" }],
    returnType: "number",
    description: "Round to specified decimals",
    category: "Math",
  },
];

describe("FormulaEditor", () => {
  it("renders textarea", () => {
    render(<FormulaEditor />);
    expect(screen.getByTestId("formula-textarea")).toBeDefined();
  });

  it("renders with provided value", () => {
    render(<FormulaEditor value="$price * $quantity" />);
    const textarea = screen.getByTestId("formula-textarea") as HTMLTextAreaElement;
    expect(textarea.value).toBe("$price * $quantity");
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<FormulaEditor value="" onChange={handleChange} />);
    const textarea = screen.getByTestId("formula-textarea");
    fireEvent.change(textarea, { target: { value: "$price + 1" } });
    expect(handleChange).toHaveBeenCalledWith("$price + 1");
  });

  it("variable insertion on click", () => {
    const handleChange = vi.fn();
    render(
      <FormulaEditor value="" onChange={handleChange} variables={sampleVariables} />,
    );
    // Click on a variable badge
    const badge = screen.getByTestId("var-badge-price");
    fireEvent.click(badge);
    expect(handleChange).toHaveBeenCalledWith("$price");
  });

  it("function insertion on click", () => {
    const handleChange = vi.fn();
    render(
      <FormulaEditor value="" onChange={handleChange} functions={sampleFunctions} />,
    );
    // Click on a function badge
    const badge = screen.getByTestId("fn-badge-SUM");
    fireEvent.click(badge);
    expect(handleChange).toHaveBeenCalledWith("SUM(a, b)");
  });

  it("autocomplete opens on $ character", () => {
    render(<FormulaEditor variables={sampleVariables} />);
    const textarea = screen.getByTestId("formula-textarea");
    fireEvent.change(textarea, { target: { value: "$pr", selectionStart: 3 } });
    expect(screen.getByTestId("autocomplete-dropdown")).toBeDefined();
  });

  it("autocomplete filters by text after trigger", () => {
    render(<FormulaEditor variables={sampleVariables} />);
    const textarea = screen.getByTestId("formula-textarea");
    fireEvent.change(textarea, { target: { value: "$pri", selectionStart: 4 } });
    const dropdown = screen.getByTestId("autocomplete-dropdown");
    expect(dropdown).toBeDefined();
    // Should only show "price" since filter is "pri"
    expect(screen.getByTestId("autocomplete-item-price")).toBeDefined();
    // quantity should not be shown
    expect(screen.queryByTestId("autocomplete-item-quantity")).toBeNull();
  });

  it("selecting from autocomplete inserts variable", () => {
    const handleChange = vi.fn();
    render(<FormulaEditor value="" onChange={handleChange} variables={sampleVariables} />);
    const textarea = screen.getByTestId("formula-textarea");
    fireEvent.change(textarea, { target: { value: "$pri", selectionStart: 4 } });
    // Click on autocomplete item
    const item = screen.getByTestId("autocomplete-item-price");
    fireEvent.mouseDown(item);
    expect(handleChange).toHaveBeenCalled();
  });

  it("validation shows error for unbalanced parens", () => {
    render(<FormulaEditor value="$price * (1 + $tax" />);
    expect(screen.getByTestId("formula-error")).toBeDefined();
    expect(screen.getByTestId("formula-error").textContent).toContain("parenthesis");
  });

  it("preview shows computed result with sample values", () => {
    render(
      <FormulaEditor
        value="$price * $quantity"
        showPreview
        sampleValues={{ price: 100, quantity: 10 }}
      />,
    );
    expect(screen.getByTestId("preview-panel")).toBeDefined();
    expect(screen.getByTestId("preview-result").textContent).toBe("1000");
  });

  it("disabled state prevents editing", () => {
    render(<FormulaEditor value="test" disabled />);
    const textarea = screen.getByTestId("formula-textarea") as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
    // Toolbar should not be shown when disabled
    expect(screen.queryByTestId("insertion-toolbar")).toBeNull();
  });

  it("custom validator fires", () => {
    const customValidator = (formula: string) => {
      if (formula.includes("/")) return "Division is not allowed";
      return null;
    };
    render(
      <FormulaEditor value="100 / 2" validator={customValidator} />,
    );
    expect(screen.getByTestId("formula-error")).toBeDefined();
    expect(screen.getByTestId("formula-error").textContent).toContain("Division");
  });

  it("controlled error overrides internal validation", () => {
    render(
      <FormulaEditor value="valid" error="External error message" />,
    );
    expect(screen.getByTestId("formula-error")).toBeDefined();
    expect(screen.getByTestId("formula-error").textContent).toContain("External error message");
  });

  it("has data-slot attribute on root", () => {
    const { container } = render(<FormulaEditor />);
    expect(container.querySelector('[data-slot="formula-editor"]')).toBeDefined();
  });

  it("shows insertion toolbar with variables and functions", () => {
    render(
      <FormulaEditor variables={sampleVariables} functions={sampleFunctions} />,
    );
    expect(screen.getByTestId("insertion-toolbar")).toBeDefined();
  });

  it("does not show toolbar when no variables or functions", () => {
    render(<FormulaEditor />);
    expect(screen.queryByTestId("insertion-toolbar")).toBeNull();
  });
});

describe("safeEvaluate", () => {
  it("evaluates basic arithmetic", () => {
    expect(safeEvaluate("2 + 3", {})).toBe(5);
    expect(safeEvaluate("10 - 4", {})).toBe(6);
    expect(safeEvaluate("3 * 4", {})).toBe(12);
    expect(safeEvaluate("15 / 3", {})).toBe(5);
    expect(safeEvaluate("10 % 3", {})).toBe(1);
  });

  it("respects operator precedence", () => {
    expect(safeEvaluate("2 + 3 * 4", {})).toBe(14);
    expect(safeEvaluate("(2 + 3) * 4", {})).toBe(20);
  });

  it("handles parentheses", () => {
    expect(safeEvaluate("(10 + 5) * 2", {})).toBe(30);
    expect(safeEvaluate("((3 + 2) * (4 - 1))", {})).toBe(15);
  });

  it("substitutes variables", () => {
    expect(safeEvaluate("$price * $quantity", { price: 100, quantity: 5 })).toBe(500);
    expect(safeEvaluate("$a + $b", { a: 10, b: 20 })).toBe(30);
  });

  it("handles built-in functions", () => {
    expect(safeEvaluate("SUM(1, 2, 3)", {})).toBe(6);
    expect(safeEvaluate("AVG(10, 20, 30)", {})).toBe(20);
    expect(safeEvaluate("MIN(5, 3, 8)", {})).toBe(3);
    expect(safeEvaluate("MAX(5, 3, 8)", {})).toBe(8);
    expect(safeEvaluate("ABS(-5)", {})).toBe(5);
    expect(safeEvaluate("ROUND(3.14159, 2)", {})).toBe(3.14);
  });

  it("handles division by zero", () => {
    expect(safeEvaluate("10 / 0", {})).toBeNull();
  });

  it("returns null for invalid expressions", () => {
    expect(safeEvaluate("", {})).toBeNull();
  });

  it("handles negative numbers", () => {
    expect(safeEvaluate("-5 + 3", {})).toBe(-2);
    expect(safeEvaluate("-(-5)", {})).toBe(5);
  });

  it("handles complex expressions with variables and functions", () => {
    expect(
      safeEvaluate("$price * $qty + SUM($tax, $shipping)", {
        price: 50,
        qty: 3,
        tax: 15,
        shipping: 10,
      }),
    ).toBe(175);
  });
});
