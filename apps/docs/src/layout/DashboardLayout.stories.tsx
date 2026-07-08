import type { Meta, StoryObj } from "@storybook/react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const meta: Meta<typeof DashboardLayout> = {
  title: "Layouts/DashboardLayout",
  component: DashboardLayout,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Card {i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Dashboard content</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  ),
}

export const Orders: Story = {
  render: () => (
    <DashboardLayout title="Orders">
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Orders page content</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  ),
}
