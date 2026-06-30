import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ShippingWayBrowse } from "./shipping-way-browse";
import type {
  ShippingWayBrowseProps,
  ShippingWayBrowseItem,
} from "./shipping-way-browse";

describe("ShippingWayBrowse", () => {
  it("exports the component and types", () => {
    expect(ShippingWayBrowse).toBeDefined();
    const _tc: ShippingWayBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open", () => {
    render(
      <ShippingWayBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { id: "S1", name: "陆运", code: "LAND", carrier: "顺丰" },
          { id: "S2", name: "空运", code: "AIR" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择运输方式");
    expect(document.body.textContent ?? "").toContain("陆运");
    expect(document.body.textContent ?? "").toContain("空运");
  });

  it("renders empty-state text when no items", () => {
    render(
      <ShippingWayBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无运输方式"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无运输方式");
  });

  it("does not render dialog content when closed", () => {
    render(
      <ShippingWayBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ id: "S1", name: "陆运" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("陆运");
  });

  it("type-checks ShippingWayBrowseItem shape", () => {
    const item: ShippingWayBrowseItem = { id: "S1", name: "陆运" };
    expect(item.id).toBe("S1");
  });
});
