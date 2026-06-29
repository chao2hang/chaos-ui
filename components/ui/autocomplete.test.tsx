import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AutoComplete } from "@/components/ui/autocomplete";
import type { AutoCompleteProps, AutoCompleteOption } from "@/components/ui/autocomplete";

describe("AutoComplete", () => {
  it("AutoCompleteProps/Option types are importable", () => {
    const _p: AutoCompleteProps = {
      options: [{ value: "a" }],
      onSearch: () => {},
    };
    const _o: AutoCompleteOption = { value: "a", label: "A" };
    expect(_p.options.length).toBe(1);
    expect(_o.value).toBe("a");
  });

  it("renders an input element", () => {
    const { container } = render(<AutoComplete options={[{ value: "a" }]} />);
    expect(container.querySelector("input")).not.toBeNull();
  });

  it("does not crash with empty options", () => {
    const { container } = render(<AutoComplete options={[]} />);
    expect(container.querySelector("input")).not.toBeNull();
  });

  it("does not crash with disabled option", () => {
    const { container } = render(
      <AutoComplete options={[{ value: "a", disabled: true }]} />,
    );
    expect(container.querySelector("input")).not.toBeNull();
  });

  it("module is importable with expected exports", async () => {
    const mod = await import("@/components/ui/autocomplete");
    expect(mod.AutoComplete).toBeDefined();
  });
});
