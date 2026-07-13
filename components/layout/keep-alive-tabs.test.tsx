import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { KeepAliveTabs } from "./keep-alive-tabs";

function Counter({ label }: { label: string }) {
  const [n, setN] = useState(0);
  return (
    <div>
      <span>
        {label}:{n}
      </span>
      <button type="button" onClick={() => setN((x) => x + 1)}>
        inc-{label}
      </button>
    </div>
  );
}

describe("KeepAliveTabs", () => {
  it("renders tab bar and active pane", () => {
    render(
      <KeepAliveTabs
        panes={[
          { key: "a", label: "A", children: <div>Pane A</div> },
          { key: "b", label: "B", children: <div>Pane B</div> },
        ]}
        defaultActiveKey="a"
      />,
    );
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
    expect(screen.getByText("Pane A")).toBeDefined();
  });

  it("preserves inactive pane state when switching tabs", () => {
    render(
      <KeepAliveTabs
        panes={[
          {
            key: "a",
            label: "TabA",
            children: <Counter label="A" />,
          },
          {
            key: "b",
            label: "TabB",
            children: <Counter label="B" />,
          },
        ]}
        defaultActiveKey="a"
      />,
    );

    fireEvent.click(screen.getByText("inc-A"));
    expect(screen.getByText("A:1")).toBeDefined();

    fireEvent.click(screen.getByText("TabB"));
    expect(screen.getByText("B:0")).toBeDefined();

    fireEvent.click(screen.getByText("TabA"));
    // State preserved via KeepAlive (still mounted, was hidden)
    expect(screen.getByText("A:1")).toBeDefined();
  });

  it("fires onChange / onClose", () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    render(
      <KeepAliveTabs
        panes={[
          {
            key: "home",
            label: "Home",
            closable: false,
            children: <div>H</div>,
          },
          { key: "orders", label: "Orders", children: <div>O</div> },
        ]}
        activeKey="home"
        onChange={onChange}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByText("Orders"));
    expect(onChange).toHaveBeenCalledWith("orders");
    fireEvent.click(screen.getByLabelText("Close tab"));
    expect(onClose).toHaveBeenCalledWith("orders");
  });

  it("lazy-mounts panes until first visit", () => {
    const { container } = render(
      <KeepAliveTabs
        panes={[
          { key: "a", label: "A", children: <div data-testid="pa">A</div> },
          { key: "b", label: "B", children: <div data-testid="pb">B</div> },
        ]}
        defaultActiveKey="a"
      />,
    );
    expect(container.querySelectorAll('[data-slot="keep-alive"]').length).toBe(
      1,
    );
    fireEvent.click(screen.getByText("B"));
    expect(container.querySelectorAll('[data-slot="keep-alive"]').length).toBe(
      2,
    );
  });
});
