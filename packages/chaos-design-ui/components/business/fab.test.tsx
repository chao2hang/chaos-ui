import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Fab, FabSpeedDial, BackTop } from "./fab"
import { PlusIcon } from "lucide-react"

describe("Fab", () => {
  it("renders icon and label", () => {
    render(<Fab icon={<PlusIcon aria-label="plus" />} label="新建" />)
    expect(screen.getByText("新建")).toBeInTheDocument()
  })

  it("applies data-slot attribute", () => {
    const { container } = render(<Fab icon={<PlusIcon />} />)
    expect(container.querySelector('[data-slot="fab"]')).toBeInTheDocument()
  })

  it("calls onClick handler", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<Fab icon={<PlusIcon />} onClick={handle} />)
    await user.click(screen.getByRole("button"))
    expect(handle).toHaveBeenCalledTimes(1)
  })
})

describe("FabSpeedDial", () => {
  it("expands actions on click", async () => {
    const user = userEvent.setup()
    render(
      <FabSpeedDial
        icon={<PlusIcon aria-label="plus" />}
        actions={[{ label: "动作 A", icon: <PlusIcon /> }]}
      />,
    )
    expect(screen.queryByText("动作 A")).not.toBeInTheDocument()
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("动作 A")).toBeInTheDocument()
  })
})

describe("BackTop", () => {
  it("does not render when scroll below threshold", () => {
    const { container } = render(<BackTop threshold={9999} />)
    expect(container.querySelector('[data-slot="back-top"]')).toBeNull()
  })

  it("renders after scroll passes threshold", () => {
    const { container } = render(<BackTop threshold={0} />)
    expect(container.querySelector('[data-slot="back-top"]')).toBeInTheDocument()
  })
})
