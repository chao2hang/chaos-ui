"use client"
import * as React from "react"
import { MoreHorizontalIcon, ReplyIcon, SmileIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatRelativeTime } from "@/lib/format"

export interface Comment {
  id: string
  author: { name: string; avatar?: string }
  content: string
  timestamp: number | string | Date
  reactions?: Array<{ emoji: string; count: number; reacted?: boolean }>
  replies?: Comment[]
}

interface CommentThreadProps extends React.ComponentProps<"div"> {
  comments: Comment[]
  onReply?: (parentId: string, content: string) => void
  onReact?: (commentId: string, emoji: string) => void
  className?: string
}

export function CommentThread({ comments, onReply, onReact, className, ...props }: CommentThreadProps) {
  return (
    <div data-slot="comment-thread" className={cn("space-y-3", className)} {...props}>
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} onReply={onReply} onReact={onReact} />
      ))}
    </div>
  )
}

function CommentItem({
  comment,
  onReply,
  onReact,
  depth = 0,
}: {
  comment: Comment
  onReply?: CommentThreadProps["onReply"]
  onReact?: CommentThreadProps["onReact"]
  depth?: number
}) {
  const [showReply, setShowReply] = React.useState(false)
  const [replyText, setReplyText] = React.useState("")

  return (
    <div className="flex gap-2" style={{ marginLeft: depth * 32 }}>
      <Avatar className="size-8 shrink-0">
        {comment.author.avatar && <AvatarImage src={comment.author.avatar} />}
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="rounded-md bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">{formatRelativeTime(comment.timestamp)}</span>
          </div>
          <p className="mt-1 text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {comment.reactions?.map((r) => (
            <button
              key={r.emoji}
              type="button"
              onClick={() => onReact?.(comment.id, r.emoji)}
              className={cn(
                "rounded-full border px-2 py-0.5 text-[0.65rem] transition-colors",
                r.reacted ? "border-primary bg-primary/10" : "hover:border-primary"
              )}
            >
              {r.emoji} {r.count}
            </button>
          ))}
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setShowReply((v) => !v)}
          >
            <ReplyIcon />
            回复
          </Button>
          <Button variant="ghost" size="icon-xs">
            <SmileIcon />
          </Button>
          <Button variant="ghost" size="icon-xs">
            <MoreHorizontalIcon />
          </Button>
        </div>
        {showReply && (
          <div className="flex gap-2 pt-1">
            <Input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="回复..."
              className="h-8"
            />
            <Button
              size="sm"
              disabled={!replyText.trim()}
              onClick={() => {
                onReply?.(comment.id, replyText.trim())
                setReplyText("")
                setShowReply(false)
              }}
            >
              发送
            </Button>
          </div>
        )}
        {comment.replies?.map((r) => (
          <CommentItem key={r.id} comment={r} onReply={onReply} onReact={onReact} depth={depth + 1} />
        ))}
      </div>
    </div>
  )
}
