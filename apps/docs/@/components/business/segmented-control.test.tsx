import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SegmentedControl } from "./segmented-control"

describe("SegmentedControl", () => {
  it("renders options as buttons", () => {
    render(
      <SegmentedControl
        defaultValue="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
      />,
    )
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
  })

  it("calls onChange when value changes", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <SegmentedControl
        defaultValue="a"
        onChange={handle}
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
      />,
    )
    await user.click(screen.getByText("B"))
    expect(handle).toHaveBeenCalledWith("b")
  })

  it("does not fire onChange for disabled option", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <SegmentedControl
        defaultValue="a"
        onChange={handle}
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B", disabled: true },
        ]}
      />,
    )
    await user.click(screen.getByText("B"))
    expect(handle).not.toHaveBeenCalled()
  })

  it("applies data-slot attribute", () => {
    const { container } = render(
      <SegmentedControl
        defaultValue="a"
        options={[{ value: "a", label: "A" }]}
      />,
    )
    expect(container.querySelector('[data-slot="segmented-control"]')).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <SegmentedControl
        defaultValue="a"
        className="custom-seg"
        options={[{ value: "a", label: "A" }]}
      />,
    )
    expect(
      container.querySelector('[data-slot="segmented-control"]')?.className,
    ).toContain("custom-seg")
  })
})
