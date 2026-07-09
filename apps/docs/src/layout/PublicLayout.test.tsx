import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PublicLayout } from "@chaos_team/chaos-ui/layout";

describe("PublicLayout", () => {
  it("renders children inside the public-layout container", () => {
    render(
      <PublicLayout>
        <h1>Welcome</h1>
      </PublicLayout>,
    );
    expect(
      screen.getByRole("heading", { name: "Welcome" }),
    ).toBeInTheDocument();
  });

  it("uses 'Chaos UI' as the default logo", () => {
    render(
      <PublicLayout>
        <span>x</span>
      </PublicLayout>,
    );
    const header = screen.getByRole("banner");
    expect(within(header).getByText("Chaos UI")).toBeInTheDocument();
  });

  it("renders a custom logo when provided", () => {
    render(
      <PublicLayout logo={<span>Acme</span>}>
        <span>x</span>
      </PublicLayout>,
    );
    const header = screen.getByRole("banner");
    expect(within(header).getByText("Acme")).toBeInTheDocument();
    expect(within(header).queryByText("Chaos UI")).toBeNull();
  });

  it("renders nav links for each nav item", () => {
    render(
      <PublicLayout
        nav={[
          { label: "Product", href: "/product" },
          { label: "Pricing", href: "/pricing" },
        ]}
      >
        <span>x</span>
      </PublicLayout>,
    );
    const header = screen.getByRole("banner");
    expect(
      within(header).getByRole("link", { name: "Product" }),
    ).toHaveAttribute("href", "/product");
    expect(
      within(header).getByRole("link", { name: "Pricing" }),
    ).toHaveAttribute("href", "/pricing");
  });

  it("renders the footer slot when provided", () => {
    render(
      <PublicLayout footer={<p>© 2024 Acme</p>}>
        <span>x</span>
      </PublicLayout>,
    );
    expect(screen.getByText("© 2024 Acme")).toBeInTheDocument();
  });

  it("does not render a footer when none is provided", () => {
    const { container } = render(
      <PublicLayout>
        <span>x</span>
      </PublicLayout>,
    );
    expect(
      container.querySelector('[data-slot="public-layout"] > footer'),
    ).toBeNull();
  });

  it("applies the public-layout slot and merges custom className", () => {
    const { container } = render(
      <PublicLayout className="my-public">
        <span>x</span>
      </PublicLayout>,
    );
    const el = container.querySelector(
      '[data-slot="public-layout"]',
    ) as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.className).toContain("min-h-screen");
    expect(el.className).toContain("my-public");
  });
});
