import type { Meta, StoryObj } from "@storybook/react"
import { Banner } from "@/components/business/banner"

const meta: Meta<typeof Banner> = {
  title: "Business/Banner",
  component: Banner,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    title: "Information",
    description: "This is an informational banner.",
  };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Banner variant="info" title="Info" description="Informational message." />
      <Banner variant="success" title="Success" description="Operation completed." />
      <Banner variant="warning" title="Warning" description="Please review." />
      <Banner variant="error" title="Error" description="Something went wrong." />
    </div>
  ),
}

export const NotClosable: Story = {
  args: {
    closable: false,
    variant: "warning",
    title: "Persistent Banner",
    description: "This banner cannot be closed.",
  },
}

export const Dark: Story = {
  args: {
    variant: "info",
    title: "Dark Mode Banner",
    description: "Banner in dark mode.",
  },
  parameters: { backgrounds: { default: "dark" } },
}
