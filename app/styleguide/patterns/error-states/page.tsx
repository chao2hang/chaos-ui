import * as React from "react"
import { EmptyState } from "@/components/business/empty-state"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  FileXIcon,
  ServerCrashIcon,
  WifiOffIcon,
  ShieldXIcon,
  SearchIcon,
  RefreshCwIcon,
  HomeIcon,
} from "lucide-react"

export default function ErrorStatesPattern() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Error States</h1>
        <p className="text-sm text-muted-foreground">
          Patterns for handling errors, empty states, and loading conditions
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">404 - Page Not Found</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-6xl font-bold text-muted-foreground/30">404</div>
              <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline">
                  <HomeIcon />
                  Go Home
                </Button>
                <Button>Go Back</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">500 - Server Error</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ServerCrashIcon className="size-12 text-destructive/60" />
              <h2 className="mt-4 text-xl font-semibold">Something went wrong</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                We encountered an unexpected error. Please try again later.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline">
                  <RefreshCwIcon />
                  Try Again
                </Button>
                <Button>Contact Support</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Empty List</h2>
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={SearchIcon}
              title="No results found"
              description="Try adjusting your search or filter to find what you're looking for."
              action={<Button size="sm">Clear Filters</Button>}
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Empty State - No Data</h2>
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              icon={FileXIcon}
              title="No products yet"
              description="Get started by creating your first product."
              action={<Button size="sm">Create Product</Button>}
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Loading State</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <div className="grid grid-cols-3 gap-4 pt-2">
              <Skeleton className="h-20 rounded-lg" />
              <Skeleton className="h-20 rounded-lg" />
              <Skeleton className="h-20 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Network Error</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <WifiOffIcon className="size-12 text-muted-foreground/60" />
              <h2 className="mt-4 text-xl font-semibold">No internet connection</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Please check your network connection and try again.
              </p>
              <Button className="mt-6" variant="outline">
                <RefreshCwIcon />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Permission Denied</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShieldXIcon className="size-12 text-muted-foreground/60" />
              <h2 className="mt-4 text-xl font-semibold">Access Denied</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                You don&apos;t have permission to view this page. Contact your administrator for access.
              </p>
              <Button className="mt-6" variant="outline">
                Request Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
