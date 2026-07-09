"use client"

import * as React from "react"
import { FormWizard } from "@chaos_team/chaos-ui/business"
import { cn } from "@chaos_team/chaos-ui/lib"

interface MobileFormWizardProps {
  steps: {
    title: string
    description?: string
    render: (props: { formData: Record<string, unknown>; updateField: (key: string, value: unknown) => void; errors: Record<string, string> }) => React.ReactNode
    validate?: (data: Record<string, unknown>) => Record<string, string>
  }[]
  onComplete?: (data: Record<string, unknown>) => void
  className?: string
}

function MobileFormWizard({ steps, onComplete, className }: MobileFormWizardProps) {
  return (
    <FormWizard
      steps={steps}
      onComplete={onComplete}
      className={cn(
        "[&_button]:h-12 [&_button]:px-6 [&_button]:text-base",
        "md:[&_button]:h-8 md:[&_button]:px-3 md:[&_button]:text-sm",
        className
      )}
    />
  )
}

export { MobileFormWizard }
export type { MobileFormWizardProps }
