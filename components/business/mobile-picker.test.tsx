import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobilePicker } from "./mobile-picker";
import type { MobilePickerProps } from "./mobile-picker";

const options = [
  { label: "苹果", value: "apple" },
  { label: "香蕉", value: "banana" },
  { label: "樱桃", value: "cherry" },
];

describe("MobilePicker", () => {
  it("renders all option labels", () => {
    render(<MobilePicker options={options} value="apple" />);
    expect(screen.getByText("苹果")).toBeDefined();
    expect(screen.getByText("香蕉")).toBeDefined();
    expect(screen.getByText("樱桃")).toBeDefined();
  });

  it("marks the selected option as aria-selected", () => {
    render(<MobilePicker options={options} value="banana" />);
    const banana = screen.getByRole("option", { name: /香蕉/ });
    expect(banana.getAttribute("aria-selected")).toBe("true");
  });

  it("defaults to the first option when value is omitted", () => {
    render(<MobilePicker options={options} />);
    const apple = screen.getByRole("option", { name: /苹果/ });
    expect(apple.getAttribute("aria-selected")).toBe("true");
  });

  it("invokes onChange with the clicked option value", () => {
    let chosen = "";
    render(
      <MobilePicker options={options} value="apple" onChange={(v) => (chosen = v)} />,
    );
    fireEvent.click(screen.getByRole("option", { name: /樱桃/ }));
    expect(chosen).toBe("cherry");
  });

  it("exports types", () => {
    const _t: MobilePickerProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
