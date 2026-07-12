import { ComponentExplorer } from "@/components/component-explorer";
import { components } from "@/content/components.meta";
import { getServerLocale } from "@/lib/i18n/get-server-locale";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const isEn = locale === "en";
  return {
    title: isEn
      ? "Components Overview · Chaos UI"
      : "组件总览 · Components · Chaos UI",
    description: isEn
      ? "Chaos UI components overview — searchable catalog: General / Layout / Navigation / Form / DataDisplay / Feedback / Business / System Layout / Mobile."
      : "Chaos UI 组件总览页 — 可搜索分区目录：通用 / 布局 / 导航 / 表单 / 数据展示 / 反馈 / 业务 / 系统布局 / 移动端。",
  };
}

/**
 * /components — 统一探索器布局，直接撑满 viewport。
 */
export default async function ComponentsOverviewPage() {
  await getServerLocale();
  return <ComponentExplorer components={components} />;
}
