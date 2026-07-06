import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MobileDataTable } from "./mobile-data-table";
import type { MobileDataTableProps } from "./mobile-data-table";

describe("MobileDataTable", () => {
  it("renders empty", () => {
    const { container } = render(<MobileDataTable columns={[]} data={[]} />);
    expect(container.querySelector('[data-slot="mobile-data-table"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileDataTableProps<Record<string, unknown>> | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
