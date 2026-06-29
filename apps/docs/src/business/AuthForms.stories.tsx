import type { Meta, StoryObj } from "@storybook/react"
import {
  SignInForm,
  SignUpForm,
  ForgotPasswordForm,
} from "@/components/business/auth-forms"

const meta = {
  title: "Business/AuthForms",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SignIn: Story = {
  render: () => (
    <div className="max-w-sm rounded-md border bg-card p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold">登录账号</h2>
      <p className="mb-4 text-sm text-muted-foreground">输入您的邮箱和密码以继续</p>
      <SignInForm
        signupHref="/signup"
        forgotHref="/forgot"
        ssoProviders={[
          { id: "google", label: "Google" },
          { id: "github", label: "GitHub" },
        ]}
        onSubmit={(values) => console.info("signin", values)}
      />
    </div>
  ),
}

export const SignInMinimal: Story = {
  render: () => (
    <div className="max-w-sm rounded-md border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">登录</h2>
      <SignInForm onSubmit={(v) => console.info(v)} />
    </div>
  ),
}

export const SignUp: Story = {
  render: () => (
    <div className="max-w-sm rounded-md border bg-card p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold">创建账号</h2>
      <p className="mb-4 text-sm text-muted-foreground">几秒钟即可开始使用</p>
      <SignUpForm
        signinHref="/signin"
        onSubmit={(values) => console.info("signup", values)}
      />
    </div>
  ),
}

export const ForgotPassword: Story = {
  render: () => (
    <div className="max-w-sm rounded-md border bg-card p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold">重置密码</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        填写注册邮箱，我们会向您发送重置链接
      </p>
      <ForgotPasswordForm onSubmit={(email) => console.info("forgot", email)} />
    </div>
  ),
}

export const AllForms: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-6 md:grid-cols-3">
      <div className="rounded-md border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">登录</h2>
        <SignInForm onSubmit={(v) => console.info("signin", v)} />
      </div>
      <div className="rounded-md border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">注册</h2>
        <SignUpForm onSubmit={(v) => console.info("signup", v)} />
      </div>
      <div className="rounded-md border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">忘记密码</h2>
        <ForgotPasswordForm onSubmit={(v) => console.info("forgot", v)} />
      </div>
    </div>
  ),
}

export const Dark: Story = {
  ...AllForms,
  parameters: { backgrounds: { default: "dark" } },
}
