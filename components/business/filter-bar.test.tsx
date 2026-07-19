import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar } from "./filter-bar";
import type { FilterBarProps, FilterField } from "./filter-bar";

const baseFields: FilterField[] = [
  { key: "name", label: "姓名", type: "input", placeholder: "输入姓名" },
  {
    key: "status",
    label: "状态",
    type: "select",
    options: [
      { label: "启用", value: "1" },
      { label: "禁用", value: "0" },
    ],
  },
  { key: "code", label: "编码" },
  { key: "email", label: "邮箱" },
  { key: "phone", label: "电话" },
];

describe("filter-bar", () => {
  it("exports FilterBar", () => {
    expect(FilterBar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FilterBarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FilterField | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders field labels", () => {
    render(<FilterBar fields={baseFields.slice(0, 2)} onSearch={vi.fn()} />);
    // "状态" is the field label; portal Select uses it as placeholder, not a fake option.
    const labels = screen.getAllByText("状态");
    expect(labels.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("姓名")).toBeDefined();
  });

  it("uses portal Select for type=select by default (not a native select)", () => {
    const { container } = render(
      <FilterBar fields={baseFields.slice(0, 2)} onSearch={vi.fn()} />,
    );
    expect(
      container.querySelector(
        'select[data-slot="native-select"], [data-slot="native-select"] select',
      ),
    ).toBeNull();
    // Compound Select trigger is a button-like control, not <select>.
    expect(
      container.querySelector('[data-slot="select-trigger"]'),
    ).not.toBeNull();
  });

  it("opt-in native select when selectVariant is native", () => {
    const { container } = render(
      <FilterBar
        fields={[
          {
            key: "status",
            label: "状态",
            type: "select",
            selectVariant: "native",
            options: [
              { label: "启用", value: "1" },
              { label: "禁用", value: "0" },
            ],
          },
        ]}
        onSearch={vi.fn()}
      />,
    );
    expect(
      container.querySelector('[data-slot="native-select"]'),
    ).not.toBeNull();
  });

  it("shows search and reset buttons", () => {
    render(<FilterBar fields={baseFields.slice(0, 2)} onSearch={vi.fn()} />);
    expect(screen.getByText("查询")).toBeDefined();
    expect(screen.getByText("重置")).toBeDefined();
  });

  it("fires onSearch with current values", () => {
    const onSearch = vi.fn();
    render(<FilterBar fields={baseFields.slice(0, 1)} onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("输入姓名");
    fireEvent.change(input, { target: { value: "张三" } });
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ name: "张三" });
  });

  it("initializes values from defaultValue and includes them in search", () => {
    const onSearch = vi.fn();
    render(
      <FilterBar
        fields={[{ key: "name", label: "姓名", defaultValue: "默认值" }]}
        onSearch={onSearch}
      />,
    );
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ name: "默认值" });
  });

  it("resets values on reset click and calls onReset", () => {
    const onSearch = vi.fn();
    const onReset = vi.fn();
    render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        onSearch={onSearch}
        onReset={onReset}
      />,
    );
    const input = screen.getByPlaceholderText("输入姓名");
    fireEvent.change(input, { target: { value: "张三" } });
    fireEvent.click(screen.getByText("重置"));
    expect(onReset).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({});
  });

  it("restores field defaultValue on reset", () => {
    const onSearch = vi.fn();
    render(
      <FilterBar
        fields={[
          {
            key: "name",
            label: "姓名",
            defaultValue: "默认值",
            placeholder: "输入姓名",
          },
        ]}
        onSearch={onSearch}
      />,
    );
    const input = screen.getByPlaceholderText("输入姓名");
    fireEvent.change(input, { target: { value: "张三" } });
    fireEvent.click(screen.getByText("重置"));
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ name: "默认值" });
  });

  it("renders date-picker field as DatePicker (not plain text input)", () => {
    const { container } = render(
      <FilterBar
        fields={[{ key: "date", label: "日期", type: "date-picker" }]}
        onSearch={vi.fn()}
      />,
    );
    expect(container.querySelector('[data-slot="date-picker"]')).not.toBeNull();
  });

  it("fires onSearch on Enter keydown in input", () => {
    const onSearch = vi.fn();
    render(<FilterBar fields={baseFields.slice(0, 1)} onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("输入姓名");
    fireEvent.change(input, { target: { value: "x" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSearch).toHaveBeenCalledWith({ name: "x" });
  });

  it("collapses to first 3 fields and shows expand button with hidden count", () => {
    render(<FilterBar fields={baseFields} onSearch={vi.fn()} collapsible />);
    expect(screen.getByText("姓名")).toBeDefined();
    // "状态" label renders for the visible select field.
    expect(screen.getAllByText("状态").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("编码")).toBeDefined();
    expect(screen.queryByText("邮箱")).toBeNull();
    expect(screen.getByText("展开 (2)")).toBeDefined();
  });

  it("expands all fields on expand click", () => {
    render(<FilterBar fields={baseFields} onSearch={vi.fn()} collapsible />);
    fireEvent.click(screen.getByText("展开 (2)"));
    expect(screen.getByText("邮箱")).toBeDefined();
    expect(screen.getByText("电话")).toBeDefined();
    expect(screen.getByText("收起")).toBeDefined();
  });

  it("disables buttons when loading", () => {
    render(
      <FilterBar fields={baseFields.slice(0, 1)} onSearch={vi.fn()} loading />,
    );
    expect((screen.getByText("查询") as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByText("重置") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders select field with options and fires search on change", () => {
    const onSearch = vi.fn();
    // Native path keeps fireEvent.change simple; portal Select uses pointer/listbox UX.
    render(
      <FilterBar
        fields={[
          {
            key: "status",
            label: "状态",
            type: "select",
            selectVariant: "native",
            options: [
              { label: "启用", value: "1" },
              { label: "禁用", value: "0" },
            ],
          },
        ]}
        onSearch={onSearch}
      />,
    );
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select).toBeDefined();
    fireEvent.change(select, { target: { value: "1" } });
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ status: "1" });
  });

  it("renders custom render field", () => {
    const fields: FilterField[] = [
      {
        key: "custom",
        label: "自定义",
        type: "custom",
        render: (value, onChange) => (
          <button
            type="button"
            data-testid="custom-btn"
            onClick={() => onChange("custom", "clicked")}
          >
            {String(value ?? "none")}
          </button>
        ),
      },
    ];
    const onSearch = vi.fn();
    render(<FilterBar fields={fields} onSearch={onSearch} />);
    fireEvent.click(screen.getByTestId("custom-btn"));
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ custom: "clicked" });
  });

  it("composes BrowserField for browser filters", () => {
    const onSearch = vi.fn();
    render(
      <FilterBar
        fields={[
          {
            key: "company",
            label: "公司",
            type: "browser",
            browser: {
              items: [{ id: "1", name: "甲公司" }],
              columns: [{ key: "name", title: "公司" }],
            },
          },
        ]}
        onSearch={onSearch}
      />,
    );
    expect(screen.getByLabelText("打开选择弹窗")).toBeInTheDocument();
    expect(screen.getByText("公司")).toBeInTheDocument();
  });

  it("renders card layout wrapped in a Card", () => {
    const { container } = render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        onSearch={vi.fn()}
        layout="card"
      />,
    );
    // In the card layout, FilterBar wraps content in <Card data-slot="filter-bar">
    // (which overrides Card's default "card" slot), so confirm the Card wrap via
    // the CardContent child slot that only appears in this layout.
    expect(
      container.querySelector('[data-slot="card-content"]'),
    ).not.toBeNull();
  });

  it("applies horizontal inset on inline layout for flush Card combos (CUI-LIST-01)", () => {
    const { container } = render(
      <FilterBar fields={baseFields.slice(0, 1)} onSearch={vi.fn()} />,
    );
    const bar = container.querySelector(
      '[data-slot="filter-bar"]',
    ) as HTMLElement;
    // Tailwind may emit arbitrary value as px-[var(--card-spacing,1rem)]
    expect(bar.className).toMatch(/px-\[var\(--card-spacing/);
  });

  it("does not double-pad the inner bar when layout is card", () => {
    const { container } = render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        onSearch={vi.fn()}
        layout="card"
      />,
    );
    // Outer Card uses data-slot=filter-bar; inner content div also uses filter-bar.
    // The padded one should only be when inline; under card, CardContent owns pad.
    const bars = container.querySelectorAll('[data-slot="filter-bar"]');
    // At least one node is the Card root; ensure no inline-only requirement fails.
    expect(bars.length).toBeGreaterThanOrEqual(1);
    const content = container.querySelector(
      '[data-slot="card-content"] [data-slot="filter-bar"]',
    ) as HTMLElement | null;
    if (content) {
      expect(content.className).not.toMatch(/px-\[var\(--card-spacing/);
    }
  });

  it("defaults field controls and actions to sm height (issue #46)", () => {
    const fields: FilterField[] = [
      { key: "keyword", label: "搜索", type: "input" },
      {
        key: "status",
        label: "状态",
        type: "select",
        options: [
          { label: "在职", value: "1" },
          { label: "离职", value: "0" },
        ],
      },
    ];
    const { container } = render(
      <FilterBar fields={fields} onSearch={vi.fn()} />,
    );
    const input = container.querySelector('[data-slot="input"]') as HTMLElement;
    expect(input?.getAttribute("data-size")).toBe("sm");
    expect(input?.className).toMatch(/\bh-7\b/);
    const trigger = container.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement | null;
    if (trigger) {
      expect(
        trigger.getAttribute("data-size") === "sm" ||
          trigger.className.includes("h-7"),
      ).toBe(true);
    }
    // Action buttons use size sm (h-7)
    const buttons = Array.from(container.querySelectorAll("button")).filter(
      (b) => /查询|重置/.test(b.textContent ?? ""),
    );
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    for (const b of buttons) {
      expect(b.className).toMatch(/\bh-7\b/);
    }
  });

  it("size=default aligns fields and buttons at h-8 (issue #46)", () => {
    const { container } = render(
      <FilterBar
        fields={[{ key: "keyword", label: "搜索", type: "input" }]}
        onSearch={vi.fn()}
        size="default"
      />,
    );
    const input = container.querySelector('[data-slot="input"]') as HTMLElement;
    expect(input?.getAttribute("data-size")).toBe("default");
    expect(input?.className).toMatch(/\bh-8\b/);
  });

  it("keeps portal Select controlled from empty to selected (no Base UI uncontrolled warning)", async () => {
    // Repro: empty portal Select used value={undefined} then a string after pick →
    // "changing the uncontrolled value state of Select to be controlled".
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(
      <FilterBar
        fields={[
          {
            key: "status",
            label: "状态",
            type: "select",
            options: [
              { label: "启用", value: "1" },
              { label: "禁用", value: "0" },
            ],
          },
        ]}
        onSearch={onSearch}
      />,
    );

    const trigger = document.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    expect(trigger).not.toBeNull();
    await user.click(trigger);

    const option = await screen.findByRole("option", { name: "启用" });
    await user.click(option);

    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ status: "1" });

    const consoleText = spy.mock.calls
      .map((args) => args.map(String).join(" "))
      .join("\n");
    expect(consoleText).not.toMatch(
      /uncontrolled value state of Select|controlled value state of Select/,
    );
    spy.mockRestore();
  });

  it("portal Select empty + selected trigger labels use option labels (items map)", async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        fields={[
          {
            key: "status",
            label: "状态",
            type: "select",
            options: [
              { label: "启用", value: "1" },
              { label: "禁用", value: "0" },
            ],
          },
        ]}
        onSearch={vi.fn()}
      />,
    );

    const trigger = document.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    await user.click(trigger);
    await user.click(await screen.findByRole("option", { name: "启用" }));

    // Closed trigger should show Chinese label, not raw value "1".
    expect(trigger.textContent).toMatch(/启用/);
    expect(trigger.textContent).not.toMatch(/^1$/);
  });
});
