import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { PreferencePanel } from "./preference-panel";

describe("diag", () => {
  it("switch renders and can be clicked", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    const sw = document.body.querySelector(
      '[aria-label="紧凑模式 开关"]',
    ) as HTMLElement;
    expect(sw).not.toBeNull();
    fireEvent.click(sw);
    expect(sw).not.toBeNull();
  });
});
