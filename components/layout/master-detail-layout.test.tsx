import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MasterDetailLayout } from "@/components/layout/master-detail-layout";
import type { MasterDetailLayoutProps } from "@/components/layout/master-detail-layout";

describe("MasterDetailLayout", () => {
  it("MasterDetailLayoutProps type is importable", () => {
    const _p: MasterDetailLayoutProps = {
      sidebar: <div>s</div>,
      main: <div>m</div>,
      collapsible: true,
      collapsibleDesktop: true,
    };
    expect(_p.collapsibleDesktop).toBe(true);
  });

  it("renders sidebar + main in non-collapsible mode", () => {
    const { container, getByText } = render(
      <MasterDetailLayout sidebar={<div>sidebar</div>} main={<div>main</div>} />,
    );
    expect(container.querySelector('[data-slot="master-detail-layout"]')).not.toBeNull();
    expect(getByText("sidebar")).toBeTruthy();
    expect(getByText("main")).toBeTruthy();
  });

  it("renders a toggle button in collapsible mode", () => {
    const { container } = render(
      <MasterDetailLayout
        collapsible
        sidebar={<div>sidebar</div>}
        main={<div>main</div>}
      />,
    );
    const toggle = container.querySelector('button[aria-label="Toggle master"]');
    expect(toggle).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/master-detail-layout");
    expect(mod.MasterDetailLayout).toBeDefined();
  });
});
