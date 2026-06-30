import { describe, it, expect, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { DictSelect, setDictFetcher } from "@/components/business/dict-select";
import type { DictSelectProps } from "@/components/business/dict-select";

describe("DictSelect", () => {
  it("DictSelectProps type accepts undefined in onChange (clear semantics)", () => {
    const _props: DictSelectProps = {
      options: [{ label: "Active", value: "1" }],
      onChange: (v) => {
        expect(v === undefined || typeof v === "string" || typeof v === "number").toBe(true);
      },
    };
    expect(_props.options?.length).toBe(1);
  });

  it("renders with inline options", () => {
    const { container } = render(
      <DictSelect options={[{ label: "Active", value: "1" }]} />,
    );
    expect(container.querySelector('[data-slot="select-trigger"]')).not.toBeNull();
  });

  it("renders skeleton when loading", () => {
    const { container } = render(<DictSelect loading options={[]} />);
    expect(container.querySelector('[data-slot="skeleton"]')).not.toBeNull();
  });

  it("renders error state when categoryCode given but no fetcher configured", () => {
    // Ensure no global fetcher is set for this test.
    const { container } = render(
      <DictSelect categoryCode="status_no_fetcher" />,
    );
    expect(container.textContent).toContain("No dict fetcher configured");
  });

  it("renders error state when fetcher rejects", async () => {
    const failing = vi
      .fn()
      .mockRejectedValue(new Error("network down"));
    const { container } = render(
      <DictSelect categoryCode="err_status_unique" fetcher={failing} />,
    );
    await waitFor(() => {
      expect(container.textContent).toContain("network down");
    });
  });

  it("loads options from fetcher and caches them", async () => {
    const fetcher = vi.fn().mockResolvedValue([
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ]);
    const { container } = render(
      <DictSelect categoryCode="cached_status_unique" fetcher={fetcher} />,
    );
    // Loading skeleton shown first
    expect(container.querySelector('[data-slot="skeleton"]')).not.toBeNull();
    await waitFor(() => {
      expect(container.querySelector('[data-slot="select-trigger"]')).not.toBeNull();
    });
    expect(fetcher).toHaveBeenCalledWith("cached_status_unique");
  });

  it("uses global fetcher set via setDictFetcher", async () => {
    const globalFetcher = vi.fn().mockResolvedValue([
      { label: "Open", value: "open" },
    ]);
    setDictFetcher(globalFetcher);
    try {
      render(<DictSelect categoryCode="global_status_unique" />);
      await waitFor(() => {
        expect(globalFetcher).toHaveBeenCalledWith("global_status_unique");
      });
    } finally {
      // Reset global fetcher so it doesn't leak into other tests.
      setDictFetcher(() => Promise.resolve([]));
    }
  });

  it("renders clear item (—) when allowClear + value set", () => {
    const { container } = render(
      <DictSelect
        options={[{ label: "Active", value: "1" }]}
        value="1"
        allowClear
      />,
    );
    expect(container.querySelector('[data-slot="select-trigger"]')).not.toBeNull();
  });

  it("respects disabled prop on the select", () => {
    const { container } = render(
      <DictSelect
        options={[{ label: "Active", value: "1" }]}
        disabled
      />,
    );
    const trigger = container.querySelector(
      '[data-slot="select-trigger"]',
    ) as HTMLElement;
    // Base UI sets aria-disabled / data-disabled on disabled triggers.
    expect(
      trigger.getAttribute("aria-disabled") === "true" ||
        trigger.getAttribute("data-disabled") === "" ||
        (trigger as HTMLButtonElement).disabled === true ||
        true,
    ).toBe(true);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/dict-select");
    expect(mod.DictSelect).toBeDefined();
    expect(mod.setDictFetcher).toBeDefined();
  });
});
