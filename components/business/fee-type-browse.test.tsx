import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { FeeTypeBrowse } from "./fee-type-browse";
import type { FeeTypeBrowseProps, FeeTypeBrowseItem } from "./fee-type-browse";

describe("FeeTypeBrowse", () => {
  it("exports the component and types", () => {
    expect(FeeTypeBrowse).toBeDefined();
    const _tc: FeeTypeBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open", () => {
    render(
      <FeeTypeBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { id: "F1", name: "运费", code: "FREIGHT", direction: "expense" },
          { id: "F2", name: "手续费", direction: "income" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择费用类型");
    expect(document.body.textContent ?? "").toContain("运费");
    expect(document.body.textContent ?? "").toContain("手续费");
  });

  it("renders empty-state text when no items", () => {
    render(
      <FeeTypeBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无费用类型"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无费用类型");
  });

  it("does not render dialog content when closed", () => {
    render(
      <FeeTypeBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ id: "F1", name: "运费" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("运费");
  });

  it("type-checks FeeTypeBrowseItem shape", () => {
    const item: FeeTypeBrowseItem = { id: "F1", name: "运费" };
    expect(item.id).toBe("F1");
  });
});
