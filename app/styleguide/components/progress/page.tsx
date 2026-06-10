"use client"

import * as React from "react"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProgressPage() {
  const [animatedValue, setAnimatedValue] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Progress</h1>
        <p className="mt-2 text-muted-foreground">
          Displays an indicator showing the completion progress of a task, typically as a progress bar.
        </p>
      </div>

      {/* Default */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Default</h2>
          <p className="text-sm text-muted-foreground">Basic progress bar with a set value.</p>
        </div>
        <Card>
          <CardContent className="space-y-4">
            <Progress value={33} />
            <Progress value={60} />
            <Progress value={85} />
          </CardContent>
        </Card>
      </section>

      {/* With Label */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Label</h2>
          <p className="text-sm text-muted-foreground">Progress bar with a descriptive label and percentage value.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <Progress value={25}>
              <ProgressLabel>Uploading files...</ProgressLabel>
              <ProgressValue />
            </Progress>
            <Progress value={50}>
              <ProgressLabel>Processing data</ProgressLabel>
              <ProgressValue />
            </Progress>
            <Progress value={75}>
              <ProgressLabel>Installing dependencies</ProgressLabel>
              <ProgressValue />
            </Progress>
            <Progress value={100}>
              <ProgressLabel>Complete</ProgressLabel>
              <ProgressValue />
            </Progress>
          </CardContent>
        </Card>
      </section>

      {/* Different Values */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Different Values</h2>
          <p className="text-sm text-muted-foreground">Progress bars at various completion levels.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            {[0, 10, 25, 50, 75, 90, 100].map((value) => (
              <div key={value} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{value}%</span>
                </div>
                <Progress value={value} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Indeterminate / Loading State */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Indeterminate</h2>
          <p className="text-sm text-muted-foreground">Progress bars showing loading states without a specific value.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">Loading (value={null})</p>
              <Progress value={null}>
                <ProgressLabel>Loading...</ProgressLabel>
              </Progress>
            </div>
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">Queued (value=null)</p>
              <Progress value={null}>
                <ProgressLabel>Queued</ProgressLabel>
              </Progress>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* With Animation */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Animation</h2>
          <p className="text-sm text-muted-foreground">Animated progress bar that cycles through values.</p>
        </div>
        <Card>
          <CardContent className="space-y-4">
            <Progress value={animatedValue}>
              <ProgressLabel>Uploading</ProgressLabel>
              <ProgressValue />
            </Progress>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnimatedValue(0)}
              >
                Reset
              </Button>
              <span className="flex items-center text-sm text-muted-foreground">
                Value: {animatedValue}
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Custom Sizes */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Custom Sizes</h2>
          <p className="text-sm text-muted-foreground">Progress bars with different track heights.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">h-1 (default)</p>
              <Progress value={60} />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">h-2</p>
              <Progress value={60} className="[&_[data-slot=progress-track]]:h-2" />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">h-3</p>
              <Progress value={60} className="[&_[data-slot=progress-track]]:h-3" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
