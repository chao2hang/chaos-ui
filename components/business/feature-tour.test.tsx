import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FeatureTour } from "./feature-tour";
import type { FeatureTourProps } from "./feature-tour";

const steps = [
  { target: "#btn-add", title: "新增单据", content: "点击此处创建新单据。" },
  { target: "#btn-export", title: "导出数据", content: "使用此按钮导出报表。" },
];

describe("FeatureTour", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<FeatureTour open={false} steps={steps} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the first step when open", () => {
    render(<FeatureTour open={true} steps={steps} />);
    expect(screen.getByText("新增单据")).toBeDefined();
    expect(screen.getByText("点击此处创建新单据。")).toBeDefined();
    expect(screen.getByText("#btn-add")).toBeDefined();
    expect(screen.getByText(/第 1 \/ 2 步/)).toBeDefined();
  });

  it("advances to the next step", () => {
    render(<FeatureTour open={true} steps={steps} />);
    fireEvent.click(screen.getByText("下一步"));
    expect(screen.getByText("导出数据")).toBeDefined();
    expect(screen.getByText(/第 2 \/ 2 步/)).toBeDefined();
    expect(screen.getByText("完成")).toBeDefined();
  });

  it("calls onClose when skip button pressed", () => {
    let called = false;
    render(
      <FeatureTour open={true} steps={steps} onClose={() => (called = true)} />,
    );
    fireEvent.click(screen.getByLabelText("关闭引导"));
    expect(called).toBe(true);
  });

  it("has dialog role and aria-modal", () => {
    render(<FeatureTour open={true} steps={steps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
  });

  it("exports types", () => {
    const _t: FeatureTourProps = { steps: [], open: false };
    expect(_t.open).toBe(false);
  });
});
