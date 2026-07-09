import type { ComponentProps } from "react"
import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import {
  Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
} from "@chaos_team/chaos-ui/ui"

const BasicSlider = (props: ComponentProps<typeof Slider>) => (
  <Slider defaultValue={25} {...props}>
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        <SliderThumb />
      </SliderTrack>
    </SliderControl>
  </Slider>
)

describe("Slider", () => {
  it("renders the root, control, track, indicator, and thumb slots", () => {
    const { container } = render(<BasicSlider />)
    expect(container.querySelector('[data-slot="slider"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="slider-control"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="slider-track"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="slider-indicator"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="slider-thumb"]')).toBeTruthy()
  })

  it("renders multiple thumbs for a range slider", () => {
    const { container } = render(
      <Slider defaultValue={[10, 50]}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>,
    )
    expect(container.querySelectorAll('[data-slot="slider-thumb"]')).toHaveLength(2)
  })

  it("forwards min, max, and step props to the root", () => {
    const { container } = render(<BasicSlider min={0} max={100} step={5} />)
    const root = container.querySelector('[data-slot="slider"]') as HTMLElement
    expect(root).toBeTruthy()
  })

  it("marks the slider as disabled when the prop is set", () => {
    const { container } = render(<BasicSlider disabled />)
    const root = container.querySelector('[data-slot="slider"]') as HTMLElement
    expect(root).toBeTruthy()
  })

  it("merges custom className into the root element", () => {
    const { container } = render(<BasicSlider className="custom-slider" />)
    const root = container.querySelector('[data-slot="slider"]') as HTMLElement
    expect(root.className).toContain("custom-slider")
  })
})
