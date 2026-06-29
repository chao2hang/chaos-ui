"use client";

import * as React from "react";

/**
 * @hook usePageTitle
 * @category hooks/browser
 * @since 0.5.0
 * @description Sets `document.title` with a template. Eliminates the manual
 * `useEffect(() => { document.title = ... }, [pathname])` pattern.
 * / 设置页面标题，自动拼接 title template，消除手动 useEffect 模式
 * @keywords title, page, document, browser, hook
 * @example
 * usePageTitle("订单列表", { template: "{title} · 清香园营销管理系统" })
 * // → "订单列表 · 清香园营销管理系统"
 */

interface UsePageTitleOptions {
  /** Title template. `{title}` placeholder is replaced with the title arg.
   * / 标题模板，{title} 占位符会被替换 */
  template?: string;
  /** Fallback title when no title is provided / 无标题时的回退值 */
  defaultTitle?: string;
}

function usePageTitle(
  title?: string,
  { template = "{title}", defaultTitle = "" }: UsePageTitleOptions = {},
) {
  React.useEffect(() => {
    const resolved = title ?? defaultTitle;
    document.title = resolved
      ? template.replace("{title}", resolved)
      : defaultTitle || template.replace("{title}", "");
  }, [title, template, defaultTitle]);
}

export { usePageTitle };
export type { UsePageTitleOptions };