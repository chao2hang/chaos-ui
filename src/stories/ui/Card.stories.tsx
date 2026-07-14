import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
  CardSection,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs", "a11y"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "sm"],
      description: "The size of the card",
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "default", "sm", "md", "lg", "xl", "2xl", "brand"],
      description: "Shadow variant (1.2.0+)",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
    </Card>
  ),
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>A smaller card variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is a small card.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card has a footer section.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content goes here.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>Action button in header.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Main content goes here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>Current project state</CardDescription>
        <CardAction>
          <Badge>Active</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Project is currently in development phase.
        </p>
      </CardContent>
    </Card>
  ),
};

/** Bill-style section: title must breathe above form fields (issue #20). */
export const WithSectionForm: Story = {
  render: () => (
    <Card className="max-w-lg">
      <CardSection title="单据信息">
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="expense-type">费用类型</Label>
            <Input id="expense-type" placeholder="请选择费用类型" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="expense-date">申请日期</Label>
            <Input id="expense-date" placeholder="选择日期" />
          </div>
        </CardContent>
      </CardSection>
      <CardSection
        title="附件"
        actions={
          <Button variant="outline" size="sm">
            上传
          </Button>
        }
      >
        <CardContent>
          <p className="text-muted-foreground text-sm">暂无附件</p>
        </CardContent>
      </CardSection>
    </Card>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card size="default">
        <CardHeader>
          <CardTitle>Default Size</CardTitle>
          <CardDescription>Standard spacing</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Content</p>
        </CardContent>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle>Small Size</CardTitle>
          <CardDescription>Compact spacing</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Content</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const ShadowVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {(["none", "default", "md", "lg", "xl", "2xl", "brand"] as const).map(
        (sh) => (
          <Card key={sh} shadow={sh} className="max-w-xs">
            <CardHeader>
              <CardTitle size="sm">{`shadow="${sh}"`}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Shadow variant demo.
              </p>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  ),
};
