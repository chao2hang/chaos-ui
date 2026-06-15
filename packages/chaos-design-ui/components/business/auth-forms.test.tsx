import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  SignInForm,
  SignUpForm,
  ForgotPasswordForm,
} from "./auth-forms"

describe("SignInForm", () => {
  it("renders email and password inputs", () => {
    render(<SignInForm />)
    expect(screen.getByLabelText("邮箱")).toBeInTheDocument()
    expect(screen.getByLabelText("密码")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "登录" })).toBeInTheDocument()
  })

  it("renders remember checkbox and signup link when provided", () => {
    render(<SignInForm signupHref="/signup" forgotHref="/forgot" />)
    expect(screen.getByLabelText("记住我")).toBeInTheDocument()
    expect(screen.getByText("忘记密码？")).toBeInTheDocument()
    expect(screen.getByText("注册")).toBeInTheDocument()
  })

  it("calls onSubmit with form values on submit", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<SignInForm onSubmit={handle} />)
    await user.type(screen.getByLabelText("邮箱"), "user@example.com")
    await user.type(screen.getByLabelText("密码"), "secret123")
    await user.click(screen.getByRole("button", { name: "登录" }))
    expect(handle).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret123",
      remember: false,
    })
  })

  it("includes remember=true when checkbox is checked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<SignInForm onSubmit={handle} />)
    await user.type(screen.getByLabelText("邮箱"), "u@e.com")
    await user.type(screen.getByLabelText("密码"), "pw")
    await user.click(screen.getByLabelText("记住我"))
    await user.click(screen.getByRole("button", { name: "登录" }))
    expect(handle).toHaveBeenCalledWith(
      expect.objectContaining({ remember: true }),
    )
  })

  it("renders SSO provider buttons when provided", () => {
    render(
      <SignInForm
        ssoProviders={[
          { id: "google", label: "Google" },
          { id: "github", label: "GitHub" },
        ]}
      />,
    )
    expect(screen.getByRole("button", { name: /Google/ })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /GitHub/ })).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<SignInForm className="custom-signin" />)
    const form = container.querySelector("form")
    expect(form?.className).toContain("custom-signin")
  })
})

describe("SignUpForm", () => {
  it("renders name, email, password inputs and submit button", () => {
    render(<SignUpForm />)
    expect(screen.getByLabelText("姓名")).toBeInTheDocument()
    expect(screen.getByLabelText("邮箱")).toBeInTheDocument()
    expect(screen.getByLabelText("密码")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "创建账号" })).toBeInTheDocument()
  })

  it("calls onSubmit with form values", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<SignUpForm onSubmit={handle} />)
    await user.type(screen.getByLabelText("姓名"), "张三")
    await user.type(screen.getByLabelText("邮箱"), "z@e.com")
    await user.type(screen.getByLabelText("密码"), "password1")
    await user.click(screen.getByRole("button", { name: "创建账号" }))
    expect(handle).toHaveBeenCalledWith({
      name: "张三",
      email: "z@e.com",
      password: "password1",
    })
  })

  it("renders signin link when signinHref provided", () => {
    render(<SignUpForm signinHref="/signin" />)
    expect(screen.getByText("登录")).toBeInTheDocument()
  })
})

describe("ForgotPasswordForm", () => {
  it("renders email input and submit button", () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByLabelText("邮箱")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "发送重置链接" }),
    ).toBeInTheDocument()
  })

  it("calls onSubmit with email value", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<ForgotPasswordForm onSubmit={handle} />)
    await user.type(screen.getByLabelText("邮箱"), "forgot@example.com")
    await user.click(screen.getByRole("button", { name: "发送重置链接" }))
    expect(handle).toHaveBeenCalledWith("forgot@example.com")
  })

  it("applies custom className", () => {
    const { container } = render(
      <ForgotPasswordForm className="custom-forgot" />,
    )
    const form = container.querySelector("form")
    expect(form?.className).toContain("custom-forgot")
  })
})
