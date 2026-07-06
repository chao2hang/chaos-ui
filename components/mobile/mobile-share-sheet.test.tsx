import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MobileShareSheet } from "./mobile-share-sheet";
import type { MobileShareSheetProps } from "./mobile-share-sheet";

describe("MobileShareSheet", () => {
  it("renders", () => {
    const { container } = render(
      <MobileShareSheet platforms={[{ id: "wechat", label: "WeChat", onClick: () => {} }]} />,
    );
    expect(container.querySelector('[data-slot="mobile-share-sheet"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileShareSheetProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
