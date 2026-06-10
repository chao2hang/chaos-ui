"use client"
import * as React from "react"
import { PageHeader } from "@/components/business/page-header"
import { KanbanBoard } from "@/components/business/kanban-board"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

const initial = [
  { id: "backlog", title: "Backlog", items: [
    { id: "1", title: "Research competitors", description: "Analyze top 5 competitors" },
    { id: "2", title: "User interviews", description: "Schedule 5 user interviews" },
  ]},
  { id: "todo", title: "To Do", items: [
    { id: "3", title: "Design system audit", description: "Review all component variants" },
    { id: "4", title: "API rate limiting", description: "Implement rate limiter middleware" },
  ]},
  { id: "doing", title: "In Progress", items: [
    { id: "5", title: "Dashboard redesign", description: "New layout with KPI cards" },
  ]},
  { id: "done", title: "Done", items: [
    { id: "6", title: "CI/CD pipeline", description: "GitHub Actions configured" },
    { id: "7", title: "Auth system", description: "OAuth2 + JWT implemented" },
  ]},
]

export default function KanbanPatternPage() {
  const [columns, setColumns] = React.useState(initial as { id: string; title: string; items: { id: string; title: string; description: string }[] }[])
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Kanban Pattern</h1>
      <p className="mt-2 text-muted-foreground">Full kanban page with header, filters, and board.</p>
      <section className="mt-8">
        <PageHeader title="Project Board" description="Manage your project tasks across stages." actions={<Button size="sm"><PlusIcon className="size-4 mr-1" />Add Task</Button>} />
        <div className="mt-6"><KanbanBoard columns={columns} onColumnsChange={setColumns} /></div>
      </section>
    </div>
  )
}
