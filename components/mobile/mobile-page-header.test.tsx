import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  MobilePageHeader,
  type MobilePageHeaderProps,
} from "@/components/mobile/mobile-page-header";

describe("MobilePageHeader", () => {
  it("is exported and type is importable", () => {
    expect(MobilePageHeader).toBeDefined();
    const _p: MobilePageHeaderProps = { title: "T" };
    expect(_p.title).toBe("T");
  });

  it("renders title", () => {
    render(<MobilePageHeader title="Dashboard" />);
    expect(screen.getByText("Dashboard")).toBeDefined();
  });

  it("renders description when provided", () => {
    render(<MobilePageHeader title="Dashboard" description="Overview stats" />);
    expect(screen.getByText("Overview stats")).toBeDefined();
  });

  it("renders breadcrumb items", () => {
    render(
      <MobilePageHeader
        title="Detail"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Detail" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getAllByText("Detail").length).toBeGreaterThan(0);
  });

  it("renders actions node", () => {
    render(
      <MobilePageHeader
        title="T"
        actions={<button type="button">Save</button>}
      />,
    );
    expect(screen.getByText("Save")).toBeDefined();
  });

  it("renders back button and fires onBack", () => {
    const onBack = vi.fn();
    render(<MobilePageHeader title="T" onBack={onBack} />);
    const back = screen.getByRole("button");
    fireEvent.click(back);
    expect(onBack).toHaveBeenCalled();
  });

  it("renders menu button and fires onMenu", () => {
    const onMenu = vi.fn();
    render(<MobilePageHeader title="T" onMenu={onMenu} />);
    // two buttons? only menu here. find by clicking the menu button
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]);
    expect(onMenu).toHaveBeenCalled();
  });

  it("renders both back and menu buttons when both provided", () => {
    render(<MobilePageHeader title="T" onBack={() => {}} onMenu={() => {}} />);
    expect(screen.getAllByRole("button").length).toBe(2);
  });

  it("renders neither back nor menu when omitted", () => {
    render(<MobilePageHeader title="T" />);
    expect(screen.queryAllByRole("button").length).toBe(0);
  });

  it("applies custom className to root", () => {
    const { container } = render(
      <MobilePageHeader title="T" className="header-custom" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("header-custom");
  });

  it("renders full combination: title, description, actions, back, menu", () => {
    const onBack = vi.fn();
    const onMenu = vi.fn();
    render(
      <MobilePageHeader
        title="Reports"
        description="Monthly view"
        actions={<button type="button">Export</button>}
        onBack={onBack}
        onMenu={onMenu}
      />,
    );
    expect(screen.getByText("Reports")).toBeDefined();
    expect(screen.getByText("Monthly view")).toBeDefined();
    expect(screen.getByText("Export")).toBeDefined();
    // back + menu buttons
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[buttons.length - 1]);
    expect(onBack).toHaveBeenCalled();
    expect(onMenu).toHaveBeenCalled();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-page-header");
    expect(mod.MobilePageHeader).toBeDefined();
  });
});
