import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { LanguageSwitcher } from "./language-switcher"

describe("LanguageSwitcher", () => {
  it("renders the current language label", () => {
    render(<LanguageSwitcher value="en-US" />)
    expect(screen.getByText("English")).toBeInTheDocument()
  })

  it("opens dropdown and shows options", async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher value="zh-CN" />)
    await user.click(screen.getByRole("button"))
    expect(await screen.findByText("Japanese")).toBeInTheDocument()
    expect(await screen.findByText("Korean")).toBeInTheDocument()
  })

  it("calls onChange with the selected code", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<LanguageSwitcher value="zh-CN" onChange={handle} />)
    await user.click(screen.getByRole("button"))
    await user.click(await screen.findByText("Japanese"))
    expect(handle).toHaveBeenCalledWith("ja-JP")
  })

  it("uses custom options list", () => {
    render(
      <LanguageSwitcher
        value="fr"
        options={[
          { code: "fr", label: "French", nativeLabel: "Français" },
        ]}
      />,
    )
    expect(screen.getByText("Français")).toBeInTheDocument()
  })
})
