import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { WarehouseBrowse } from "./warehouse-browse";
import type {
  WarehouseBrowseProps,
  WarehouseBrowseItem,
} from "./warehouse-browse";

describe("WarehouseBrowse", () => {
  it("exports the component and types", () => {
    expect(WarehouseBrowse).toBeDefined();
    const _tc: WarehouseBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open", () => {
    render(
      <WarehouseBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { id: "W1", name: "中央仓", code: "CQ-01", manager: "张三" },
          { id: "W2", name: "华东仓" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择仓库");
    expect(document.body.textContent ?? "").toContain("中央仓");
    expect(document.body.textContent ?? "").toContain("华东仓");
  });

  it("renders empty-state text when no items", () => {
    render(
      <WarehouseBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无仓库"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无仓库");
  });

  it("does not render dialog content when closed", () => {
    render(
      <WarehouseBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ id: "W1", name: "中央仓" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("中央仓");
  });

  it("type-checks WarehouseBrowseItem shape", () => {
    const item: WarehouseBrowseItem = { id: "W1", name: "中央仓" };
    expect(item.id).toBe("W1");
  });
});
