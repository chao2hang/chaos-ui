import type { Meta, StoryObj } from "@storybook/react";
import { BlankLayout } from "@/components/layout/blank-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const meta = {
  title: "Layouts/BlankLayout",
  component: BlankLayout,
  tags: ["autodocs", "a11y"],
  decorators: [
    (Story) => (
      <div className="h-[70vh] min-h-[420px] overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BlankLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CenteredOnboarding: Story = {
  render: () => (
    <BlankLayout centered>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="secondary">Step 2 of 4</Badge>
            <span className="text-muted-foreground text-xs">
              Enterprise setup
            </span>
          </div>
          <CardTitle>Connect your distribution region</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Choose the warehouses, pricing lists, and carrier rules that should
            be available to the North China sales team.
          </p>
          <Progress value={50} />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Beijing DC",
              "Tianjin cold storage",
              "Hebei distributor",
              "National price book",
            ].map((item) => (
              <div
                key={item}
                className="rounded-md border p-3 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
          <Button className="w-full">Continue Setup</Button>
        </CardContent>
      </Card>
    </BlankLayout>
  ),
};

export const ImportWorkspace: Story = {
  render: () => (
    <BlankLayout>
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Bulk Price Import</h1>
            <p className="text-muted-foreground text-sm">
              Validate supplier price updates before publishing to sales
              channels.
            </p>
          </div>
          <Button>Upload CSV</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Rows detected", "3,284"],
            ["Validation warnings", "18"],
            ["Ready to publish", "96%"],
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
        <Card>
          <CardContent className="grid gap-3 pt-6 md:grid-cols-2">
            {[
              "Duplicate SKU aliases",
              "Missing effective dates",
              "Margin threshold checks",
              "Currency mapping",
            ].map((item) => (
              <div key={item} className="rounded-lg border p-4">
                <p className="font-medium">{item}</p>
                <p className="text-muted-foreground text-sm">
                  Automated control completed
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </BlankLayout>
  ),
};
