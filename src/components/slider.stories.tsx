import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import {
  Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
} from "@/components/ui/slider"

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const Single = () => {
  const [value, setValue] = useState(35)
  return (
    <div className="w-full max-w-sm">
      <Slider value={value} onValueChange={(v) => setValue(v as number)}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>
      <p className="mt-3 text-xs text-muted-foreground">Value: {value}</p>
    </div>
  )
}

const Range = () => {
  const [value, setValue] = useState<readonly number[]>([20, 60])
  return (
    <div className="w-full max-w-sm">
      <Slider value={value} onValueChange={(v) => setValue(v as readonly number[])}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>
      <p className="mt-3 text-xs text-muted-foreground">Range: {value.join(" – ")}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => <Single />,
}

export const WithRange: Story = {
  name: "Range Slider",
  render: () => <Range />,
}

export const MinMaxStep: Story = {
  name: "Min / Max / Step",
  render: () => (
    <div className="w-full max-w-sm">
      <Slider defaultValue={50} min={0} max={200} step={10}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Slider defaultValue={50} disabled>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Single thumb</p>
        <Single />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Range</p>
        <Range />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Step 10 (0–200)</p>
        <Slider defaultValue={100} min={0} max={200} step={10}>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Disabled</p>
        <Slider defaultValue={50} disabled>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </div>
    </div>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark w-full max-w-sm">
      <Slider defaultValue={40}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>
    </div>
  ),
}
