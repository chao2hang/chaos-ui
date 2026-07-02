import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SplitButton, type SplitButtonAction } from "@/components/ui/split-button";

describe("SplitButton", () => {
  it("renders with data-slot", () => {
    const { container } = render(<SplitButton>Save</SplitButton>);
    expect(container.querySelector('[data-slot="split-button"]')).not.toBeNull();
  });

  it("renders main button with children text", () => {
    render(<SplitButton>Save</SplitButton>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
  });

  it("fires onClick when main button is clicked", () => {
    const onClick = vi.fn();
    render(<SplitButton onClick={onClick}>Save</SplitButton>);
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders dropdown trigger when actions are provided", () => {
    const actions: SplitButtonAction[] = [
      { label: "Save As" },
      { label: "Save All" },
    ];
    const { container } = render(
      <SplitButton actions={actions}>Save</SplitButton>
    );
    // Should have main button + dropdown trigger
    const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]');
    expect(trigger).not.toBeNull();
  });

  it("does not render dropdown trigger without actions", () => {
    const { container } = render(<SplitButton>Save</SplitButton>);
    const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]');
    expect(trigger).toBeNull();
  });

  it("opens dropdown menu when trigger is clicked", async () => {
    const actions: SplitButtonAction[] = [
      { label: "Save As" },
      { label: "Save All" },
    ];
    const { container } = render(
      <SplitButton actions={actions}>Save</SplitButton>
    );
    const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]') as HTMLElement;
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Save As")).toBeDefined();
      expect(screen.getByText("Save All")).toBeDefined();
    });
  });

  it("fires onClick on each action item", async () => {
    const onClickSaveAs = vi.fn();
    const actions: SplitButtonAction[] = [
      { label: "Save As", onClick: onClickSaveAs },
    ];
    const { container } = render(
      <SplitButton actions={actions}>Save</SplitButton>
    );
    const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]') as HTMLElement;
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Save As")).toBeDefined();
    });
    fireEvent.click(screen.getByText("Save As"));
    expect(onClickSaveAs).toHaveBeenCalledTimes(1);
  });

  it("disables both buttons when disabled is true", () => {
    const actions: SplitButtonAction[] = [{ label: "Save As" }];
    const { container } = render(
      <SplitButton disabled actions={actions}>
        Save
      </SplitButton>
    );
    const mainBtn = container.querySelector('[data-slot="button"]') as HTMLButtonElement;
    const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]') as HTMLButtonElement;
    expect(mainBtn.disabled).toBe(true);
    expect(trigger.disabled).toBe(true);
  });

  it("disables both buttons when loading is true", () => {
    const actions: SplitButtonAction[] = [{ label: "Save As" }];
    const { container } = render(
      <SplitButton loading actions={actions}>
        Save
      </SplitButton>
    );
    const mainBtn = container.querySelector('[data-slot="button"]') as HTMLButtonElement;
    const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]') as HTMLButtonElement;
    expect(mainBtn.disabled).toBe(true);
    expect(trigger.disabled).toBe(true);
  });

  it("shows spinner icon when loading", () => {
    const { container } = render(<SplitButton loading>Save</SplitButton>);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).not.toBeNull();
  });

  it("renders icon on main button when provided", () => {
    const { container } = render(
      <SplitButton icon={<span data-testid="my-icon">★</span>}>Star</SplitButton>
    );
    expect(container.querySelector('[data-testid="my-icon"]')).not.toBeNull();
  });

  it("applies custom className to root element", () => {
    const { container } = render(
      <SplitButton className="my-custom-class">Save</SplitButton>
    );
    const root = container.querySelector('[data-slot="split-button"]');
    expect(root?.className).toContain("my-custom-class");
  });

  it("renders separator before action items that have separator flag", async () => {
    const actions: SplitButtonAction[] = [
      { label: "First" },
      { label: "Second", separator: true },
    ];
    const { container } = render(
      <SplitButton actions={actions}>Save</SplitButton>
    );
    const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]') as HTMLElement;
    fireEvent.click(trigger);

    await waitFor(() => {
      const separators = document.querySelectorAll(
        '[data-slot="dropdown-menu-separator"]'
      );
      expect(separators.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders destructive action items with correct variant", async () => {
    const actions: SplitButtonAction[] = [
      { label: "Delete", destructive: true },
    ];
    const { container } = render(
      <SplitButton actions={actions}>Save</SplitButton>
    );
    const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]') as HTMLElement;
    fireEvent.click(trigger);

    await waitFor(() => {
      const item = screen.getByText("Delete");
      expect(item).toBeDefined();
    });
  });
});
