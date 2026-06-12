import type { Meta, StoryObj } from "@storybook/react"
import { SettingsLayout } from "@/components/business/settings-layout"
import { ProfileHeader, ProfileForm } from "@/components/business/profile"
import { InboxList } from "@/components/business/inbox-list"
import { PricingCard, PricingTable, TestimonialCard, FAQSection } from "@/components/business/marketing"
import { SignInForm, SignUpForm, ForgotPasswordForm } from "@/components/business/auth-forms"
import { OnboardingChecklist } from "@/components/business/onboarding-checklist"
import { useState } from "react"
import { BellIcon, LockIcon, UserIcon, CreditCardIcon, UsersIcon, SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { initials } from "@/lib/format"

const tiers = [
  { id: "free", name: "免费", description: "适合个人尝试", price: 0, period: "月", features: [
    { label: "3 个项目", included: true },
    { label: "社区支持", included: true },
    { label: "高级分析", included: false },
    { label: "团队协作", included: false },
    { label: "API 访问", included: false },
  ]},
  { id: "pro", name: "Pro", description: "适合个人深度使用", price: 49, period: "月", badge: "最受欢迎", highlighted: true, features: [
    { label: "无限项目", included: true },
    { label: "邮件支持", included: true },
    { label: "高级分析", included: true },
    { label: "团队协作", included: false },
    { label: "API 访问", included: false },
  ]},
  { id: "team", name: "团队", description: "适合小团队协作", price: 199, period: "月", features: [
    { label: "无限项目", included: true },
    { label: "优先支持", included: true },
    { label: "高级分析", included: true },
    { label: "团队协作（10人）", included: true },
    { label: "API 访问", included: true },
  ]},
  { id: "enterprise", name: "企业", description: "定制化方案", price: "联系销售", features: [
    { label: "无限项目", included: true },
    { label: "专属客户经理", included: true },
    { label: "高级分析", included: true },
    { label: "无限团队", included: true },
    { label: "API 访问", included: true },
  ]},
]

const inboxItems = [
  { id: "1", from: { name: "GitHub" }, subject: "[Chaos UI] PR #234 合并通知", preview: "您的 Pull Request 已被合并到 main 分支", timestamp: Date.now() - 600_000, read: false, starred: true, labels: ["工作"] },
  { id: "2", from: { name: "Alice Chen" }, subject: "Q1 规划讨论", preview: "关于下季度产品规划的几点想法...", timestamp: Date.now() - 3600_000, labels: ["团队"] },
  { id: "3", from: { name: "Slack" }, subject: "您有 5 条未读消息", preview: "在 #design-system 频道", timestamp: Date.now() - 7200_000, read: false },
  { id: "4", from: { name: "Newsletter" }, subject: "本周设计趋势", preview: "本期的精选文章...", timestamp: Date.now() - 86400_000, starred: true, labels: ["订阅"] },
]

const testimonials = [
  { quote: "Chaos UI 让我们的设计系统迭代速度提升了 3 倍。组件质量令人惊艳。", author: { name: "张明", role: "前端架构师", company: "Acme Corp" }, rating: 5 },
  { quote: "可访问性考虑得非常周到，暗色模式下的色彩对比度是行业最佳实践。", author: { name: "李华", role: "设计师", company: "Design Studio" }, rating: 5 },
  { quote: "Storybook 集成做得非常出色，组件文档化几乎不需要额外工作。", author: { name: "王芳", role: "技术负责人", company: "Tech Inc" }, rating: 4 },
]

const faqItems = [
  { q: "如何开始使用 Chaos UI？", a: "通过 pnpm 安装依赖，参考 Getting Started 文档即可。" },
  { q: "支持哪些框架版本？", a: "支持 React 19+，Next.js 15+。" },
  { q: "如何定制主题？", a: "通过 CSS 变量和 Tailwind 配置调整。" },
  { q: "是否提供 TypeScript 类型？", a: "是，所有组件都有完整的 TypeScript 类型定义。" },
  { q: "是否有移动端组件？", a: "是的，我们提供专门的 mobile-* 变体。" },
]

export default {
  title: "Business/Pages",
  parameters: { layout: "padded" },
} satisfies Meta

export const SettingsExample: StoryObj = {
  render: () => {
    const [active, setActive] = useState("account")
    return (
      <SettingsLayout
        nav={[
          { key: "account", label: "账户", icon: <UserIcon /> },
          { key: "preferences", label: "偏好", icon: <SettingsIcon /> },
          { key: "security", label: "安全", icon: <LockIcon />, badge: "新" },
          { key: "billing", label: "账单", icon: <CreditCardIcon /> },
          { key: "team", label: "团队", icon: <UsersIcon /> },
          { key: "notifications", label: "通知", icon: <BellIcon /> },
        ]}
        active={active}
        onNavChange={setActive}
        sections={[
          {
            key: "account",
            title: "账户设置",
            description: "管理您的账户信息",
            content: (
              <div className="space-y-3">
                <div className="space-y-1.5"><label className="text-sm font-medium">姓名</label><Input defaultValue="李雷" /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium">邮箱</label><Input defaultValue="li.lei@chaos.com" /></div>
                <Button>保存</Button>
              </div>
            ),
          },
          {
            key: "preferences",
            title: "偏好设置",
            description: "个性化您的体验",
            content: (
              <div className="space-y-3">
                <div className="space-y-1.5"><label className="text-sm font-medium">语言</label><Input defaultValue="简体中文" /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium">主题</label><Input defaultValue="跟随系统" /></div>
              </div>
            ),
          },
        ]}
      />
    )
  },
}

export const ProfileExample: StoryObj = {
  render: () => (
    <div className="max-w-3xl space-y-4">
      <ProfileHeader
        user={{
          name: "李雷",
          email: "li.lei@chaos.com",
          role: "高级前端工程师",
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
        onAvatarUpload={(f) => alert(`上传 ${f.name}`)}
      />
      <div className="rounded-md border bg-card p-6">
        <h3 className="mb-4 text-base font-semibold">编辑资料</h3>
        <ProfileForm
          fields={[
            { name: "name", label: "姓名", defaultValue: "李雷" },
            { name: "email", label: "邮箱", defaultValue: "li.lei@chaos.com", type: "email" },
            { name: "bio", label: "简介", defaultValue: "设计系统构建者" },
          ]}
          onSubmit={(v) => alert(JSON.stringify(v))}
        />
      </div>
    </div>
  ),
}

export const InboxExample: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState("1")
    return (
      <div className="h-[500px] max-w-md rounded-md border">
        <InboxList
          items={inboxItems}
          selected={selected}
          onSelect={setSelected}
          onStar={(id) => alert(`星标 ${id}`)}
        />
      </div>
    )
  },
}

export const PricingExample: StoryObj = {
  render: () => (
    <div className="max-w-5xl space-y-3">
      <h3 className="text-lg font-semibold">Pricing Table</h3>
      <PricingTable tiers={tiers} onCta={(id) => alert(`选择 ${id}`)} />
    </div>
  ),
}

export const TestimonialsExample: StoryObj = {
  render: () => (
    <div className="max-w-5xl space-y-3">
      <h3 className="text-lg font-semibold">Testimonial Cards</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} quote={t.quote} author={t.author} rating={t.rating} />
        ))}
      </div>
    </div>
  ),
}

