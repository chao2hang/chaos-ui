import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Menubar } from "@chaos_team/chaos-ui/ui"

describe("Menubar", () => {
  it("renders the menubar with the menubar ARIA role", () => {
    const { container } = render(
      <Menubar>
        <span>File</span>
      </Menubar>,
    )
    const el = container.querySelector('[role="menubar"]')
    expect(el).toBeTruthy()
    expect(el).toBe(container.querySelector('[data-slot="menubar"]'))
  })

  it("forwards children and className", () => {
    const { container } = render(
      <Menubar className="custom-menubar">
        <span>Edit</span>
        <span>View</span>
      </Menubar>,
    )
    const el = container.querySelector('[data-slot="menubar"]') as HTMLElement
    expect(el.className).toContain("custom-menubar")
    expect(el.children.length).toBe(2)
    expect(el.textContent).toContain("Edit")
  })

  it("forwards disabled and orientation props without crashing", () => {
    const { container } = render(
      <Menubar disabled orientation="vertical">
        <span>File</span>
      </Menubar>,
    )
    const el = container.querySelector('[data-slot="menubar"]') as HTMLElement
    expect(el).toBeTruthy()
    expect(el.getAttribute("aria-orientation")).toBe("vertical")
  })
})
