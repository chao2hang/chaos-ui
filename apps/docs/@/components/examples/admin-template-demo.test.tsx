import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AdminTemplateDemo } from "./admin-template-demo";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, "ResizeObserver", {
  configurable: true,
  value: ResizeObserverMock,
});

describe("AdminTemplateDemo", () => {
  it("filters reconciliation rows by period", async () => {
    const user = userEvent.setup();
    render(<AdminTemplateDemo scene="list" onSceneChange={() => {}} />);

    await user.type(screen.getByPlaceholderText("如 2026-07"), "2026-06");
    await user.click(screen.getByRole("button", { name: "查询" }));

    expect(screen.getByText("华东重点经销商")).toBeInTheDocument();
    expect(screen.queryByText("华东一部经销商")).not.toBeInTheDocument();
  });

  it("confirms a pending reconciliation row in place", async () => {
    const user = userEvent.setup();
    render(<AdminTemplateDemo scene="list" onSceneChange={() => {}} />);

    const pendingRow = screen.getByText("华东一部经销商").closest("tr");
    expect(pendingRow).not.toBeNull();
    expect(within(pendingRow!).getAllByText("待签认")).not.toHaveLength(0);

    await user.click(within(pendingRow!).getByRole("button", { name: "签认" }));

    expect(within(pendingRow!).getAllByText("已签认")).not.toHaveLength(0);
    expect(
      within(pendingRow!).getByRole("button", { name: "明细" }),
    ).toBeInTheDocument();
  });

  it("opens the selected row detail scene", async () => {
    const user = userEvent.setup();
    const onSceneChange = vi.fn();
    render(<AdminTemplateDemo scene="list" onSceneChange={onSceneChange} />);

    const confirmedRow = screen.getByText("渝北区域经销商").closest("tr");
    expect(confirmedRow).not.toBeNull();
    await user.click(
      within(confirmedRow!).getByRole("button", { name: "明细" }),
    );

    expect(onSceneChange).toHaveBeenCalledWith("detail");
  });
});
