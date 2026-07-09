import type { Meta, StoryObj } from "@storybook/react";
import { BlankLayout } from "@chaos_team/chaos-ui/layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof BlankLayout> = {
  title: "Layouts/BlankLayout",
  component: BlankLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BlankLayout>
      <Card>
        <CardHeader>
          <CardTitle>Standalone Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Use BlankLayout for minimalist single-page surfaces that don't need
            navigation chrome.
          </p>
        </CardContent>
      </Card>
    </BlankLayout>
  ),
};

export const Centered: Story = {
  render: () => (
    <BlankLayout centered>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Centered Surface</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Content is vertically and horizontally centered inside the viewport.
          </p>
        </CardContent>
      </Card>
    </BlankLayout>
  ),
};

export const Unpadded: Story = {
  render: () => (
    <BlankLayout padded={false}>
      <div className="border-muted-foreground/40 text-muted-foreground border-2 border-dashed p-6 text-sm">
        Padded is disabled — content stretches edge to edge.
      </div>
    </BlankLayout>
  ),
};

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark">
      <BlankLayout centered>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Dark surface</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              BlankLayout on a dark background, centered.
            </p>
          </CardContent>
        </Card>
      </BlankLayout>
    </div>
  ),
};
