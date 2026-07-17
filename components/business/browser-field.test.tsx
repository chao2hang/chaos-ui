import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  BrowserField,
  registerBrowserType,
  type BrowseItem,
} from "./browser-field";

describe("BrowserField", () => {
  it("renders placeholder when empty", () => {
    render(<BrowserField columns={[]} items={[]} placeholder="请选择员工" />);
    expect(screen.getByText("请选择员工")).toBeInTheDocument();
  });

  it("shows selected label for single value", () => {
    render(
      <BrowserField
        columns={[]}
        items={[]}
        value="E1"
        labels={[{ id: "E1", label: "张三" }]}
      />,
    );
    expect(screen.getByText("张三")).toBeInTheDocument();
  });

  it("shows multiple selected labels as chips", () => {
    render(
      <BrowserField
        multiple
        columns={[]}
        items={[]}
        value={["E1", "E2"]}
        labels={[
          { id: "E1", label: "张三" },
          { id: "E2", label: "李四" },
        ]}
      />,
    );
    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(screen.getByText("李四")).toBeInTheDocument();
  });

  it("clears value when clear button clicked (single)", () => {
    const onChange = vi.fn();
    render(
      <BrowserField
        columns={[]}
        items={[]}
        value="E1"
        labels={[{ id: "E1", label: "张三" }]}
        onChange={onChange}
      />,
    );
    const clear = screen.getByLabelText("清空");
    fireEvent.click(clear);
    expect(onChange).toHaveBeenCalledWith("", []);
  });

  it("removes one chip in multiple mode", () => {
    const onChange = vi.fn();
    render(
      <BrowserField
        multiple
        columns={[]}
        items={[]}
        value={["E1", "E2"]}
        labels={[
          { id: "E1", label: "张三" },
          { id: "E2", label: "李四" },
        ]}
        onChange={onChange}
      />,
    );
    const removes = screen.getAllByLabelText("移除");
    expect(removes[0]).toBeDefined();
    fireEvent.click(removes[0]!);
    expect(onChange).toHaveBeenCalled();
    const firstCall = onChange.mock.calls[0];
    expect(firstCall).toBeDefined();
    const [val] = firstCall!;
    expect(val).toEqual(["E2"]);
  });

  it("opens dialog when magnifier clicked", () => {
    render(
      <BrowserField
        columns={[{ key: "name", title: "名称" }]}
        items={[{ id: "1", name: "甲" }]}
      />,
    );
    const openBtn = screen.getByLabelText("打开选择弹窗");
    fireEvent.click(openBtn);
    // BrowseDialog renders a DialogTitle "选择" by default
    expect(screen.getByText("选择")).toBeInTheDocument();
  });

  it("resolves defaults from registerBrowserType", () => {
    const items: BrowseItem[] = [{ id: "1", name: "注册项" }];
    registerBrowserType("custom", {
      items,
      columns: [{ key: "name", title: "名称" }],
      multiple: true,
    });
    render(
      <BrowserField
        type="custom"
        value={["1"]}
        labels={[{ id: "1", label: "注册项" }]}
      />,
    );
    expect(screen.getByText("注册项")).toBeInTheDocument();
  });
});
