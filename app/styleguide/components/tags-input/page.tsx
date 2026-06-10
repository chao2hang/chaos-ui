"use client"
import * as React from "react"
import { TagsInput } from "@/components/ui/tags-input"
export default function TagsInputPage() {
  const [tags, setTags] = React.useState<string[]>(["react", "typescript"])
  const [limited, setLimited] = React.useState<string[]>(["tag1"])
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Tags Input</h1>
      <p className="mt-2 text-muted-foreground">Multi-value tag input with keyboard navigation.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <div className="max-w-md"><TagsInput value={tags} onChange={setTags} placeholder="Add a tag..." /></div>
        <p className="mt-2 text-xs text-muted-foreground">Current: {tags.join(", ") || "none"}</p>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Max Limit</h2>
        <div className="max-w-md"><TagsInput value={limited} onChange={setLimited} max={3} placeholder="Max 3 tags" /></div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Disabled</h2>
        <div className="max-w-md"><TagsInput value={["readonly", "tags"]} onChange={() => {}} disabled /></div>
      </section>
    </div>
  )
}
