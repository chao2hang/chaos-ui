import type { Meta, StoryObj } from "@storybook/react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HomeIcon, FolderIcon, SettingsIcon, BarChartIcon } from "lucide-react"

const meta: Meta<typeof AppShell> = {
  title: "Layouts/AppShell",
  component: AppShell,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

const Sidebar = (
  <nav className="flex h-full flex-col gap-1 p-3 text-sm">
    {[
      { label: "Home", icon: HomeIcon },
      { label: "Projects", icon: FolderIcon },
      { label: "Reports", icon: BarChartIcon },
      { label: "Settings", icon: SettingsIcon },
    ].map(({ label, icon: Icon }) => (
      <a
        key={label}
        href="#"
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Icon className="size-4" />
        {label}
      </a>
    ))}
  </nav>
)

export const Default: Story = {
  render: () => (
    <div className="h-[600px] overflow-hidden rounded-lg border">
      <AppShell
        header={
          <div className="flex flex-1 items-center justify-between px-4">
            <span className="font-semibold">Chaos UI</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Help
              </Button>
              <Button size="sm">New project</Button>
            </div>
          </div>
        }
        sidebar={Sidebar}
      >
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Main content</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Header + collapsible sidebar with the main area to the right.
          </p>
        </div>
      </AppShell>
    </div>
  ),
}

export const WithAside: Story = {
  render: () => (
    <div className="h-[600px] overflow-hidden rounded-lg border">
      <AppShell
        header={
          <span className="px-4 font-semibold">Workspace</span>
        }
        sidebar={Sidebar}
        aside={
          <div className="p-4 text-sm">
            <h3 className="font-semibold">Details</h3>
            <p className="mt-2 text-muted-foreground">
              Right rail is hidden below the lg breakpoint.
            </p>
          </div>
        }
        footer={<span>Connected · v0.1.0</span>}
      >
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Three-column shell</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Header on top, sidebar on the left, content in the middle, aside on the right, footer at the bottom.
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </div>
  ),
}

export const Floating: Story = {
  render: () => (
    <div className="h-[600px] overflow-hidden rounded-lg bg-muted/30 p-3">
      <AppShell
        variant="floating"
        header={
          <span className="px-4 font-semibold">Floating shell</span>
        }
        sidebar={Sidebar}
      >
        <div className="p-6 text-sm text-muted-foreground">
          The sidebar floats with a margin, shadow, and rounded corners.
        </div>
      </AppShell>
    </div>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark h-[600px] overflow-hidden rounded-lg border">
      <AppShell
        header={
          <span className="px-4 font-semibold">Dark shell</span>
        }
        sidebar={Sidebar}
      >
        <div className="p-6 text-sm text-muted-foreground">
          AppShell on a dark surface.
        </div>
      </AppShell>
    </div>
  ),
}
