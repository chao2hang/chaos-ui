import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CityBrowse } from "./city-browse";
import type { CityBrowseProps, CityBrowseItem } from "./city-browse";

describe("CityBrowse", () => {
  it("exports the component and types", () => {
    expect(CityBrowse).toBeDefined();
    const _tc: CityBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open", () => {
    render(
      <CityBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { code: "CQ", name: "重庆市", province: "四川" },
          { code: "CD", name: "成都市" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择城市");
    expect(document.body.textContent ?? "").toContain("重庆市");
    expect(document.body.textContent ?? "").toContain("成都市");
  });

  it("renders empty-state text when no items match", () => {
    render(
      <CityBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无城市"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无城市");
  });

  it("does not render dialog content when closed", () => {
    render(
      <CityBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ code: "CQ", name: "重庆市" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("重庆市");
  });

  it("type-checks CityBrowseItem shape", () => {
    const item: CityBrowseItem = { code: "CQ", name: "重庆市" };
    expect(item.code).toBe("CQ");
  });
});
