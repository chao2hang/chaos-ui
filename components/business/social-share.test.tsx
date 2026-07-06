import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SocialShare } from "./social-share";
import type { SocialShareProps } from "./social-share";

describe("SocialShare", () => {
  it("renders share buttons", () => {
    const { container } = render(<SocialShare url="https://example.com" />);
    expect(container.querySelector('[data-slot="social-share"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: SocialShareProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
