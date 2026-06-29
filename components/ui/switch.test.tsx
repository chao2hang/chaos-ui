import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type { SwitchProps } from "@/components/ui/switch";
import { Switch } from "@/components/ui/switch";

describe("Switch", () => {
  it("renders a switch", () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('[data-slot="switch"]')).not.toBeNull();
  });

  it("applies size data attribute", () => {
    const { container } = render(<Switch size="sm" />);
    const sw = container.querySelector('[data-slot="switch"]');
    expect(sw?.getAttribute("data-size")).toBe("sm");
  });

  it("SwitchProps type is importable", () => {
    const _props: SwitchProps = { size: "sm", checked: false };
    expect(_props.size).toBe("sm");
  });
});
