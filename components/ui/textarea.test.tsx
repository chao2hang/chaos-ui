import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { TextareaProps } from "@/components/ui/textarea";
import { Textarea } from "@/components/ui/textarea";

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
});
