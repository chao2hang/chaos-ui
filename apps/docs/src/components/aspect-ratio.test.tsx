import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { AspectRatio } from "@chaos_team/chaos-ui/ui"

describe("AspectRatio", () => {
  it("renders a div with data-slot=aspect-ratio", () => {
    const { container } = render(
      <AspectRatio>
        <span>content</span>
      </AspectRatio>,
    )
    const el = container.querySelector('[data-slot="aspect-ratio"]')
    expect(el).toBeTruthy()
    expect(el?.tagName).toBe("DIV")
  })

  it("applies the default 16/9 ratio via inline style", () => {
    const { container } = render(<AspectRatio data-testid="ar" />)
    const el = container.querySelector('[data-slot="aspect-ratio"]') as HTMLElement
    expect(el).toBeTruthy()
    const inline = el.getAttribute("style") ?? ""
    expect(inline).toMatch(/aspect-ratio:\s*1\.777/)
  })

  it("honors the ratio prop and merges with className", () => {
    const { container } = render(
      <AspectRatio ratio={4 / 3} className="custom-class" />,
    )
    const el = container.querySelector('[data-slot="aspect-ratio"]') as HTMLElement
    const inline = el.getAttribute("style") ?? ""
    expect(inline).toMatch(/aspect-ratio:\s*1\.333/)
    expect(el.className).toContain("custom-class")
  })

  it("renders children inside the container", () => {
    const { container } = render(
      <AspectRatio>
        <p>hello world</p>
      </AspectRatio>,
    )
    expect(container.textContent).toContain("hello world")
  })
})
