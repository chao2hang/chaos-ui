import type { Meta, StoryObj } from "@storybook/react";
import {
  PageContainer,
  PageHeader,
  PageContent,
} from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@/components/ui/icons";

const meta = {
  title: "Components/PageContainer",
  component: PageContainer,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Welcome to your dashboard"
        actions={
          <Button>
            <PlusIcon className="mr-1 size-4" /> Add New
          </Button>
        }
      />
      <PageContent>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-sm">Content {i + 1}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContent>
    </PageContainer>
  ),
};

export const Small: Story = {
  render: () => (
    <PageContainer size="sm">
      <PageHeader title="Settings" description="Manage your settings" />
      <PageContent>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">
              Settings content goes here.
            </p>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  ),
};

/** Compact header + content density for document pages (issue #44). */
export const CompactDensity: Story = {
  render: () => (
    <PageContainer>
      <PageHeader
        title="Document"
        description="Compact density stack"
        size="sm"
        actions={<Button size="sm">Save</Button>}
      />
      <PageContent density="compact">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">Section 1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">Section 2</p>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  ),
};
