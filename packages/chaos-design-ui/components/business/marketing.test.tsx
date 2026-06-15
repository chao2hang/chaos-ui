import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  PricingCard,
  PricingTable,
  TestimonialCard,
  FAQSection,
} from "./marketing"

const tier = {
  id: "pro",
  name: "Pro",
  price: 49,
  period: "月",
  features: [
    { label: "无限项目", included: true },
    { label: "高级分析", included: false },
  ],
}

describe("PricingCard", () => {
  it("renders tier name and price", () => {
    render(<PricingCard tier={tier} />)
    expect(screen.getByText("Pro")).toBeInTheDocument()
    expect(screen.getByText("49")).toBeInTheDocument()
  })

  it("renders features list with included check", () => {
    render(<PricingCard tier={tier} />)
    expect(screen.getByText("无限项目")).toBeInTheDocument()
    expect(screen.getByText("高级分析")).toBeInTheDocument()
  })

  it("calls onCta with tier id", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<PricingCard tier={tier} onCta={handle} />)
    await user.click(screen.getByText("开始使用"))
    expect(handle).toHaveBeenCalledWith("pro")
  })

  it("renders badge when provided", () => {
    render(<PricingCard tier={{ ...tier, badge: "最热" }} />)
    expect(screen.getByText("最热")).toBeInTheDocument()
  })

  it("applies data-highlighted when highlighted", () => {
    const { container } = render(
      <PricingCard tier={{ ...tier, highlighted: true }} />,
    )
    const card = container.querySelector('[data-slot="pricing-card"]')
    expect(card?.getAttribute("data-highlighted")).toBe("true")
  })
})

describe("PricingTable", () => {
  it("renders all tier cards", () => {
    render(
      <PricingTable
        tiers={[
          { id: "a", name: "A", price: 0, features: [] },
          { id: "b", name: "B", price: 1, features: [] },
        ]}
      />,
    )
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
  })
})

describe("TestimonialCard", () => {
  it("renders quote and author", () => {
    render(
      <TestimonialCard
        quote="好极了"
        author={{ name: "小明" }}
      />,
    )
    expect(screen.getByText("好极了")).toBeInTheDocument()
    expect(screen.getByText("小明")).toBeInTheDocument()
  })

  it("renders rating stars when provided", () => {
    const { container } = render(
      <TestimonialCard
        quote="Q"
        author={{ name: "X" }}
        rating={4}
      />,
    )
    expect(container.querySelector('[data-slot="testimonial-card"]')).toBeInTheDocument()
  })
})

describe("FAQSection", () => {
  it("renders all questions", () => {
    render(
      <FAQSection
        items={[
          { q: "Q1?", a: "A1" },
          { q: "Q2?", a: "A2" },
        ]}
      />,
    )
    expect(screen.getByText("Q1?")).toBeInTheDocument()
    expect(screen.getByText("Q2?")).toBeInTheDocument()
  })

  it("expands answer when question clicked", async () => {
    const user = userEvent.setup()
    render(
      <FAQSection
        items={[{ q: "Q?", a: "Answer" }]}
      />,
    )
    await user.click(screen.getByText("Q?"))
    expect(screen.getByText("Answer")).toBeInTheDocument()
  })
})
