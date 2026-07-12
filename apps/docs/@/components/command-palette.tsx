"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";

import { useComponentSearch } from "@/components/use-component-search";
import { useLocale } from "@/components/locale-provider";
import { useDict } from "@/hooks/use-dict";
import type { ComponentMeta } from "@/content/components.meta";
import {
  components,
  categoryToPathSegment,
} from "@/content/components.meta";
import { GUIDES } from "@/lib/docs-nav";
import {
  getFavoriteComponents,
  getRecentComponents,
} from "@/lib/component-recents";

type PaletteItem =
  | { kind: "guide"; href: string; title: string; subtitle: string }
  | {
      kind: "component";
      href: string;
      title: string;
      subtitle: string;
      category: string;
      meta: ComponentMeta;
    };

const EMPTY_QUERY_COMPONENT_LIMIT = 12;

/**
 * Cmd+K / Ctrl+K command palette.
 * Searches guide pages + component meta registry (ranked).
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

  const { results, tokens } = useComponentSearch(components, query);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out: PaletteItem[] = [];

    for (const guide of GUIDES) {
      const title = isEn ? guide.titleEn : guide.titleZh;
      const subtitle = isEn ? guide.descriptionEn : guide.descriptionZh;
      const hay =
        `${guide.slug} ${guide.titleEn} ${guide.titleZh} ${guide.descriptionEn} ${guide.descriptionZh}`.toLowerCase();
      if (!q || hay.includes(q)) {
        out.push({
          kind: "guide",
          href: `/docs/${guide.slug}`,
          title,
          subtitle,
        });
      }
    }

    const bySlug = new Map(components.map((c) => [c.slug, c]));
    const pushComp = (comp: ComponentMeta) => {
      out.push({
        kind: "component",
        href: `/components/${categoryToPathSegment(comp.category)}/${encodeURIComponent(comp.slug)}`,
        title: isEn ? comp.name : comp.nameZh || comp.name,
        subtitle: isEn
          ? `${comp.category} · ${comp.slug}`
          : `${comp.name} · ${comp.slug}`,
        category: comp.category,
        meta: comp,
      });
    };

    if (tokens.length === 0) {
      const seen = new Set<string>();
      for (const slug of [
        ...getRecentComponents(),
        ...getFavoriteComponents(),
      ]) {
        if (seen.has(slug)) continue;
        const comp = bySlug.get(slug);
        if (!comp) continue;
        seen.add(slug);
        pushComp(comp);
        if (seen.size >= EMPTY_QUERY_COMPONENT_LIMIT) break;
      }
      // fill with a few isNew if still empty
      if (seen.size === 0) {
        for (const comp of components) {
          if (!comp.isNew) continue;
          pushComp(comp);
          seen.add(comp.slug);
          if (seen.size >= EMPTY_QUERY_COMPONENT_LIMIT) break;
        }
      }
    } else {
      for (const { comp } of results.slice(0, 40)) {
        pushComp(comp);
      }
    }
    return out;
  }, [results, tokens, isEn, query]);

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

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.children[selectedIdx] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [selectedIdx]);

  const navigate = useCallback(
    (item: PaletteItem) => {
      setOpen(false);
      setQuery("");
      router.push(item.href);
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIdx((i) => Math.min(i + 1, Math.max(items.length - 1, 0)));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIdx((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (items[selectedIdx]) navigate(items[selectedIdx]);
          break;
        case "Escape":
          setOpen(false);
          break;
      }
    },
    [items, selectedIdx, navigate],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? "Search docs and components" : "搜索文档与组件"}
    >
      <div
        className="bg-background/70 dark:bg-background/80 absolute inset-0 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="bg-card border-border/60 relative z-10 w-full max-w-xl overflow-hidden rounded-xl border shadow-2xl dark:shadow-black/50">
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

        {items.length === 0 ? (
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
              {items.map((item, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <li
                    key={`${item.kind}-${item.href}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => navigate(item)}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    className={
                      "flex cursor-pointer items-center gap-3 px-4 py-2 text-sm transition-colors " +
                      (isSelected
                        ? "bg-brand-500/10 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300"
                        : "text-foreground hover:bg-muted")
                    }
                  >
                    <span className="text-muted-foreground w-10 shrink-0 text-[10px] font-medium uppercase">
                      {item.kind === "guide"
                        ? isEn
                          ? "Docs"
                          : "文档"
                        : isEn
                          ? "UI"
                          : "组件"}
                    </span>
                    <span className="shrink-0 font-mono text-xs font-semibold">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {item.subtitle}
                    </span>
                    {item.kind === "component" && (
                      <span className="text-muted-foreground ml-auto shrink-0 text-[10px]">
                        {item.category}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="border-border/40 text-muted-foreground flex items-center justify-between border-t px-4 py-2 text-[10px]">
              <span>
                {items.length} {isEn ? "results" : "条结果"}
              </span>
              <span className="hidden sm:inline">{dict.palette.hint}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
