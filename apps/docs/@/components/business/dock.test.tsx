import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Dock } from "./dock"
import { HomeIcon } from "lucide-react"

describe("Dock", () => {
  it("renders all item labels as aria-label", () => {
    render(
      <Dock
        items={[
          { key: "1", label: "首", icon: <HomeIcon /> },
          { key: "2", label: "尾", icon: <HomeIcon /> },
        ]}
      />,
    )
    expect(screen.getByLabelText("首")).toBeInTheDocument()
    expect(screen.getByLabelText("尾")).toBeInTheDocument()
  })

  it("calls onClick when an item is clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <Dock
        items={[
          { key: "1", label: "首", icon: <HomeIcon />, onClick: handle },
        ]}
      />,
    )
    await user.click(screen.getByLabelText("首"))
    expect(handle).toHaveBeenCalledTimes(1)
  })

  it("applies data-orientation attribute", () => {
    const { container } = render(
      <Dock
        orientation="vertical"
        items={[{ key: "1", label: "首", icon: <HomeIcon /> }]}
      />,
    )
    const dock = container.querySelector('[data-slot="dock"]')
    expect(dock?.getAttribute("data-orientation")).toBe("vertical")
  })

  it("renders badge when provided", () => {
    render(
      <Dock
        items={[
          { key: "1", label: "首", icon: <HomeIcon />, badge: 9 },
        ]}
      />,
    )
    expect(screen.getByText("9")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <Dock
        className="custom-dock"
        items={[{ key: "1", label: "首", icon: <HomeIcon /> }]}
      />,
    )
    expect(
      container.querySelector('[data-slot="dock"]')?.className,
    ).toContain("custom-dock")
  })

  it("applies active state with data-active attribute", () => {
    const { container } = render(
      <Dock
        items={[
          { key: "1", label: "首", icon: <HomeIcon />, active: true },
          { key: "2", label: "尾", icon: <HomeIcon />, active: false },
        ]}
      />,
    )
    const activeItem = container.querySelector('[data-active="true"]')
    expect(activeItem).toBeInTheDocument()
    expect(activeItem?.getAttribute("aria-label")).toBe("首")
  })

  it("renders active indicator dot for active items", () => {
    const { container } = render(
      <Dock
        items={[
          { key: "1", label: "首", icon: <HomeIcon />, active: true },
        ]}
      />,
    )
    expect(
      container.querySelector('[data-slot="dock-indicator"]'),
    ).toBeInTheDocument()
  })
})
