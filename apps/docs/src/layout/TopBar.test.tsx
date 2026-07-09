import { describe, it, expect } from "vitest"
import { render, screen, within, fireEvent } from "@testing-library/react"
import { TopBar } from "@chaos_team/chaos-ui/layout"

describe("TopBar", () => {
  it("renders the default logo and the top-bar slot", () => {
    render(
      <TopBar>
        <span>x</span>
      </TopBar>,
    )
    const header = screen.getByRole("banner")
    expect(within(header).getByText("Chaos UI")).toBeInTheDocument()
    expect(header.getAttribute("data-slot")).toBe("top-bar")
  })

  it("renders a custom logo and forwards logoHref", () => {
    render(
      <TopBar logo={<span>Acme</span>} logoHref="/home">
        <span>x</span>
      </TopBar>,
    )
    const header = screen.getByRole("banner")
    const link = within(header).getByRole("link", { name: "Acme" })
    expect(link).toHaveAttribute("href", "/home")
  })

  it("renders a nav link for each nav item", () => {
    render(
      <TopBar
        nav={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
        ]}
      >
        <span>x</span>
      </TopBar>,
    )
    const header = screen.getByRole("banner")
    expect(within(header).getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard")
    expect(within(header).getByRole("link", { name: "Settings" })).toHaveAttribute("href", "/settings")
  })

  it("renders the actions slot in the right-hand region", () => {
    render(
      <TopBar actions={<button type="button">My account</button>}>
        <span>x</span>
      </TopBar>,
    )
    expect(screen.getByRole("button", { name: "My account" })).toBeInTheDocument()
  })

  it("applies the bordered variant class", () => {
    render(
      <TopBar variant="bordered">
        <span>x</span>
      </TopBar>,
    )
    const header = screen.getByRole("banner")
    expect(header.getAttribute("data-variant")).toBe("bordered")
    expect(header.className).toContain("border-b")
  })

  it("omits sticky positioning when sticky is false", () => {
    render(
      <TopBar sticky={false}>
        <span>x</span>
      </TopBar>,
    )
    const header = screen.getByRole("banner")
    expect(header.className).not.toContain("sticky")
  })

  it("toggles the mobile menu on button click and closes it via the link", () => {
    render(
      <TopBar
        nav={[
          { label: "Home", href: "/home" },
          { label: "About", href: "/about" },
        ]}
      >
        <span>x</span>
      </TopBar>,
    )
    const toggle = screen.getByRole("button", { name: "切换菜单" })

    fireEvent.click(toggle)
    const homeLink = screen.getAllByRole("link", { name: "Home" })[0]
    expect(homeLink).toBeInTheDocument()

    fireEvent.click(homeLink)
    expect(screen.getByRole("button", { name: "切换菜单" })).toBeInTheDocument()
  })
})
