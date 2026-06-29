import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { FormRepeater } from "./form-repeater"

interface Item {
  name: string
}

describe("FormRepeater", () => {
  it("renders initial items", () => {
    render(
      <FormRepeater<Item>
        value={[{ name: "a" }]}
        onChange={() => {}}
        defaultItem={() => ({ name: "" })}
        renderItem={(item) => <div data-testid="row">{item.name}</div>}
      />
    )
    expect(screen.getAllByTestId("row")).toHaveLength(1)
    expect(screen.getByText("a")).toBeInTheDocument()
  })

  it("adds new item when add button clicked", () => {
    const onChange = vi.fn()
    render(
      <FormRepeater<Item>
        value={[{ name: "a" }]}
        onChange={onChange}
        defaultItem={() => ({ name: "new" })}
        renderItem={(item) => <span>{item.name}</span>}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: /添加/ }))
    expect(onChange).toHaveBeenCalled()
  })

  it("removes item when X clicked", () => {
    const onChange = vi.fn()
    render(
      <FormRepeater<Item>
        value={[{ name: "a" }, { name: "b" }]}
        onChange={onChange}
        defaultItem={() => ({ name: "" })}
        renderItem={(item) => <span>{item.name}</span>}
      />
    )
    fireEvent.click(screen.getAllByLabelText("删除")[0])
    expect(onChange).toHaveBeenCalled()
  })

  it("respects min count", () => {
    const onChange = vi.fn()
    render(
      <FormRepeater<Item>
        value={[{ name: "only" }]}
        onChange={onChange}
        defaultItem={() => ({ name: "" })}
        min={1}
        renderItem={(item) => <span>{item.name}</span>}
      />
    )
    const removeBtn = screen.getByLabelText("删除")
    expect(removeBtn).toBeDisabled()
    fireEvent.click(removeBtn)
    expect(onChange).not.toHaveBeenCalled()
  })

  it("respects max count", () => {
    const onChange = vi.fn()
    render(
      <FormRepeater<Item>
        value={[{ name: "a" }]}
        onChange={onChange}
        defaultItem={() => ({ name: "" })}
        max={1}
        renderItem={(item) => <span>{item.name}</span>}
      />
    )
    const addBtn = screen.getByRole("button", { name: /添加/ })
    expect(addBtn).toBeDisabled()
  })
})
