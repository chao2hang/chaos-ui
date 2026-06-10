"use client"
import * as React from "react"
import { FormWizard } from "@/components/business/form-wizard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const steps: { title: string; description: string; render: (ctx: { formData: Record<string, unknown>; updateField: (k: string, v: unknown) => void; errors: Record<string, string> }) => React.ReactNode; validate?: (data: Record<string, unknown>) => Record<string, string> }[] = [
  {
    title: "Account",
    description: "Create your account credentials.",
    render: (ctx) => (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input type="email" value={(ctx.formData.email as string) || ""} onChange={(e) => ctx.updateField("email", e.target.value)} />
          {ctx.errors.email && <p className="text-xs text-destructive">{ctx.errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Password</Label>
          <Input type="password" value={(ctx.formData.password as string) || ""} onChange={(e) => ctx.updateField("password", e.target.value)} />
          {ctx.errors.password && <p className="text-xs text-destructive">{ctx.errors.password}</p>}
        </div>
      </div>
    ),
    validate: (d) => {
      const e: Record<string, string> = {}
      if (!(d.email as string)?.trim()) e.email = "Required"
      if (!(d.password as string)?.trim()) e.password = "Required"
      return e
    },
  },
  {
    title: "Organization",
    description: "Set up your organization.",
    render: (ctx) => (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Company Name</Label>
          <Input value={(ctx.formData.company as string) || ""} onChange={(e) => ctx.updateField("company", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Size</Label>
          <Select value={(ctx.formData.size as string) || ""} onValueChange={(v) => ctx.updateField("size", v)}>
            <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="11-50">11-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
              <SelectItem value="200+">200+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    ),
  },
  {
    title: "Preferences",
    description: "Configure your preferences.",
    render: (ctx) => (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Industry</Label>
          <Input value={(ctx.formData.industry as string) || ""} onChange={(e) => ctx.updateField("industry", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Role</Label>
          <Input value={(ctx.formData.role as string) || ""} onChange={(e) => ctx.updateField("role", e.target.value)} />
        </div>
      </div>
    ),
  },
  {
    title: "Review",
    description: "Review and confirm.",
    render: (ctx) => (
      <div className="space-y-2 text-sm">
        {Object.entries(ctx.formData).map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="text-muted-foreground capitalize">{k}</span>
            <span>{String(v ?? "-")}</span>
          </div>
        ))}
      </div>
    ),
  },
]

export default function WizardPatternPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Wizard Pattern</h1>
      <p className="mt-2 text-muted-foreground">Complete multi-step onboarding wizard.</p>
      <section className="mt-8 max-w-2xl">
        <FormWizard steps={steps} onComplete={() => toast.success("Account created!")} />
      </section>
    </div>
  )
}
