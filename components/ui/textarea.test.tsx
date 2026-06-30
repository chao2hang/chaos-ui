import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Textarea } from "./textarea";
import type { TextareaProps } from "./textarea";

describe("Textarea", () => {
  it("renders with placeholder", () => {
    render(<Textarea placeholder="Message" />);
    expect(screen.getByPlaceholderText("Message")).toBeDefined();
  });

  it("is a textarea element", () => {
    const { container } = render(<Textarea />);
    expect(container.querySelector('[data-slot="textarea"]')).not.toBeNull();
  });

  it("TextareaProps type is importable", () => {
    const _props: TextareaProps = { rows: 4 };
    expect(_props.rows).toBe(4);
  });

  it("forwards value and onChange", () => {
    let changed = "";
    render(
      <Textarea
        defaultValue="hello"
        onChange={(e) => {
          changed = e.target.value;
        }}
      />,
    );
    const ta = screen.getByDisplayValue("hello") as HTMLTextAreaElement;
    expect(ta.tagName).toBe("TEXTAREA");
    // simulate change
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    )?.set;
    setter?.call(ta, "world");
    ta.dispatchEvent(new Event("input", { bubbles: true }));
    expect(changed).toBe("world");
  });

  it("applies disabled attribute", () => {
    render(<Textarea disabled placeholder="Disabled" />);
    const ta = screen.getByPlaceholderText("Disabled") as HTMLTextAreaElement;
    expect(ta.disabled).toBe(true);
  });

  it("supports readonly state", () => {
    render(<Textarea readOnly placeholder="RO" />);
    const ta = screen.getByPlaceholderText("RO") as HTMLTextAreaElement;
    expect(ta.readOnly).toBe(true);
  });

  it("applies aria-invalid attribute", () => {
    render(<Textarea aria-invalid placeholder="Inv" />);
    const ta = screen.getByPlaceholderText("Inv") as HTMLTextAreaElement;
    expect(ta.getAttribute("aria-invalid")).toBe("true");
  });

  it("merges custom className", () => {
    const { container } = render(<Textarea className="my-ta" />);
    expect(
      container.querySelector('[data-slot="textarea"]')?.className,
    ).toContain("my-ta");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/textarea");
    expect(mod.Textarea).toBeDefined();
  });
});
