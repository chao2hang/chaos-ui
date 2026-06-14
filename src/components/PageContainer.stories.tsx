import type { Meta, StoryObj } from "@storybook/react"
import { PageContainer, PageHeader, PageContent } from "@/components/ui/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"

const meta = {
  title: "Components/PageContainer",
  component: PageContainer,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof PageContainer>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Welcome to your dashboard"
        actions={<Button><PlusIcon className="size-4 mr-1" /> Add New</Button>}
      />
      <PageContent>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Content {i + 1}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContent>
    </PageContainer>
  ),
}

export const Small: Story = {
  render: () => (
    <PageContainer size="sm">
      <PageHeader title="Settings" description="Manage your settings" />
      <PageContent>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Settings content goes here.</p>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  ),
}

