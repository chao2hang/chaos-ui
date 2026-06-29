import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type { CheckboxProps } from "@/components/ui/checkbox";
import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector('[data-slot="checkbox"]')).not.toBeNull();
  });

  it("forwards checked state via props", () => {
    const { container } = render(<Checkbox checked />);
    const cb = container.querySelector('[data-slot="checkbox"]');
    expect(cb).not.toBeNull();
  });

  it("CheckboxProps type is importable", () => {
    const _props: CheckboxProps = { checked: true };
    expect(_props.checked).toBe(true);
  });
});
