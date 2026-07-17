import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListPageShell } from "./list-page-shell";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("ListPageShell", () => {
  it("renders children", () => {
    render(
      <ListPageShell>
        <div>table-body</div>
      </ListPageShell>,
    );
    expect(screen.getByText("table-body")).toBeDefined();
  });

  it("renders custom filter node", () => {
    render(
      <ListPageShell filter={<div>my-filter</div>}>
        <div>content</div>
      </ListPageShell>,
    );
    expect(screen.getByText("my-filter")).toBeDefined();
  });

  it("renders toolbar and extra", () => {
    render(
      <ListPageShell
        extra={<span>共 3 条记录</span>}
        toolbar={<button type="button">刷新</button>}
      >
        <div>content</div>
      </ListPageShell>,
    );
    expect(screen.getByText("共 3 条记录")).toBeDefined();
    expect(screen.getByText("刷新")).toBeDefined();
  });

  it("builds FilterBar from filterFields + onSearch", () => {
    render(
      <ListPageShell
        filterFields={[{ key: "keyword", label: "关键词", type: "input" }]}
        onSearch={vi.fn()}
      >
        <div>content</div>
      </ListPageShell>,
    );
    // FilterBar renders a search/submit control; label text is present
    expect(screen.getByText("关键词")).toBeDefined();
  });

  it("default places toolbar on the same row as filter (#58)", () => {
    const { container } = render(
      <ListPageShell
        filterFields={[{ key: "keyword", label: "关键词", type: "input" }]}
        onSearch={vi.fn()}
        toolbar={<button type="button">新增</button>}
      >
        <div>table</div>
      </ListPageShell>,
    );
    expect(
      container
        .querySelector('[data-slot="list-page-shell"]')
        ?.getAttribute("data-toolbar-placement"),
    ).toBe("end-of-filter-row");
    expect(
      container.querySelector('[data-slot="list-page-shell-filter-row"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="list-page-shell-toolbar-row"]'),
    ).toBeNull();
    expect(screen.getByText("新增")).toBeDefined();
  });

  it("toolbar-only (no filter) right-aligns with no ghost empty column (#60 L1)", () => {
    const { container } = render(
      <ListPageShell toolbar={<button type="button">刷新</button>}>
        <div>table</div>
      </ListPageShell>,
    );
    const row = container.querySelector(
      '[data-slot="list-page-shell-filter-row"]',
    );
    expect(row).not.toBeNull();
    // No empty placeholder div — actions is the only child
    expect(row?.children.length).toBe(1);
    expect(row?.children[0]?.getAttribute("data-slot")).toBe(
      "list-page-shell-actions",
    );
    // Actions right-align via justify-end + sm:ml-auto (no ghost flex-1 column)
    const actions = row?.querySelector('[data-slot="list-page-shell-actions"]');
    expect(actions?.className ?? "").toContain("justify-end");
    expect(actions?.className ?? "").toContain("sm:ml-auto");
  });

  it("filter-row stacks vertically on narrow screens (#61)", () => {
    const { container } = render(
      <ListPageShell
        filterFields={[{ key: "keyword", label: "关键词", type: "input" }]}
        onSearch={vi.fn()}
        toolbar={<button type="button">新增</button>}
      >
        <div>table</div>
      </ListPageShell>,
    );
    const row = container.querySelector(
      '[data-slot="list-page-shell-filter-row"]',
    );
    // mobile-first column, then row at sm+
    expect(row?.className ?? "").toContain("flex-col");
    expect(row?.className ?? "").toContain("sm:flex-row");
    // actions span full width on mobile, auto on sm+
    const actions = container.querySelector(
      '[data-slot="list-page-shell-actions"]',
    );
    expect(actions?.className ?? "").toContain("w-full");
    expect(actions?.className ?? "").toContain("sm:w-auto");
  });

  it("below-filter keeps a separate toolbar row (#58)", () => {
    const { container } = render(
      <ListPageShell
        filterFields={[{ key: "keyword", label: "关键词", type: "input" }]}
        onSearch={vi.fn()}
        toolbarPlacement="below-filter"
        toolbar={<button type="button">刷新</button>}
        extra={<span>共 3 条</span>}
      >
        <div>body</div>
      </ListPageShell>,
    );
    expect(
      container
        .querySelector('[data-slot="list-page-shell"]')
        ?.getAttribute("data-toolbar-placement"),
    ).toBe("below-filter");
    expect(
      container.querySelector('[data-slot="list-page-shell-toolbar-row"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="list-page-shell-filter-row"]'),
    ).toBeNull();
  });
});
