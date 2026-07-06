import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { ChatCardMessage } from "@/components/business/chat-card-message";

const meta = {
  title: "Business/Chat/ChatCardMessage",
  component: ChatCardMessage,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatCardMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Product card with thumbnail, metadata, and a CTA action. */
export const ProductCard: Story = {
  args: {
    title: 'MacBook Pro 14" M3',
    description: "Space Black • 16GB RAM • 512GB SSD",
    thumbnail: "https://placehold.co/96x96/1e293b/ffffff?text=MB",
    metadata: [
      { label: "价格", value: "¥14,999" },
      { label: "库存", value: "现货" },
      { label: "评分", value: "4.8 / 5" },
    ],
    actions: (
      <>
        <Button size="sm" variant="outline">
          查看详情
        </Button>
        <Button size="sm">立即购买</Button>
      </>
    ),
  },
};

/** Article recommendation without thumbnail. */
export const Article: Story = {
  args: {
    title: "Understanding Merkle Trees in 5 Minutes",
    description:
      "A practical introduction to the data structure powering Git, Bitcoin, and IPFS.",
    metadata: [
      { label: "作者", value: "Alice Chen" },
      { label: "阅读时长", value: "5 分钟" },
    ],
    actions: (
      <Button size="sm" variant="outline">
        阅读全文
      </Button>
    ),
  },
};

/** Minimal card — title only. */
export const Minimal: Story = {
  args: {
    title: "Untitled attachment",
  },
};

/** Card with many metadata rows. */
export const RichMetadata: Story = {
  args: {
    title: "Q3 财务报告",
    description: "2026 年第三季度综合业绩总结",
    thumbnail: "https://placehold.co/96x96/3b82f6/ffffff?text=Q3",
    metadata: [
      { label: "文件类型", value: "PDF" },
      { label: "文件大小", value: "4.2 MB" },
      { label: "更新时间", value: "2026-10-05" },
      { label: "上传者", value: "财务部" },
      { label: "版本", value: "v3.1" },
    ],
  },
};
