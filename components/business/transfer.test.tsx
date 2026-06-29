import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Transfer } from "@/components/business/transfer";

// Transfer uses useTranslation("transfer"); provide a minimal i18n fallback by
// mocking react-i18next so the component renders without a provider.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("Transfer", () => {
  it("renders source and target panels", () => {
    const { container } = render(
      <Transfer
        dataSource={[
          { key: "a", label: "A" },
          { key: "b", label: "B" },
        ]}
        targetKeys={[]}
      />,
    );
    expect(container.querySelector('[data-slot="transfer"]')).not.toBeNull();
  });

  it("select-all toggles all source items at once", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Transfer
        dataSource={[
          { key: "a", label: "A" },
          { key: "b", label: "B" },
        ]}
        targetKeys={[]}
        onChange={onChange}
      />,
    );
    // The select-all checkbox is the first small bordered button in the source panel.
    const selectAllBtn = container.querySelector(
      'button[aria-label="transfer.selectAll"]',
    ) as HTMLButtonElement;
    expect(selectAllBtn).toBeTruthy();

    // Click select-all → both items should move to target via moveToTarget after
    // selection. First, select-all marks both as selected.
    fireEvent.click(selectAllBtn);

    // The "move to target" button should now be enabled (selectedSource.length > 0).
    const moveBtns = container.querySelectorAll("button");
    // Find the move-to-target button (aria-label transfer.moveToTarget).
    const moveToTarget = Array.from(moveBtns).find(
      (b) => b.getAttribute("aria-label") === "transfer.moveToTarget",
    ) as HTMLButtonElement;
    expect(moveToTarget.disabled).toBe(false);

    fireEvent.click(moveToTarget);
    expect(onChange).toHaveBeenCalledWith(["a", "b"]);
  });

  it("select-all then move transfers all items in one onChange (no forEach)", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Transfer
        dataSource={[
          { key: "a", label: "A" },
          { key: "b", label: "B" },
          { key: "c", label: "C" },
        ]}
        targetKeys={[]}
        onChange={onChange}
      />,
    );
    const selectAllBtn = container.querySelector(
      'button[aria-label="transfer.selectAll"]',
    ) as HTMLButtonElement;
    fireEvent.click(selectAllBtn);

    const moveToTarget = Array.from(container.querySelectorAll("button")).find(
      (b) => b.getAttribute("aria-label") === "transfer.moveToTarget",
    ) as HTMLButtonElement;
    fireEvent.click(moveToTarget);

    // Single onChange call with all keys (select-all used one setState, not N toggles).
    expect(onChange).toHaveBeenCalledWith(["a", "b", "c"]);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/transfer");
    expect(mod.Transfer).toBeDefined();
  });
});
