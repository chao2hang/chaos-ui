import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  MobileListItemSkeleton,
  MobileCardSkeleton,
  MobileDetailSkeleton,
} from "@/components/mobile/mobile-skeleton";

describe("MobileSkeleton", () => {
  it("MobileListItemSkeleton renders pulse elements", () => {
    const { container } = render(<MobileListItemSkeleton />);
    const pulses = container.querySelectorAll(".animate-pulse");
    // avatar + 2 lines + trailing icon = 4 pulse blocks
    expect(pulses.length).toBeGreaterThanOrEqual(4);
  });

  it("MobileListItemSkeleton applies custom className", () => {
    const { container } = render(
      <MobileListItemSkeleton className="custom-li" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("custom-li");
  });

  it("MobileListItemSkeleton forwards native div props", () => {
    const { container } = render(
      <MobileListItemSkeleton data-testid="li-sk" role="status" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute("data-testid")).toBe("li-sk");
    expect(root.getAttribute("role")).toBe("status");
  });

  it("MobileCardSkeleton renders pulse elements", () => {
    const { container } = render(<MobileCardSkeleton />);
    const pulses = container.querySelectorAll(".animate-pulse");
    // header + 2 lines + 2 buttons = 5
    expect(pulses.length).toBeGreaterThanOrEqual(5);
  });

  it("MobileCardSkeleton applies custom className", () => {
    const { container } = render(<MobileCardSkeleton className="custom-card" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("custom-card");
  });

  it("MobileDetailSkeleton renders pulse elements", () => {
    const { container } = render(<MobileDetailSkeleton />);
    const pulses = container.querySelectorAll(".animate-pulse");
    expect(pulses.length).toBeGreaterThanOrEqual(5);
  });

  it("MobileDetailSkeleton applies custom className", () => {
    const { container } = render(
      <MobileDetailSkeleton className="custom-detail" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("custom-detail");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-skeleton");
    expect(mod.MobileListItemSkeleton).toBeDefined();
    expect(mod.MobileCardSkeleton).toBeDefined();
    expect(mod.MobileDetailSkeleton).toBeDefined();
  });
});
