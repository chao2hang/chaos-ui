import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ProfileHeader, ProfileForm } from "./profile"

describe("ProfileHeader", () => {
  it("renders user name", () => {
    render(<ProfileHeader user={{ name: "李雷" }} />)
    expect(screen.getByText("李雷")).toBeInTheDocument()
  })

  it("renders email and role", () => {
    render(
      <ProfileHeader
        user={{ name: "Alice", email: "a@x.com", role: "工程师" }}
      />,
    )
    expect(screen.getByText("a@x.com")).toBeInTheDocument()
    expect(screen.getByText("工程师")).toBeInTheDocument()
  })

  it("renders stats when provided", () => {
    render(
      <ProfileHeader
        user={{ name: "X" }}
        stats={[
          { label: "项目", value: 5 },
          { label: "粉丝", value: 100 },
        ]}
      />,
    )
    expect(screen.getByText("项目")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
  })

  it("renders actions slot", () => {
    render(
      <ProfileHeader
        user={{ name: "X" }}
        actions={<button>关注</button>}
      />,
    )
    expect(screen.getByText("关注")).toBeInTheDocument()
  })

  it("applies data-slot attribute", () => {
    const { container } = render(<ProfileHeader user={{ name: "X" }} />)
    expect(container.querySelector('[data-slot="profile-header"]')).toBeInTheDocument()
  })
})

describe("ProfileForm", () => {
  it("renders all fields", () => {
    render(
      <ProfileForm
        fields={[
          { name: "name", label: "姓名" },
          { name: "email", label: "邮箱", type: "email" },
        ]}
      />,
    )
    expect(screen.getByLabelText("姓名")).toBeInTheDocument()
    expect(screen.getByLabelText("邮箱")).toBeInTheDocument()
  })

  it("populates default values", () => {
    render(
      <ProfileForm
        fields={[{ name: "name", label: "姓名", defaultValue: "李雷" }]}
      />,
    )
    const input = screen.getByLabelText("姓名") as HTMLInputElement
    expect(input.value).toBe("李雷")
  })

  it("calls onSubmit with values on submit", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <ProfileForm
        fields={[
          { name: "name", label: "姓名", defaultValue: "李雷" },
        ]}
        onSubmit={handle}
      />,
    )
    await user.click(screen.getByText("保存"))
    expect(handle).toHaveBeenCalledWith({ name: "李雷" })
  })
})
