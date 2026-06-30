import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Popconfirm } from "./popconfirm";
import type { PopconfirmProps } from "./popconfirm";

describe("Popconfirm", () => {
  it("exports Popconfirm", () => {
    expect(Popconfirm).toBeDefined();
  });

  it("renders only children when disabled", () => {
    const { container } = render(
      <Popconfirm disabled title="t">
        <button type="button">delete</button>
      </Popconfirm>,
    );
    expect(screen.getByText("delete")).toBeDefined();
    // disabled branch returns a fragment with just children
    expect(container.firstChild).toBe(screen.getByText("delete"));
  });

  it("renders the trigger (default closed)", () => {
    render(
      <Popconfirm title="Are you sure?">
        <button type="button">delete</button>
      </Popconfirm>,
    );
    expect(screen.getByText("delete")).toBeDefined();
  });

  it("renders title, description and buttons when open (controlled)", async () => {
    render(
      <Popconfirm
        open
        onOpenChange={() => undefined}
        title="Delete this item?"
        description="This cannot be undone"
        okText="Yes, delete"
        cancelText="No, keep"
      >
        <button type="button">delete</button>
      </Popconfirm>,
    );
    await waitFor(() => {
      expect(screen.getByText("Delete this item?")).toBeDefined();
    });
    expect(screen.getByText("This cannot be undone")).toBeDefined();
    expect(screen.getByText("Yes, delete")).toBeDefined();
    expect(screen.getByText("No, keep")).toBeDefined();
  });

  it("fires onConfirm and closes on OK click", async () => {
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <Popconfirm
        open
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
        title="sure?"
      >
        <button type="button">delete</button>
      </Popconfirm>,
    );
    await waitFor(() => {
      expect(screen.getByText("OK")).toBeDefined();
    });
    fireEvent.click(screen.getByText("OK"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("fires onCancel and closes on Cancel click", async () => {
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <Popconfirm
        open
        onCancel={onCancel}
        onOpenChange={onOpenChange}
        title="sure?"
      >
        <button type="button">delete</button>
      </Popconfirm>,
    );
    await waitFor(() => {
      expect(screen.getByText("Cancel")).toBeDefined();
    });
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("hides the cancel button when showCancel=false", async () => {
    render(
      <Popconfirm
        open
        onOpenChange={() => undefined}
        showCancel={false}
        title="t"
      >
        <button type="button">delete</button>
      </Popconfirm>,
    );
    await waitFor(() => {
      expect(screen.getByText("OK")).toBeDefined();
    });
    expect(screen.queryByText("Cancel")).toBeNull();
  });

  it("opens on trigger click (uncontrolled)", async () => {
    const onOpenChange = vi.fn();
    render(
      <Popconfirm onOpenChange={onOpenChange} title="t">
        <button type="button">delete</button>
      </Popconfirm>,
    );
    fireEvent.click(screen.getByText("delete"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    await waitFor(() => {
      expect(screen.getByText("OK")).toBeDefined();
    });
  });

  it("exports types", () => {
    const _tc1: PopconfirmProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
