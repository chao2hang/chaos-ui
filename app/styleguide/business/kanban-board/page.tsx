"use client"
import * as React from "react"
import { KanbanBoard } from "@/components/business/kanban-board"
import { Badge } from "@/components/ui/badge"

const initialColumns = [
  { id: "todo", title: "To Do", items: [
    { id: "1", title: "Design homepage", description: "Create wireframes and mockups" },
    { id: "2", title: "Set up CI/CD", description: "Configure GitHub Actions" },
    { id: "3", title: "Write unit tests", description: "Cover core business logic" },
  ]},
  { id: "progress", title: "In Progress", items: [
    { id: "4", title: "Build auth system", description: "OAuth2 + JWT implementation" },
    { id: "5", title: "API documentation", description: "OpenAPI spec for all endpoints" },
  ]},
  { id: "review", title: "Review", items: [
    { id: "6", title: "Database schema", description: "Review migration scripts" },
  ]},
  { id: "done", title: "Done", items: [
    { id: "7", title: "Project setup", description: "Next.js + Tailwind configuration" },
    { id: "8", title: "Component library", description: "Initial shadcn/ui setup" },
  ]},
]

export default function KanbanBoardPage() {
  const [columns, setColumns] = React.useState(initialColumns as { id: string; title: string; items: { id: string; title: string; description: string }[] }[])
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
      <p className="mt-2 text-muted-foreground">Drag-and-drop kanban board with columns and cards.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Interactive Board</h2>
        <KanbanBoard columns={columns} onColumnsChange={setColumns} />
      </section>
    </div>
  )
}
