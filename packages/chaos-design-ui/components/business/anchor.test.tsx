import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Anchor } from "./anchor"

describe("Anchor", () => {
  it("renders all section labels", () => {
    render(
      <Anchor
        sections={[
          { id: "a", label: "A" },
          { id: "b", label: "B" },
        ]}
      />,
    )
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
  })

  it("applies data-slot attribute", () => {
    const { container } = render(
      <Anchor sections={[{ id: "a", label: "A" }]} />,
    )
    expect(container.querySelector('[data-slot="anchor"]')).toBeInTheDocument()
  })

  it("renders anchor links with correct href", () => {
    render(
      <Anchor
        sections={[
          { id: "section-1", label: "One" },
          { id: "section-2", label: "Two" },
        ]}
      />,
    )
    const link = screen.getByText("One").closest("a")
    expect(link?.getAttribute("href")).toBe("#section-1")
  })

  it("applies custom className", () => {
    const { container } = render(
      <Anchor
        sections={[{ id: "a", label: "A" }]}
        className="custom-anchor"
      />,
    )
    const nav = container.querySelector('[data-slot="anchor"]')
    expect(nav?.className).toContain("custom-anchor")
  })
})
