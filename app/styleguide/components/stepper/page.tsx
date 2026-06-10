"use client"
import * as React from "react"
import { Stepper, Step } from "@/components/ui/stepper"
import { Button } from "@/components/ui/button"
export default function StepperPage() {
  const [step, setStep] = React.useState(1)
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Stepper</h1>
      <p className="mt-2 text-muted-foreground">Step progress indicator for multi-step flows.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <Stepper activeStep={step}>
          <Step>Account</Step><Step>Profile</Step><Step>Review</Step>
        </Stepper>
        <div className="flex gap-2 mt-6">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
          <Button size="sm" disabled={step === 2} onClick={() => setStep((s) => s + 1)}>Next</Button>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Completed</h2>
        <Stepper activeStep={3}>
          <Step>Step 1</Step><Step>Step 2</Step><Step>Step 3</Step>
        </Stepper>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Vertical</h2>
        <Stepper activeStep={1} orientation="vertical">
          <Step>Personal Info</Step><Step>Address</Step><Step>Payment</Step>
        </Stepper>
      </section>
    </div>
  )
}
