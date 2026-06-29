import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ThemeToggle } from "./theme-toggle"

describe("ThemeToggle", () => {
  it("renders trigger button", () => {
    render(<ThemeToggle />)
    const btn = screen.getByLabelText("Toggle theme")
    expect(btn).toBeInTheDocument()
  })

  it("opens menu and shows all 3 options", async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    await user.click(screen.getByLabelText("Toggle theme"))
    expect(await screen.findByText("浅色")).toBeInTheDocument()
    expect(await screen.findByText("跟随系统")).toBeInTheDocument()
    expect(await screen.findByText("深色")).toBeInTheDocument()
  })

  it("hides system option when showSystem is false", async () => {
    const user = userEvent.setup()
    render(<ThemeToggle showSystem={false} />)
    await user.click(screen.getByLabelText("Toggle theme"))
    expect(await screen.findByText("浅色")).toBeInTheDocument()
    expect(screen.queryByText("跟随系统")).not.toBeInTheDocument()
    expect(await screen.findByText("深色")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<ThemeToggle className="custom-theme" />)
    const btn = screen.getByLabelText("Toggle theme")
    expect(btn.className).toContain("custom-theme")
  })
})
