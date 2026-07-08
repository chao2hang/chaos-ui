import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { KnowledgeBase } from "@/components/ui/knowledge-base";
import type { WikiCategory, WikiArticle } from "@/components/ui/knowledge-base";

const sampleData: (WikiCategory | WikiArticle)[] = [
  {
    id: "cat-1",
    name: "快速开始",
    children: [
      { id: "a1", title: "安装指南", excerpt: "如何安装 Chaos UI" },
      { id: "a2", title: "快速上手", excerpt: "5分钟快速上手" },
    ],
  },
  {
    id: "cat-2",
    name: "API 文档",
    children: [
      { id: "a3", title: "Button", excerpt: "按钮组件 API", content: "Button 组件文档..." },
    ],
  },
];

describe("KnowledgeBase", () => {
  it("renders categories", () => {
    const { container } = render(<KnowledgeBase data={sampleData} />);
    expect(container.textContent).toContain("快速开始");
    expect(container.textContent).toContain("API 文档");
  });

  it("expands category on click", async () => {
    const { container } = render(<KnowledgeBase data={sampleData} />);

    // Click on first category
    const cat = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("快速开始"),
    );
    expect(cat).not.toBeNull();

    await act(async () => {
      if (cat) fireEvent.click(cat);
    });

    expect(container.textContent).toContain("安装指南");
  });

  it("selects an article on click", async () => {
    const onSelectArticle = vi.fn();
    const { container } = render(
      <KnowledgeBase data={sampleData} onSelectArticle={onSelectArticle} />,
    );

    // Expand category first
    const cat = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("快速开始"),
    );
    await act(async () => {
      if (cat) fireEvent.click(cat);
    });

    // Click article
    const article = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("安装指南"),
    );
    expect(article).not.toBeNull();

    await act(async () => {
      if (article) fireEvent.click(article);
    });

    expect(onSelectArticle).toHaveBeenCalled();
  });

  it("filters articles by search", async () => {
    const { container } = render(
      <KnowledgeBase data={sampleData} searchable />,
    );

    const input = container.querySelector('input[placeholder="搜索文章..."]');
    expect(input).not.toBeNull();

    await act(async () => {
      if (input) fireEvent.change(input, { target: { value: "Button" } });
    });

    expect(container.textContent).toContain("Button");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/knowledge-base");
    expect(mod.KnowledgeBase).toBeDefined();
  });
});
