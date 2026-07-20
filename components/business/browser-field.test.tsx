import { describe, it, expect, vi } from "vitest";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
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

  it("treats an empty controlled string as no selection for autocomplete", () => {
    render(<BrowserField value="" complete={vi.fn(async () => [])} />);
    expect(
      screen.getByRole("combobox", { name: "联想搜索" }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("清空")).not.toBeInTheDocument();
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

  it("uses registry autocomplete defaults and renders a listbox", async () => {
    const complete = vi.fn(async (keyword: string) => [
      { id: "1", name: `${keyword}-结果`, code: "R1" },
    ]);
    registerBrowserType("employee", {
      columns: [{ key: "name", title: "名称" }],
      complete,
      completeDebounceMs: 0,
    });

    render(<BrowserField type="employee" />);
    const input = screen.getByRole("combobox", { name: "联想搜索" });
    fireEvent.change(input, { target: { value: "zc" } });

    await waitFor(() => {
      expect(complete).toHaveBeenCalledWith("zc");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByRole("option")).toHaveTextContent("zc-结果");
    });
  });

  it("lets props.complete override registry and enforces minChars", async () => {
    const registryComplete = vi.fn(async () => [
      { id: "registry", name: "registry" },
    ]);
    const propComplete = vi.fn(async () => [{ id: "prop", name: "prop" }]);
    registerBrowserType("custom", {
      complete: registryComplete,
      completeDebounceMs: 0,
    });

    render(
      <BrowserField
        type="custom"
        complete={propComplete}
        completeMinChars={2}
        completeDebounceMs={0}
      />,
    );
    const input = screen.getByRole("combobox", { name: "联想搜索" });
    fireEvent.change(input, { target: { value: "a" } });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(propComplete).not.toHaveBeenCalled();
    expect(registryComplete).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "ab" } });
    await waitFor(() => expect(propComplete).toHaveBeenCalledWith("ab"));
    expect(registryComplete).not.toHaveBeenCalled();
  });

  it("cancels a scheduled autocomplete request when input falls below minChars", async () => {
    const complete = vi.fn(async () => [{ id: "1", name: "结果" }]);
    render(
      <BrowserField
        complete={complete}
        completeDebounceMs={30}
        completeMinChars={1}
      />,
    );
    const input = screen.getByRole("combobox", { name: "联想搜索" });
    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.change(input, { target: { value: "" } });

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(complete).not.toHaveBeenCalled();
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it.each(["Escape", "Tab"])(
    "cancels a scheduled autocomplete request when %s closes the combobox",
    async (key) => {
      const complete = vi.fn(async () => [{ id: "1", name: "结果" }]);
      render(<BrowserField complete={complete} completeDebounceMs={30} />);

      const input = screen.getByRole("combobox", { name: "联想搜索" });
      fireEvent.change(input, { target: { value: "a" } });
      fireEvent.keyDown(input, { key });

      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(complete).not.toHaveBeenCalled();
      expect(input).toHaveAttribute("aria-expanded", "false");
    },
  );

  it("cancels a scheduled autocomplete request when the input loses focus", async () => {
    vi.useFakeTimers();
    try {
      const complete = vi.fn(async () => [{ id: "1", name: "结果" }]);
      render(<BrowserField complete={complete} completeDebounceMs={30} />);

      const input = screen.getByRole("combobox", { name: "联想搜索" });
      fireEvent.change(input, { target: { value: "a" } });
      fireEvent.blur(input);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(50);
      });
      expect(complete).not.toHaveBeenCalled();
      expect(input).toHaveAttribute("aria-expanded", "false");
    } finally {
      vi.useRealTimers();
    }
  });

  it("allows a selected single value to re-enter autocomplete", () => {
    render(
      <BrowserField
        value="E1"
        labels={[{ id: "E1", label: "张三" }]}
        complete={vi.fn(async () => [])}
      />,
    );
    expect(screen.getByText("张三")).toBeInTheDocument();
    const shell = screen.getByText("张三").closest("div");
    expect(shell).not.toBeNull();
    fireEvent.click(shell!);
    expect(
      screen.getByRole("combobox", { name: "联想搜索" }),
    ).toBeInTheDocument();
  });

  it("keeps multiple chips visible beside the autocomplete input", () => {
    render(
      <BrowserField
        multiple
        value={["E1", "E2"]}
        labels={[
          { id: "E1", label: "张三" },
          { id: "E2", label: "李四" },
        ]}
        complete={vi.fn(async () => [])}
      />,
    );
    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(screen.getByText("李四")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "联想搜索" }),
    ).toBeInTheDocument();
  });

  it("restores the selected label when Escape closes autocomplete", () => {
    render(
      <BrowserField
        value="E1"
        labels={[{ id: "E1", label: "张三" }]}
        complete={vi.fn(async () => [])}
      />,
    );
    fireEvent.click(screen.getByText("张三"));
    const input = screen.getByRole("combobox", { name: "联想搜索" });
    fireEvent.change(input, { target: { value: "li" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(
      screen.queryByRole("combobox", { name: "联想搜索" }),
    ).not.toBeInTheDocument();
  });

  it("selects the highlighted option with Enter instead of opening the dialog", async () => {
    const onChange = vi.fn();
    render(
      <BrowserField
        complete={async () => [{ id: "1", name: "张三", code: "E1" }]}
        completeDebounceMs={0}
        onChange={onChange}
      />,
    );
    const input = screen.getByRole("combobox", { name: "联想搜索" });
    fireEvent.change(input, { target: { value: "zh" } });
    await waitFor(() => expect(screen.getByRole("option")).toBeInTheDocument());

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("1", [
      { id: "1", name: "张三", code: "E1" },
    ]);
    expect(screen.queryByText("选择")).not.toBeInTheDocument();
  });

  it("opens the advanced browse dialog from the autocomplete footer", async () => {
    render(
      <BrowserField
        complete={async () => [{ id: "1", name: "张三" }]}
        completeDebounceMs={0}
      />,
    );
    const input = screen.getByRole("combobox", { name: "联想搜索" });
    fireEvent.change(input, { target: { value: "zh" } });
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "高级搜索" }),
      ).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByRole("button", { name: "高级搜索" }));
    expect(screen.getByText("选择")).toBeInTheDocument();
  });

  it("passes current selection into BrowseDialog", () => {
    render(
      <BrowserField
        value="1"
        labels={[{ id: "1", label: "张三" }]}
        items={[{ id: "1", name: "张三" }]}
      />,
    );
    fireEvent.click(screen.getByLabelText("打开选择弹窗"));
    expect(screen.getByText(/已选 1 项/)).toBeInTheDocument();
  });

  it("ignores stale autocomplete responses", async () => {
    const pending: Array<(items: BrowseItem[]) => void> = [];
    const complete = vi.fn(
      (keyword: string) =>
        new Promise<BrowseItem[]>((resolve) => {
          pending.push((items) =>
            resolve(items.map((item) => ({ ...item, name: keyword }))),
          );
        }),
    );
    render(<BrowserField complete={complete} completeDebounceMs={0} />);
    const input = screen.getByRole("combobox", { name: "联想搜索" });
    fireEvent.change(input, { target: { value: "a" } });
    await waitFor(() => expect(complete).toHaveBeenCalledWith("a"));
    fireEvent.change(input, { target: { value: "ab" } });
    await waitFor(() => expect(complete).toHaveBeenCalledWith("ab"));

    pending[0]?.([{ id: "old" }]);
    pending[1]?.([{ id: "new" }]);
    await waitFor(() =>
      expect(screen.getByRole("option")).toHaveTextContent("ab"),
    );
    expect(screen.queryByText("a")).not.toBeInTheDocument();
  });

  it("portals autocomplete into document.body", async () => {
    render(
      <BrowserField
        complete={async () => [{ id: "1", name: "门户项" }]}
        completeDebounceMs={0}
      />,
    );
    fireEvent.change(screen.getByRole("combobox", { name: "联想搜索" }), {
      target: { value: "a" },
    });
    await waitFor(() => {
      const panel = document.body.querySelector(
        '[data-slot="browser-field-autocomplete"]',
      );
      expect(panel).not.toBeNull();
      expect(panel?.parentElement).toBe(document.body);
    });
  });

  it("shows error state when complete rejects", async () => {
    render(
      <BrowserField
        complete={async () => {
          throw new Error("网络异常，请重试");
        }}
        completeDebounceMs={0}
      />,
    );
    fireEvent.change(screen.getByRole("combobox", { name: "联想搜索" }), {
      target: { value: "a" },
    });
    await waitFor(() => {
      expect(screen.getByText("网络异常，请重试")).toBeInTheDocument();
      expect(
        document.querySelector('[data-slot="browser-field-complete-error"]'),
      ).not.toBeNull();
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("does not render autocomplete panel when complete returns empty", async () => {
    render(<BrowserField complete={async () => []} completeDebounceMs={0} />);
    fireEvent.change(screen.getByRole("combobox", { name: "联想搜索" }), {
      target: { value: "zzz" },
    });
    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(screen.queryByText("无匹配项")).not.toBeInTheDocument();
      expect(
        document.querySelector('[data-slot="browser-field-autocomplete"]'),
      ).toBeNull();
    });
  });
});
