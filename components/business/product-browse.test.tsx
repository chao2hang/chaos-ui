import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ProductBrowse } from "./product-browse";
import type { ProductBrowseProps, ProductBrowseItem } from "./product-browse";

describe("ProductBrowse", () => {
  it("exports the component and types", () => {
    expect(ProductBrowse).toBeDefined();
    const _tc: ProductBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open", () => {
    render(
      <ProductBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { id: "P1", name: "酱油", spec: "500ml", unit: "瓶", price: 12.5 },
          { id: "P2", name: "醋", sku: "V-001" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择商品");
    expect(document.body.textContent ?? "").toContain("酱油");
    expect(document.body.textContent ?? "").toContain("醋");
  });

  it("indicates multi-select in the description when multiple=true", () => {
    render(
      <ProductBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        multiple
        items={[{ id: "P1", name: "酱油" }]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("可多选商品");
  });

  it("renders empty-state text when no items", () => {
    render(
      <ProductBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无商品"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无商品");
  });

  it("does not render dialog content when closed", () => {
    render(
      <ProductBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ id: "P1", name: "酱油" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("酱油");
  });

  it("type-checks ProductBrowseItem shape", () => {
    const item: ProductBrowseItem = { id: "P1", name: "酱油" };
    expect(item.id).toBe("P1");
  });
});
