import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BulkActionsToolbar } from "./bulk-actions-toolbar"

describe("BulkActionsToolbar", () => {
  it("does not render when no items selected", () => {
    const { container } = render(
      <BulkActionsToolbar
        count={5}
        selectedCount={0}
        actions={[{ label: "Action", onClick: () => {} }]}
      />,
    )
    expect(container.querySelector('[data-slot="bulk-actions-toolbar"]')).toBeNull()
  })

  it("renders count and label", () => {
    render(
      <BulkActionsToolbar
        count={10}
        selectedCount={3}
        actions={[{ label: "Action", onClick: () => {} }]}
      />,
    )
    expect(screen.getByText("已选择")).toBeInTheDocument()
    expect(screen.getByText("3 / 10")).toBeInTheDocument()
  })

  it("calls action onClick when button clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <BulkActionsToolbar
        count={5}
        selectedCount={1}
        actions={[{ label: "删除", onClick: handle }]}
      />,
    )
    await user.click(screen.getByText("删除"))
    expect(handle).toHaveBeenCalledTimes(1)
  })

  it("triggers onClear when close button clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <BulkActionsToolbar
        count={5}
        selectedCount={2}
        onClear={handle}
        actions={[]}
      />,
    )
    await user.click(screen.getByLabelText("清除选择"))
    expect(handle).toHaveBeenCalledTimes(1)
  })

  it("applies custom className", () => {
    const { container } = render(
      <BulkActionsToolbar
        count={5}
        selectedCount={1}
        className="custom-bulk"
        actions={[]}
      />,
    )
    expect(
      container.querySelector('[data-slot="bulk-actions-toolbar"]')?.className,
    ).toContain("custom-bulk")
  })
})
