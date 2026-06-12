import type { Meta, StoryObj } from "@storybook/react"
import { ErrorPage, NotFound, InternalError, Unauthorized } from "@/components/business/error-page"

const meta = {
  title: "Business/ErrorPage",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const NotFoundExample: Story = {
  render: () => (
    <div className="rounded-md border">
      <ErrorPage status={404} />
    </div>
  ),
}

export const InternalErrorExample: Story = {
  render: () => (
    <div className="rounded-md border">
      <ErrorPage status={500} />
    </div>
  ),
}

export const UnauthorizedExample: Story = {
  render: () => (
    <div className="rounded-md border">
      <ErrorPage status={403} />
    </div>
  ),
}

export const ServiceUnavailable: Story = {
  render: () => (
    <div className="rounded-md border">
      <ErrorPage status={503} />
    </div>
  ),
}

export const CustomContent: Story = {
  render: () => (
    <ErrorPage
      status={404}
      title="找不到您要的页面"
      description="也许它被外星人带走了。"
      onBack={() => console.info("back")}
    />
  ),
}

export const PreBuilt: Story = {
  render: () => (
    <div className="space-y-8">
      <NotFound />
      <InternalError />
      <Unauthorized />
    </div>
  ),
}

export const Dark: Story = {
  ...NotFoundExample,
  parameters: { backgrounds: { default: "dark" } },
}
