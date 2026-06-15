"use client"
import * as React from "react"
import { SendIcon, PaperclipIcon, SmileIcon, MicIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface ChatMessage {
  id: string
  author: { name: string; avatar?: string }
  content: string
  timestamp: number | string | Date
  read?: boolean
  type?: "text" | "system"
}

interface ChatMessageListProps extends React.ComponentProps<"div"> {
  messages: ChatMessage[]
  currentUserId?: string
  className?: string
}

export function ChatMessageList({ messages, currentUserId, className, ...props }: ChatMessageListProps) {
  return (
    <div data-slot="chat-message-list" className={cn("space-y-3 overflow-y-auto p-3", className)} {...props}>
      {messages.map((m) => {
        const isMe = m.author.name === currentUserId || m.type === "system"
        if (m.type === "system") {
          return (
            <div key={m.id} className="text-center text-xs text-muted-foreground">
              {m.content}
            </div>
          )
        }
        return (
          <div key={m.id} className={cn("flex gap-2", isMe && "flex-row-reverse")}>
            <div className="size-8 shrink-0 rounded-full bg-muted" />
            <div className={cn("max-w-[70%]", isMe && "items-end text-right")}>
              <div className="mb-0.5 text-xs text-muted-foreground">{m.author.name}</div>
              <div
                className={cn(
                  "rounded-lg px-3 py-2 text-sm",
                  isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                {m.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface ChatComposerProps extends React.ComponentProps<"div"> {
  onSend?: (content: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function ChatComposer({ onSend, placeholder = "输入消息...", disabled, className, ...props }: ChatComposerProps) {
  const [value, setValue] = React.useState("")
  const handleSend = () => {
    if (!value.trim() || disabled) return
    onSend?.(value.trim())
    setValue("")
  }
  return (
    <div data-slot="chat-composer" className={cn("flex items-center gap-2 border-t p-2", className)} {...props}>
      <Button variant="ghost" size="icon-sm" aria-label="附件">
        <PaperclipIcon />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="表情">
        <SmileIcon />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="语音">
        <MicIcon />
      </Button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <Button size="icon-sm" onClick={handleSend} disabled={!value.trim() || disabled} aria-label="发送">
        <SendIcon />
      </Button>
    </div>
  )
}
