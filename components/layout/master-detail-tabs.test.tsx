import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MasterDetailTabs } from "./master-detail-tabs";
import type { MasterDetailTabsProps } from "./master-detail-tabs";

describe("master-detail-tabs", () => {
  it("exports MasterDetailTabs", () => {
    expect(MasterDetailTabs).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MasterDetailTabsProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/master-detail-tabs");
    expect(mod.MasterDetailTabs).toBeDefined();
  });

  it("renders master content and the first detail content by default", () => {
    render(
      <MasterDetailTabs
        master={<div>Master List</div>}
        details={{
          overview: { label: "Overview", content: <div>Overview Content</div> },
          notes: { label: "Notes", content: <div>Notes Content</div> },
        }}
      />,
    );
    expect(screen.getByText("Master List")).toBeDefined();
    expect(screen.getByText("Overview")).toBeDefined();
    expect(screen.getByText("Notes")).toBeDefined();
    // First detail is active by default
    expect(screen.getByText("Overview Content")).toBeDefined();
  });

  it("renders an explicit activeDetail as the initially active tab", () => {
    render(
      <MasterDetailTabs
        master={<div>Master</div>}
        activeDetail="notes"
        details={{
          overview: { label: "Overview", content: <div>Overview Content</div> },
          notes: { label: "Notes", content: <div>Notes Content</div> },
        }}
      />,
    );
    expect(screen.getByText("Notes Content")).toBeDefined();
  });

  it("switches the visible content when a tab trigger is clicked", () => {
    render(
      <MasterDetailTabs
        master={<div>Master</div>}
        details={{
          overview: { label: "Overview", content: <div>Overview Content</div> },
          notes: { label: "Notes", content: <div>Notes Content</div> },
        }}
      />,
    );
    // Overview is active initially
    expect(screen.getByText("Overview Content")).toBeDefined();
    // Click the Notes trigger
    fireEvent.click(screen.getByText("Notes"));
    expect(screen.getByText("Notes Content")).toBeDefined();
  });

  it("fires onDetailChange with the new key when a tab is clicked", () => {
    const onDetailChange = vi.fn();
    render(
      <MasterDetailTabs
        master={<div>Master</div>}
        onDetailChange={onDetailChange}
        details={{
          overview: { label: "Overview", content: <div>Overview Content</div> },
          notes: { label: "Notes", content: <div>Notes Content</div> },
        }}
      />,
    );
    fireEvent.click(screen.getByText("Notes"));
    expect(onDetailChange).toHaveBeenCalledWith("notes");
  });

  it("renders only the master when details is empty", () => {
    const { container } = render(
      <MasterDetailTabs master={<div>Only Master</div>} details={{}} />,
    );
    expect(screen.getByText("Only Master")).toBeDefined();
    expect(container.querySelectorAll('[data-slot="tabs-trigger"]').length).toBe(0);
  });

  it("applies the masterWidth to the master column inline style", () => {
    const { container } = render(
      <MasterDetailTabs
        master={<div>Master</div>}
        masterWidth="320px"
        details={{ a: { label: "A", content: <div>A Content</div> } }}
      />,
    );
    const masterCol = container.querySelector('[data-slot="tabs"]')?.parentElement?.previousElementSibling;
    expect(masterCol?.getAttribute("style") ?? "").toContain("width: 320px");
  });

  it("applies a custom className on the root", () => {
    const { container } = render(
      <MasterDetailTabs
        master={<div>Master</div>}
        className="custom-mdt"
        details={{ a: { label: "A", content: <div>A Content</div> } }}
      />,
    );
    const root = container.firstElementChild;
    expect(root?.classList.contains("custom-mdt")).toBe(true);
  });

  // ---- Deeper interaction tests ----

  it("switches tabs via userEvent keyboard click and fires onDetailChange", async () => {
    const user = userEvent.setup();
    const onDetailChange = vi.fn();
    render(
      <MasterDetailTabs
        master={<div>Master</div>}
        onDetailChange={onDetailChange}
        details={{
          overview: { label: "Overview", content: <div>Overview Content</div> },
          notes: { label: "Notes", content: <div>Notes Content</div> },
        }}
      />,
    );
    await user.click(screen.getByText("Notes"));
    expect(screen.getByText("Notes Content")).toBeDefined();
    expect(onDetailChange).toHaveBeenCalledWith("notes");
  });

  it("renders all detail tab labels even when only the active content is visible", () => {
    render(
      <MasterDetailTabs
        master={<div>Master</div>}
        details={{
          a: { label: "Alpha", content: <div>Alpha Body</div> },
          b: { label: "Beta", content: <div>Beta Body</div> },
          c: { label: "Gamma", content: <div>Gamma Body</div> },
        }}
      />,
    );
    expect(screen.getByText("Alpha")).toBeDefined();
    expect(screen.getByText("Beta")).toBeDefined();
    expect(screen.getByText("Gamma")).toBeDefined();
    // Alpha is active by default; Beta/Gamma content not rendered until switched.
    expect(screen.getByText("Alpha Body")).toBeDefined();
    expect(screen.queryByText("Beta Body")).toBeNull();
  });

  it("re-renders the active content when switching back and forth between tabs", () => {
    render(
      <MasterDetailTabs
        master={<div>Master</div>}
        details={{
          overview: { label: "Overview", content: <div>Overview Content</div> },
          notes: { label: "Notes", content: <div>Notes Content</div> },
        }}
      />,
    );
    fireEvent.click(screen.getByText("Notes"));
    expect(screen.getByText("Notes Content")).toBeDefined();
    fireEvent.click(screen.getByText("Overview"));
    expect(screen.getByText("Overview Content")).toBeDefined();
  });

  it("uses the default masterWidth of 40% when not provided", () => {
    const { container } = render(
      <MasterDetailTabs
        master={<div>Master</div>}
        details={{ a: { label: "A", content: <div>A Content</div> } }}
      />,
    );
    // masterWidth default 40% -> inline width:40%
    const masterCol = container.querySelector('[style*="width: 40%"]');
    expect(masterCol).not.toBeNull();
  });

  it("renders a single detail tab and its content", () => {
    render(
      <MasterDetailTabs
        master={<div>Solo Master</div>}
        details={{ only: { label: "Only", content: <div>Only Body</div> } }}
      />,
    );
    expect(screen.getByText("Only")).toBeDefined();
    expect(screen.getByText("Only Body")).toBeDefined();
  });
});
