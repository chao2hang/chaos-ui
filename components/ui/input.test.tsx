import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { InputProps } from "@/components/ui/input";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Enter name" />);
    expect(screen.getByPlaceholderText("Enter name")).toBeDefined();
  });

  it("forwards value and onChange", async () => {
    const user = userEvent.setup();
    let value = "";
    render(<Input value={value} onChange={(e) => (value = e.target.value)} />);
    await user.type(screen.getByRole("textbox"), "a");
    expect(value).toBe("a");
  });

  it("applies disabled", () => {
    render(<Input disabled placeholder="x" />);
    expect(
      (screen.getByPlaceholderText("x") as HTMLInputElement).disabled,
    ).toBe(true);
  });

  it("InputProps type is importable", () => {
    const _props: InputProps = { type: "email", disabled: true };
    expect(_props.type).toBe("email");
  });

  it("applies size sm h-7 and data-size (issue #32)", () => {
    const { rerender } = render(<Input placeholder="x" />);
    expect(
      (screen.getByPlaceholderText("x") as HTMLElement).getAttribute(
        "data-size",
      ),
    ).toBe("default");
    rerender(<Input placeholder="x" size="sm" />);
    const el = screen.getByPlaceholderText("x") as HTMLElement;
    expect(el.getAttribute("data-size")).toBe("sm");
    expect(el.className).toMatch(/\bh-7\b/);
  });
});
