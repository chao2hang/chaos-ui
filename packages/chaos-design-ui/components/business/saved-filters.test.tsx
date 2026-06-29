import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SavedFilters, type SavedFilter } from "./saved-filters"

const filters: SavedFilter[] = [
  { id: "1", name: "今日订单", filters: { date: "today" } },
  { id: "2", name: "重要客户", filters: { priority: "high" }, isPinned: true },
  { id: "3", name: "未支付", filters: { status: "unpaid" } },
]

describe("SavedFilters", () => {
  it("renders trigger button with default label", () => {
    render(<SavedFilters filters={filters} />)
    expect(screen.getByText("已保存的筛选")).toBeInTheDocument()
  })

  it("uses custom label", () => {
    render(<SavedFilters filters={filters} label="我的筛选" />)
    expect(screen.getByText("我的筛选")).toBeInTheDocument()
  })

  it("opens dropdown and shows filter names", async () => {
    const user = userEvent.setup()
    render(<SavedFilters filters={filters} />)
    await user.click(screen.getByRole("button", { name: /已保存的筛选/ }))
    expect(screen.getByText("今日订单")).toBeInTheDocument()
    expect(screen.getByText("重要客户")).toBeInTheDocument()
    expect(screen.getByText("未支付")).toBeInTheDocument()
  })

  it("calls onApply when a filter is selected", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<SavedFilters filters={filters} onApply={handle} />)
    await user.click(screen.getByRole("button", { name: /已保存的筛选/ }))
    await user.click(screen.getByText("今日订单"))
    expect(handle).toHaveBeenCalledWith("1")
  })

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<SavedFilters filters={filters} onDelete={handle} />)
    await user.click(screen.getByRole("button", { name: /已保存的筛选/ }))
    const deleteBtns = screen.getAllByRole("button", { name: "删除" })
    await user.click(deleteBtns[0])
    expect(handle).toHaveBeenCalledWith("1")
  })

  it("calls onPin when pin button is clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<SavedFilters filters={filters} onPin={handle} />)
    await user.click(screen.getByRole("button", { name: /已保存的筛选/ }))
    const pinBtns = screen.getAllByRole("button", { name: "固定" })
    await user.click(pinBtns[0])
    expect(handle).toHaveBeenCalledWith("1")
  })

  it("shows '应用' label on active filter", async () => {
    const user = userEvent.setup()
    render(<SavedFilters filters={filters} activeId="2" />)
    await user.click(screen.getByRole("button", { name: /已保存的筛选/ }))
    expect(screen.getByText("应用")).toBeInTheDocument()
  })

  it("shows empty message when no filters saved", async () => {
    const user = userEvent.setup()
    render(<SavedFilters filters={[]} />)
    await user.click(screen.getByRole("button", { name: /已保存的筛选/ }))
    expect(screen.getByText("暂无保存的筛选")).toBeInTheDocument()
  })

  it("opens save dialog and calls onSave with entered name", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<SavedFilters filters={filters} onSave={handle} />)
    await user.click(screen.getByRole("button", { name: "保存当前" }))
    const input = screen.getByPlaceholderText("筛选名称...")
    await user.type(input, "新的筛选")
    const saveBtn = screen.getByRole("button", { name: "保存" })
    await user.click(saveBtn)
    expect(handle).toHaveBeenCalledWith("新的筛选")
  })

  it("saves filter on Enter in save dialog", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<SavedFilters filters={filters} onSave={handle} />)
    await user.click(screen.getByRole("button", { name: "保存当前" }))
    const input = screen.getByPlaceholderText("筛选名称...")
    await user.type(input, "回车保存{enter}")
    expect(handle).toHaveBeenCalledWith("回车保存")
  })

  it("does not save when name is empty", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<SavedFilters filters={filters} onSave={handle} />)
    await user.click(screen.getByRole("button", { name: "保存当前" }))
    const saveBtn = screen.getByRole("button", { name: "保存" })
    expect(saveBtn).toBeDisabled()
    expect(handle).not.toHaveBeenCalled()
  })

  it("applies custom className", () => {
    const { container } = render(
      <SavedFilters filters={filters} className="custom-saved" />,
    )
    const root = container.querySelector('[data-slot="saved-filters"]')
    expect(root).toBeInTheDocument()
    expect(root?.className).toContain("custom-saved")
  })
})
