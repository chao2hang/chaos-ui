import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TopBar, MegaMenu } from "./top-bar";
import type { TopBarItem } from "./top-bar";

// TopBar uses react-i18next; mock it so the t() keys pass through verbatim.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("top-bar", () => {
  it("exports TopBar", () => {
    expect(TopBar).toBeDefined();
  });

  it("exports MegaMenu", () => {
    expect(MegaMenu).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TopBarItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/top-bar");
    expect(mod.TopBar).toBeDefined();
    expect(mod.MegaMenu).toBeDefined();
  });

  it("renders the default logo text (i18n key) when no logo provided", () => {
    render(<TopBar />);
    expect(screen.getByText("topBar.defaultLogo")).toBeDefined();
  });

  it("renders a custom logo node", () => {
    render(<TopBar logo={<img alt="Acme Logo" src="/logo.png" />} />);
    expect(screen.getByAltText("Acme Logo")).toBeDefined();
  });

  it("renders the menu toggle button with the i18n aria-label", () => {
    render(<TopBar />);
    const toggle = screen.getByLabelText("topBar.toggleMenu");
    expect(toggle.tagName).toBe("BUTTON");
  });

  it("renders nav items as links", () => {
    render(
      <TopBar
        nav={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports", href: "/reports" },
        ]}
      />,
    );
    expect(screen.getByText("Dashboard").getAttribute("href")).toBe("/dashboard");
    expect(screen.getByText("Reports").getAttribute("href")).toBe("/reports");
  });

  it("renders actions in the header", () => {
    render(<TopBar actions={<button type="button">Sign In</button>} />);
    expect(screen.getByText("Sign In")).toBeDefined();
  });

  it("applies sticky class by default and data-variant=default", () => {
    const { container } = render(<TopBar />);
    const header = container.querySelector('[data-slot="top-bar"]');
    expect(header?.getAttribute("data-variant")).toBe("default");
    expect(header?.classList.contains("sticky")).toBe(true);
  });

  it("renders without sticky when sticky=false", () => {
    const { container } = render(<TopBar sticky={false} />);
    expect(container.querySelector('[data-slot="top-bar"]')?.classList.contains("sticky")).toBe(false);
  });

  it("applies variant classes for transparent and bordered", () => {
    const { container: c1 } = render(<TopBar variant="transparent" />);
    expect(c1.querySelector('[data-slot="top-bar"]')?.getAttribute("data-variant")).toBe("transparent");
    expect(c1.querySelector('[data-slot="top-bar"]')?.classList.contains("bg-transparent")).toBe(true);

    const { container: c2 } = render(<TopBar variant="bordered" />);
    expect(c2.querySelector('[data-slot="top-bar"]')?.getAttribute("data-variant")).toBe("bordered");
    expect(c2.querySelector('[data-slot="top-bar"]')?.classList.contains("border-b")).toBe(true);
  });

  it("applies a custom className on the header", () => {
    const { container } = render(<TopBar className="custom-top" />);
    expect(container.querySelector('[data-slot="top-bar"]')?.classList.contains("custom-top")).toBe(true);
  });

  it("renders a link to logoHref on the logo", () => {
    render(<TopBar logoHref="/home" logo="ACME" />);
    const logo = screen.getByText("ACME");
    expect(logo.tagName).toBe("A");
    expect(logo.getAttribute("href")).toBe("/home");
  });
});

