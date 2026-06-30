import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CompanyBrowse } from "./company-browse";
import type { CompanyBrowseProps, CompanyBrowseItem } from "./company-browse";

describe("CompanyBrowse", () => {
  it("exports the component and types", () => {
    expect(CompanyBrowse).toBeDefined();
    const _tc: CompanyBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open", () => {
    render(
      <CompanyBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { id: "C1", name: "Acme 食品", code: "ACME", taxNo: "91000000US" },
          { id: "C2", name: "Best 公司" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择公司");
    expect(document.body.textContent ?? "").toContain("Acme 食品");
    expect(document.body.textContent ?? "").toContain("Best 公司");
  });

  it("renders empty-state text when no items", () => {
    render(
      <CompanyBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无公司"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无公司");
  });

  it("does not render dialog content when closed", () => {
    render(
      <CompanyBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ id: "C1", name: "Acme" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("Acme");
  });

  it("type-checks CompanyBrowseItem shape", () => {
    const item: CompanyBrowseItem = { id: "C1", name: "Acme" };
    expect(item.id).toBe("C1");
  });
});
