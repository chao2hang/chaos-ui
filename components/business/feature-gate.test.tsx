import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FeatureGate, isFeatureEnabled, useFeatureFlag } from "./feature-gate"

describe("FeatureGate", () => {
  it("renders children when flag is enabled", () => {
    render(
      <FeatureGate flag="new-dashboard">
        <div>新仪表盘内容</div>
      </FeatureGate>,
    )
    expect(screen.getByText("新仪表盘内容")).toBeInTheDocument()
  })

  it("renders fallback when flag is disabled", () => {
    render(
      <FeatureGate flag="ai-assistant" fallback={<span>未启用</span>}>
        <div>AI 内容</div>
      </FeatureGate>,
    )
    expect(screen.getByText("未启用")).toBeInTheDocument()
    expect(screen.queryByText("AI 内容")).not.toBeInTheDocument()
  })

  it("renders nothing when flag disabled and no fallback", () => {
    const { container } = render(
      <FeatureGate flag="ai-assistant">
        <div>AI 内容</div>
      </FeatureGate>,
    )
    expect(container.textContent).not.toContain("AI 内容")
  })

  it("renders nothing for unknown flag", () => {
    const { container } = render(
      <FeatureGate flag="does-not-exist">
        <div>X</div>
      </FeatureGate>,
    )
    expect(container.textContent).not.toContain("X")
  })
})

describe("isFeatureEnabled / useFeatureFlag", () => {
  it("isFeatureEnabled returns true for enabled flag", () => {
    expect(isFeatureEnabled("new-dashboard")).toBe(true)
  })

  it("isFeatureEnabled returns false for disabled flag", () => {
    expect(isFeatureEnabled("ai-assistant")).toBe(false)
  })

  it("isFeatureEnabled returns false for unknown flag", () => {
    expect(isFeatureEnabled("unknown-flag-xyz")).toBe(false)
  })

  it("useFeatureFlag hook returns boolean", () => {
    function Probe() {
      const v = useFeatureFlag("new-dashboard")
      return <span>{v ? "on" : "off"}</span>
    }
    render(<Probe />)
    expect(screen.getByText("on")).toBeInTheDocument()
  })
})
