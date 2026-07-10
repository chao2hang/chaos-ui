import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  MobileBottomNav,
  type MobileNavItem,
} from "@/components/mobile/mobile-bottom-nav";

// Mock react-i18next
vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  };
});

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const items: MobileNavItem[] = [
  {
    label: "Home",
    href: "/home",
    icon: <span data-testid="icon-home">H</span>,
    active: true,
  },
  {
    label: "Search",
    href: "/search",
    icon: <span data-testid="icon-search">S</span>,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <span data-testid="icon-profile">P</span>,
    badge: 3,
  },
];

describe("MobileBottomNav", () => {
  it("is exported and types are importable", () => {
    expect(MobileBottomNav).toBeDefined();
    type P = React.ComponentProps<typeof MobileBottomNav>;
    const _p: P = { items: [] };
    expect(_p.items).toEqual([]);
    const _i: MobileNavItem = { label: "A", href: "/a", icon: <span /> };
    expect(_i.href).toBe("/a");
  });

  it("renders all nav items", () => {
    render(<MobileBottomNav items={items} />);
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Search")).toBeDefined();
    expect(screen.getByText("Profile")).toBeDefined();
  });

  it("renders nav element with data-slot", () => {
    const { container } = render(<MobileBottomNav items={items} />);
    const nav = container.querySelector("[data-slot='mobile-bottom-nav']");
    expect(nav).not.toBeNull();
  });

  it("renders badge when provided and non-zero", () => {
    render(<MobileBottomNav items={items} />);
    expect(screen.getByText("3")).toBeDefined();
  });

  it("does not render badge when undefined", () => {
    render(<MobileBottomNav items={items} />);
    // Home item has no badge, Search item has no badge
    const badges = screen.queryAllByText("0");
    expect(badges.length).toBe(0);
  });

  it("does not render badge when badge is 0", () => {
    const itemsWithZeroBadge: MobileNavItem[] = [
      { label: "Home", href: "/home", icon: <span>H</span>, badge: 0 },
    ];
    render(<MobileBottomNav items={itemsWithZeroBadge} />);
    // badge is 0, should not render
    const badge = screen.queryByText("0");
    expect(badge).toBeNull();
  });

  it("renders links when no onChange handler", () => {
    render(<MobileBottomNav items={items} />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);
  });

  it("renders buttons when onChange handler is provided", () => {
    const handleChange = vi.fn();
    render(<MobileBottomNav items={items} onChange={handleChange} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(3);
  });

  it("calls onChange with href when button is clicked", () => {
    const handleChange = vi.fn();
    render(<MobileBottomNav items={items} onChange={handleChange} />);
    fireEvent.click(screen.getByText("Search"));
    expect(handleChange).toHaveBeenCalledWith("/search");
  });

  it("applies floating variant class", () => {
    const { container } = render(
      <MobileBottomNav items={items} variant="floating" />,
    );
    const nav = container.querySelector("[data-slot='mobile-bottom-nav']")!;
    expect(nav.className).toContain("rounded-2xl");
  });

  it("applies default variant class", () => {
    const { container } = render(<MobileBottomNav items={items} />);
    const nav = container.querySelector("[data-slot='mobile-bottom-nav']")!;
    expect(nav.className).not.toContain("rounded-2xl");
  });

  it("applies custom className", () => {
    const { container } = render(
      <MobileBottomNav items={items} className="my-nav" />,
    );
    const nav = container.querySelector("[data-slot='mobile-bottom-nav']")!;
    expect(nav.className).toContain("my-nav");
  });

  it("sets aria-current=page for active items", () => {
    render(<MobileBottomNav items={items} />);
    const activeLink = screen.getByText("Home").closest("a, button");
    expect(activeLink?.getAttribute("aria-current")).toBe("page");
  });

  it("does not set aria-current for inactive items", () => {
    render(<MobileBottomNav items={items} />);
    const inactiveLink = screen.getByText("Search").closest("a, button");
    expect(inactiveLink?.getAttribute("aria-current")).toBeNull();
  });

  it("renders string badge", () => {
    const itemsWithStringBadge: MobileNavItem[] = [
      { label: "Alerts", href: "/alerts", icon: <span>A</span>, badge: "new" },
    ];
    render(<MobileBottomNav items={itemsWithStringBadge} />);
    expect(screen.getByText("new")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-bottom-nav");
    expect(mod.MobileBottomNav).toBeDefined();
  });
});
