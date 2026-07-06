import type { Meta, StoryObj } from "@storybook/react";
import { ErrorLayout } from "@/components/layout/error-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const meta = {
  title: "Layouts/ErrorLayout",
  component: ErrorLayout,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof ErrorLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ServiceUnavailable: Story = {
  render: () => (
    <ErrorLayout>
      <Card className="w-full max-w-xl text-center">
        <CardHeader>
          <div className="bg-destructive/10 text-destructive mx-auto mb-2 flex size-14 items-center justify-center rounded-full">
            503
          </div>
          <CardTitle>Warehouse planning is temporarily unavailable</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            The optimization service did not respond before the enterprise
            timeout window. Existing dispatch plans remain available in
            read-only mode.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Incident INC-4829</Badge>
            <Badge variant="secondary">Retrying automatically</Badge>
          </div>
          <div className="flex justify-center gap-2">
            <Button>Try Again</Button>
            <Button variant="outline">Open Status Page</Button>
          </div>
        </CardContent>
      </Card>
    </ErrorLayout>
  ),
};

export const PermissionRequired: Story = {
  render: () => (
    <ErrorLayout>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Badge className="mb-2 w-fit" variant="outline">
            Access control
          </Badge>
          <CardTitle>Finance approval role required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            This margin override contains confidential supplier terms. Ask an
            administrator to grant the Finance Approver role or continue with
            the standard price book.
          </p>
          <div className="bg-muted/30 rounded-lg border p-3 text-sm">
            Requested resource:{" "}
            <span className="font-medium">Regional margin overrides</span>
          </div>
          <div className="flex gap-2">
            <Button>Request Access</Button>
            <Button variant="outline">Return to Orders</Button>
          </div>
        </CardContent>
      </Card>
    </ErrorLayout>
  ),
};