export const FAQExample: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <h3 className="text-lg font-semibold">FAQ Section</h3>
      <FAQSection items={faqItems} searchable />
    </div>
  ),
}

export const SignInExample: StoryObj = {
  render: () => (
    <div className="max-w-md rounded-md border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">登录</h3>
      <SignInForm
        onSubmit={(v) => alert(JSON.stringify(v))}
        ssoProviders={[
          { id: "github", label: "GitHub" },
          { id: "google", label: "Google" },
        ]}
        signupHref="#signup"
        forgotHref="#forgot"
      />
    </div>
  ),
}

export const SignUpExample: StoryObj = {
  render: () => (
    <div className="max-w-md rounded-md border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">注册</h3>
      <SignUpForm onSubmit={(v) => alert(JSON.stringify(v))} signinHref="#signin" />
    </div>
  ),
}

export const ForgotPasswordExample: StoryObj = {
  render: () => (
    <div className="max-w-md rounded-md border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">重置密码</h3>
      <ForgotPasswordForm onSubmit={(email) => alert(`重置链接发送至：${email}`)} />
    </div>
  ),
}

export const OnboardingExample: StoryObj = {
  render: () => {
    const [done, setDone] = useState<string[]>(["welcome"])
    return (
      <div className="max-w-md">
        <OnboardingChecklist
          title="快速上手"
          steps={[
            { id: "welcome", title: "完成个人资料", description: "上传头像、填写简介" },
            { id: "team", title: "邀请 3 位团队成员", description: "通过邮件邀请" },
            { id: "project", title: "创建第一个项目", description: "选择模板快速开始" },
            { id: "integrate", title: "集成您的工具", description: "Slack、GitHub 等", optional: true },
          ]}
          completedIds={done}
          onToggle={(id, completed) =>
            setDone((prev) => (completed ? [...prev, id] : prev.filter((d) => d !== id)))
          }
        />
      </div>
    )
  },
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="max-w-6xl space-y-12">
      <section>
        <h3 className="mb-3 text-base font-semibold">Auth - SignIn</h3>
        <div className="max-w-md rounded-md border bg-card p-6">
          <SignInForm onSubmit={(v) => console.log(v)} ssoProviders={[{ id: "github", label: "GitHub" }]} />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Pricing</h3>
        <PricingTable tiers={tiers.slice(0, 3)} />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Testimonials</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">FAQ</h3>
        <FAQSection items={faqItems.slice(0, 4)} />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Onboarding Checklist</h3>
        <OnboardingChecklist
          title="新手任务"
          steps={[
            { id: "1", title: "完善资料", description: "5 分钟搞定" },
            { id: "2", title: "创建项目", description: "选择模板" },
            { id: "3", title: "邀请团队", description: "提升协作效率", optional: true },
          ]}
          completedIds={["1"]}
        />
      </section>
    </div>
  ),
}
