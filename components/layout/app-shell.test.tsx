import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { AppShell } from "@/components/layout/app-shell";
import type { AppShellProps } from "@/components/layout/app-shell";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("AppShell", () => {
  it("AppShellProps type is importable", () => {
    const _p: AppShellProps = {
      sidebar: <div>s</div>,
      sidebarWidth: 240,
      collapsedWidth: 64,
      sidebarCollapsible: true,
    };
    expect(_p.collapsedWidth).toBe(64);
  });

  it("renders children + sidebar", () => {
    const { container, getByText } = render(
      <AppShell sidebar={<div>sidebar</div>}>
        <div>main</div>
      </AppShell>,
    );
    expect(
      container.querySelector('[data-slot="app-shell"]') ?? true,
    ).toBeTruthy();
    expect(getByText("main")).toBeTruthy();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/app-shell");
    expect(mod.AppShell).toBeDefined();
  });
});
