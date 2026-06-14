import type { Meta, StoryObj } from "@storybook/react"
import { CookieBanner } from "@/components/business/cookie-banner"

const meta = {
  title: "Business/CookieBanner",
  component: CookieBanner,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CookieBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    storageKey: "storybook-cookie-default",
  },
}

export const TopPosition: Story = {
  args: {
    open: true,
    position: "top",
    title: "Privacy preferences",
    description: "Choose whether analytics cookies can help improve reporting dashboards.",
    acceptText: "Allow analytics",
    rejectText: "Necessary only",
    storageKey: "storybook-cookie-top",
  },
}

export const WithPolicyLink: Story = {
  args: {
    open: true,
    position: "bottom-right",
    policyUrl: "/privacy",
    storageKey: "storybook-cookie-policy",
  },
}

