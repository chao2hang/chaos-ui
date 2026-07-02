import type { Meta, StoryObj } from "@storybook/react"
import { UnitConverter } from "@/components/business/unit-converter"
import type { UnitCategory } from "@/components/business/unit-converter"

const meta = {
  title: "Business/UnitConverter",
  component: UnitConverter,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof UnitConverter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Compact: Story = {
  args: {
    compact: true,
  },
}

const customCategories: UnitCategory[] = [
  {
    id: "speed",
    name: "Speed",
    units: [
      { id: "mps", name: "Meters per second", abbr: "m/s", toBase: 1, fromBase: 1 },
      { id: "kph", name: "Kilometers per hour", abbr: "km/h", toBase: 1 / 3.6, fromBase: 3.6 },
      { id: "mph", name: "Miles per hour", abbr: "mph", toBase: 0.44704, fromBase: 1 / 0.44704 },
      { id: "knot", name: "Knot", abbr: "kn", toBase: 0.514444, fromBase: 1 / 0.514444 },
    ],
  },
  {
    id: "data",
    name: "Digital Storage",
    units: [
      { id: "b", name: "Byte", abbr: "B", toBase: 1, fromBase: 1 },
      { id: "kb", name: "Kilobyte", abbr: "KB", toBase: 1024, fromBase: 1 / 1024 },
      { id: "mb", name: "Megabyte", abbr: "MB", toBase: 1048576, fromBase: 1 / 1048576 },
      { id: "gb", name: "Gigabyte", abbr: "GB", toBase: 1073741824, fromBase: 1 / 1073741824 },
    ],
  },
]

export const CustomCategories: Story = {
  args: {
    categories: customCategories,
    defaultCategory: "speed",
  },
}

export const Dark: Story = {
  args: {},
  parameters: { backgrounds: { default: "dark" } },
}
