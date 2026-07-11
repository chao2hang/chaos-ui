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
});
