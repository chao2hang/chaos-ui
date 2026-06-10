"use client"

import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ToastPage() {
  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="font-heading text-3xl font-bold">Toast</h1>
          <p className="mt-2 text-muted-foreground">
            A brief notification message displayed temporarily. Uses Sonner for toast management.
          </p>
        </div>

        {/* Default */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">Default</h2>
            <p className="text-sm text-muted-foreground">Basic toast notification.</p>
          </div>
          <Card>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => toast("This is a default toast notification.")}
              >
                Show Default Toast
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Success */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">Success</h2>
            <p className="text-sm text-muted-foreground">Success confirmation toast.</p>
          </div>
          <Card>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => toast.success("Your changes have been saved successfully.")}
              >
                Show Success Toast
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Error */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">Error</h2>
            <p className="text-sm text-muted-foreground">Error notification toast.</p>
          </div>
          <Card>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => toast.error("Something went wrong. Please try again.")}
              >
                Show Error Toast
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Warning */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">Warning</h2>
            <p className="text-sm text-muted-foreground">Warning alert toast.</p>
          </div>
          <Card>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => toast.warning("Your session will expire in 5 minutes.")}
              >
                Show Warning Toast
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Info */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">Info</h2>
            <p className="text-sm text-muted-foreground">Informational toast notification.</p>
          </div>
          <Card>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => toast.info("A new version is available for download.")}
              >
                Show Info Toast
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* With Action */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">With Action</h2>
            <p className="text-sm text-muted-foreground">Toast with an action button for user response.</p>
          </div>
          <Card>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    toast("File deleted.", {
                      action: {
                        label: "Undo",
                        onClick: () => toast.success("File restored."),
                      },
                    })
                  }
                >
                  Toast with Undo
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast("Update available.", {
                      action: {
                        label: "Update",
                        onClick: () => toast.success("Updated to latest version."),
                      },
                    })
                  }
                >
                  Toast with Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* With Description */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold">With Description</h2>
            <p className="text-sm text-muted-foreground">Toast with a title and detailed description.</p>
          </div>
          <Card>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    toast("Event created", {
                      description: "Monday, January 3rd at 6:00 PM",
                    })
                  }
                >
                  Event Toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.success("Invitation sent", {
                      description: "Your team invitation was sent to alice@example.com",
                    })
                  }
                >
                  Invitation Toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.error("Upload failed", {
                      description: "The file exceeds the maximum size limit of 10MB.",
                    })
                  }
                >
                  Error with Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}
