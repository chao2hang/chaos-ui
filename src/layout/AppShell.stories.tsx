import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AppShell } from "@/components/layout/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { BellIcon, FactoryIcon, PackageIcon, TruckIcon } from "lucide-react"

const meta = {
  title: "Layouts/AppShell",
  component: AppShell,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const OperationsConsole: Story = {
  render: () => (
    <AppShell
      variant="sticky"
      header={
        <div className="flex w-full items-center justify-between px-4">
          <div>
            <p className="text-sm font-semibold">QXY Foods Command Center</p>
            <p className="text-xs text-muted-foreground">Live production and logistics status</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">ERP connected</Badge>
            <Button variant="outline" size="sm">
              <BellIcon className="mr-1 size-4" />
              Alerts
            </Button>
          </div>
        </div>
      }
      sidebar={
        <nav className="space-y-1 p-3">
          {[
            { label: "Production", icon: FactoryIcon, active: true },
            { label: "Inventory", icon: PackageIcon },
            { label: "Dispatch", icon: TruckIcon },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className={
                item.active
                  ? "flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                  : "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </a>
          ))}
        </nav>
      }
      aside={
        <div className="space-y-4 p-4">
          <div>
            <p className="text-sm font-medium">Shift Capacity</p>
            <p className="text-xs text-muted-foreground">Batch line utilization</p>
          </div>
          <Progress value={74} />
          <Separator />
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Cold chain docks</span>
              <Badge variant="outline">6 active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Late purchase orders</span>
              <Badge variant="destructive">3</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Quality holds</span>
              <Badge variant="secondary">1 review</Badge>
            </div>
          </div>
        </div>
      }
      footer="Last synchronized 2 minutes ago - Asia/Shanghai"
    >
      <div className="space-y-4 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Open orders", "1,248", "+8.2% from yesterday"],
            ["Cases packed", "42,680", "94% of shift target"],
            ["Dispatch accuracy", "99.4%", "12 routes completed"],
          ].map(([label, value, description]) => (
            <Card key={label}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Production Exceptions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {["Line 2 allergen washdown", "Supplier ASN mismatch", "Route CN-07 delayed"].map((item) => (
              <div key={item} className="rounded-lg border p-3">
                <p className="text-sm font-medium">{item}</p>
                <p className="text-xs text-muted-foreground">Owner assigned - SLA tracked</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  ),
}

export const FloatingWorkspace: Story = {
  render: () => (
    <AppShell
      variant="floating"
      sidebarWidth={220}
      asideWidth={320}
      header={
        <div className="flex w-full items-center justify-between px-4">
          <p className="font-semibold">Vendor Compliance Review</p>
          <Button size="sm">Approve Batch</Button>
        </div>
      }
      sidebar={
        <div className="space-y-3 p-4">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Workflow</p>
          {["Document intake", "Risk scoring", "Finance approval", "Release"].map((step, index) => (
            <div key={step} className="flex items-center gap-3 rounded-md border p-2 text-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs">
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      }
      aside={
        <div className="space-y-3 p-4">
          <p className="text-sm font-medium">Review Notes</p>
          <p className="text-sm text-muted-foreground">
            Procurement flagged a pricing variance for frozen vegetable SKUs. Finance needs margin
            confirmation before release.
          </p>
        </div>
      }
    >
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Supplier: East Harbor Foods</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {["Contract", "Insurance", "Food safety certificate", "Banking details"].map((item) => (
              <div key={item} className="rounded-lg border p-4">
                <p className="font-medium">{item}</p>
                <p className="text-sm text-muted-foreground">Verified against enterprise policy</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  ),
}
