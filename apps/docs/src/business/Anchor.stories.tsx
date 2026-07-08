import type { Meta, StoryObj } from "@storybook/react"
import { Anchor } from "@/components/business/anchor"

const meta: Meta<typeof Anchor> = {
  title: "Business/Anchor",
  component: Anchor,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-[200px_1fr] gap-6">
      <div className="sticky top-4">
        <Anchor
          sections={[
            { id: "intro", label: "引言" },
            { id: "install", label: "安装" },
            { id: "usage", label: "使用方法" },
            { id: "advanced", label: "进阶" },
            { id: "faq", label: "常见问题" },
          ]}
        />
      </div>
      <div className="space-y-12">
        <section id="intro"><h2 className="text-xl font-bold">引言</h2><p className="mt-2 text-sm text-muted-foreground">这是介绍章节...</p></section>
        <section id="install" className="pt-8"><h2 className="text-xl font-bold">安装</h2><p className="mt-2 text-sm text-muted-foreground">安装步骤...</p></section>
        <section id="usage" className="pt-8"><h2 className="text-xl font-bold">使用方法</h2><p className="mt-2 text-sm text-muted-foreground">使用说明...</p></section>
        <section id="advanced" className="pt-8"><h2 className="text-xl font-bold">进阶</h2><p className="mt-2 text-sm text-muted-foreground">高级用法...</p></section>
        <section id="faq" className="pt-8"><h2 className="text-xl font-bold">常见问题</h2><p className="mt-2 text-sm text-muted-foreground">FAQ...</p></section>
      </div>
    </div>
  ),
}

export const NestedLevels: Story = {
  render: () => (
    <div className="max-w-xs">
      <Anchor
        sections={[
          { id: "a", label: "概览" },
          { id: "b", label: "入门指南" },
          { id: "b-1", label: "安装", level: 2 },
          { id: "b-2", label: "配置", level: 2 },
          { id: "c", label: "进阶" },
          { id: "c-1", label: "插件", level: 2 },
          { id: "c-2", label: "主题", level: 2 },
          { id: "c-3", label: "高级 API", level: 3 },
        ]}
      />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
