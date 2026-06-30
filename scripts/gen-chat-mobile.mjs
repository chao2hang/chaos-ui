import fs from "node:fs";
import path from "node:path";

// Chat/AI components (28)
const chatComponents = [
  ["chat-shell", "ChatShell", "business/chat", "聊天页面骨架", "{ sidebar?: React.ReactNode; header?: React.ReactNode; children?: React.ReactNode; detailPanel?: React.ReactNode; className?: string; }"],
  ["chat-sidebar", "ChatSidebar", "business/chat", "会话列表", "{ conversations: Array<{ id: string; title: string; unread?: number; lastMessage?: string; time?: string }>; activeId?: string; onSelect?: (id: string) => void; className?: string; }"],
  ["chat-header", "ChatHeader", "business/chat", "对话顶栏", "{ title: string; subtitle?: string; status?: string; actions?: React.ReactNode; className?: string; }"],
  ["chat-message-group", "ChatMessageGroup", "business/chat", "消息分组", "{ sender: string; avatar?: React.ReactNode; messages: Array<{ id: string; content: string; time?: string }>; className?: string; }"],
  ["chat-message-actions", "ChatMessageActions", "business/chat", "消息操作栏", "{ onReply?: () => void; onCopy?: () => void; onDelete?: () => void; onRegenerate?: () => void; className?: string; }"],
  ["chat-thinking-block", "ChatThinkingBlock", "business/chat", "AI思考过程展示", "{ content: string; duration?: number; collapsed?: boolean; className?: string; }"],
  ["chat-tool-call-block", "ChatToolCallBlock", "business/chat", "AI工具调用展示", "{ toolName: string; toolInput?: unknown; toolOutput?: unknown; status: 'calling' | 'success' | 'error'; className?: string; }"],
  ["chat-code-block", "ChatCodeBlock", "business/chat", "代码块", "{ code: string; language?: string; filename?: string; className?: string; }"],
  ["chat-markdown-renderer", "ChatMarkdownRenderer", "business/chat", "Markdown渲染器", "{ content: string; className?: string; }"],
  ["chat-card-message", "ChatCardMessage", "business/chat", "卡片消息", "{ title: string; description?: string; thumbnail?: string; metadata?: Array<{ label: string; value: string }>; actions?: React.ReactNode; className?: string; }"],
  ["chat-image-gallery", "ChatImageGallery", "business/chat", "图片消息组", "{ images: Array<{ src: string; alt?: string }>; className?: string; }"],
  ["chat-voice-message", "ChatVoiceMessage", "business/chat", "语音消息", "{ duration: number; src?: string; className?: string; }"],
  ["chat-input-toolbar", "ChatInputToolbar", "business/chat", "输入框工具栏", "{ tools: Array<{ id: string; icon?: React.ReactNode; label: string }>; onToolClick?: (id: string) => void; className?: string; }"],
  ["chat-mention-picker", "ChatMentionPicker", "business/chat", "@提及选择器", "{ users: Array<{ id: string; name: string; avatar?: string }>; onSelect?: (id: string) => void; className?: string; }"],
  ["chat-command-menu", "ChatCommandMenu", "business/chat", "斜杠命令菜单", "{ commands: Array<{ id: string; label: string; description?: string }>; onSelect?: (id: string) => void; className?: string; }"],
  ["chat-streaming-text", "ChatStreamingText", "business/chat", "流式文本输出", "{ chunks: string[]; isStreaming?: boolean; speed?: number; className?: string; }"],
  ["chat-suggest-replies", "ChatSuggestReplies", "business/chat", "建议回复", "{ suggestions: string[]; onSelect?: (suggestion: string) => void; className?: string; }"],
  ["chat-context-panel", "ChatContextPanel", "business/chat", "上下文面板", "{ context: Array<{ label: string; value: string }>; className?: string; }"],
  ["chat-model-switcher", "ChatModelSwitcher", "business/chat", "模型切换器", "{ models: Array<{ id: string; name: string; description?: string }>; activeId?: string; onSwitch?: (id: string) => void; className?: string; }"],
  ["chat-agent-status", "ChatAgentStatus", "business/chat", "Agent状态", "{ status: 'idle' | 'thinking' | 'acting' | 'waiting' | 'done'; label?: string; className?: string; }"],
  ["chat-artifact-panel", "ChatArtifactPanel", "business/chat", "Artifact面板", "{ title?: string; type?: string; content?: string; className?: string; }"],
  ["chat-feedback", "ChatFeedback", "business/chat", "反馈组件", "{ onLike?: () => void; onDislike?: () => void; onComment?: (text: string) => void; className?: string; }"],
  ["chat-conversation", "ChatConversation", "business/chat", "对话容器", "{ messages: Array<{ id: string; role: string; content: string; time?: string }>; className?: string; }"],
  ["chat-conversation-search", "ChatConversationSearch", "business/chat", "对话搜索", "{ query: string; onQueryChange?: (q: string) => void; results?: Array<{ id: string; title: string; snippet: string }>; className?: string; }"],
  ["chat-branch", "ChatBranch", "business/chat", "对话分支", "{ branches: Array<{ id: string; label: string; active?: boolean }>; onSelect?: (id: string) => void; className?: string; }"],
  ["chat-shared-link", "ChatSharedLink", "business/chat", "共享链接", "{ url: string; title?: string; description?: string; className?: string; }"],
  ["chat-message-input", "ChatMessageInput", "business/chat", "聊天消息输入框", "{ value?: string; onChange?: (val: string) => void; onSend?: () => void; placeholder?: string; disabled?: boolean; maxLength?: number; className?: string; }"],
  ["chat-message-bubble", "ChatMessageBubble", "business/chat", "消息气泡", "{ role: 'user' | 'assistant' | 'system'; content: string; avatar?: React.ReactNode; name?: string; time?: string; status?: string; className?: string; }"],
];

