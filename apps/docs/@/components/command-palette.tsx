"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";

import { useComponentSearch } from "@/components/use-component-search";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";
import type { ComponentMeta } from "@/content/components.meta";
import { CATEGORIES, components } from "@/content/components.meta";

/**
 * Cmd+K / Ctrl+K 命令面板（Linear 风格）。
 *
 * - 全局快捷键：Meta+k / Ctrl+k 打开
 * - 半透明遮罩 + 居中浮层
 * - 实时搜索过滤，键盘 ↑↓ 导航
 * - Enter 跳转到组件详情页，Escape 关闭
 *
 * 直接导入 components 元数据（497 个条目仅约 40KB），挂载在根 layout 中。
 */
export function CommandPalette() {
  const { locale } = useLocale();
  const dict = useDict();
  const router = useRouter();
  const isEn = locale === "en";

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { grouped } = useComponentSearch(components, query);

  // 展开所有匹配结果为扁平列表
  const results = useRef<ComponentMeta[]>([]);
  results.current = [];
  for (const cat of CATEGORIES) {
    results.current.push(...(grouped.get(cat) ?? []));
  }
  const flatResults = results.current;

  // 打开/关闭快捷键
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIdx(0);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // 打开时自动聚焦输入框
  useEffect(() => {
    if (open) {
      // 延迟聚焦，确保 DOM 已渲染
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // 重置选中索引当结果变化
  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  // 滚动选中项到可视区
  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.children[selectedIdx] as
      HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [selectedIdx]);

  const navigate = useCallback(
    (comp: ComponentMeta) => {
      const href = `/components/${encodeURIComponent(comp.category)}/${encodeURIComponent(comp.slug)}`;
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIdx((i) => Math.min(i + 1, flatResults.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIdx((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[selectedIdx]) {
            navigate(flatResults[selectedIdx]);
          }
          break;
        case "Escape":
          setOpen(false);
          break;
      }
    },
    [flatResults, selectedIdx, navigate],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? "Search components" : "搜索组件"}
    >
      {/* 遮罩 */}
      <div
        className="bg-background/70 dark:bg-background/80 absolute inset-0 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* 面板 */}
      <div className="bg-card border-border/60 relative z-10 w-full max-w-xl overflow-hidden rounded-xl border shadow-2xl dark:shadow-black/50">
        {/* 搜索框 */}
        <div className="border-border/40 flex items-center gap-3 border-b px-4 py-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground size-4 shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={dict.palette.searchPlaceholder}
            className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="text-muted-foreground bg-muted hidden rounded px-1.5 py-0.5 font-mono text-[10px] sm:inline-block">
            Esc
          </kbd>
        </div>

        {/* 结果列表 */}
        {flatResults.length === 0 ? (
          <div className="text-muted-foreground px-4 py-12 text-center text-sm">
            {dict.palette.noResults}
          </div>
        ) : (
          <>
            <ul
              ref={listRef}
              className="max-h-80 overflow-auto py-2"
              role="listbox"
            >
              {flatResults.map((comp, idx) => {
                const isSelected = idx === selectedIdx;
                const displayName = isEn ? comp.name : comp.nameZh || comp.name;
                const subName = isEn && comp.nameZh ? comp.nameZh : undefined;
                return (
                  <li
                    key={`${comp.category}-${comp.slug}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => navigate(comp)}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    className={
                      "flex cursor-pointer items-center gap-3 px-4 py-2 text-sm transition-colors " +
                      (isSelected
                        ? "bg-brand-500/10 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300"
                        : "text-foreground hover:bg-muted")
                    }
                  >
                    <span className="shrink-0 font-mono text-xs font-semibold">
                      {displayName}
                    </span>
                    {subName && (
                      <span className="text-muted-foreground text-xs">
                        {subName}
                      </span>
                    )}
                    <span className="text-muted-foreground ml-auto shrink-0 text-[10px]">
                      {(comp as ComponentMeta & { category: string }).category}
                    </span>
                  </li>
                );
              })}
            </ul>
            {/* 底部提示 */}
            <div className="border-border/40 text-muted-foreground flex items-center justify-between border-t px-4 py-2 text-[10px]">
              <span>
                {flatResults.length} {isEn ? "components" : "个组件"}
              </span>
              <span className="hidden sm:inline">{dict.palette.hint}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
