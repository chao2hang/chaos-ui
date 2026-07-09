import type { Meta, StoryObj } from "@storybook/react"
import {
  PricingCard,
  PricingTable,
  TestimonialCard,
  FAQSection,
} from "@/components/business/marketing"
import { Button } from "@chaos_team/chaos-ui/ui"

const meta = {
  title: "Business/Marketing",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const tiers = [
  {
    id: "free",
    name: "免费",
    description: "个人尝试",
    price: 0,
    period: "月",
    features: [
      { label: "3 个项目", included: true },
      { label: "社区支持", included: true },
      { label: "高级分析", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "深度使用",
    price: 49,
    period: "月",
    badge: "推荐",
    highlighted: true,
    features: [
      { label: "无限项目", included: true },
      { label: "邮件支持", included: true },
      { label: "高级分析", included: true },
    ],
  },
  {
    id: "team",
    name: "团队",
    description: "小团队协作",
    price: 199,
    period: "月",
    features: [
      { label: "无限项目", included: true },
      { label: "优先支持", included: true },
      { label: "API 访问", included: true },
    ],
  },
]

const testimonials = [
  { quote: "Chaos UI 让我们的设计系统迭代速度提升了 3 倍。", author: { name: "张明", role: "前端架构师", company: "Acme Corp" }, rating: 5 },
  { quote: "暗色模式的色彩对比度是行业最佳实践。", author: { name: "李华", role: "设计师", company: "Design Studio" }, rating: 5 },
]

const faqItems = [
  { q: "如何开始？", a: "运行 pnpm install 即可。" },
  { q: "支持哪些框架？", a: "React 19+、Next.js 15+。" },
  { q: "是否提供 TypeScript 类型？", a: "是，所有组件都有完整类型。" },
]

export const Default: Story = {
  render: () => (
    <PricingCard
      tier={tiers[1]}
      onCta={(id) => console.info("cta", id)}
    />
  ),
}

export const PricingTableExample: Story = {
  render: () => (
    <div className="max-w-5xl">
      <PricingTable tiers={tiers} onCta={(id) => console.info("cta", id)} />
    </div>
  ),
}

export const TestimonialsExample: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-4 md:grid-cols-2">
      {testimonials.map((t, i) => (
        <TestimonialCard key={i} {...t} />
      ))}
    </div>
  ),
}

export const FAQExample: Story = {
  render: () => (
    <div className="max-w-2xl">
      <FAQSection items={faqItems} searchable />
    </div>
  ),
}

export const Dark: Story = {
  ...PricingTableExample,
  parameters: { backgrounds: { default: "dark" } },
}
