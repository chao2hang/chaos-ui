import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowseDialog } from "./browse-dialog";
import type { BrowseDialogProps } from "./browse-dialog";

describe("BrowseDialog", () => {
  it("renders open dialog", () => {
    render(
      <BrowseDialog
        open
        onOpenChange={() => {}}
        loadData={async () => ({ rows: [], total: 0 })}
        columns={[]}
      />,
    );
    expect(screen.getByRole("dialog")).toBeDefined();
  });

  it("exports types", () => {
    const _t: BrowseDialogProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });

  it("filters local items and confirms single selection", async () => {
    const onChange = vi.fn();
    render(
      <BrowseDialog
        open
        onOpenChange={() => {}}
        items={[
          { id: "1", name: "Alpha" },
          { id: "2", name: "Beta" },
        ]}
        columns={[{ key: "name", title: "Name", dataIndex: "name" }]}
        selectionMode="single"
        searchDebounceMs={0}
        pageSize={10}
        onChange={onChange}
      />,
    );

    await waitFor(() => {
      expect(document.body.textContent ?? "").toContain("Alpha");
    });

    fireEvent.click(screen.getByText("Alpha"));
    fireEvent.click(screen.getByRole("button", { name: /确定/ }));
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls[0]![0] as Array<{ id: string }>;
    expect(arg).toHaveLength(1);
    expect(arg[0]!.id).toBe("1");
  });
});
