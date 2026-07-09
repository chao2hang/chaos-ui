import type { Meta, StoryObj } from "@storybook/react"
import { ProfileHeader, ProfileForm } from "@/components/business/profile"
import { Button } from "@chaos_team/chaos-ui/ui"

const meta = {
  title: "Business/Profile",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const HeaderDefault: Story = {
  render: () => (
    <div className="max-w-3xl">
      <ProfileHeader
        user={{
          name: "李雷",
          email: "li.lei@chaos.com",
          role: "高级前端工程师",
          department: "设计系统组",
          bio: "设计系统构建者，喜欢用代码创造美好的用户体验。",
          location: "上海 · 中国",
        }}
        stats={[
          { label: "项目", value: 24 },
          { label: "关注者", value: 1234 },
          { label: "获赞", value: 5678 },
          { label: "贡献", value: 89 },
        ]}
        actions={<Button>关注</Button>}
        onAvatarUpload={(f) => console.info("upload", f.name)}
      />
    </div>
  ),
}

export const HeaderMinimal: Story = {
  render: () => (
    <div className="max-w-2xl">
      <ProfileHeader user={{ name: "韩梅梅" }} />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="max-w-md rounded-md border bg-card p-6">
      <h3 className="mb-4 text-base font-semibold">编辑资料</h3>
      <ProfileForm
        fields={[
          { name: "name", label: "姓名", defaultValue: "李雷" },
          { name: "email", label: "邮箱", defaultValue: "li.lei@chaos.com", type: "email" },
          { name: "bio", label: "简介", defaultValue: "设计系统构建者" },
        ]}
        onSubmit={(v) => console.info("submit", v)}
      />
    </div>
  ),
}

export const Dark: Story = {
  ...HeaderDefault,
  parameters: { backgrounds: { default: "dark" } },
}
