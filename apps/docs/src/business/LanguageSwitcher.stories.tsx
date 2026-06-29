import type { Meta, StoryObj } from "@storybook/react"
import { LanguageSwitcher } from "@/components/business/language-switcher"
import { useState } from "react"

const meta = {
  title: "Business/LanguageSwitcher",
  component: LanguageSwitcher,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [v, setV] = useState("zh-CN")
    return (
      <div className="space-y-3">
        <LanguageSwitcher value={v} onChange={setV} />
        <p className="text-xs text-muted-foreground">当前：{v}</p>
      </div>
    )
  },
}

export const CustomOptions: Story = {
  render: () => (
    <LanguageSwitcher
      value="fr"
      onChange={(c) => console.info("lang", c)}
      options={[
        { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
        { code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷" },
        { code: "de", label: "German", nativeLabel: "Deutsch", flag: "🇩🇪" },
        { code: "es", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸" },
      ]}
    />
  ),
}

export const Uncontrolled: Story = {
  render: () => <LanguageSwitcher onChange={(c) => console.info("lang", c)} />,
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
