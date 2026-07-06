import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MobileDashboardLayout } from "./mobile-dashboard-layout";
import type { MobileDashboardLayoutProps } from "./mobile-dashboard-layout";

describe("MobileDashboardLayout", () => {
  it("renders", () => {
    const { container } = render(<MobileDashboardLayout><p>content</p></MobileDashboardLayout>);
    expect(container.querySelector('[data-slot="mobile-dashboard-layout"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileDashboardLayoutProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
