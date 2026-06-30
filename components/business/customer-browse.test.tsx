import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CustomerBrowse } from "./customer-browse";
import type { CustomerBrowseProps, CustomerBrowseItem } from "./customer-browse";

describe("CustomerBrowse", () => {
  it("exports the component and types", () => {
    expect(CustomerBrowse).toBeDefined();
    const _tc: CustomerBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open (single-select)", () => {
    render(
      <CustomerBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { id: "C1", name: "Acme 客户", contact: "王先生", phone: "13800000000" },
          { id: "C2", name: "Beta 客户" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择客户");
    expect(document.body.textContent ?? "").toContain("Acme 客户");
    expect(document.body.textContent ?? "").toContain("Beta 客户");
  });

  it("indicates multi-select in the description when multiple=true", () => {
    render(
      <CustomerBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        multiple
        items={[{ id: "C1", name: "Acme" }]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("可多选客户");
  });

  it("renders empty-state text when no items", () => {
    render(
      <CustomerBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无客户"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无客户");
  });

  it("does not render dialog content when closed", () => {
    render(
      <CustomerBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ id: "C1", name: "Acme" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("Acme");
  });

  it("type-checks CustomerBrowseItem shape", () => {
    const item: CustomerBrowseItem = { id: "C1", name: "Acme" };
    expect(item.id).toBe("C1");
  });
});
