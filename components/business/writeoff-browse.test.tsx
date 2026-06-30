import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { WriteoffBrowse } from "./writeoff-browse";
import type {
  WriteoffBrowseProps,
  WriteoffBrowseItem,
} from "./writeoff-browse";

describe("WriteoffBrowse", () => {
  it("exports the component and types", () => {
    expect(WriteoffBrowse).toBeDefined();
    const _tc: WriteoffBrowseProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders the dialog title and items when open", () => {
    render(
      <WriteoffBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[
          { id: "WO1", no: "WO20240101", counterparty: "Acme", amount: 500, date: "2024-01-01" },
          { id: "WO2", no: "WO20240102", counterparty: "Beta" },
        ]}
      />,
    );
    expect(document.body.textContent ?? "").toContain("选择核销单");
    expect(document.body.textContent ?? "").toContain("WO20240101");
    expect(document.body.textContent ?? "").toContain("Acme");
  });

  it("renders empty-state text when no items", () => {
    render(
      <WriteoffBrowse
        open
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[]}
        emptyText="暂无核销单"
      />,
    );
    expect(document.body.textContent ?? "").toContain("暂无核销单");
  });

  it("does not render dialog content when closed", () => {
    render(
      <WriteoffBrowse
        open={false}
        onOpenChange={() => {}}
        onSelect={() => {}}
        items={[{ id: "WO1", no: "WO20240101" }]}
      />,
    );
    expect(document.body.textContent ?? "").not.toContain("WO20240101");
  });

  it("type-checks WriteoffBrowseItem shape", () => {
    const item: WriteoffBrowseItem = { id: "WO1" };
    expect(item.id).toBe("WO1");
  });
});
