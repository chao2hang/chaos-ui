import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MobileTextarea } from "./mobile-textarea";
import type { MobileTextareaProps } from "./mobile-textarea";

describe("MobileTextarea", () => {
  it("renders", () => {
    const { container } = render(<MobileTextarea placeholder="Enter text" />);
    expect(container.querySelector("textarea")).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileTextareaProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
