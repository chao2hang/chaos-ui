import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrintTemplateLayout } from "./print-template-layout";

describe("PrintTemplateLayout", () => {
  it("renders title as heading and body", () => {
    render(
      <PrintTemplateLayout title="出库单">
        <p>Invoice body</p>
      </PrintTemplateLayout>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "出库单" }),
    ).toBeDefined();
    expect(screen.getByText("Invoice body")).toBeDefined();
  });

  it("renders without title", () => {
    render(<PrintTemplateLayout>No title content</PrintTemplateLayout>);
    expect(screen.getByText("No title content")).toBeDefined();
    expect(screen.queryByRole("heading")).toBeNull();
  });
});
