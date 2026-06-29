import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { MapView } from "./map-view"

describe("MapView", () => {
  it("renders container", () => {
    const { container } = render(<MapView />)
    expect(container.querySelector('[data-slot="map-view"]')).toBeTruthy()
  })

  it("renders with custom className", () => {
    const { container } = render(<MapView className="custom-map" />)
    expect(container.querySelector('[data-slot="map-view"]')?.className).toContain("custom-map")
  })

  it("applies custom height", () => {
    const { container } = render(<MapView height={600} />)
    expect(container.querySelector('[data-slot="map-view"]')?.getAttribute("style")).toContain("600")
  })
})
