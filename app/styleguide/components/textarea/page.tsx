"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function TextareaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Textarea</h1>
      <p className="mt-2 text-muted-foreground">
        Multi-line text input for longer form content with auto-sizing support.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Default</h2>
        <div className="max-w-sm">
          <Textarea />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Placeholder</h2>
        <div className="max-w-sm">
          <Textarea placeholder="Type your message here..." />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Disabled</h2>
        <div className="max-w-sm space-y-3">
          <Textarea disabled />
          <Textarea disabled placeholder="Disabled with placeholder" />
          <Textarea disabled defaultValue="Disabled with value" />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Label</h2>
        <div className="max-w-sm space-y-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself..." />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Error</h2>
        <div className="max-w-sm space-y-1.5">
          <Label htmlFor="feedback">Feedback</Label>
          <Textarea id="feedback" aria-invalid defaultValue="Too short" />
          <p className="text-xs text-destructive">
            Feedback must be at least 20 characters.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Character Counter</h2>
        <TextareaWithCounter />
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Description</h2>
        <div className="max-w-sm space-y-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Add any additional notes..." />
          <p className="text-xs text-muted-foreground">
            Optional. Add any context that might help us understand your request.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Auto-sizing</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          This textarea grows automatically based on content (field-sizing: content).
        </p>
        <div className="max-w-sm">
          <Textarea
            placeholder="Start typing and watch me grow..."
            defaultValue="This textarea has auto-sizing enabled. It will grow as you type more content. Try adding multiple lines to see it in action."
          />
        </div>
      </section>
    </div>
  )
}

function TextareaWithCounter() {
  const [value, setValue] = React.useState("")
  const maxLength = 280

  return (
    <div className="max-w-sm space-y-1.5">
      <Label htmlFor="tweet">What&apos;s happening?</Label>
      <Textarea
        id="tweet"
        placeholder="Share an update..."
        value={value}
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-xs text-muted-foreground text-right">
        {value.length}/{maxLength} characters
      </p>
    </div>
  )
}
