import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Transfer } from "./transfer"

const dataSource = [
  { key: "1", label: "选项 1" },
  { key: "2", label: "选项 2" },
  { key: "3", label: "选项 3" },
]

describe("Transfer", () => {
  it("renders all source items in left panel", () => {
    render(<Transfer dataSource={dataSource} targetKeys={["1"]} />)
    expect(screen.getByText("选项 1")).toBeInTheDocument()
    expect(screen.getByText("选项 2")).toBeInTheDocument()
    expect(screen.getByText("选项 3")).toBeInTheDocument()
  })

  it("shows custom titles", () => {
    render(
      <Transfer
        dataSource={dataSource}
        titles={["源", "目标"]}
      />,
    )
    expect(screen.getByText("源")).toBeInTheDocument()
    expect(screen.getByText("目标")).toBeInTheDocument()
  })

  it("moves selected items to target on click", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <Transfer
        dataSource={dataSource}
        targetKeys={[]}
        onChange={handle}
      />,
    )
    await user.click(screen.getByText("选项 1"))
    await user.click(screen.getByLabelText("添加到目标"))
    expect(handle).toHaveBeenCalledWith(["1"])
  })

  it("applies custom className", () => {
    const { container } = render(
      <Transfer
        dataSource={dataSource}
        className="custom-transfer"
      />,
    )
    expect(
      container.querySelector('[data-slot="transfer"]')?.className,
    ).toContain("custom-transfer")
  })
})
