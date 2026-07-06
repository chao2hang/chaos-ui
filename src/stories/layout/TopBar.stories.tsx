import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "@/components/layout/top-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3Icon,
  Building2Icon,
  ClipboardListIcon,
  PackageCheckIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";

const meta = {
  title: "Layouts/TopBar",
  component: TopBar,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductNavigation: Story = {
  render: () => (
    <div className="bg-muted/30 min-h-screen">
      <TopBar
        logo={
          <span className="flex items-center gap-2">
            <Building2Icon className="size-4" />
            QXY Suite
          </span>
        }
        nav={[
          {
            label: "Operations",
            href: "/operations",
            icon: <ClipboardListIcon className="size-4" />,
            children: [
              { label: "Order orchestration", href: "/operations/orders" },
              { label: "Warehouse control", href: "/operations/warehouse" },
              { label: "Dispatch board", href: "/operations/dispatch" },
            ],
          },
          {
            label: "Insights",
            href: "/insights",
            icon: <BarChart3Icon className="size-4" />,
            children: [
              { label: "Margin analytics", href: "/insights/margins" },
              { label: "Demand forecast", href: "/insights/forecast" },
              { label: "Supplier scorecards", href: "/insights/suppliers" },
            ],
          },
          { label: "Compliance", href: "/compliance" },
          { label: "Support", href: "/support" },
        ]}
        actions={
          <>
            <Badge variant="secondary">Live</Badge>
            <Button size="sm">New Order</Button>
          </>
        }
      />
      <main className="mx-auto max-w-6xl space-y-4 p-6">
        <div>
          <h1 className="text-2xl font-semibold">Enterprise Navigation</h1>
          <p className="text-muted-foreground text-sm">
            Top-level access to operational modules, analytics, compliance, and
            support.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Open orders", "1,248"],
            ["Fulfillment SLA", "99.1%"],
            ["Supplier alerts", "7"],
          ].map(([label, value]) => (
            <Card key={label}>
              <CardHeader>
                <CardTitle className="text-muted-foreground text-sm">
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  ),
};

export const TransparentHero: Story = {
  render: () => (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#e0f2fe_45%,#fef3c7_100%)]">
      <TopBar
        variant="transparent"
        logo={
          <span className="flex items-center gap-2">
            <PackageCheckIcon className="size-4" />
            QXY Partner Network
          </span>
        }
        nav={[
          { label: "Network", href: "/network" },
          { label: "Programs", href: "/programs" },
          {
            label: "Security",
            href: "/security",
            icon: <ShieldCheckIcon className="size-4" />,
          },
        ]}
        actions={
          <>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Join Network</Button>
          </>
        }
      />
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Badge variant="outline">Partner portal</Badge>
          <h1 className="text-4xl font-semibold tracking-tight">
            Shared visibility for suppliers, carriers, and enterprise food
            buyers.
          </h1>
          <p className="text-muted-foreground text-lg">
            Keep everyone aligned on order forecasts, compliance documents,
            cold-chain checkpoints, and finance-ready delivery proof.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Network health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Certified suppliers", "184"],
              ["Carrier SLA", "98.4%"],
              ["Claims resolved", "92%"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <span className="text-muted-foreground text-sm">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  ),
};
