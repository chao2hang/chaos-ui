import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SettingsLayout } from "./settings-layout";

const nav = [
  { key: "profile", label: "个人资料", description: "头像与昵称" },
  { key: "security", label: "安全" },
  { key: "notify", label: "通知", disabled: true },
];

describe("SettingsLayout", () => {
  it("renders nav and content", () => {
    render(
      <SettingsLayout nav={nav} title="账户设置" description="管理资料">
        <div>Content body</div>
      </SettingsLayout>,
    );
    expect(screen.getByText("个人资料")).toBeDefined();
    expect(screen.getByText("安全")).toBeDefined();
    expect(screen.getByText("账户设置")).toBeDefined();
    expect(screen.getByText("Content body")).toBeDefined();
  });

  it("filters nav by search", () => {
    render(
      <SettingsLayout nav={nav} searchable searchPlaceholder="搜索设置…">
        <div />
      </SettingsLayout>,
    );
    fireEvent.change(screen.getByPlaceholderText("搜索设置…"), {
      target: { value: "安全" },
    });
    expect(screen.getByText("安全")).toBeDefined();
    expect(screen.queryByText("个人资料")).toBeNull();
  });

  it("fires onNavChange", () => {
    const onNavChange = vi.fn();
    render(
      <SettingsLayout nav={nav} activeKey="profile" onNavChange={onNavChange}>
        <div />
      </SettingsLayout>,
    );
    fireEvent.click(screen.getByText("安全"));
    expect(onNavChange).toHaveBeenCalledWith("security");
  });

  it("shows empty filter message", () => {
    render(
      <SettingsLayout nav={nav} searchable>
        <div />
      </SettingsLayout>,
    );
    fireEvent.change(screen.getByPlaceholderText("搜索设置…"), {
      target: { value: "zzz-no-match" },
    });
    expect(screen.getByText("无匹配项")).toBeDefined();
  });
});
