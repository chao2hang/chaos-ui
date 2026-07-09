import type { Meta, StoryObj } from "@storybook/react"
import { FilterBuilder } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof FilterBuilder> = {
  title: "Business/FilterBuilder",
  component: FilterBuilder,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

const fields = [
  { key: "name", label: "Name", type: "string" as const },
  { key: "status", label: "Status", type: "select" as const, options: [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ]},
  { key: "age", label: "Age", type: "number" as const },
  { key: "createdAt", label: "Created At", type: "date" as const },
]

export const Default: Story = {
  args: { fields },
}
