import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ErrorLayout } from "@chaos_team/chaos-ui/layout"

describe("ErrorLayout", () => {
  it("renders children inside the error container", () => {
    render(
      <ErrorLayout>
        <h1>Something went wrong</h1>
      </ErrorLayout>,
    )
    expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument()
  })

  it("applies the error-layout slot with centered flex layout", () => {
    const { container } = render(
      <ErrorLayout>
        <span>x</span>
      </ErrorLayout>,
    )
    const el = container.querySelector('[data-slot="error-layout"]') as HTMLElement
    expect(el).toBeTruthy()
    expect(el.className).toContain("min-h-screen")
    expect(el.className).toContain("flex")
    expect(el.className).toContain("items-center")
    expect(el.className).toContain("justify-center")
  })

  it("merges custom className", () => {
    const { container } = render(
      <ErrorLayout className="my-error">
        <span>x</span>
      </ErrorLayout>,
    )
    const el = container.querySelector('[data-slot="error-layout"]') as HTMLElement
    expect(el.className).toContain("my-error")
  })
})
