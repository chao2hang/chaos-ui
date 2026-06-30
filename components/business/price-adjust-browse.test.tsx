import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PriceAdjustBrowse } from "./price-adjust-browse";
import type {
  PriceAdjustBrowseProps,
  PriceAdjustBrowseItem,
} from "./price-adjust-browse";

describe("PriceAdjustBrowse", () => {
  it("exports the component and types", () => {
    expect(PriceAdjustBrowse).toBeDefined();
    const _tc: PriceAdjustBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open", () => {
    render(
      <PriceAdjustBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { id: "PA1", no: "PA20240101", product: "酱油", date: "2024-01-01" },
          { id: "PA2", no: "PA20240102", product: "醋" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择调价单");
    expect(document.body.textContent ?? "").toContain("PA20240101");
    expect(document.body.textContent ?? "").toContain("酱油");
  });

  it("renders empty-state text when no items", () => {
    render(
      <PriceAdjustBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无调价单"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无调价单");
  });

  it("does not render dialog content when closed", () => {
    render(
      <PriceAdjustBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ id: "PA1", no: "PA20240101" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("PA20240101");
  });

  it("type-checks PriceAdjustBrowseItem shape", () => {
    const item: PriceAdjustBrowseItem = { id: "PA1" };
    expect(item.id).toBe("PA1");
  });
});
