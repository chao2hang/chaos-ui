import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileFormField } from "./mobile-form-field";
import type { MobileFormFieldProps } from "./mobile-form-field";

describe("MobileFormField", () => {
  it("renders label", () => {
    render(<MobileFormField label="Name"><input /></MobileFormField>);
    expect(screen.getByText("Name")).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileFormFieldProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
