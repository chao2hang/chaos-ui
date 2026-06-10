"use client"
import * as React from "react"
import { FormWizard } from "@/components/business/form-wizard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface StepCtx {
  formData: Record<string, unknown>
  updateField: (k: string, v: unknown) => void
  errors: Record<string, string>
}

const steps: { title: string; description: string; render: (ctx: StepCtx) => React.ReactNode; validate?: (data: Record<string, unknown>) => Record<string, string> }[] = [
  {
    title: "Personal",
    description: "Enter your personal information.",
    render: (ctx) => (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>First Name</Label>
          <Input value={(ctx.formData.firstName as string) || ""} onChange={(e) => ctx.updateField("firstName", e.target.value)} />
          {ctx.errors.firstName && <p className="text-xs text-destructive">{ctx.errors.firstName}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Last Name</Label>
          <Input value={(ctx.formData.lastName as string) || ""} onChange={(e) => ctx.updateField("lastName", e.target.value)} />
        </div>
      </div>
    ),
    validate: (data) => {
      const errors: Record<string, string> = {}
      if (!(data.firstName as string)?.trim()) errors.firstName = "First name is required"
      return errors
    },
  },
  {
    title: "Contact",
    description: "How can we reach you?",
    render: (ctx) => (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input type="email" value={(ctx.formData.email as string) || ""} onChange={(e) => ctx.updateField("email", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Phone</Label>
          <Input value={(ctx.formData.phone as string) || ""} onChange={(e) => ctx.updateField("phone", e.target.value)} />
        </div>
      </div>
    ),
  },
  {
    title: "Review",
    description: "Review your information before submitting.",
    render: (ctx) => (
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{String(ctx.formData.firstName || "")} {String(ctx.formData.lastName || "")}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{String(ctx.formData.email || "-")}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span>{String(ctx.formData.phone || "-")}</span></div>
      </div>
    ),
  },
]

export default function FormWizardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Form Wizard</h1>
      <p className="mt-2 text-muted-foreground">Multi-step form with validation and progress tracking.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">3-Step Wizard</h2>
        <FormWizard steps={steps} onComplete={(data) => toast.success("Submitted!")} />
      </section>
    </div>
  )
}
