import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PriceLadderEditor } from "./price-ladder-editor";

describe("PriceLadderEditor", () => {
  it("renders title and add button", () => {
    render(
      <PriceLadderEditor
        value={[{ minQty: 1, price: 10, unit: "箱" }]}
        showPreview
      />,
    );
    expect(screen.getByText("阶梯定价")).toBeDefined();
    expect(screen.getByText("添加阶梯")).toBeDefined();
  });

  it("adds a tier via button", () => {
    const onChange = vi.fn();
    render(
      <PriceLadderEditor
        value={[{ minQty: 1, price: 10, unit: "箱" }]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("添加阶梯"));
    expect(onChange).toHaveBeenCalled();
  });
});
