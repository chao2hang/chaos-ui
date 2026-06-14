import type { Meta, StoryObj } from "@storybook/react"
import { KanbanBoard } from "@/components/business/kanban-board"
import { useState } from "react"

const meta = {
  title: "Business/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof KanbanBoard>

export default meta
type Story = StoryObj

const initialColumns = [
  { id: "todo", title: "To Do", items: [{ id: "1", title: "Design homepage" }, { id: "2", title: "Write docs" }] },
  { id: "doing", title: "In Progress", items: [{ id: "3", title: "Build feature X" }] },
  { id: "done", title: "Done", items: [{ id: "4", title: "Fix bug Y" }] },
]

export const Default: Story = {
  render: () => {
    const [columns, setColumns] = useState(initialColumns)
    return <KanbanBoard columns={columns} onColumnsChange={setColumns} />
  },
}

export const Empty: Story = {
  args: {
    columns: [
      { id: "todo", title: "To Do", items: [] },
      { id: "doing", title: "In Progress", items: [] },
      { id: "done", title: "Done", items: [] },
    ],
  },
}

