import type { Meta, StoryObj } from "@storybook/react"
import { ArticleLayout } from "@/components/layout/article-layout"

const meta: Meta<typeof ArticleLayout> = {
  title: "Layouts/ArticleLayout",
  component: ArticleLayout,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
