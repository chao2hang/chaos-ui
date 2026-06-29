import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PublicLayout } from "@/components/layout/public-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const meta = {
  title: "Layouts/PublicLayout",
  component: PublicLayout,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof PublicLayout>

export default meta
type Story = StoryObj<typeof meta>

export const EnterpriseLanding: Story = {
  render: () => (
    <PublicLayout
      logo={<span>QXY Foods Cloud</span>}
      nav={[
        { label: "Solutions", href: "/solutions" },
        { label: "Customers", href: "/customers" },
        { label: "Pricing", href: "/pricing" },
        { label: "Security", href: "/security" },
      ]}
      headerActions={
        <>
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">Book Demo</Button>
        </>
      }
      footer={
        <div className="container mx-auto flex flex-col justify-between gap-2 md:flex-row">
          <span>(c) 2026 QXY Foods Cloud</span>
          <span>ISO 22000 ready - SOC 2 roadmap - 24/7 enterprise support</span>
        </div>
      }
    >
      <section className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Badge variant="secondary">Food distribution operating system</Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Coordinate orders, inventory, and dispatch from one enterprise workspace.
            </h1>
            <p className="text-lg text-muted-foreground">
              Give sales, warehouse, finance, and logistics teams the same source of truth for
              perishable supply chains.
            </p>
          </div>
          <div className="flex gap-3">
            <Button>Start Evaluation</Button>
            <Button variant="outline">View Case Study</Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Today at a glance</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              ["Purchase orders synchronized", "1,248"],
              ["Warehouse utilization", "82%"],
              ["On-time deliveries", "98.7%"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  ),
}

export const CustomerPortal: Story = {
  render: () => (
    <PublicLayout
      logo={<span>QXY Customer Portal</span>}
      nav={[
        { label: "Catalog", href: "/catalog" },
        { label: "Order Tracking", href: "/orders" },
        { label: "Claims", href: "/claims" },
      ]}
      headerActions={<Button size="sm">Open Account</Button>}
      footer={
        <div className="container mx-auto">
          Customer operations hotline - 400-800-2688 - support@qxyfoods.example
        </div>
      }
    >
      <section className="container mx-auto space-y-6 px-4 py-12">
        <div>
          <Badge variant="outline">Retail buyer workspace</Badge>
          <h1 className="mt-3 text-3xl font-semibold">Track every shipment from order to dock.</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Customers can monitor replenishment orders, cold-chain handoffs, and invoice readiness
            without calling account managers.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Live ETA", "Temperature proof", "Invoice packets"].map((feature) => (
            <Card key={feature}>
              <CardHeader>
                <CardTitle>{feature}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade visibility for procurement and store operations teams.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  ),
}
