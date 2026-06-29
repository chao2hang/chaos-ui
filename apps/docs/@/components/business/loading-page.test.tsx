import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { LoadingPage, FullPageLoader } from "./loading-page"

describe("LoadingPage", () => {
  it("renders default title and has status role", () => {
    const { container } = render(<LoadingPage />)
    expect(container.querySelector('[role="status"]')).toBeInTheDocument()
    expect(screen.getByText("加载中...")).toBeInTheDocument()
  })

  it("renders custom title and description", () => {
    render(<LoadingPage title="数据加载中" description="请稍候" />)
    expect(screen.getByText("数据加载中")).toBeInTheDocument()
    expect(screen.getByText("请稍候")).toBeInTheDocument()
  })

  it("renders dots variant with 3 dots", () => {
    const { container } = render(<LoadingPage variant="dots" />)
    const dots = container.querySelectorAll(".animate-bounce")
    expect(dots.length).toBe(3)
  })

  it("renders pulse variant", () => {
    const { container } = render(<LoadingPage variant="pulse" />)
    expect(container.querySelector(".animate-ping")).toBeInTheDocument()
  })

  it("applies data-slot attribute", () => {
    const { container } = render(<LoadingPage />)
    expect(container.querySelector('[data-slot="loading-page"]')).toBeInTheDocument()
  })
})

describe("FullPageLoader", () => {
  it("renders loader when show is true", () => {
    const { container } = render(
      <FullPageLoader>
        <div>child</div>
      </FullPageLoader>,
    )
    expect(container.querySelector(".animate-spin")).toBeInTheDocument()
  })

  it("renders children only when show is false", () => {
    render(
      <FullPageLoader show={false}>
        <div>only-child</div>
      </FullPageLoader>,
    )
    expect(screen.getByText("only-child")).toBeInTheDocument()
  })
})
