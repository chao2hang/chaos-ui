import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const meta = {
  title: "Layouts/DashboardLayout",
  component: DashboardLayout,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof DashboardLayout>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    // SidebarProvider fills host height (h-full); give demos a definite box.
    <div className="h-[560px] overflow-hidden rounded-lg border">
      <DashboardLayout title="Dashboard">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Card {i + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Dashboard content
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    </div>
  ),
};

export const Orders: Story = {
  render: () => (
    <div className="h-[480px] overflow-hidden rounded-lg border">
      <DashboardLayout title="Orders">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">Orders page content</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    </div>
  ),
};
