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

const meta: Meta<typeof AuthLayout> = {
  title: "Layouts/AuthLayout",
  component: AuthLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

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
