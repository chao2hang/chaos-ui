import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, CheckCircle2Icon, AlertTriangleIcon, AlertCircleIcon } from "lucide-react"
export default function AlertPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Alert</h1>
      <p className="mt-2 text-muted-foreground">Inline notification banners for feedback and status.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Variants</h2>
        <div className="space-y-3">
          <Alert><AlertTitle>Default</AlertTitle><AlertDescription>This is a default alert.</AlertDescription></Alert>
          <Alert variant="info"><AlertTitle>Info</AlertTitle><AlertDescription>Something informational happened.</AlertDescription></Alert>
          <Alert variant="success"><AlertTitle>Success</AlertTitle><AlertDescription>Operation completed successfully.</AlertDescription></Alert>
          <Alert variant="warning"><AlertTitle>Warning</AlertTitle><AlertDescription>Please review before proceeding.</AlertDescription></Alert>
          <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Something went wrong. Please try again.</AlertDescription></Alert>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Custom Icon</h2>
        <Alert variant="info" icon={InfoIcon}><AlertDescription>You have 3 unread notifications.</AlertDescription></Alert>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Description Only</h2>
        <div className="space-y-3">
          <Alert variant="success"><AlertDescription>Settings saved successfully.</AlertDescription></Alert>
          <Alert variant="warning"><AlertDescription>Your session will expire in 5 minutes.</AlertDescription></Alert>
        </div>
      </section>
    </div>
  )
}
