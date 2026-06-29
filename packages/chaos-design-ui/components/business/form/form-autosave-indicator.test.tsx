import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FormAutosaveIndicator } from "./form-autosave-indicator"

describe("FormAutosaveIndicator", () => {
  it("renders idle state", () => {
    render(<FormAutosaveIndicator status="idle" />)
    expect(screen.getByText("等待修改")).toBeInTheDocument()
  })

  it("renders saving state", () => {
    render(<FormAutosaveIndicator status="saving" />)
    expect(screen.getByText("正在保存...")).toBeInTheDocument()
  })

  it("renders saved state", () => {
    render(<FormAutosaveIndicator status="saved" lastSaved={Date.now() - 5000} />)
    expect(screen.getByText(/已保存/)).toBeInTheDocument()
  })

  it("renders error state", () => {
    render(<FormAutosaveIndicator status="error" error={new Error("网络错误")} />)
    expect(screen.getByText("保存失败")).toBeInTheDocument()
  })

  it("has role=status for accessibility", () => {
    render(<FormAutosaveIndicator status="idle" />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })
})
