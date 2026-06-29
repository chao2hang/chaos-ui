import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CopyButton } from "./copy-button"

describe("CopyButton", () => {
  it("renders with default label", () => {
    render(<CopyButton text="hello" />)
    expect(screen.getByText("复制")).toBeInTheDocument()
  })

  it("renders with custom label", () => {
    render(<CopyButton text="hello" label="Copy" />)
    expect(screen.getByText("Copy")).toBeInTheDocument()
  })

  it("renders as a button", () => {
    render(<CopyButton text="hello" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <CopyButton text="hello" className="custom-copy" />,
    )
    expect(container.querySelector(".custom-copy")).toBeInTheDocument()
  })
})
