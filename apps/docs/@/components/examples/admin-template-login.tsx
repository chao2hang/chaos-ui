"use client";

import * as React from "react";
import { AuthLayout } from "@chaos_team/chaos-ui/layout";
import { ShieldCheckIcon } from "@chaos_team/chaos-ui/ui-icons";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "@chaos_team/chaos-ui/ui";
import { AdminBrandLogo } from "./admin-template-config";

export function AdminLoginScene({ onSubmit }: { onSubmit: () => void }) {
  const [email, setEmail] = React.useState("admin@example.com");
  const [password, setPassword] = React.useState("demo");

  return (
    <AuthLayout
      variant="split"
      fill="parent"
      background="slate-soft"
      brand={
        <div className="flex max-w-sm flex-col gap-5 p-8">
          <AdminBrandLogo />
          <div className="space-y-2">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
              Marketing Operations Platform
            </p>
            <p className="text-2xl font-semibold tracking-tight">
              把每一笔费用，管得清楚。
            </p>
            <p className="text-muted-foreground text-sm leading-6">
              统一管理客户、订单、物流与费用协作，让团队在一个工作台完成日常运营。
            </p>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <ShieldCheckIcon className="text-success size-4" />
            企业账号安全登录
          </div>
        </div>
      }
      brandClassName="bg-muted/30"
      formMaxWidth="380px"
      footer={<span>清香园营销管理系统 · Demo</span>}
      className="h-full min-h-0"
    >
      <Card className="border-border/80 shadow-sm">
        <CardHeader className="gap-1">
          <CardTitle className="text-xl">欢迎回来</CardTitle>
          <p className="text-muted-foreground text-sm">
            登录后继续处理你的业务工作
          </p>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            <div className="space-y-1.5">
              <label
                className="text-muted-foreground text-xs font-medium"
                htmlFor="admin-demo-email"
              >
                邮箱
              </label>
              <Input
                id="admin-demo-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="请输入工作邮箱"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-muted-foreground text-xs font-medium"
                  htmlFor="admin-demo-password"
                >
                  密码
                </label>
                <button
                  type="button"
                  className="text-primary text-xs hover:underline"
                >
                  忘记密码？
                </button>
              </div>
              <Input
                id="admin-demo-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="请输入密码"
              />
            </div>
            <Button type="submit" className="w-full">
              登录系统
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
