import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PrintService } from "./print-service";
import type { PrintServiceProps, PrintServiceJob } from "./print-service";

describe("PrintService", () => {
  it("exports the component and types", () => {
    expect(PrintService).toBeDefined();
    const _tc: PrintServiceProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders an empty state when no jobs are provided", () => {
    render(<PrintService />);
    expect(screen.getByText("打印队列为空")).toBeDefined();
  });

  it("renders the queued jobs and a pending count badge", () => {
    const jobs: PrintServiceJob[] = [
      { id: "1", title: "Invoice #12", status: "pending", pages: 3 },
      { id: "2", title: "Receipt #4", status: "done" },
    ];
    render(<PrintService jobs={jobs} />);
    expect(screen.getByText("Invoice #12")).toBeDefined();
    expect(screen.getByText("Receipt #4")).toBeDefined();
    expect(screen.getByText("1 项待处理")).toBeDefined();
    expect(screen.getByText("3 页")).toBeDefined();
  });

  it("invokes onPrint with the job and onRefresh on click", () => {
    const onPrint = vi.fn();
    const onRefresh = vi.fn();
    const jobs: PrintServiceJob[] = [
      { id: "1", title: "Invoice #12", status: "pending" },
    ];
    render(<PrintService jobs={jobs} onPrint={onPrint} onRefresh={onRefresh} />);

    fireEvent.click(screen.getByText("刷新"));
    expect(onRefresh).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("打印"));
    expect(onPrint).toHaveBeenCalledTimes(1);
    expect(onPrint).toHaveBeenCalledWith(jobs[0]);
  });
});
