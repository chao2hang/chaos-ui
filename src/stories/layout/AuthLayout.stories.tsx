import type { Meta, StoryObj } from "@storybook/react";
import { AuthLayout } from "@/components/layout/auth-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Layouts/AuthLayout",
  component: AuthLayout,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button className="w-full">Sign In</Button>
        </CardContent>
      </Card>
    </AuthLayout>
  ),
};

export const SignUp: Story = {
  render: () => (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email2">Email</Label>
            <Input id="email2" type="email" placeholder="Your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password2">Password</Label>
            <Input
              id="password2"
              type="password"
              placeholder="Create password"
            />
          </div>
          <Button className="w-full">Sign Up</Button>
        </CardContent>
      </Card>
    </AuthLayout>
  ),
};

export const SplitBackgroundSlate: Story = {
  name: "Split — Slate Background",
  render: () => (
    <AuthLayout
      variant="split"
      background="slate"
      brand={
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-2xl font-bold text-white">
            C
          </div>
          <div className="text-xl font-semibold">Chaos UI</div>
          <div className="text-muted-foreground max-w-sm text-sm">
            Enterprise management platform
          </div>
        </div>
      }
    >
      <Card shadow="2xl">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-slate">Email</Label>
            <Input
              id="email-slate"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-slate">Password</Label>
            <Input
              id="password-slate"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button className="w-full">Sign In</Button>
        </CardContent>
      </Card>
    </AuthLayout>
  ),
};

export const SplitBackgroundCustom: Story = {
  name: "Split — Custom CSS Background",
  render: () => (
    <AuthLayout
      variant="split"
      background="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      brand={
        <div className="flex flex-col items-center gap-4 p-8 text-center text-white">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-2xl font-bold">
            C
          </div>
          <div className="text-xl font-semibold">Chaos UI</div>
          <div className="max-w-sm text-sm text-slate-300">
            Enterprise management platform
          </div>
        </div>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-custom">Email</Label>
            <Input
              id="email-custom"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <Button className="w-full">Sign In</Button>
        </CardContent>
      </Card>
    </AuthLayout>
  ),
};

export const CenteredBackgroundSlateSoft: Story = {
  name: "Centered — Slate Soft Background",
  render: () => (
    <AuthLayout background="slate-soft">
      <Card shadow="brand">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-soft">Email</Label>
            <Input
              id="email-soft"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <Button className="w-full">Sign In</Button>
        </CardContent>
      </Card>
    </AuthLayout>
  ),
};
