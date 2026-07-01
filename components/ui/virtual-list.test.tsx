import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { VirtualList } from "@/components/ui/virtual-list";
import type { VirtualListProps } from "@/components/ui/virtual-list";

describe("virtual-list", () => {
  it("exports VirtualList", () => {
    expect(VirtualList).toBeDefined();
    expect(typeof VirtualList).toBe("function");
  });

  it("VirtualListProps type is importable", () => {
    const props: VirtualListProps<string> = {
      data: [],
      renderItem: (item) => item,
      estimateSize: 40,
      overscan: 5,
      height: 400,
      width: "100%",
      className: "test",
      onEndReached: vi.fn(),
      endReachedThreshold: 100,
      loading: false,
      loadingComponent: <span>Loading...</span>,
      emptyComponent: <span>Empty</span>,
    };
    expect(props.estimateSize).toBe(40);
    expect(props.height).toBe(400);
  });

  it("renders empty state when data is empty and not loading", () => {
    const { container } = render(
      <VirtualList
        data={[]}
        renderItem={() => null}
        estimateSize={40}
        height={400}
      />,
    );
    expect(container.textContent).toContain("No data");
  });

  it("renders custom empty component when data is empty", () => {
    render(
      <VirtualList
        data={[]}
        renderItem={() => null}
        estimateSize={40}
        height={400}
        emptyComponent={<div>Custom empty</div>}
      />,
    );
    expect(screen.getByText("Custom empty")).toBeDefined();
  });

  it("does not show empty state when loading", () => {
    const { container } = render(
      <VirtualList
        data={[]}
        renderItem={() => null}
        estimateSize={40}
        height={400}
        loading
      />,
    );
    // When loading and data is empty, the "No data" default should NOT show
    // because the condition is `data.length === 0 && !loading`
    expect(container.textContent).not.toContain("No data");
  });

  it("renders items with data-slot attribute", () => {
    const items = ["Item 1", "Item 2", "Item 3"];
    const { container } = render(
      <VirtualList
        data={items}
        renderItem={(item) => <div>{item}</div>}
        estimateSize={40}
        height={400}
      />,
    );
    expect(
      container.querySelector('[data-slot="virtual-list"]'),
    ).not.toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(
      <VirtualList
        data={["a"]}
        renderItem={(item) => <div>{item}</div>}
        estimateSize={40}
        height={400}
        className="my-list"
      />,
    );
    const el = container.querySelector('[data-slot="virtual-list"]');
    expect(el?.className).toContain("my-list");
  });

  it("applies height and width styles", () => {
    const { container } = render(
      <VirtualList
        data={["a"]}
        renderItem={(item) => <div>{item}</div>}
        estimateSize={40}
        height={500}
        width={300}
      />,
    );
    const el = container.querySelector('[data-slot="virtual-list"]');
    expect((el as HTMLElement)?.style.height).toBe("500px");
    expect((el as HTMLElement)?.style.width).toBe("300px");
  });

  it("renders with default width 100%", () => {
    const { container } = render(
      <VirtualList
        data={["a"]}
        renderItem={(item) => <div>{item}</div>}
        estimateSize={40}
        height={400}
      />,
    );
    const el = container.querySelector('[data-slot="virtual-list"]');
    expect((el as HTMLElement)?.style.width).toBe("100%");
  });

  it("renders loading component when loading", () => {
    render(
      <VirtualList
        data={["a"]}
        renderItem={(item) => <div>{item}</div>}
        estimateSize={40}
        height={400}
        loading
        loadingComponent={<div>Loading more...</div>}
      />,
    );
    expect(screen.getByText("Loading more...")).toBeDefined();
  });
});
