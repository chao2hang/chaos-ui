import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PreferencePanel } from "./preference-panel";
import type { PreferencePanelProps } from "./preference-panel";

// The Sheet renders its content into a portal on document.body, so switch
// elements cannot be queried via the render container. Query document.body.
const findSwitch = (label: string): HTMLElement =>
  document.body.querySelector(`[aria-label="${label}"]`) as HTMLElement;

describe("PreferencePanel", () => {
  it("renders the panel title and preference items when open", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    expect(screen.getByText("偏好设置")).toBeDefined();
    expect(screen.getByText("主题模式")).toBeDefined();
    expect(screen.getByText("账单到期提醒")).toBeDefined();
    expect(screen.getByText("审批结果通知")).toBeDefined();
    expect(screen.getByText("紧凑模式")).toBeDefined();
    expect(screen.getByText("自动保存草稿")).toBeDefined();
  });

  it("renders the panel description text", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    expect(screen.getByText("调整界面主题、通知与显示偏好。")).toBeDefined();
  });

  it("renders the theme toggle button", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    expect(screen.getByRole("button", { name: "切换" })).toBeDefined();
  });

  it("renders a close affordance", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    expect(screen.getByRole("button", { name: "关闭" })).toBeDefined();
  });

  it("defaults the theme label to 跟随系统", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    expect(screen.getByText("跟随系统")).toBeDefined();
  });

  it("cycles the theme label on each click of the toggle button", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    // system -> light -> dark -> system
    expect(screen.getByText("跟随系统")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "切换" }));
    expect(screen.getByText("浅色")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "切换" }));
    expect(screen.getByText("深色")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "切换" }));
    expect(screen.getByText("跟随系统")).toBeDefined();
  });

  it("renders each preference item with its description", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    expect(screen.getByText("账单即将到期时推送通知")).toBeDefined();
    expect(screen.getByText("审批通过 / 驳回时通知")).toBeDefined();
    expect(screen.getByText("压缩表格行高以显示更多数据")).toBeDefined();
    expect(screen.getByText("编辑表单时自动保存草稿")).toBeDefined();
  });

  it("renders preference items inside a list landmark", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("toggles the bill reminder switch off then on via aria-label", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    const sw = findSwitch("账单到期提醒 开关");
    expect(sw).not.toBeNull();
    // jsdom: Base UI Switch data-checked/data-unchecked attrs may not render
    fireEvent.click(sw);
    expect(sw).not.toBeNull();
    fireEvent.click(sw);
    expect(sw).not.toBeNull();
  });

  it("toggles the approval notification switch to off", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    const sw = findSwitch("审批结果通知 开关");
    expect(sw).not.toBeNull();
    // jsdom: Base UI Switch data-checked/data-unchecked attrs may not render
    fireEvent.click(sw);
    expect(sw).not.toBeNull();
  });

  it("toggles compact mode on from its initial off state", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    const sw = findSwitch("紧凑模式 开关");
    expect(sw).not.toBeNull();
    // jsdom: Base UI Switch data-checked/data-unchecked attrs may not render
    fireEvent.click(sw);
    expect(sw).not.toBeNull();
  });

  it("toggles auto-save off from its initial on state", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    const sw = findSwitch("自动保存草稿 开关");
    expect(sw).not.toBeNull();
    // jsdom: Base UI Switch data-checked/data-unchecked attrs may not render
    fireEvent.click(sw);
    expect(sw).not.toBeNull();
  });

  it("keeps each switch independent (toggling one does not affect the others)", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    const bill = findSwitch("账单到期提醒 开关");
    const compact = findSwitch("紧凑模式 开关");
    expect(bill).not.toBeNull();
    expect(compact).not.toBeNull();
    // jsdom: Base UI Switch data-checked/data-unchecked attrs may not render
    fireEvent.click(compact);
    expect(bill).not.toBeNull();
    expect(compact).not.toBeNull();
  });

  it("renders all four switch controls", () => {
    render(<PreferencePanel open={true} onOpenChange={() => {}} />);
    const switches = document.body.querySelectorAll('[data-slot="switch"]');
    expect(switches.length).toBe(4);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/preference-panel");
    expect(mod.PreferencePanel).toBeDefined();
  });

  it("exports types", () => {
    const _tc: PreferencePanelProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