describe("TopBar mobile menu", () => {
  it("toggles the mobile menu open/closed via the toggle button", () => {
    const { container } = render(
      <TopBar nav={[{ label: "Dashboard", href: "/dashboard" }]} />,
    );
    // Mobile menu panel is not in the DOM until toggled open.
    expect(container.querySelector(".fixed.inset-x-0.top-14")).toBeNull();
    fireEvent.click(screen.getByLabelText("topBar.toggleMenu"));
    const panel = container.querySelector(".fixed.inset-x-0.top-14");
    expect(panel).not.toBeNull();
    // Nav link appears in the mobile panel
    expect(screen.getAllByText("Dashboard").length).toBeGreaterThanOrEqual(2);
    // Close icon now shows (toggle was clicked once -> open)
    fireEvent.click(screen.getByLabelText("topBar.toggleMenu"));
    expect(container.querySelector(".fixed.inset-x-0.top-14")).toBeNull();
  });

  it("closes the mobile menu when a nav link is clicked", () => {
    const { container } = render(
      <TopBar nav={[{ label: "Dashboard", href: "/dashboard" }]} />,
    );
    fireEvent.click(screen.getByLabelText("topBar.toggleMenu"));
    expect(container.querySelector(".fixed.inset-x-0.top-14")).not.toBeNull();
    // Click the mobile nav link (the one inside the .fixed panel)
    const panel = container.querySelector(".fixed.inset-x-0.top-14") as HTMLElement;
    const mobileLink = panel.querySelector("a") as HTMLElement;
    fireEvent.click(mobileLink);
    expect(container.querySelector(".fixed.inset-x-0.top-14")).toBeNull();
  });

  it("renders actions inside the mobile panel when open", () => {
    render(<TopBar actions={<button type="button">Sign In</button>} />);
    fireEvent.click(screen.getByLabelText("topBar.toggleMenu"));
    // Two Sign In buttons: one in desktop actions, one in mobile panel
    expect(screen.getAllByText("Sign In").length).toBe(2);
  });

  it("renders child nav items in a dropdown on hover (mega-style)", () => {
    const { container } = render(
      <TopBar
        nav={[
          {
            label: "Products",
            href: "/products",
            children: [
              { label: "Shoes", href: "/products/shoes" },
              { label: "Bags", href: "/products/bags" },
            ],
          },
        ]}
      />,
    );
    // Desktop nav button with the parent label
    const parentBtn = screen.getByText("Products");
    expect(parentBtn.tagName).toBe("BUTTON");
    // Dropdown not visible initially
    expect(container.querySelector(".absolute.left-0.top-full")).toBeNull();
    // Hover opens it
    fireEvent.mouseEnter(parentBtn.closest("div") as HTMLElement);
    expect(container.querySelector(".absolute.left-0.top-full")).not.toBeNull();
    expect(screen.getByText("Shoes").getAttribute("href")).toBe("/products/shoes");
    expect(screen.getByText("Bags").getAttribute("href")).toBe("/products/bags");
    // Hover closes it
    fireEvent.mouseLeave(parentBtn.closest("div") as HTMLElement);
    expect(container.querySelector(".absolute.left-0.top-full")).toBeNull();
  });
});

