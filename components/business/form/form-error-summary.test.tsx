import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { FormErrorSummary } from "./form-error-summary"

describe("FormErrorSummary", () => {
  it("renders nothing when no errors", () => {
    const { container } = render(<FormErrorSummary errors={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders single error", () => {
    render(<FormErrorSummary errors={[{ field: "email", message: "邮箱无效" }]} />)
    expect(screen.getByText("表单中有 1 个错误")).toBeInTheDocument()
    expect(screen.getByText("邮箱无效")).toBeInTheDocument()
  })

  it("renders multiple errors", () => {
    render(
      <FormErrorSummary
        errors={[
          { field: "email", message: "邮箱无效" },
          { field: "password", message: "密码太短" },
        ]}
      />
    )
    expect(screen.getByText("表单中有 2 个错误")).toBeInTheDocument()
  })

  it("calls onJumpTo when clicking a field error", () => {
    const onJumpTo = vi.fn()
    render(
      <FormErrorSummary
        errors={[{ field: "email", message: "邮箱无效" }]}
        onJumpTo={onJumpTo}
      />
    )
    fireEvent.click(screen.getByText("邮箱无效"))
    expect(onJumpTo).toHaveBeenCalledWith("email")
  })

  it("has role=alert", () => {
    render(<FormErrorSummary errors={[{ message: "err" }]} />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })
})
