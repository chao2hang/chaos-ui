import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthLayout } from "./auth-layout";
import type { AuthLayoutProps } from "./auth-layout";

describe("auth-layout", () => {
  it("exports AuthLayout", () => {
    expect(AuthLayout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AuthLayoutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/auth-layout");
    expect(mod.AuthLayout).toBeDefined();
  });

  it("renders centered variant by default with data-variant", () => {
    const { container } = render(
      <AuthLayout>
        <div>Login Form</div>
      </AuthLayout>,
    );
    const root = container.querySelector('[data-slot="auth-layout"]');
    expect(root).not.toBeNull();
    expect(root?.getAttribute("data-variant")).toBe("centered");
    expect(screen.getByText("Login Form")).toBeDefined();
  });

  it("renders split variant with brand panel", () => {
    render(
      <AuthLayout variant="split" brand={<div>My Brand</div>}>
        <div>Form Content</div>
      </AuthLayout>,
    );
    const root = screen
      .getByText("Form Content")
      .closest('[data-slot="auth-layout"]');
    expect(root?.getAttribute("data-variant")).toBe("split");
    expect(screen.getByText("My Brand")).toBeDefined();
  });

  it("renders split variant even when brand omitted (uses default brand)", () => {
    render(
      <AuthLayout variant="split">
        <div>Form</div>
      </AuthLayout>,
    );
    // Default brand shows "Chaos UI" and "C" logo and tagline
    expect(screen.getByText("Chaos UI")).toBeDefined();
    expect(screen.getByText("C")).toBeDefined();
    expect(screen.getByText("Enterprise management platform")).toBeDefined();
    expect(screen.getByText("Form")).toBeDefined();
  });

  it("renders split variant when brand provided but variant is centered (brand forces split)", () => {
    const { container } = render(
      <AuthLayout brand={<span>Brand</span>}>
        <div>Form</div>
      </AuthLayout>,
    );
    const root = container.querySelector('[data-slot="auth-layout"]');
    expect(root?.getAttribute("data-variant")).toBe("split");
  });

  it("renders children in centered variant", () => {
    render(
      <AuthLayout>
        <span>Child Content</span>
      </AuthLayout>,
    );
    expect(screen.getByText("Child Content")).toBeDefined();
  });

  it("applies formMaxWidth via inline style", () => {
    const { container } = render(
      <AuthLayout formMaxWidth="500px">
        <div>Form</div>
      </AuthLayout>,
    );
    const formWrapper = container.querySelector('div[style*="max-width"]');
    expect(formWrapper?.getAttribute("style")).toContain("max-width: 500px");
  });

  it("applies className to root", () => {
    const { container } = render(
      <AuthLayout className="custom-auth">
        <div>Form</div>
      </AuthLayout>,
    );
    const root = container.querySelector('[data-slot="auth-layout"]');
    expect(root?.classList.contains("custom-auth")).toBe(true);
  });

  it("applies brandClassName to brand panel in split mode", () => {
    const { container } = render(
      <AuthLayout variant="split" brandClassName="brand-bg">
        <div>Form</div>
      </AuthLayout>,
    );
    const brandPanel = container.querySelector(".brand-bg");
    expect(brandPanel).not.toBeNull();
  });

  it("does not render brand panel in centered variant without brand", () => {
    const { container } = render(
      <AuthLayout>
        <div>Form</div>
      </AuthLayout>,
    );
    expect(screen.queryByText("Chaos UI")).toBeNull();
    // No split brand gradient panel
    expect(container.querySelector(".brand-bg")).toBeNull();
  });

  it("defaults to viewport fill with min-h-svh (CUI-LAYOUT-05)", () => {
    const { container } = render(
      <AuthLayout>
        <div>Login</div>
      </AuthLayout>,
    );
    const root = container.querySelector(
      '[data-slot="auth-layout"]',
    ) as HTMLElement;
    expect(root.getAttribute("data-fill")).toBe("viewport");
    expect(root.className.split(/\s+/)).toContain("min-h-svh");
  });

  it("supports fill=parent for host height chains", () => {
    const { container } = render(
      <AuthLayout fill="parent">
        <div>Login</div>
      </AuthLayout>,
    );
    const root = container.querySelector(
      '[data-slot="auth-layout"]',
    ) as HTMLElement;
    expect(root.getAttribute("data-fill")).toBe("parent");
    expect(root.className.split(/\s+/)).toContain("h-full");
    expect(root.className.split(/\s+/)).not.toContain("min-h-svh");
  });
});
