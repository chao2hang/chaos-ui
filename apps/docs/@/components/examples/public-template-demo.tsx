"use client";

import * as React from "react";
import {
  ArticleLayout,
  AuthLayout,
  PublicLayout,
} from "@chaos_team/chaos-ui/layout";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "@chaos_team/chaos-ui/ui";

export type PublicSceneId = "home" | "article" | "auth";

export type PublicTemplateDemoProps = {
  scene: PublicSceneId;
  onSceneChange: (scene: PublicSceneId) => void;
};

const FEATURES = [
  {
    title: "组件体系",
    description: "布局、表单、业务壳层统一设计语言，开箱即用。",
  },
  {
    title: "模板组合",
    description: "Public / Article / Auth 等模板可直接拼装落地页。",
  },
  {
    title: "文档预览",
    description: "场景切换演示真实交互，无需离开文档站点。",
  },
] as const;

const ARTICLE_SECTIONS = [
  {
    id: "intro",
    title: "简介",
    body: "本文演示 ArticleLayout 在文档预览中的排版：居中正文、可选标题与右侧目录。",
  },
  {
    id: "structure",
    title: "结构",
    body: "标题区、正文段落与 sticky TOC 协同工作；窄屏下目录自动隐藏，保证阅读宽度。",
  },
  {
    id: "usage",
    title: "使用建议",
    body: "将长文内容放入 children，toc 传入目录节点即可。返回按钮由外层场景控制，避免真实路由跳转。",
  },
] as const;

function HomeScene({
  onLogin,
  onReadArticle,
}: {
  onLogin: () => void;
  onReadArticle: () => void;
}) {
  return (
    <PublicLayout
      className="h-full min-h-0"
      logo={<span className="text-sm font-bold">Chaos UI</span>}
      nav={[]}
      headerActions={
        <Button type="button" size="sm" onClick={onLogin}>
          登录
        </Button>
      }
      footer={
        <div className="container mx-auto flex flex-col gap-1 px-4 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Chaos UI</span>
          <span className="text-xs">Public template demo</span>
        </div>
      }
    >
      <section className="border-b">
        <div className="container mx-auto flex flex-col items-start gap-4 px-4 py-16 sm:py-20">
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            Public Template
          </p>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            面向公众的落地页与内容模板
          </h1>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed sm:text-base">
            组合 PublicLayout、Hero、功能卡片与页脚，演示营销首页到文章与登录的场景流转。
          </p>
          <Button type="button" onClick={onReadArticle}>
            阅读文章
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

function ArticleScene({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-background flex h-full min-h-0 flex-col">
      <div className="border-b px-4 py-3">
        <div className="mx-auto flex w-full max-w-3xl">
          <Button type="button" variant="ghost" size="sm" onClick={onBack}>
            返回首页
          </Button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        <ArticleLayout
          title={
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Chaos UI 公共模板指南
              </h1>
              <p className="text-muted-foreground text-sm">
                使用 ArticleLayout 组织长文内容与目录
              </p>
            </div>
          }
          toc={
            <nav className="space-y-2 text-sm">
              <div className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                目录
              </div>
              {ARTICLE_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-muted-foreground hover:text-foreground block transition-colors"
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById(section.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          }
        >
          <div className="space-y-8">
            {ARTICLE_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="space-y-2">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </ArticleLayout>
      </div>
    </div>
  );
}

function AuthScene({ onHome }: { onHome: () => void }) {
  const [mode, setMode] = React.useState<"login" | "register">("login");
  const [email, setEmail] = React.useState("user@example.com");
  const [password, setPassword] = React.useState("demo");

  return (
    <AuthLayout variant="centered" className="h-full min-h-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {mode === "login" ? "登录" : "注册"} Chaos UI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              onHome();
            }}
          >
            <div className="space-y-1.5">
              <label
                className="text-muted-foreground text-xs font-medium"
                htmlFor="public-demo-email"
              >
                邮箱
              </label>
              <Input
                id="public-demo-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="user@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-muted-foreground text-xs font-medium"
                htmlFor="public-demo-password"
              >
                密码
              </label>
              <Input
                id="public-demo-password"
                type="password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full">
              {mode === "login" ? "登录" : "注册并进入"}
            </Button>
            <div className="flex items-center justify-between gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setMode((current) =>
                    current === "login" ? "register" : "login",
                  )
                }
              >
                {mode === "login" ? "没有账号？注册" : "已有账号？登录"}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={onHome}>
                返回
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export function PublicTemplateDemo({
  scene,
  onSceneChange,
}: PublicTemplateDemoProps) {
  return (
    <div className="h-full min-h-0 overflow-auto">
      {scene === "home" ? (
        <HomeScene
          onLogin={() => onSceneChange("auth")}
          onReadArticle={() => onSceneChange("article")}
        />
      ) : null}
      {scene === "article" ? (
        <ArticleScene onBack={() => onSceneChange("home")} />
      ) : null}
      {scene === "auth" ? (
        <AuthScene onHome={() => onSceneChange("home")} />
      ) : null}
    </div>
  );
}
