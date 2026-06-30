import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubformTabs } from "./subform-tabs";
import type { SubformTabsProps } from "./subform-tabs";

describe("SubformTabs", () => {
  it("exports a Props type", () => {
    const t: SubformTabsProps = {};
    expect(t.className).toBeUndefined();
  });

  it("renders default tab triggers", () => {
    render(<SubformTabs />);
    expect(screen.getByRole("tab", { name: "基本信息" })).toBeDefined();
    expect(screen.getByRole("tab", { name: "联系方式" })).toBeDefined();
  });

  it("renders the first tab's field labels by default", () => {
    render(<SubformTabs />);
    expect(screen.getByText("编码")).toBeDefined();
    expect(screen.getByText("名称")).toBeDefined();
  });

  it("renders custom tab labels", () => {
    render(
      <SubformTabs
        tabs={[
          { id: "a", label: "A区", fields: [{ name: "x", label: "X" }] },
          { id: "b", label: "B区", fields: [{ name: "y", label: "Y" }] },
        ]}
      />,
    );
    expect(screen.getByRole("tab", { name: "A区" })).toBeDefined();
    expect(screen.getByText("X")).toBeDefined();
  });

  it("renders the empty-fields message for a tab with no fields", () => {
    render(
      <SubformTabs
        tabs={[
          { id: "a", label: "A区", fields: [{ name: "x", label: "X" }] },
          { id: "empty", label: "空区", fields: [] },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "空区" }));
    expect(screen.getByText("该分区暂无字段")).toBeDefined();
  });

  it("renders a textarea for fields with type 'textarea'", () => {
    render(<SubformTabs />);
    fireEvent.click(screen.getByRole("tab", { name: "联系方式" }));
    // the address field is a textarea
    expect(screen.getByText("地址")).toBeDefined();
    expect(screen.getByRole("textbox", { name: "地址" })).toBeDefined();
  });

  it("renders the text input for fields without an explicit type", () => {
    render(<SubformTabs />);
    fireEvent.click(screen.getByRole("tab", { name: "联系方式" }));
    expect(screen.getByRole("textbox", { name: "电话" })).toBeDefined();
  });

  it("invokes onChange with merged values when a text field is edited", () => {
    const onChange = vi.fn();
    render(<SubformTabs onChange={onChange} />);
    const codeInput = screen.getByLabelText("编码");
    fireEvent.change(codeInput, { target: { value: "C001" } });
    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
    expect(lastCall?.code).toBe("C001");
  });

  it("merges values across fields when multiple inputs are edited", () => {
    const onChange = vi.fn();
    render(<SubformTabs onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("编码"), { target: { value: "C001" } });
    fireEvent.change(screen.getByLabelText("名称"), { target: { value: "Acme" } });
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
    expect(lastCall?.code).toBe("C001");
    expect(lastCall?.name).toBe("Acme");
  });

  it("invokes onChange when a textarea field is edited", () => {
    const onChange = vi.fn();
    render(<SubformTabs onChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: "联系方式" }));
    const address = screen.getByRole("textbox", { name: "地址" });
    fireEvent.change(address, { target: { value: "渝北区" } });
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0];
    expect(lastCall?.address).toBe("渝北区");
  });

  it("renders the supplied value prop in the corresponding input", () => {
    render(<SubformTabs value={{ code: "PRESET", name: "Named" }} />);
    expect((screen.getByLabelText("编码") as HTMLInputElement).value).toBe("PRESET");
    expect((screen.getByLabelText("名称") as HTMLInputElement).value).toBe("Named");
  });

  it("renders a textarea value from the value prop", () => {
    render(<SubformTabs value={{ address: "上海路1号" }} />);
    fireEvent.click(screen.getByRole("tab", { name: "联系方式" }));
    expect((screen.getByLabelText("地址") as HTMLTextAreaElement).value).toBe("上海路1号");
  });

  it("renders an empty string for a missing text field value", () => {
    render(<SubformTabs value={{ name: "Named" }} />);
    expect((screen.getByLabelText("编码") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("名称") as HTMLInputElement).value).toBe("Named");
  });

  it("applies the className to the root element", () => {
    render(<SubformTabs className="my-tabs" />);
    const root = document.querySelector('[data-slot="subform-tabs"]');
    expect(root?.className).toContain("my-tabs");
  });
});
