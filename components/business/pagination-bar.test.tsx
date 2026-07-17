import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaginationBar } from "./pagination-bar";

describe("PaginationBar", () => {
  it("renders total count", () => {
    render(
      <PaginationBar total={100} page={1} pageSize={10} onChange={vi.fn()} />,
    );
    expect(screen.getByText("100")).toBeInTheDocument();
    // total label text (avoid matching select options which also contain 条)
    expect(screen.getByText(/共.*条/)).toBeInTheDocument();
  });

  it("renders page size selector with options", () => {
    render(
      <PaginationBar total={100} page={1} pageSize={10} onChange={vi.fn()} />,
    );
    const select = screen.getByLabelText("每页条数");
    expect(select).toBeInTheDocument();
    // Default options include 10, 20, 50, 100
    expect(select.querySelector('option[value="10"]')).toBeTruthy();
    expect(select.querySelector('option[value="50"]')).toBeTruthy();
  });

  it("hides page size selector when showSizeChanger is false", () => {
    render(
      <PaginationBar
        total={100}
        page={1}
        pageSize={10}
        onChange={vi.fn()}
        showSizeChanger={false}
      />,
    );
    expect(screen.queryByLabelText("每页条数")).toBeNull();
  });

  it("renders page number buttons", () => {
    render(
      <PaginationBar total={100} page={3} pageSize={10} onChange={vi.fn()} />,
    );
    // 10 pages total, current = 3
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("calls onChange with previous page when prev button clicked", () => {
    const onChange = vi.fn();
    render(
      <PaginationBar total={100} page={3} pageSize={10} onChange={onChange} />,
    );
    fireEvent.click(screen.getByLabelText("上一页"));
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it("calls onChange with next page when next button clicked", () => {
    const onChange = vi.fn();
    render(
      <PaginationBar total={100} page={3} pageSize={10} onChange={onChange} />,
    );
    fireEvent.click(screen.getByLabelText("下一页"));
    expect(onChange).toHaveBeenCalledWith(4, 10);
  });

  it("disables prev button on first page", () => {
    render(
      <PaginationBar total={100} page={1} pageSize={10} onChange={vi.fn()} />,
    );
    expect(screen.getByLabelText("上一页")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <PaginationBar total={100} page={10} pageSize={10} onChange={vi.fn()} />,
    );
    expect(screen.getByLabelText("下一页")).toBeDisabled();
  });

  it("calls onChange with page number when a page button is clicked", () => {
    const onChange = vi.fn();
    render(
      <PaginationBar total={100} page={1} pageSize={10} onChange={onChange} />,
    );
    // page 2 is always visible when on page 1 (range: 1, 2, …, 10)
    fireEvent.click(screen.getByText("2"));
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it("resets to page 1 when page size changes", () => {
    const onChange = vi.fn();
    render(
      <PaginationBar total={100} page={5} pageSize={10} onChange={onChange} />,
    );
    const select = screen.getByLabelText("每页条数") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "20" } });
    expect(onChange).toHaveBeenCalledWith(1, 20);
  });

  it("renders quick jumper when showQuickJumper is true and multiple pages", () => {
    render(
      <PaginationBar
        total={100}
        page={1}
        pageSize={10}
        onChange={vi.fn()}
        showQuickJumper
      />,
    );
    expect(screen.getByLabelText("跳转到页")).toBeInTheDocument();
  });

  it("hides quick jumper when only one page", () => {
    render(
      <PaginationBar
        total={5}
        page={1}
        pageSize={10}
        onChange={vi.fn()}
        showQuickJumper
      />,
    );
    expect(screen.queryByLabelText("跳转到页")).toBeNull();
  });

  it("jumps to page on Enter in quick jumper", () => {
    const onChange = vi.fn();
    render(
      <PaginationBar
        total={100}
        page={1}
        pageSize={10}
        onChange={onChange}
        showQuickJumper
      />,
    );
    const input = screen.getByLabelText("跳转到页");
    fireEvent.change(input, { target: { value: "7" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(7, 10);
  });

  it("renders ellipsis for many pages", () => {
    // 1000 items / 10 per page = 100 pages
    render(
      <PaginationBar total={1000} page={50} pageSize={10} onChange={vi.fn()} />,
    );
    // Should have ellipsis (MoreHorizontalIcon rendered as span)
    // First page and last page should be visible
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    // Current page area
    expect(screen.getByText("49")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("51")).toBeInTheDocument();
  });

  it("renders custom pageSizeOptions", () => {
    render(
      <PaginationBar
        total={100}
        page={1}
        pageSize={5}
        onChange={vi.fn()}
        pageSizeOptions={[5, 15, 30]}
      />,
    );
    const select = screen.getByLabelText("每页条数");
    expect(select.querySelector('option[value="5"]')).toBeTruthy();
    expect(select.querySelector('option[value="15"]')).toBeTruthy();
    expect(select.querySelector('option[value="30"]')).toBeTruthy();
    expect(select.querySelector('option[value="10"]')).toBeNull();
  });
});
