import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BlankLayout } from "@/components/layout/blank-layout"

describe("BlankLayout", () => {
  it("renders children inside the layout container", () => {
    render(
      <BlankLayout>
        <p>Hello world</p>
      </BlankLayout>,
    )
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("applies the blank-layout slot and padding by default", () => {
    const { container } = render(
      <BlankLayout>
        <span>content</span>
      </BlankLayout>,
    )
    const el = container.querySelector('[data-slot="blank-layout"]') as HTMLElement
    expect(el).toBeTruthy()
    expect(el.className).toContain("min-h-screen")
    expect(el.className).toContain("p-4")
  })

  it("centers content when centered is true", () => {
    const { container } = render(
      <BlankLayout centered>
        <span>centered</span>
      </BlankLayout>,
    )
    const el = container.querySelector('[data-slot="blank-layout"]') as HTMLElement
    expect(el.className).toContain("flex")
    expect(el.className).toContain("items-center")
    expect(el.className).toContain("justify-center")
  })

  it("omits the padding class when padded is false", () => {
    const { container } = render(
      <BlankLayout padded={false}>
        <span>edge-to-edge</span>
      </BlankLayout>,
    )
    const el = container.querySelector('[data-slot="blank-layout"]') as HTMLElement
    expect(el.className).not.toContain(" p-4")
  })

  it("merges custom className", () => {
    const { container } = render(
      <BlankLayout className="my-blank">
        <span>x</span>
      </BlankLayout>,
    )
    const el = container.querySelector('[data-slot="blank-layout"]') as HTMLElement
    expect(el.className).toContain("my-blank")
  })
})