// Low-code components (5)
const lowCodeComponents = [
  ["form-designer", "FormDesigner", "business/lowcode", "表单设计器", "{ fields: Array<{ id: string; type: string; label: string; required?: boolean }>; onChange?: (fields: unknown[]) => void; className?: string; }"],
  ["form-designer-runtime", "FormDesignerRuntime", "business/lowcode", "表单设计器运行时", "{ schema: unknown; value?: Record<string, unknown>; onChange?: (val: Record<string, unknown>) => void; className?: string; }"],
  ["workflow-designer", "WorkflowDesigner", "business/lowcode", "工作流设计器", "{ nodes: Array<{ id: string; type: string; name: string }>; edges: Array<{ from: string; to: string }>; onChange?: (config: unknown) => void; className?: string; }"],
  ["workflow-preview", "WorkflowPreview", "business/lowcode", "工作流预览", "{ nodes: Array<{ id: string; name: string; status?: string }>; edges: Array<{ from: string; to: string }>; className?: string; }"],
  ["rule-editor", "RuleEditor", "business/lowcode", "规则编辑器", "{ rules: Array<{ id: string; field: string; operator: string; value: unknown; action: string }>; onChange?: (rules: unknown[]) => void; className?: string; }"],
];

// Mobile components (10)
const mobileComponents = [
  ["mobile-page-shell", "MobilePageShell", "business/mobile", "移动端页面骨架", "{ title?: string; onBack?: () => void; children?: React.ReactNode; className?: string; }"],
  ["mobile-action-sheet", "MobileActionSheet", "business/mobile", "移动端操作表", "{ open: boolean; onOpenChange: (open: boolean) => void; actions: Array<{ label: string; onClick: () => void; danger?: boolean }>; className?: string; }"],
  ["mobile-picker", "MobilePicker", "business/mobile", "移动端选择器", "{ options: Array<{ label: string; value: string }>; value?: string; onChange?: (val: string) => void; className?: string; }"],
  ["mobile-camera", "MobileCamera", "business/mobile", "移动端相机", "{ onCapture?: (blob: Blob) => void; className?: string; }"],
  ["mobile-qrcode-scanner", "MobileQrCodeScanner", "business/mobile", "移动端二维码扫描", "{ onScan?: (result: string) => void; className?: string; }"],
  ["mobile-signature", "MobileSignature", "business/mobile", "移动端签名", "{ onSave?: (blob: Blob) => void; className?: string; }"],
  ["mobile-geolocation", "MobileGeolocation", "business/mobile", "移动端地理定位", "{ onLocate?: (coords: { lat: number; lng: number }) => void; className?: string; }"],
  ["mobile-infinite-scroll", "MobileInfiniteScroll", "business/mobile", "移动端无限滚动", "{ onLoadMore?: () => void; hasMore?: boolean; loading?: boolean; children?: React.ReactNode; className?: string; }"],
  ["mobile-tab-bar", "MobileTabBar", "business/mobile", "移动端标签栏", "{ tabs: Array<{ id: string; label: string; icon?: React.ReactNode }>; activeId?: string; onSelect?: (id: string) => void; className?: string; }"],
  ["mobile-list-item", "MobileListItem", "business/mobile", "移动端列表项", "{ title: string; subtitle?: string; trailing?: React.ReactNode; onClick?: () => void; className?: string; }"],
];

