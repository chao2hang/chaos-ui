import type { Meta, StoryObj } from "@storybook/react"
import { DepartmentBrowse, type Department } from "@/components/ui/department-browse"
import { useState } from "react"

const meta = {
  title: "Components/DepartmentBrowse",
  component: DepartmentBrowse,
  tags: ["autodocs"],
} satisfies Meta<typeof DepartmentBrowse>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Department | undefined>()
    return (
      <div className="w-[300px]">
        <DepartmentBrowse value={value} onChange={setValue} placeholder="Select department..." />
      </div>
    )
  },
}

export const WithDefault: Story = {
  args: {
    defaultValue: { id: "1-1", name: "Engineering", code: "ENG" },
  },
}

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<Department[]>([])
    return (
      <div className="w-[300px]">
        <DepartmentBrowse value={value} onChange={setValue} multiple placeholder="Select departments..." />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: { id: "1-1", name: "Engineering", code: "ENG" },
  },
}
