import type { Meta, StoryObj } from "@storybook/react"
import { LanguageSwitcher } from "@/components/business/language-switcher"

const meta = {
  title: "Business/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "zh-CN",
  },
}

export const English: Story = {
  args: {
    value: "en-US",
    align: "start",
  },
}

export const CustomOptions: Story = {
  args: {
    value: "en-US",
    options: [
      { code: "en-US", label: "English", nativeLabel: "English" },
      { code: "fr-FR", label: "French", nativeLabel: "Français" },
      { code: "de-DE", label: "German", nativeLabel: "Deutsch" },
    ],
  },
}

