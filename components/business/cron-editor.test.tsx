import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CronEditor } from "@/components/business/cron-editor";

// Mock cronstrue to avoid locale loading issues in test env
vi.mock("cronstrue", () => ({
  default: {
    toString: (cron: string) => `执行计划: ${cron}`,
  },
}));

describe("CronEditor", () => {
  it("renders editor container", () => {
    const { container } = render(<CronEditor value="*/5 * * * *" />);
    expect(container.querySelector('[data-slot="cron-editor"]')).toBeTruthy();
  });

  it("displays raw cron expression", () => {
    render(<CronEditor value="*/5 * * * *" />);
    expect(screen.getByText("*/5 * * * *")).toBeTruthy();
  });

  it("renders preset buttons", () => {
    render(<CronEditor value="*/5 * * * *" />);
    expect(screen.getByText("每 5 分钟")).toBeTruthy();
    expect(screen.getByText("每小时")).toBeTruthy();
    expect(screen.getByText("工作日 9 点")).toBeTruthy();
  });

  it("calls onChange when preset is clicked", () => {
    const handleChange = vi.fn();
    render(<CronEditor value="* * * * *" onChange={handleChange} />);
    fireEvent.click(screen.getByText("每小时"));
    expect(handleChange).toHaveBeenCalledWith("0 * * * *");
  });

  it("renders description when showDescription is true", () => {
    render(<CronEditor value="*/5 * * * *" showDescription />);
    expect(screen.getByText("执行计划: */5 * * * *")).toBeTruthy();
  });

  it("hides description when showDescription is false", () => {
    render(<CronEditor value="*/5 * * * *" showDescription={false} />);
    expect(screen.queryByText("执行计划: */5 * * * *")).toBeNull();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <CronEditor value="* * * * *" className="custom-cron" />,
    );
    const el = container.querySelector(
      '[data-slot="cron-editor"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-cron");
  });

  it("does not call onChange in readOnly mode", () => {
    const handleChange = vi.fn();
    render(<CronEditor value="* * * * *" onChange={handleChange} readOnly />);
    fireEvent.click(screen.getByText("每小时"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/cron-editor");
    expect(mod.CronEditor).toBeDefined();
  });
});
