import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { PreferencePanel } from "./preference-panel";

describe("diag", () => {
  it("logs switch attrs", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    const sw = document.body.querySelector(
      '[aria-label="紧凑模式 开关"]',
    ) as HTMLElement;
    fireEvent.click(sw);
    // Force a visible failure showing all attribute values
    expect({
      checked: sw.getAttribute("data-checked"),
      unchecked: sw.getAttribute("data-unchecked"),
      ariaChecked: sw.getAttribute("aria-checked"),
      outerHTML: sw.outerHTML.slice(0, 400),
    }).toBe("intentional-fail");
  });
});
