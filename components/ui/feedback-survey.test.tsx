import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { FeedbackSurvey } from "@/components/ui/feedback-survey";

describe("FeedbackSurvey", () => {
  it("renders rating stars", () => {
    const { container } = render(<FeedbackSurvey type="rating" />);
    // Should have 5 star buttons
    const stars = container.querySelectorAll("button");
    expect(stars.length).toBeGreaterThanOrEqual(5);
  });

  it("renders satisfaction faces", () => {
    const { container } = render(<FeedbackSurvey type="satisfaction" />);
    expect(container.textContent).toContain("不满意");
    expect(container.textContent).toContain("一般");
    expect(container.textContent).toContain("满意");
  });

  it("renders NPS scale", () => {
    const { container } = render(
      <FeedbackSurvey type="nps" npsRange={[0, 10]} />,
    );
    expect(container.textContent).toContain("0");
    expect(container.textContent).toContain("10");
  });

  it("renders thumbs up/down", () => {
    const { container } = render(<FeedbackSurvey type="thumbs" />);
    expect(container.textContent).toContain("有帮助");
    expect(container.textContent).toContain("没帮助");
  });

  it("calls onChange when rating is clicked", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <FeedbackSurvey type="rating" onChange={onChange} />,
    );

    // Click the first star
    const buttons = container.querySelectorAll("button");
    const stars = Array.from(buttons).filter((b) =>
      b.querySelector("svg"),
    );

    await act(async () => {
      if (stars[0]) fireEvent.click(stars[0]);
    });

    expect(onChange).toHaveBeenCalled();
  });

  it("calls onSubmit when submit is clicked", async () => {
    const onSubmit = vi.fn();
    const { container } = render(
      <FeedbackSurvey type="rating" defaultValue={4} onSubmit={onSubmit} />,
    );

    const submitBtn = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("提交反馈"),
    );
    expect(submitBtn).not.toBeNull();

    await act(async () => {
      if (submitBtn) fireEvent.click(submitBtn);
    });

    expect(onSubmit).toHaveBeenCalledWith(4, "");
  });

  it("shows submitted state", () => {
    const { container } = render(
      <FeedbackSurvey type="rating" submitted />,
    );
    expect(container.textContent).toContain("感谢你的反馈");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/feedback-survey");
    expect(mod.FeedbackSurvey).toBeDefined();
  });
});
