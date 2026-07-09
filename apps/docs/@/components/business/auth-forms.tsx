"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  onSubmit?: (values: {
    email: string;
    password: string;
    remember?: boolean;
  }) => void;
  ssoProviders?: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  signupHref?: string;
  forgotHref?: string;
  className?: string;
}

export function SignInForm({
  onSubmit,
  ssoProviders = [],
  signupHref,
  forgotHref,
  className,
  ...props
}: SignInFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit?.({
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
      remember: fd.get("remember") === "on",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="space-y-1.5">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">密码</Label>
          {forgotHref && (
            <Link
              href={forgotHref}
              className="text-primary text-xs hover:underline"
            >
              忘记密码？
            </Link>
          )}
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="remember" className="size-4" />
        记住我
      </label>
      <Button type="submit" className="w-full">
        登录
      </Button>
      {ssoProviders && ssoProviders.length > 0 && (
        <>
          <div className="text-muted-foreground relative my-2 text-center text-xs">
            <span className="bg-background px-2">或</span>
            <div className="bg-border absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2" />
          </div>
          <div className="grid gap-2">
            {ssoProviders.map((p) => (
              <Button
                key={p.id}
                type="button"
                variant="outline"
                className="w-full"
              >
                {p.icon} {p.label}
              </Button>
            ))}
          </div>
        </>
      )}
      {signupHref && (
        <p className="text-muted-foreground text-center text-sm">
          还没有账号？{" "}
          <Link href={signupHref} className="text-primary hover:underline">
            注册
          </Link>
        </p>
      )}
    </form>
  );
}

interface SignUpFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  onSubmit?: (values: {
    name: string;
    email: string;
    password: string;
  }) => void;
  signinHref?: string;
  className?: string;
}

export function SignUpForm({
  onSubmit,
  signinHref,
  className,
  ...props
}: SignUpFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit?.({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="space-y-1.5">
        <Label htmlFor="name">姓名</Label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      <Button type="submit" className="w-full">
        创建账号
      </Button>
      {signinHref && (
        <p className="text-muted-foreground text-center text-sm">
          已有账号？{" "}
          <Link href={signinHref} className="text-primary hover:underline">
            登录
          </Link>
        </p>
      )}
    </form>
  );
}

interface ForgotPasswordFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  onSubmit?: (email: string) => void;
  className?: string;
}

export function ForgotPasswordForm({
  onSubmit,
  className,
  ...props
}: ForgotPasswordFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(String(new FormData(e.currentTarget).get("email") ?? ""));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="space-y-1.5">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <Button type="submit" className="w-full">
        发送重置链接
      </Button>
    </form>
  );
}