// Layout components
const layoutComponents = [
  ["wizard-layout", "WizardLayout", "layout", "向导式分步布局", "{ steps: Array<{ id: string; title: string; description?: string }>; current: number; onComplete?: () => void; children?: React.ReactNode; className?: string; }"],
  ["chat-layout", "ChatLayout", "layout", "对话式布局", "{ sidebar?: React.ReactNode; messagesArea?: React.ReactNode; inputArea?: React.ReactNode; className?: string; }"],
];

const allComponents = [...chatComponents, ...lowCodeComponents, ...mobileComponents, ...layoutComponents];

let generated = 0;
const exportLines = [];

for (const [fileName, compName, category, desc, propsStr] of allComponents) {
  let dirName;
  if (category === "layout") {
    dirName = "components/layout";
  } else {
    dirName = "components/business";
  }
  const filePath = path.join(dirName, fileName + ".tsx");
  if (fs.existsSync(filePath)) {
    console.log("SKIP (exists):", fileName);
    continue;
  }

  const content = `"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ${compName}
 * @category ${category}
 * @since 0.7.0
 * @description ${desc}
 * @keywords ${fileName.replace(/-/g, ", ")}
 * @example
 * <${compName} />
 */

interface ${compName}Props ${propsStr}

function ${compName}({ className }: ${compName}Props) {
  return (
    <div
      data-slot="${fileName}"
      className={cn("", className)}
    />
  );
}

export { ${compName} };
export type { ${compName}Props };
`;

  fs.writeFileSync(filePath, content);
  exportLines.push(`export * from "./${fileName}";`);
  generated++;
}

// Append exports to barrels
const businessBarrel = "components/business/index.ts";
const layoutBarrel = "components/layout/index.ts";

const bBarrel = fs.readFileSync(businessBarrel, "utf8");
const chatMarker = "// --- auto-generated: chat/lowcode/mobile ---";
if (!bBarrel.includes(chatMarker)) {
  const chatExports = exportLines.filter((_, i) => i < chatComponents.length + lowCodeComponents.length + mobileComponents.length);
  fs.appendFileSync(businessBarrel, `\n${chatMarker}\n${chatExports.join("\n")}\n`);
}

const lBarrel = fs.readFileSync(layoutBarrel, "utf8");
const layoutMarker = "// --- auto-generated: layout ---";
if (!lBarrel.includes(layoutMarker)) {
  const layoutExports = exportLines.filter((_, i) => i >= chatComponents.length + lowCodeComponents.length + mobileComponents.length);
  fs.appendFileSync(layoutBarrel, `\n${layoutMarker}\n${layoutExports.join("\n")}\n`);
}

console.log(`Generated: ${generated} components`);
