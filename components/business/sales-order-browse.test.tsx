import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SalesOrderBrowse } from "./sales-order-browse";
import type {
  SalesOrderBrowseProps,
  SalesOrderBrowseItem,
} from "./sales-order-browse";

describe("SalesOrderBrowse", () => {
  it("exports the component and types", () => {
    expect(SalesOrderBrowse).toBeDefined();
    const _tc: SalesOrderBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open", () => {
    render(
      <SalesOrderBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { id: "SO1", no: "SO20240101", customer: "Acme", amount: 1200, date: "2024-01-01" },
          { id: "SO2", no: "SO20240102", customer: "Beta" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择销售订单");
    expect(document.body.textContent ?? "").toContain("SO20240101");
    expect(document.body.textContent ?? "").toContain("Acme");
  });

  it("renders empty-state text when no items", () => {
    render(
      <SalesOrderBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无订单"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无订单");
  });

  it("does not render dialog content when closed", () => {
    render(
      <SalesOrderBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ id: "SO1", no: "SO20240101" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("SO20240101");
  });

  it("type-checks SalesOrderBrowseItem shape", () => {
    const item: SalesOrderBrowseItem = { id: "SO1" };
    expect(item.id).toBe("SO1");
  });
});
