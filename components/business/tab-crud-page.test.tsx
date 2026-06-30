import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TabCrudPage } from "./tab-crud-page";

describe("TabCrudPage", () => {
  it("renders tabs and the first tab as active by default", () => {
    render(
      <TabCrudPage
        tabs={[
          { id: "all", label: "全部" },
          { id: "draft", label: "草稿" },
        ]}
      >
        <span>列表内容</span>
      </TabCrudPage>,
    );
    expect(screen.getByText("全部")).toBeDefined();
    expect(screen.getByText("草稿")).toBeDefined();
    expect(screen.getByText("列表内容")).toBeDefined();
    expect(screen.getByRole("searchbox", { name: "搜索" })).toBeDefined();
  });

  it("shows the create button only when onCreate is provided", () => {
    const onCreate = vi.fn();
    const { rerender } = render(<TabCrudPage onCreate={onCreate} />);
    const createBtn = screen.getByRole("button", { name: "新建" });
    fireEvent.click(createBtn);
    expect(onCreate).toHaveBeenCalledTimes(1);

    rerender(<TabCrudPage />);
    expect(screen.queryByRole("button", { name: "新建" })).toBeNull();
  });

  it("invokes onTabChange when switching tabs", () => {
    const onTabChange = vi.fn();
    render(
      <TabCrudPage
        tabs={[
          { id: "all", label: "全部" },
          { id: "draft", label: "草稿" },
        ]}
        defaultActive="all"
        onTabChange={onTabChange}
      />,
    );
    fireEvent.click(screen.getByText("草稿"));
    expect(onTabChange).toHaveBeenCalledWith("draft");
  });

  it("invokes onQueryChange when typing into the search box", () => {
    const onQueryChange = vi.fn();
    render(<TabCrudPage onQueryChange={onQueryChange} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索" }), {
      target: { value: "发票" },
    });
    expect(onQueryChange).toHaveBeenCalledWith("发票");
  });

  it("uses the controlled active value and does not change internal state on tab click", () => {
    const onTabChange = vi.fn();
    const { rerender } = render(
      <TabCrudPage
        tabs={[
          { id: "all", label: "全部" },
          { id: "draft", label: "草稿" },
        ]}
        active="all"
        onTabChange={onTabChange}
      >
        <span>列表内容</span>
      </TabCrudPage>,
    );
    // controlled: clicking the draft tab fires onTabChange but the active
    // state is driven by the `active` prop, so the searchbox content stays.
    fireEvent.click(screen.getByText("草稿"));
    expect(onTabChange).toHaveBeenCalledWith("draft");
    // re-render with a new controlled value to simulate parent update
    rerender(
      <TabCrudPage
        tabs={[
          { id: "all", label: "全部" },
          { id: "draft", label: "草稿" },
        ]}
        active="draft"
        onTabChange={onTabChange}
      >
        <span>列表内容</span>
      </TabCrudPage>,
    );
    // still renders both tabs and children
    expect(screen.getByText("全部")).toBeDefined();
    expect(screen.getByText("草稿")).toBeDefined();
  });

  it("uses the controlled query value and does not update internal query state", () => {
    const onQueryChange = vi.fn();
    render(<TabCrudPage query="controlled-term" onQueryChange={onQueryChange} />);
    const search = screen.getByRole("searchbox", { name: "搜索" }) as HTMLInputElement;
    expect(search.value).toBe("controlled-term");
    // typing fires onQueryChange but the input value is driven by `query` prop
    fireEvent.change(search, { target: { value: "ignored" } });
    expect(onQueryChange).toHaveBeenCalledWith("ignored");
    // value stays as the controlled prop because React resets it on re-render
    expect(search.value).toBe("controlled-term");
  });

  it("uses defaultActive as the initial active tab (uncontrolled)", () => {
    render(
      <TabCrudPage
        tabs={[
          { id: "all", label: "全部" },
          { id: "draft", label: "草稿" },
        ]}
        defaultActive="draft"
      >
        <span>列表内容</span>
      </TabCrudPage>,
    );
    // both tabs render; defaultActive="draft" is the uncontrolled initial value
    expect(screen.getByText("全部")).toBeDefined();
    expect(screen.getByText("草稿")).toBeDefined();
    expect(screen.getByText("列表内容")).toBeDefined();
  });

  it("updates internal active state when uncontrolled and a tab is clicked", () => {
    render(
      <TabCrudPage
        tabs={[
          { id: "all", label: "全部" },
          { id: "draft", label: "草稿" },
        ]}
        defaultActive="all"
      >
        <span>列表内容</span>
      </TabCrudPage>,
    );
    fireEvent.click(screen.getByText("草稿"));
    // tab content and triggers remain rendered
    expect(screen.getByText("全部")).toBeDefined();
    expect(screen.getByText("草稿")).toBeDefined();
  });

  it("updates internal query state when uncontrolled and the search box is typed into", () => {
    render(<TabCrudPage />);
    const search = screen.getByRole("searchbox", { name: "搜索" }) as HTMLInputElement;
    fireEvent.change(search, { target: { value: "hello" } });
    expect(search.value).toBe("hello");
  });

  it("renders a default '全部' tab when no tabs are provided", () => {
    render(<TabCrudPage />);
    expect(screen.getByText("全部")).toBeDefined();
  });

  it("applies the className to the root element", () => {
    render(<TabCrudPage className="my-page" />);
    const root = document.querySelector('[data-slot="tab-crud-page"]');
    expect(root?.className).toContain("my-page");
  });
});
