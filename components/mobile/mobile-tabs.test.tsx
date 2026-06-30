import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  MobileTabs,
  type MobileTabsProps,
  type MobileTabItem,
} from "@/components/mobile/mobile-tabs";

const tabs: MobileTabItem[] = [
  { value: "overview", label: "Overview", content: <div>Overview content</div> },
  { value: "details", label: "Details", content: <div>Details content</div> },
  { value: "stats", label: "Stats", content: <div>Stats content</div> },
];

describe("MobileTabs", () => {
  it("is exported and types are importable", () => {
    expect(MobileTabs).toBeDefined();
    const _p: MobileTabsProps = { tabs: [] };
    expect(_p.tabs).toEqual([]);
    const _t: MobileTabItem = {
      value: "a",
      label: "A",
      content: "x",
    };
    expect(_t.value).toBe("a");
  });

  it("renders all tab triggers", () => {
    render(<MobileTabs tabs={tabs} />);
    expect(screen.getByText("Overview")).toBeDefined();
    expect(screen.getByText("Details")).toBeDefined();
    expect(screen.getByText("Stats")).toBeDefined();
  });

  it("renders the first tab content by default", () => {
    render(<MobileTabs tabs={tabs} />);
    expect(screen.getByText("Overview content")).toBeDefined();
  });

  it("renders defaultValue tab content when provided", () => {
    render(<MobileTabs tabs={tabs} defaultValue="details" />);
    expect(screen.getByText("Details content")).toBeDefined();
  });

  it("switches content when clicking another tab", () => {
    render(<MobileTabs tabs={tabs} />);
    // click the Stats trigger
    fireEvent.click(screen.getByText("Stats"));
    expect(screen.getByText("Stats content")).toBeDefined();
  });

  it("marks active tab with data-state=active", () => {
    render(<MobileTabs tabs={tabs} defaultValue="details" />);
    const triggers = screen.getAllByRole("tab");
    const detailTrigger = triggers.find(
      (t) => t.getAttribute("value") === "details" || t.textContent === "Details",
    );
    expect(detailTrigger?.getAttribute("data-state")).toBe("active");
  });

  it("renders tab triggers as role=tab", () => {
    render(<MobileTabs tabs={tabs} />);
    expect(screen.getAllByRole("tab").length).toBe(3);
  });

  it("renders content in tablist role region", () => {
    render(<MobileTabs tabs={tabs} />);
    expect(screen.getByRole("tablist")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <MobileTabs tabs={tabs} className="tabs-custom" />,
    );
    expect(container.innerHTML).toContain("tabs-custom");
  });

  it("handles single tab", () => {
    render(
      <MobileTabs
        tabs={[{ value: "only", label: "Only", content: <span>only body</span> }]}
      />,
    );
    expect(screen.getByText("Only")).toBeDefined();
    expect(screen.getByText("only body")).toBeDefined();
  });

  it("switches back to previously selected tab", () => {
    render(<MobileTabs tabs={tabs} />);
    fireEvent.click(screen.getByText("Stats"));
    expect(screen.getByText("Stats content")).toBeDefined();
    fireEvent.click(screen.getByText("Overview"));
    expect(screen.getByText("Overview content")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-tabs");
    expect(mod.MobileTabs).toBeDefined();
  });
});
