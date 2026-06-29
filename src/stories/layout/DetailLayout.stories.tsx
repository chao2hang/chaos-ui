import type { Meta, StoryObj } from "@storybook/react";
import { DetailLayout } from "@/components/layout/detail-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon, TrashIcon } from "@/components/ui/icons";

const meta = {
  title: "Layouts/DetailLayout",
  component: DetailLayout,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof DetailLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Order #ORD-001",
    subtitle: "Placed on January 15, 2024",
    actions: (
      <>
        <Button variant="outline" size="sm">
          <EditIcon className="size-4 mr-1" />
          Edit
        </Button>
        <Button variant="destructive" size="sm">
          <TrashIcon className="size-4 mr-1" />
          Delete
        </Button>
      </>
    ),
    children: (
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>View order information</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Order details content goes here.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const WithTabs: Story = {
  args: {
    title: "User Profile",
    subtitle: "View and manage user information",
    tabs: [
      {
        value: "overview",
        label: "Overview",
        content: (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Overview content</p>
            </CardContent>
          </Card>
        ),
      },
      {
        value: "activity",
        label: "Activity",
        content: (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Activity log content
              </p>
            </CardContent>
          </Card>
        ),
      },
      {
        value: "settings",
        label: "Settings",
        content: (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Settings content</p>
            </CardContent>
          </Card>
        ),
      },
    ],
  },
};
