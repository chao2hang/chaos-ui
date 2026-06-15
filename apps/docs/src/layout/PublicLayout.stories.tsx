import type { Meta, StoryObj } from "@storybook/react"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Layouts/PublicLayout",
  component: PublicLayout,
  tags: ["autodocs"],
} satisfies Meta<typeof PublicLayout>

export default meta
type Story = StoryObj<typeof meta>

const defaultNav = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
]

export const Default: Story = {
  render: () => (
    <PublicLayout
      nav={defaultNav}
      headerActions={
        <>
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm">Get started</Button>
        </>
      }
    >
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Build faster with Chaos UI
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          A composable design system for modern product teams. Accessible,
          themeable, and ready for production.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg">Start free</Button>
          <Button size="lg" variant="outline">
            View docs
          </Button>
        </div>
      </section>
    </PublicLayout>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <PublicLayout
      nav={defaultNav}
      headerActions={
        <Button size="sm">Get started</Button>
      }
      footer={
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 md:flex-row">
          <span>© 2024 Chaos UI, Inc.</span>
          <span className="space-x-4">
            <a href="/privacy" className="hover:text-foreground">Privacy</a>
            <a href="/terms" className="hover:text-foreground">Terms</a>
          </span>
        </div>
      }
    >
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold">Pricing</h2>
        <p className="mt-2 text-muted-foreground">Plans for teams of all sizes.</p>
      </section>
    </PublicLayout>
  ),
}

export const CustomLogo: Story = {
  render: () => (
    <PublicLayout
      logo={<span className="text-lg font-bold">⚡ Bolt</span>}
      nav={[{ label: "Home", href: "/" }]}
      headerActions={<Button size="sm">Sign in</Button>}
    >
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold">Custom branding</h1>
        <p className="mt-2 text-muted-foreground">
          Replace the default logo with your own mark.
        </p>
      </section>
    </PublicLayout>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark">
      <PublicLayout
        nav={defaultNav}
        headerActions={<Button size="sm">Get started</Button>}
      >
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Marketing on dark
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            PublicLayout adapts to whatever theme is active.
          </p>
        </section>
      </PublicLayout>
    </div>
  ),
}
