import { StatusTag, statusConfig } from "@/components/business/status-tag"
import type { Status } from "@/components/business/status-tag"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const statuses = Object.keys(statusConfig) as Status[]

export default function StatusTagPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">StatusTag</h1>
      <p className="mt-2 text-muted-foreground">
        A reusable status tag for order statuses with distinct color mappings.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Default Size</h2>
        <Card>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {statuses.map((status) => (
                <div key={status} className="flex flex-col items-center gap-2">
                  <StatusTag status={status} />
                  <span className="text-xs text-muted-foreground">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Small Size</h2>
        <Card>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {statuses.map((status) => (
                <div key={status} className="flex flex-col items-center gap-2">
                  <StatusTag status={status} size="sm" />
                  <span className="text-xs text-muted-foreground">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Color Mapping</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {statuses.map((status) => {
            const config = statusConfig[status]
            return (
              <Card key={status}>
                <CardHeader>
                  <CardTitle className="text-sm capitalize">{status}</CardTitle>
                  <CardDescription>{config.className}</CardDescription>
                </CardHeader>
                <CardContent>
                  <StatusTag status={status} />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Unknown Status Fallback</h2>
        <Card>
          <CardContent>
            <StatusTag status="unknown" />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
