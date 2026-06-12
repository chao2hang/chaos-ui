import type { Meta, StoryObj } from "@storybook/react"
import { CommentThread } from "@/components/business/comment-thread"
import { ApprovalFlow } from "@/components/business/approval-flow"
import { AuditLog } from "@/components/business/audit-log"
import { PresenceIndicators } from "@/components/business/presence-indicators"
import { ChatMessageList, ChatComposer } from "@/components/business/chat"
import { useState } from "react"

const comments = [
  {
    id: "1",
    author: { name: "李雷" },
    content: "这个版本的样式看起来不错，但建议把标题字体再放大一点。",
    timestamp: Date.now() - 3600_000,
    reactions: [
      { emoji: "👍", count: 3, reacted: true },
      { emoji: "🎉", count: 1 },
    ],
    replies: [
      { id: "1-1", author: { name: "韩梅梅" }, content: "同意，标题 18px 更合适。", timestamp: Date.now() - 1800_000 },
    ],
  },
  {
    id: "2",
    author: { name: "张伟" },
    content: "主色用 #6366f1 还是 #4f46e5？设计师确认一下。",
    timestamp: Date.now() - 600_000,
    reactions: [{ emoji: "👀", count: 2 }],
  },
]

const steps = [
  { id: "1", name: "直属经理审批", approver: { name: "王经理" }, status: "approved" as const, timestamp: Date.now() - 86400_000, comment: "同意" },
  { id: "2", name: "部门总监审批", approver: { name: "李总监" }, status: "approved" as const, timestamp: Date.now() - 3600_000, comment: "符合规范" },
  { id: "3", name: "财务复核", approver: { name: "陈财务" }, status: "pending" as const },
  { id: "4", name: "CEO 终批", approver: { name: "CEO" }, status: "pending" as const },
]

const audit = [
  { id: "1", actor: { name: "Alice" }, action: "create", target: "Order #1234", timestamp: Date.now() - 3600_000, changes: [{ field: "amount", before: "0", after: "1000" }] },
  { id: "2", actor: { name: "Bob" }, action: "update", target: "Order #1234", timestamp: Date.now() - 1800_000, changes: [{ field: "status", before: "pending", after: "approved" }] },
  { id: "3", actor: { name: "Charlie" }, action: "delete", target: "Old Order #567", timestamp: Date.now() - 600_000 },
  { id: "4", actor: { name: "Alice" }, action: "login", target: undefined, timestamp: Date.now() - 60_000, ip: "192.168.1.100" },
]

const presenceUsers = [
  { id: "1", name: "李雷", status: "online" as const },
  { id: "2", name: "韩梅梅", status: "online" as const },
  { id: "3", name: "张伟", status: "typing" as const },
  { id: "4", name: "王芳", status: "away" as const },
  { id: "5", name: "刘洋", status: "busy" as const },
  { id: "6", name: "陈晨", status: "offline" as const, lastSeen: Date.now() - 86400_000 },
  { id: "7", name: "周晓", status: "online" as const },
  { id: "8", name: "吴磊", status: "online" as const },
]

const messages = [
  { id: "1", author: { name: "李雷" }, content: "下午开会吗？", timestamp: Date.now() - 600_000 },
  { id: "2", author: { name: "韩梅梅" }, content: "开，3 点 5F 会议室。", timestamp: Date.now() - 500_000 },
  { id: "3", author: { name: "李雷" }, content: "好的，我准备一下 Q1 报告。", timestamp: Date.now() - 400_000, read: true },
  { id: "4", author: { name: "system" }, content: "韩梅梅 创建了新文档《Q1 OKR》", timestamp: Date.now() - 300_000, type: "system" as const },
  { id: "5", author: { name: "张伟" }, content: "我也来。", timestamp: Date.now() - 100_000 },
]

export default {
  title: "Business/Collaboration",
  parameters: { layout: "padded" },
} satisfies Meta

export const CommentsExample: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <CommentThread
        comments={comments}
        onReply={(pid, content) => alert(`回复 ${pid}: ${content}`)}
        onReact={(cid, emoji) => alert(`${cid} 表情 ${emoji}`)}
      />
    </div>
  ),
}

export const ApprovalExample: StoryObj = {
  render: () => {
    const [current, setCurrent] = useState(2)
    return (
      <div className="max-w-2xl space-y-3">
        <ApprovalFlow
          steps={steps}
          currentStep={current}
          onApprove={() => setCurrent((c) => c + 1)}
          onReject={() => alert("已拒绝")}
        />
      </div>
    )
  },
}

export const AuditExample: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <AuditLog entries={audit} />
    </div>
  ),
}

export const PresenceExample: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">PresenceIndicators 在线状态</div>
        <PresenceIndicators users={presenceUsers} max={5} />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">max=3</div>
        <PresenceIndicators users={presenceUsers} max={3} />
      </div>
    </div>
  ),
}

export const ChatExample: StoryObj = {
  render: () => {
    const [list, setList] = useState(messages)
    return (
      <div className="max-w-md rounded-md border">
        <div className="h-72 overflow-y-auto">
          <ChatMessageList messages={list} />
        </div>
        <ChatComposer
          onSend={(content) => setList((prev) => [...prev, { id: String(prev.length + 1), author: { name: "me" }, content, timestamp: Date.now() }])}
        />
      </div>
    )
  },
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="max-w-5xl space-y-8">
      <section>
        <h3 className="mb-3 text-base font-semibold">CommentThread 评论线程</h3>
        <div className="max-w-2xl">
          <CommentThread comments={comments} />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">ApprovalFlow 审批流</h3>
        <div className="max-w-2xl">
          <ApprovalFlow steps={steps} currentStep={2} />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">AuditLog 审计日志</h3>
        <div className="max-w-2xl">
          <AuditLog entries={audit} />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">PresenceIndicators 在线状态</h3>
        <PresenceIndicators users={presenceUsers} max={5} />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Chat 聊天</h3>
        <div className="max-w-md rounded-md border">
          <div className="h-72 overflow-y-auto">
            <ChatMessageList messages={messages} />
          </div>
          <ChatComposer onSend={() => {}} />
        </div>
      </section>
    </div>
  ),
}
