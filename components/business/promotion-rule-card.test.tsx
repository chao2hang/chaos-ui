import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PromotionRuleCard } from "./promotion-rule-card";

describe("PromotionRuleCard", () => {
  it("renders the rule name and default active=false badge", () => {
    render(<PromotionRuleCard name="满 200 减 30" type="满减" discount={30} threshold={200} />);
    expect(screen.getByText("满 200 减 30")).toBeDefined();
    expect(screen.getByText("未生效")).toBeDefined();
    expect(screen.getByText("满 200")).toBeDefined();
  });

  it("shows the active badge when active", () => {
    render(<PromotionRuleCard name="九折" type="折扣" discount={0.9} active />);
    expect(screen.getByText("生效中")).toBeDefined();
  });

  it("renders date range and scope", () => {
    render(
      <PromotionRuleCard
        name="直降 10"
        type="直降"
        discount={10}
        startDate="2026-06-01"
        endDate="2026-06-30"
        scope="乳制品"
      />,
    );
    expect(screen.getByText("乳制品")).toBeDefined();
    expect(screen.getByText("2026-06-01")).toBeDefined();
    expect(screen.getByText("至 2026-06-30")).toBeDefined();
  });

  it("invokes onEdit and onDuplicate when the buttons are clicked", () => {
    const onEdit = vi.fn();
    const onDuplicate = vi.fn();
    render(
      <PromotionRuleCard
        name="买赠"
        type="买赠"
        discount={1}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "编辑" }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "复制" }));
    expect(onDuplicate).toHaveBeenCalledTimes(1);
  });

  it("uses default name, type, scope and discount when no props are passed", () => {
    render(<PromotionRuleCard />);
    expect(screen.getByText("未命名促销")).toBeDefined();
  });

  it("shows the inactive badge by default", () => {
    render(<PromotionRuleCard name="规则" />);
    expect(screen.getByText("未生效")).toBeDefined();
    expect(screen.queryByText("生效中")).toBeNull();
  });

  it("renders default date placeholders when no dates are provided", () => {
    render(<PromotionRuleCard name="规则" />);
    expect(screen.getByText("即日起")).toBeDefined();
    expect(screen.getByText(/长期/)).toBeDefined();
  });

  it("renders a 减 discount label for the 直降 type", () => {
    render(<PromotionRuleCard name="直降规则" type="直降" discount={15} />);
    expect(screen.getByText("减 15")).toBeDefined();
  });

  it("renders a 减 discount label for the 满减 type", () => {
    render(<PromotionRuleCard name="满减规则" type="满减" discount={30} />);
    expect(screen.getByText("减 30")).toBeDefined();
  });

  it("renders a 赠 discount label for the 买赠 type", () => {
    render(<PromotionRuleCard name="买赠规则" type="买赠" discount={2} />);
    expect(screen.getByText("赠 2")).toBeDefined();
  });

  it("hides the threshold row when threshold is undefined", () => {
    render(<PromotionRuleCard name="规则" type="折扣" discount={0.9} />);
    expect(screen.queryByText("门槛")).toBeNull();
    expect(screen.queryByText(/满 /)).toBeNull();
  });

  it("renders the threshold row only when threshold is provided", () => {
    render(<PromotionRuleCard name="规则" type="满减" discount={30} threshold={200} />);
    expect(screen.getByText("门槛")).toBeDefined();
    expect(screen.getByText("满 200")).toBeDefined();
  });

  it("invokes onEdit when the edit button is clicked without onDuplicate", () => {
    const onEdit = vi.fn();
    render(<PromotionRuleCard name="规则" onEdit={onEdit} />);
    fireEvent.click(screen.getByRole("button", { name: "编辑" }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    // copy button still renders and does not throw without a handler
    fireEvent.click(screen.getByRole("button", { name: "复制" }));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("applies the className to the root card", () => {
    render(<PromotionRuleCard name="规则" className="my-promo" />);
    const root = document.querySelector('[data-slot="promotion-rule-card"]');
    expect(root?.className).toContain("my-promo");
  });
});
