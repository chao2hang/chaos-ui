import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MasterListTemplate } from "./master-list-template";
import type { MasterListTemplateProps } from "./master-list-template";

describe("MasterListTemplate", () => {
  it("renders title and children", () => {
    render(
      <MasterListTemplate title="供应商列表">
        <table>
          <tbody>
            <tr>
              <td>供应商A</td>
            </tr>
          </tbody>
        </table>
      </MasterListTemplate>,
    );
    expect(screen.getByText("供应商列表")).toBeDefined();
    expect(screen.getByText("供应商A")).toBeDefined();
    expect(screen.getByRole("region", { name: "列表页 供应商列表" })).toBeDefined();
  });

  it("uses the default title when none provided", () => {
    render(<MasterListTemplate>内容</MasterListTemplate>);
    expect(screen.getByText("列表")).toBeDefined();
  });

  it("shows empty state when no children", () => {
    render(<MasterListTemplate title="列表" />);
    expect(screen.getByText("暂无数据")).toBeDefined();
  });

  it("invokes onCreate on button click", () => {
    const onCreate = vi.fn();
    render(<MasterListTemplate title="列表" onCreate={onCreate} />);
    fireEvent.click(screen.getByText("新增"));
    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it("invokes onSearch on submit", () => {
    const onSearch = vi.fn();
    render(<MasterListTemplate title="列表" onSearch={onSearch} />);
    const input = screen.getByLabelText("搜索...");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.submit(input.closest("form")!);
    expect(onSearch).toHaveBeenCalledWith("abc");
  });

  it("uses a custom search placeholder for both label and placeholder", () => {
    render(<MasterListTemplate title="列表" onSearch={() => {}} searchPlaceholder="输入供应商" />);
    const input = screen.getByLabelText("输入供应商");
    expect(input).toBeDefined();
    expect(input).toHaveAttribute("placeholder", "输入供应商");
  });

  it("omits the create and search affordances when callbacks are absent", () => {
    render(<MasterListTemplate title="列表">内容</MasterListTemplate>);
    expect(screen.queryByText("新增")).toBeNull();
    expect(screen.queryByRole("search")).toBeNull();
  });

  it("renders the search form inside a search landmark", () => {
    render(<MasterListTemplate title="列表" onSearch={() => {}} />);
    expect(screen.getByRole("search")).toBeDefined();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <MasterListTemplate title="列表" className="custom-cls">
        内容
      </MasterListTemplate>,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: MasterListTemplateProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
