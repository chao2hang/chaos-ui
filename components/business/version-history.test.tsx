import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { VersionHistory } from "./version-history";
import type {
  VersionHistoryItem,
  VersionHistoryProps,
} from "./version-history";

// useTranslation("data") — mock so the component renders without a provider.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("VersionHistory", () => {
  it("exports VersionHistory", () => {
    expect(VersionHistory).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: VersionHistoryItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: VersionHistoryProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders version title, author, and timestamp", () => {
    render(
      <VersionHistory
        versions={[
          {
            id: "v1",
            version: "1.2.0",
            title: "发布 1.2",
            author: "张三",
            timestamp: "2026-06-01",
          },
        ]}
      />,
    );
    expect(screen.getByText("发布 1.2")).toBeDefined();
    expect(screen.getByText("1.2.0")).toBeDefined();
    expect(screen.getByText(/张三/)).toBeDefined();
    expect(screen.getByText(/2026-06-01/)).toBeDefined();
  });

  it("renders the current badge for the current version", () => {
    render(
      <VersionHistory
        versions={[
          {
            id: "v1",
            version: "1.2.0",
            title: "当前",
            author: "张三",
            timestamp: "2026-06-01",
            current: true,
          },
        ]}
      />,
    );
    expect(screen.getByText("versionHistory.current")).toBeDefined();
  });

  it("renders description and changes when provided", () => {
    render(
      <VersionHistory
        versions={[
          {
            id: "v1",
            version: "1.2.0",
            title: "版本",
            author: "张三",
            timestamp: "2026-06-01",
            description: "修复了若干缺陷",
            changes: ["新增 A", "修复 B"],
          },
        ]}
      />,
    );
    expect(screen.getByText("修复了若干缺陷")).toBeDefined();
    expect(screen.getByText("新增 A")).toBeDefined();
    expect(screen.getByText("修复 B")).toBeDefined();
  });

  it("omits restore button for the current version", () => {
    render(
      <VersionHistory
        versions={[
          {
            id: "v1",
            version: "1.2.0",
            title: "当前",
            author: "张三",
            timestamp: "2026-06-01",
            current: true,
          },
        ]}
        onRestore={() => {}}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /versionHistory.restore/ }),
    ).toBeNull();
  });

  it("omits restore button when onRestore not provided", () => {
    render(
      <VersionHistory
        versions={[
          {
            id: "v1",
            version: "1.2.0",
            title: "旧版本",
            author: "张三",
            timestamp: "2026-06-01",
          },
        ]}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /versionHistory.restore/ }),
    ).toBeNull();
  });

  it("calls onRestore with the version item when restore clicked", () => {
    const onRestore = vi.fn();
    const item: VersionHistoryItem = {
      id: "v1",
      version: "1.1.0",
      title: "旧版本",
      author: "张三",
      timestamp: "2026-06-01",
    };
    render(<VersionHistory versions={[item]} onRestore={onRestore} />);
    fireEvent.click(
      screen.getByRole("button", { name: /versionHistory.restore/ }),
    );
    expect(onRestore).toHaveBeenCalledWith(item);
  });

  it("renders multiple versions", () => {
    render(
      <VersionHistory
        versions={[
          {
            id: "v1",
            version: "1.1.0",
            title: "第一版",
            author: "A",
            timestamp: "2026-06-01",
          },
          {
            id: "v2",
            version: "1.2.0",
            title: "第二版",
            author: "B",
            timestamp: "2026-06-02",
            current: true,
          },
        ]}
      />,
    );
    expect(screen.getByText("第一版")).toBeDefined();
    expect(screen.getByText("第二版")).toBeDefined();
  });

  it("renders nothing when versions list is empty", () => {
    const { container } = render(<VersionHistory versions={[]} />);
    expect(
      container.querySelector('[data-slot="version-history"]'),
    ).not.toBeNull();
    expect(container.querySelector('[data-slot="version-history"]')!.children.length).toBe(0);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/version-history");
    expect(mod.VersionHistory).toBeDefined();
  });
});
