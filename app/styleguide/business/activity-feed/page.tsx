"use client"
import { ActivityFeed } from "@/components/business/activity-feed"
import type { ActivityItem } from "@/components/business/activity-feed"

const mockItems: ActivityItem[] = [
  { user: "Alice", action: "created order #1234", time: new Date().toISOString(), avatarFallback: "A" },
  { user: "Bob", action: "approved payment for order #1234", time: new Date().toISOString(), avatarFallback: "B", variant: "success" as const },
  { user: "Carol", action: "shipped order #1234", time: new Date(Date.now() - 3600000).toISOString(), avatarFallback: "C", variant: "info" as const },
  { user: "Dave", action: "updated product inventory", time: new Date(Date.now() - 7200000).toISOString(), avatarFallback: "D" },
  { user: "Eve", action: "rejected return request #567", time: new Date(Date.now() - 86400000).toISOString(), avatarFallback: "E", variant: "destructive" as const },
  { user: "Frank", action: "added new product SKU-789", time: new Date(Date.now() - 172800000).toISOString(), avatarFallback: "F" },
]

export default function ActivityFeedPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Activity Feed</h1>
      <p className="mt-2 text-muted-foreground">Activity stream and audit log with time grouping.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <div className="max-w-lg"><ActivityFeed items={mockItems} /></div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Load More</h2>
        <div className="max-w-lg"><ActivityFeed items={mockItems.slice(0, 3)} hasMore onLoadMore={() => alert("Loading more...")} /></div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Empty</h2>
        <div className="max-w-lg"><ActivityFeed items={[]} /></div>
      </section>
    </div>
  )
}
