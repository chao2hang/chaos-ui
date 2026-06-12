import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Rating } from "./rating"

describe("Rating", () => {
  it("renders 5 radio buttons by default", () => {
    render(<Rating />)
    expect(screen.getAllByRole("radio")).toHaveLength(5)
  })

  it("renders custom max", () => {
    render(<Rating max={7} />)
    expect(screen.getAllByRole("radio")).toHaveLength(7)
  })

  it("calls onChange when a star is clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<Rating onChange={handle} />)
    const stars = screen.getAllByRole("radio")
    await user.click(stars[2])
    expect(handle).toHaveBeenCalledWith(3)
  })

  it("does not respond to click when readonly", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<Rating readonly onChange={handle} />)
    const stars = screen.getAllByRole("radio")
    await user.click(stars[2])
    expect(handle).not.toHaveBeenCalled()
    expect(stars[2]).toBeDisabled()
  })

  it("respects defaultValue", () => {
    render(<Rating defaultValue={4} />)
    const stars = screen.getAllByRole("radio")
    expect(stars[3].getAttribute("aria-checked")).toBe("true")
  })
})
