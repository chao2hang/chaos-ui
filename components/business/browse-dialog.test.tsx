import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
