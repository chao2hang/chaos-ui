import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SeparatorPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Separator</h1>
        <p className="mt-2 text-muted-foreground">
          A visual divider between content sections. Supports horizontal and vertical orientations.
        </p>
      </div>

      {/* Horizontal */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Horizontal</h2>
          <p className="text-sm text-muted-foreground">Default horizontal separator between content blocks.</p>
        </div>
        <Card>
          <CardContent className="space-y-4">
            <p className="text-sm">First section of content.</p>
            <Separator />
            <p className="text-sm">Second section of content.</p>
            <Separator />
            <p className="text-sm">Third section of content.</p>
          </CardContent>
        </Card>
      </section>

      {/* Vertical */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Vertical</h2>
          <p className="text-sm text-muted-foreground">Vertical separator between inline elements.</p>
        </div>
        <Card>
          <CardContent>
            <div className="flex h-5 items-center gap-4">
              <span className="text-sm">Dashboard</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Settings</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Profile</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Help</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* With Text */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Text</h2>
          <p className="text-sm text-muted-foreground">Separator used as a divider with centered text labels.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm">Content above the separator.</p>
              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card px-2 text-xs text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>
              <p className="text-sm">Content below the separator.</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm">Section content.</p>
              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card px-2 text-xs text-muted-foreground">
                    Continue with
                  </span>
                </div>
              </div>
              <p className="text-sm">Additional options below.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* In Card */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">In Card Layout</h2>
          <p className="text-sm text-muted-foreground">Separator used within card components to divide sections.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Stats</CardTitle>
              <CardDescription>Overview of project metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total commits</span>
                <span className="text-sm font-medium">1,234</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pull requests</span>
                <span className="text-sm font-medium">89</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Contributors</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Open issues</span>
                <span className="text-sm font-medium">7</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium">John Doe</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">john@example.com</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <span className="text-sm font-medium">Pro</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Joined</span>
                <span className="text-sm font-medium">Jan 2024</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
