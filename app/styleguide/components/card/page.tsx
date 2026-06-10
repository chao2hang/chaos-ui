import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Mail, ArrowUpRight, TrendingUp, Users, DollarSign } from "lucide-react"

export default function CardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Card</h1>
      <p className="mt-2 text-muted-foreground">
        Container component for grouping related content with header, content, and footer sections.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic Card</h2>
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is the main content area of the card. You can put any content here.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Small Card</h2>
        <div className="max-w-sm">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Small Card</CardTitle>
              <CardDescription>Compact spacing variant.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Uses reduced padding for denser layouts.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Header & Footer</h2>
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-md border p-2">
                  <Mail className="size-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">New message from Alex</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-md border p-2">
                  <Mail className="size-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">Team update</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View all</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Action</h2>
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members here.</CardDescription>
              <CardAction>
                <Button size="sm">Invite</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                4 members currently in your team.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Form Card</h2>
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Add a new payment method to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="card-name">Name</Label>
                  <Input id="card-name" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <Input id="card-number" placeholder="4242 4242 4242 4242" />
                    <CreditCard className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Stats Cards</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl">$45,231.89</CardTitle>
              <CardAction>
                <DollarSign className="size-4 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardFooter>
              <Badge variant="secondary"><TrendingUp /> +20.1% from last month</Badge>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Subscriptions</CardDescription>
              <CardTitle className="text-2xl">+2,350</CardTitle>
              <CardAction>
                <Users className="size-4 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardFooter>
              <Badge variant="secondary"><TrendingUp /> +180.1% from last month</Badge>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Sales</CardDescription>
              <CardTitle className="text-2xl">+12,234</CardTitle>
              <CardAction>
                <CreditCard className="size-4 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardFooter>
              <Badge variant="secondary"><TrendingUp /> +19% from last month</Badge>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Active Now</CardDescription>
              <CardTitle className="text-2xl">+573</CardTitle>
              <CardAction>
                <TrendingUp className="size-4 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardFooter>
              <Badge variant="secondary"><TrendingUp /> +201 since last hour</Badge>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Interactive Card</h2>
        <div className="max-w-sm">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Open Project
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </CardTitle>
              <CardDescription>
                View and manage your project settings, deployments, and team access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