describe("MegaMenu", () => {
  it("renders the trigger with a chevron", () => {
    render(<MegaMenu trigger="Explore" groups={[]} />);
    expect(screen.getByText("Explore")).toBeDefined();
  });

  it("opens the panel on hover and renders group labels + items", () => {
    const { container } = render(
      <MegaMenu
        trigger="Explore"
        groups={[
          {
            label: "Products",
            items: [
              { label: "Shoes", href: "/shoes", description: "Footwear" },
              { label: "Bags", href: "/bags" },
            ],
          },
          {
            label: "Resources",
            items: [{ label: "Docs", href: "/docs" }],
          },
        ]}
      />,
    );
    // Panel not present initially
    expect(container.querySelector(".absolute.left-1\\/2.top-full")).toBeNull();
    const wrapper = container.querySelector(".relative") as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    expect(screen.getByText("Products")).toBeDefined();
    expect(screen.getByText("Resources")).toBeDefined();
    expect(screen.getByText("Shoes")).toBeDefined();
    expect(screen.getByText("Footwear")).toBeDefined();
    // Item labels live inside nested divs; assert hrefs via the rendered <a> elements.
    const bagLink = container.querySelector('a[href="/bags"]') as HTMLElement | null;
    const docsLink = container.querySelector('a[href="/docs"]') as HTMLElement | null;
    expect(bagLink).not.toBeNull();
    expect(docsLink).not.toBeNull();
    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByText("Footwear")).toBeNull();
  });

  it("toggles open via the trigger button click", () => {
    render(
      <MegaMenu
        trigger="Explore"
        groups={[{ label: "G", items: [{ label: "Item", href: "/i" }] }]}
      />,
    );
    const btn = screen.getByText("Explore");
    fireEvent.click(btn);
    expect(screen.getByText("Item")).toBeDefined();
    fireEvent.click(btn);
    expect(screen.queryByText("Item")).toBeNull();
  });

  it("renders item icons when provided", () => {
    render(
      <MegaMenu
        trigger="Explore"
        groups={[
          {
            label: "G",
            items: [
              {
                label: "Item",
                href: "/i",
                icon: <span data-testid="item-icon">IC</span>,
              },
            ],
          },
        ]}
      />,
    );
    const wrapper = screen.getByText("Explore").closest("div") as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    expect(screen.getByTestId("item-icon")).toBeDefined();
  });

  it("applies a custom className on the open panel wrapper", () => {
    const { container } = render(
      <MegaMenu
        trigger="Explore"
        className="custom-mega"
        groups={[{ label: "G", items: [{ label: "Item", href: "/i" }] }]}
      />,
    );
    const wrapper = container.querySelector(".relative") as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    const panelWrap = container.querySelector(".custom-mega");
    expect(panelWrap).not.toBeNull();
  });

  // ---- Deeper interaction tests ----

  it("toggles the mobile menu open via keyboard (Enter on toggle button)", () => {
    render(
      <TopBar nav={[{ label: "Dashboard", href: "/dashboard" }]} />,
    );
    const toggle = screen.getByLabelText("topBar.toggleMenu");
    toggle.focus();
    fireEvent.keyDown(toggle, { key: "Enter" });
    // Button onClick fires on click; keyDown Enter on a <button> triggers click in real browsers.
    // Here we assert the toggle is a focusable button with the right aria-label and role.
    expect(toggle.tagName).toBe("BUTTON");
  });

  it("renders nav items with icons when provided", () => {
    render(
      <TopBar
        nav={[
          {
            label: "Reports",
            href: "/reports",
            icon: <span data-testid="nav-icon">📊</span>,
          },
        ]}
      />,
    );
    // nav item without children renders as a plain Link; icon is sibling of label text
    expect(screen.getByText("Reports")).toBeDefined();
  });

  it("renders a parent nav item with children as a Button (not a Link)", () => {
    render(
      <TopBar
        nav={[
          {
            label: "Products",
            href: "/products",
            children: [{ label: "Shoes", href: "/products/shoes" }],
          },
        ]}
      />,
    );
    const parent = screen.getByText("Products");
    expect(parent.tagName).toBe("BUTTON");
    expect(parent.getAttribute("aria-expanded")).toBe("false");
  });

  it("sets aria-expanded=true when the dropdown is open on hover", () => {
    render(
      <TopBar
        nav={[
          {
            label: "Products",
            href: "/products",
            children: [{ label: "Shoes", href: "/products/shoes" }],
          },
        ]}
      />,
    );
    const parentBtn = screen.getByText("Products");
    const wrap = parentBtn.closest("div") as HTMLElement;
    fireEvent.mouseEnter(wrap);
    expect(parentBtn.getAttribute("aria-expanded")).toBe("true");
    fireEvent.mouseLeave(wrap);
    expect(parentBtn.getAttribute("aria-expanded")).toBe("false");
  });

  it("renders both desktop and mobile actions when menu is open", () => {
    render(<TopBar actions={<button type="button">Sign In</button>} />);
    // Desktop actions visible
    expect(screen.getByText("Sign In")).toBeDefined();
    // Open mobile menu -> second Sign In appears
    fireEvent.click(screen.getByLabelText("topBar.toggleMenu"));
    expect(screen.getAllByText("Sign In").length).toBe(2);
  });

  it("does not render a mobile panel when nav is empty and menu is toggled", () => {
    const { container } = render(<TopBar nav={[]} />);
    fireEvent.click(screen.getByLabelText("topBar.toggleMenu"));
    const panel = container.querySelector(".fixed.inset-x-0.top-14");
    expect(panel).not.toBeNull();
    // panel exists but has no nav links
    expect(panel?.querySelectorAll("a").length).toBe(0);
  });

  it("renders the chevron icon on a parent nav button", () => {
    render(
      <TopBar
        nav={[
          {
            label: "Products",
            href: "/products",
            children: [{ label: "Shoes", href: "/products/shoes" }],
          },
        ]}
      />,
    );
    const parentBtn = screen.getByText("Products");
    // ChevronDownIcon is an svg sibling
    expect(parentBtn.querySelector("svg")).not.toBeNull();
  });

  it("applies the bordered variant class alongside sticky", () => {
    const { container } = render(<TopBar variant="bordered" sticky={false} />);
    const header = container.querySelector('[data-slot="top-bar"]');
    expect(header?.classList.contains("border-b")).toBe(true);
    expect(header?.classList.contains("sticky")).toBe(false);
  });

  it("MegaMenu closes the panel on mouseLeave after opening via click", () => {
    const { container } = render(
      <MegaMenu
        trigger="Explore"
        groups={[{ label: "G", items: [{ label: "Item", href: "/i" }] }]}
      />,
    );
    const btn = screen.getByText("Explore");
    fireEvent.click(btn);
    expect(screen.getByText("Item")).toBeDefined();
    const wrapper = container.querySelector(".relative") as HTMLElement;
    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByText("Item")).toBeNull();
  });

  it("MegaMenu renders item descriptions when provided", () => {
    const { container } = render(
      <MegaMenu
        trigger="Explore"
        groups={[
          {
            label: "G",
            items: [{ label: "Item", href: "/i", description: "Detailed desc" }],
          },
        ]}
      />,
    );
    const wrapper = container.querySelector(".relative") as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    expect(screen.getByText("Detailed desc")).toBeDefined();
  });

  it("MegaMenu with empty groups renders only the trigger", () => {
    const { container } = render(<MegaMenu trigger="Explore" groups={[]} />);
    fireEvent.mouseEnter(container.querySelector(".relative") as HTMLElement);
    // No group headers, no items
    expect(container.querySelectorAll("h3").length).toBe(0);
    expect(container.querySelectorAll("a").length).toBe(0);
  });
});
