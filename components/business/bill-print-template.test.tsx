import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BillPrintTemplate } from "./bill-print-template";
import type { BillPrintTemplateProps } from "./bill-print-template";

describe("BillPrintTemplate", () => {
  it("renders the title and field values", () => {
    render(
      <BillPrintTemplate
        title="付款申请单"
        fields={[
          { label: "申请人", value: "张三" },
          { label: "金额", value: "¥1,234.50" },
        ]}
      />,
    );
    expect(screen.getByText("付款申请单")).toBeDefined();
    expect(screen.getByText("申请人：")).toBeDefined();
    expect(screen.getByText("张三")).toBeDefined();
    expect(screen.getByText("金额：")).toBeDefined();
    expect(screen.getByText("¥1,234.50")).toBeDefined();
  });

  it("renders the line-item table when lines are provided", () => {
    render(
      <BillPrintTemplate
        title="单"
        fields={[]}
        lines={[
          { 项目: "办公用品", 金额: "100" },
          { 项目: "差旅费", 金额: "200" },
        ]}
      />,
    );
    expect(screen.getByRole("columnheader", { name: "项目" })).toBeDefined();
    expect(screen.getByRole("columnheader", { name: "金额" })).toBeDefined();
    expect(screen.getByRole("cell", { name: "办公用品" })).toBeDefined();
    expect(screen.getByRole("cell", { name: "差旅费" })).toBeDefined();
    expect(screen.getByRole("cell", { name: "100" })).toBeDefined();
    expect(screen.getByRole("cell", { name: "200" })).toBeDefined();
  });

  it("omits the table when no lines are provided", () => {
    render(<BillPrintTemplate title="单" fields={[]} />);
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("exports types", () => {
    const _tc: BillPrintTemplateProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
