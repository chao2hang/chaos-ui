import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
} from "./tabs";

describe("tabs", () => {
  it("exports Tabs", () => {
    expect(Tabs).toBeDefined();
  });

  it("exports TabsList", () => {
    expect(TabsList).toBeDefined();
  });

  it("exports TabsTrigger", () => {
    expect(TabsTrigger).toBeDefined();
  });

  it("exports TabsContent", () => {
    expect(TabsContent).toBeDefined();
  });

  it("exports tabsListVariants", () => {
    expect(tabsListVariants).toBeDefined();
  });

  it("renders tab triggers and content panels", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
  });

  it("shows the active tab content by default value", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Content A")).toBeDefined();
  });

  it("switches active content when a trigger is clicked", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">TabA</TabsTrigger>
          <TabsTrigger value="b">TabB</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Content A")).toBeDefined();
    fireEvent.click(screen.getByText("TabB"));
    expect(screen.getByText("Content B")).toBeDefined();
  });

  it("fires onValueChange when a trigger is clicked", () => {
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="a" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">CA</TabsContent>
        <TabsContent value="b">CB</TabsContent>
      </Tabs>,
    );
    fireEvent.click(screen.getByText("B"));
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls[0]?.[0]).toBe("b");
  });

  it("respects controlled value", () => {
    render(
      <Tabs value="b">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">CA</TabsContent>
        <TabsContent value="b">CB</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("CB")).toBeDefined();
  });

  it("applies orientation data attribute", () => {
    const { container } = render(
      <Tabs orientation="vertical" defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">CA</TabsContent>
      </Tabs>,
    );
    expect(
      container
        .querySelector('[data-slot="tabs"]')
        ?.getAttribute("data-orientation"),
    ).toBe("vertical");
  });

  it("applies line variant data attribute on TabsList", () => {
    const { container } = render(
      <Tabs defaultValue="a">
        <TabsList variant="line">
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">CA</TabsContent>
      </Tabs>,
    );
    expect(
      container
        .querySelector('[data-slot="tabs-list"]')
        ?.getAttribute("data-variant"),
    ).toBe("line");
  });

  it("disabled trigger does not switch content", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b" disabled>
            B
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">CA</TabsContent>
        <TabsContent value="b">CB</TabsContent>
      </Tabs>,
    );
    fireEvent.click(screen.getByText("B"));
    // active content remains A
    expect(screen.getByText("CA")).toBeDefined();
  });

  it("merges custom className on Tabs root", () => {
    const { container } = render(
      <Tabs className="my-tabs" defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">CA</TabsContent>
      </Tabs>,
    );
    expect(
      container.querySelector('[data-slot="tabs"]')?.className,
    ).toContain("my-tabs");
  });

  it("tabsListVariants returns class strings", () => {
    expect(tabsListVariants({ variant: "default" })).toContain("bg-muted");
    expect(tabsListVariants({ variant: "line" })).toContain("bg-transparent");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/tabs");
    expect(mod.Tabs).toBeDefined();
    expect(mod.TabsList).toBeDefined();
    expect(mod.TabsTrigger).toBeDefined();
    expect(mod.TabsContent).toBeDefined();
  });
});
