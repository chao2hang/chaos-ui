import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ErrorPage } from "./error-page"

describe("ErrorPage", () => {
  it("renders default 404 content", () => {
    render(<ErrorPage status={404} />)
    expect(screen.getByText("404")).toBeInTheDocument()
    expect(screen.getByText("页面不存在")).toBeInTheDocument()
  })

  it("renders default 500 content", () => {
    render(<ErrorPage status={500} />)
    expect(screen.getByText("500")).toBeInTheDocument()
    expect(screen.getByText("服务异常")).toBeInTheDocument()
  })

  it("renders default 403 content", () => {
    render(<ErrorPage status={403} />)
    expect(screen.getByText("403")).toBeInTheDocument()
    expect(screen.getByText("无权访问")).toBeInTheDocument()
  })

  it("renders custom title and description", () => {
    render(
      <ErrorPage
        status={404}
        title="我的标题"
        description="我的描述"
      />,
    )
    expect(screen.getByText("我的标题")).toBeInTheDocument()
    expect(screen.getByText("我的描述")).toBeInTheDocument()
  })

  it("applies data-slot attribute", () => {
    const { container } = render(<ErrorPage status={404} />)
    expect(container.querySelector('[data-slot="error-page"]')).toBeInTheDocument()
  })
})
