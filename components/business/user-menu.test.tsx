import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserMenu } from "./user-menu";
import type { UserMenuUser, UserMenuAction } from "./user-menu";

// UserMenu uses Base UI DropdownMenu (portal). In jsdom the menu content may
// render into a portal; we test the trigger avatar (initials), type exports,
// module import, and attempt to open the menu.

describe("UserMenu", () => {
  it("exports UserMenu", () => {
    expect(UserMenu).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: UserMenuUser | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: UserMenuAction | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders the trigger button with an accessible label", () => {
    render(<UserMenu user={{ name: "Alice Wong" }} />);
    expect(
      screen.getByRole("button", { name: "Open menu for Alice Wong" }),
    ).toBeDefined();
  });

  it("renders avatar initials from the user name", () => {
    render(<UserMenu user={{ name: "Bob Smith" }} />);
    expect(screen.getByText("BS")).toBeDefined();
  });

  it("renders the avatar image when avatar URL provided", () => {
    render(
      <UserMenu
        user={{ name: "Bob Smith", avatar: "/avatar.png" }}
      />,
    );
    const img = screen.getByAltText("Bob Smith");
    expect(img.getAttribute("src")).toBe("/avatar.png");
  });

  it("does not crash when user has no email or role", () => {
    render(<UserMenu user={{ name: "Carol" }} />);
    expect(
      screen.getByRole("button", { name: "Open menu for Carol" }),
    ).toBeDefined();
  });

  it("opens the menu and shows the user name + email on click", () => {
    render(
      <UserMenu
        user={{ name: "Alice", email: "alice@example.com", role: "Admin" }}
        onSignOut={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Open menu for Alice/ }));
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("alice@example.com")).toBeDefined();
    expect(screen.getByText("Admin")).toBeDefined();
  });

  it("shows the profile and settings items by default when open", () => {
    render(
      <UserMenu user={{ name: "Alice" }} onProfile={() => {}} onSettings={() => {}} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Open menu for Alice/ }));
    expect(screen.getByText("个人资料")).toBeDefined();
    expect(screen.getByText("账户设置")).toBeDefined();
  });

  it("omits profile group when showProfile is false", () => {
    render(<UserMenu user={{ name: "Alice" }} showProfile={false} />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu for Alice/ }));
    expect(screen.queryByText("个人资料")).toBeNull();
    expect(screen.queryByText("账户设置")).toBeNull();
  });

  it("omits settings item when showSettings is false", () => {
    render(
      <UserMenu user={{ name: "Alice" }} showSettings={false} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Open menu for Alice/ }));
    expect(screen.getByText("个人资料")).toBeDefined();
    expect(screen.queryByText("账户设置")).toBeNull();
  });

  it("renders custom actions when provided", () => {
    const onAction = vi.fn();
    render(
      <UserMenu
        user={{ name: "Alice" }}
        actions={[{ label: "我的订阅", onClick: onAction }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Open menu for Alice/ }));
    expect(screen.getByText("我的订阅")).toBeDefined();
  });

  it("renders sign-out item when onSignOut provided", () => {
    render(<UserMenu user={{ name: "Alice" }} onSignOut={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu for Alice/ }));
    expect(screen.getByText("退出登录")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/user-menu");
    expect(mod.UserMenu).toBeDefined();
  });
});
