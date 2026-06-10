"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Stepper, Step } from "@/components/ui/stepper"
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "lucide-react"

function FormWizard({ steps, onComplete, className }: { steps: { title: string; description?: string; render: (...args: any[]) => React.ReactNode; validate?: (data: Record<string, unknown>) => Record<string, string> }[]; onComplete?: (data: Record<string, unknown>) => void; className?: string }) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [formData, setFormData] = React.useState({})
  const [errors, setErrors] = React.useState({})

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const validate = (): boolean => {
    if (!step.validate) return true
    const stepErrors = step.validate ? step.validate(formData as any) : {}
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = (): void => {
    if (!validate()) return
    if (isLast) {
      onComplete?.(formData)
    } else {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleBack = (): void => {
    setErrors({})
    setCurrentStep((s) => s - 1)
  }

  const updateField = (key: string, value: unknown): void => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if ((errors as Record<string, string>)[key]) {
      setErrors((prev) => { const next: Record<string, string> = { ...prev }; delete next[key]; return next })
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Stepper activeStep={currentStep}>
        {steps.map((s) => (
          <Step key={s.title}>{s.title}</Step>
        ))}
      </Stepper>

      <div className="min-h-[200px] rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
        {step.description && <p className="text-sm text-muted-foreground mb-4">{step.description}</p>}
        {step.render({ formData: formData as Record<string, unknown>, updateField, errors } as any)}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={isFirst}>
          <ChevronLeftIcon className="size-4 mr-1" />
          Back
        </Button>
        <Button onClick={handleNext}>
          {isLast ? (
            <><CheckIcon className="size-4 mr-1" /> Submit</>
          ) : (
            <>Next <ChevronRightIcon className="size-4 ml-1" /></>
          )}
        </Button>
      </div>
    </div>
  )
}

export { FormWizard }
