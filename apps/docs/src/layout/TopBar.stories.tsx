import type { Meta, StoryObj } from "@storybook/react"
import { TopBar } from "@/components/layout/top-bar"
import { Button } from "@/components/ui/button"
import { BellIcon, SearchIcon, UserIcon } from "lucide-react"

const meta = {
  title: "Layouts/TopBar",
  component: TopBar,
  tags: ["autodocs"],
} satisfies Meta<typeof TopBar>

export default meta
type Story = StoryObj<typeof meta>

const sampleNav = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Reports", href: "/reports" },
]

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-muted/20">
      <TopBar
        nav={sampleNav}
        actions={
          <>
            <Button variant="ghost" size="icon" aria-label="Search">
              <SearchIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <BellIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <UserIcon className="size-4" />
            </Button>
          </>
        }
      />
      <main className="container mx-auto p-6 text-sm text-muted-foreground">
        Page content goes under the sticky TopBar.
      </main>
    </div>
  ),
}

export const WithMegaMenu: Story = {
  render: () => (
    <div className="min-h-screen bg-muted/20">
      <TopBar
        nav={[
          { label: "Home", href: "/" },
          {
            label: "Products",
            href: "/products",
            children: [
              { label: "Overview", href: "/products" },
              { label: "Components", href: "/products/components" },
              { label: "Templates", href: "/products/templates" },
            ],
          },
          {
            label: "Resources",
            href: "/resources",
            children: [
              { label: "Docs", href: "/docs" },
              { label: "Blog", href: "/blog" },
            ],
          },
        ]}
        actions={<Button size="sm">Sign in</Button>}
      />
      <main className="container mx-auto p-6 text-sm text-muted-foreground">
        Hover or focus a multi-level item to see the dropdown panel.
      </main>
    </div>
  ),
}

export const Transparent: Story = {
  render: () => (
    <div
      className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20"
    >
      <TopBar
        variant="transparent"
        nav={sampleNav}
        actions={<Button size="sm">Get started</Button>}
      />
      <main className="container mx-auto p-6 text-sm text-muted-foreground">
        Hero content sits beneath a transparent TopBar.
      </main>
    </div>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark min-h-screen">
      <TopBar
        nav={sampleNav}
        actions={
          <Button size="sm" variant="secondary">
            Account
          </Button>
        }
      />
      <main className="container mx-auto p-6 text-sm text-muted-foreground">
        Dark theme preview of the TopBar.
      </main>
    </div>
  ),
}
