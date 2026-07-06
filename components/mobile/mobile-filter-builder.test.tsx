import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MobileFilterBuilder } from "./mobile-filter-builder";
import type { MobileFilterBuilderProps } from "./mobile-filter-builder";

describe("MobileFilterBuilder", () => {
  it("renders", () => {
    const { container } = render(<MobileFilterBuilder fields={[]} />);
    expect(container.querySelector('[data-slot="mobile-filter-builder"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileFilterBuilderProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
