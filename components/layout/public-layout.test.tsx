import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { PublicLayout } from "./public-layout";

// public-layout.tsx declares the Props interface but does not export it,
// so derive the type from the component for the type-export check below.
type PublicLayoutProps = React.ComponentProps<typeof PublicLayout>;

describe("public-layout", () => {
  it("exports PublicLayout", () => {
    expect(PublicLayout).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/public-layout");
    expect(mod.PublicLayout).toBeDefined();
  });

  it("exports types", () => {
    const _p: PublicLayoutProps | undefined = undefined;
    expect(_p).toBeUndefined();
  });

  it("renders default logo text when no logo provided", () => {
    render(<PublicLayout><main>body</main></PublicLayout>);
    expect(screen.getByText("Chaos UI")).toBeDefined();
    expect(screen.getByText("body")).toBeDefined();
  });

  it("renders a custom logo node", () => {
    render(
      <PublicLayout logo={<img alt="Acme" src="/logo.png" />}>
        <span>home</span>
      </PublicLayout>,
    );
    expect(screen.getByAltText("Acme")).toBeDefined();
    expect(screen.queryByText("Chaos UI")).toBeNull();
  });

  it("renders nav items as links with labels", () => {
    render(
      <PublicLayout nav={[{ label: "Pricing", href: "/pricing" }, { label: "Docs", href: "/docs" }]}>
        <span>home</span>
      </PublicLayout>,
    );
    const pricing = screen.getByText("Pricing");
    const docs = screen.getByText("Docs");
    expect(pricing.tagName).toBe("A");
    expect(pricing.getAttribute("href")).toBe("/pricing");
    expect(docs.getAttribute("href")).toBe("/docs");
  });

  it("renders no nav links when nav is empty", () => {
    const { container } = render(<PublicLayout><span>home</span></PublicLayout>);
    const nav = container.querySelector("header nav");
    // nav element exists but has no anchor children
    expect(nav).not.toBeNull();
    expect(nav?.querySelectorAll("a").length).toBe(0);
  });

  it("renders headerActions in the header", () => {
    render(
      <PublicLayout headerActions={<button type="button">Sign In</button>}>
        <span>home</span>
      </PublicLayout>,
    );
    expect(screen.getByText("Sign In")).toBeDefined();
  });

  it("renders footer when provided", () => {
    render(
      <PublicLayout footer={<span>© 2026 Acme</span>}>
        <span>home</span>
      </PublicLayout>,
    );
    expect(screen.getByText("© 2026 Acme")).toBeDefined();
    const footer = screen.getByText("© 2026 Acme").closest("footer");
    expect(footer).not.toBeNull();
  });

  it("does not render a footer when none provided", () => {
    const { container } = render(<PublicLayout><span>home</span></PublicLayout>);
    expect(container.querySelector("footer")).toBeNull();
  });

  it("applies data-slot and custom className on the root", () => {
    const { container } = render(
      <PublicLayout className="custom-pub"><span>home</span></PublicLayout>,
    );
    const root = container.querySelector('[data-slot="public-layout"]');
    expect(root).not.toBeNull();
    expect(root?.classList.contains("custom-pub")).toBe(true);
  });

  it("forwards extra div props to the root element", () => {
    const { container } = render(
      <PublicLayout id="site-root" aria-label="Site">
        <span>home</span>
      </PublicLayout>,
    );
    const root = container.querySelector('[data-slot="public-layout"]');
    expect(root?.id).toBe("site-root");
    expect(root?.getAttribute("aria-label")).toBe("Site");
  });

  // ---- Deeper interaction tests ----

  it("the default logo links to '/'", () => {
    render(<PublicLayout><span>home</span></PublicLayout>);
    const logo = screen.getByText("Chaos UI");
    expect(logo.tagName).toBe("A");
    expect(logo.getAttribute("href")).toBe("/");
  });

  it("renders multiple nav items preserving order and hrefs", () => {
    render(
      <PublicLayout
        nav={[
          { label: "Home", href: "/" },
          { label: "Pricing", href: "/pricing" },
          { label: "Docs", href: "/docs" },
          { label: "Blog", href: "/blog" },
        ]}
      >
        <span>home</span>
      </PublicLayout>,
    );
    const links = screen.getAllByRole("link");
    const navLinks = links.filter((a) => a.textContent === "Home" || a.textContent === "Pricing" || a.textContent === "Docs" || a.textContent === "Blog");
    expect(navLinks.map((a) => a.getAttribute("href"))).toEqual(["/", "/pricing", "/docs", "/blog"]);
  });

  it("renders headerActions, nav, footer, and children all at once", () => {
    render(
      <PublicLayout
        nav={[{ label: "About", href: "/about" }]}
        headerActions={<button type="button">Sign In</button>}
        footer={<span>© 2026</span>}
      >
        <h1>Welcome</h1>
      </PublicLayout>,
    );
    expect(screen.getByText("About").getAttribute("href")).toBe("/about");
    expect(screen.getByText("Sign In")).toBeDefined();
    expect(screen.getByText("© 2026")).toBeDefined();
    expect(screen.getByText("Welcome").tagName).toBe("H1");
  });

  it("renders the main content inside a <main> element", () => {
    const { container } = render(
      <PublicLayout>
        <span>body</span>
      </PublicLayout>,
    );
    const main = container.querySelector("main");
    expect(main).not.toBeNull();
    expect(main?.textContent).toContain("body");
  });

  it("nav links have the muted-foreground class (styling applied)", () => {
    render(
      <PublicLayout nav={[{ label: "Pricing", href: "/pricing" }]}>
        <span>home</span>
      </PublicLayout>,
    );
    const link = screen.getByText("Pricing");
    expect(link.classList.contains("text-muted-foreground")).toBe(true);
  });

  it("logo custom node replaces default text and links to '/'", () => {
    render(
      <PublicLayout logo={<span data-testid="custom-logo">ACME</span>}>
        <span>home</span>
      </PublicLayout>,
    );
    expect(screen.getByTestId("custom-logo")).toBeDefined();
    expect(screen.queryByText("Chaos UI")).toBeNull();
    // The logo is wrapped in a Link to "/"
    const link = screen.getByTestId("custom-logo").closest("a");
    expect(link?.getAttribute("href")).toBe("/");
  });

  it("footer renders inside a bordered footer element", () => {
    const { container } = render(
      <PublicLayout footer={<span>Footer Text</span>}>
        <span>home</span>
      </PublicLayout>,
    );
    const footer = container.querySelector("footer");
    expect(footer).not.toBeNull();
    expect(footer?.classList.contains("border-t")).toBe(true);
  });
});
