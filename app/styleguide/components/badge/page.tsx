import { Badge } from "@/components/ui/badge"
import { Check, X, AlertCircle, Info, Clock } from "lucide-react"

export default function BadgePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Badge</h1>
      <p className="mt-2 text-muted-foreground">
        Small label component for status indicators, categories, and metadata.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="link">Link</Badge>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Icons</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>
            <Check />
            Success
          </Badge>
          <Badge variant="destructive">
            <X />
            Failed
          </Badge>
          <Badge variant="secondary">
            <Clock />
            Pending
          </Badge>
          <Badge variant="outline">
            <Info />
            Info
          </Badge>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Status Indicators</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge><span className="size-1.5 rounded-full bg-primary-foreground" /> Active</Badge>
          <Badge variant="secondary"><span className="size-1.5 rounded-full bg-secondary-foreground" /> Idle</Badge>
          <Badge variant="destructive"><span className="size-1.5 rounded-full bg-destructive" /> Error</Badge>
          <Badge variant="outline"><span className="size-1.5 rounded-full bg-muted-foreground" /> Offline</Badge>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Numeric Badges</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>1</Badge>
          <Badge variant="secondary">12</Badge>
          <Badge variant="destructive">99+</Badge>
          <Badge variant="outline">3</Badge>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Use Cases</h2>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Tags</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="outline">Next.js</Badge>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Status</p>
            <div className="flex flex-wrap gap-2">
              <Badge><Check /> Approved</Badge>
              <Badge variant="secondary"><Clock /> In Review</Badge>
              <Badge variant="destructive"><AlertCircle /> Rejected</Badge>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Priority</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="destructive">Critical</Badge>
              <Badge>High</Badge>
              <Badge variant="secondary">Medium</Badge>
              <Badge variant="outline">Low</Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
