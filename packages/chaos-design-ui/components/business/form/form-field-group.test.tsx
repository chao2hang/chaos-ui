import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { FormFieldGroup } from "./form-field-group"

describe("FormFieldGroup", () => {
  it("renders legend", () => {
    render(<FormFieldGroup legend="个人信息"><div>field</div></FormFieldGroup>)
    expect(screen.getByText("个人信息")).toBeInTheDocument()
  })

  it("renders description", () => {
    render(
      <FormFieldGroup legend="个人信息" description="您的基本信息">
        <div>field</div>
      </FormFieldGroup>
    )
    expect(screen.getByText("您的基本信息")).toBeInTheDocument()
  })

  it("shows required marker", () => {
    const { container } = render(
      <FormFieldGroup legend="个人信息" required>
        <div>field</div>
      </FormFieldGroup>
    )
    expect(container.textContent).toContain("*")
  })

  it("renders in 2 columns", () => {
    const { container } = render(
      <FormFieldGroup legend="个人信息" columns={2}>
        <div>field1</div>
        <div>field2</div>
      </FormFieldGroup>
    )
    const grid = container.querySelector(".sm\\:grid-cols-2")
    expect(grid).toBeInTheDocument()
  })
})
