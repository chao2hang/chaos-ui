import type { Meta, StoryObj } from "@storybook/react"
import { BillTodoList } from "@/components/business/bill-todo-list"

const meta: Meta<typeof BillTodoList> = {
  title: "Business/BillTodoList",
  component: BillTodoList,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
