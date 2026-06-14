"use client"

import * as React from "react"
import { CopyIcon, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface UTMBuilderValue {
  url: string
  source: string
  medium: string
  campaign: string
  content?: string
  term?: string
}

export interface UTMBuilderProps {
  value?: Partial<UTMBuilderValue>
  onChange?: (value: UTMBuilderValue, resultUrl: string) => void
  className?: string
}

const defaults: UTMBuilderValue = {
  url: "https://example.com/landing",
  source: "newsletter",
  medium: "email",
  campaign: "spring_launch",
  content: "",
  term: "",
}

function buildUrl(value: UTMBuilderValue) {
  try {
    const url = new URL(value.url)
    url.searchParams.set("utm_source", value.source)
    url.searchParams.set("utm_medium", value.medium)
    url.searchParams.set("utm_campaign", value.campaign)
    if (value.content) url.searchParams.set("utm_content", value.content)
    else url.searchParams.delete("utm_content")
    if (value.term) url.searchParams.set("utm_term", value.term)
    else url.searchParams.delete("utm_term")
    return url.toString()
  } catch {
    return ""
  }
}

export function UTMBuilder({ value, onChange, className }: UTMBuilderProps) {
  const [form, setForm] = React.useState<UTMBuilderValue>({ ...defaults, ...value })
  const result = buildUrl(form)

  const update = (key: keyof UTMBuilderValue, next: string) => {
    const updated = { ...form, [key]: next }
    setForm(updated)
    onChange?.(updated, buildUrl(updated))
  }

  const copyResult = async () => {
    if (!result || typeof navigator === "undefined" || !navigator.clipboard) return
    await navigator.clipboard.writeText(result)
  }

  return (
    <Card data-slot="utm-builder" className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="size-4" />
          UTM builder
        </CardTitle>
        <CardDescription>Create a tagged campaign URL.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="URL" value={form.url} onChange={(v) => update("url", v)} className="md:col-span-2" />
          <Field label="Source" value={form.source} onChange={(v) => update("source", v)} />
          <Field label="Medium" value={form.medium} onChange={(v) => update("medium", v)} />
          <Field label="Campaign" value={form.campaign} onChange={(v) => update("campaign", v)} />
          <Field label="Content" value={form.content ?? ""} onChange={(v) => update("content", v)} />
          <Field label="Term" value={form.term ?? ""} onChange={(v) => update("term", v)} />
        </div>
        <div className="rounded-lg border bg-muted/30 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground">Result URL</span>
            <Button
              size="icon-xs"
              variant="ghost"
              aria-label="Copy URL"
              disabled={!result}
              onClick={copyResult}
            >
              <CopyIcon />
            </Button>
          </div>
          <p className={cn("break-all text-xs", !result && "text-destructive")}>
            {result || "Enter a valid absolute URL."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function Field({
  label,
  value,
  onChange,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const id = `utm-${label.toLowerCase()}`
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}
