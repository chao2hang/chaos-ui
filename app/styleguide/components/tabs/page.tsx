"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserIcon, SettingsIcon, BellIcon, ShieldIcon } from "lucide-react"

export default function TabsPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-heading text-3xl font-bold">Tabs</h1>
        <p className="mt-2 text-muted-foreground">
          A set of layered sections of content—known as tabbed panels—that are displayed one at a time.
        </p>
      </div>

      {/* Default Tabs */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Default</h2>
          <p className="text-sm text-muted-foreground">Default pill-style tabs with background indicator.</p>
        </div>
        <Card>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Make changes to your account here.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="@johndoe" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password here.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-pass">New password</Label>
                      <Input id="new-pass" type="password" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notifications" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure your notification preferences.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Manage how you receive notifications about activity, messages, and more.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Line Variant */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">Line Variant</h2>
          <p className="text-sm text-muted-foreground">Underline-style tabs without background fill.</p>
        </div>
        <Card>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-2">
                <p className="text-sm">Overview content with metrics and summaries.</p>
              </TabsContent>
              <TabsContent value="analytics" className="mt-2">
                <p className="text-sm">Analytics content with charts and data visualizations.</p>
              </TabsContent>
              <TabsContent value="reports" className="mt-2">
                <p className="text-sm">Reports content with downloadable files.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Icons</h2>
          <p className="text-sm text-muted-foreground">Tabs with inline icons for visual context.</p>
        </div>
        <Card>
          <CardContent>
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">
                  <UserIcon data-icon="inline-start" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <SettingsIcon data-icon="inline-start" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="alerts">
                  <BellIcon data-icon="inline-start" />
                  Alerts
                </TabsTrigger>
                <TabsTrigger value="security">
                  <ShieldIcon data-icon="inline-start" />
                  Security
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-2">
                <p className="text-sm">Profile information and avatar settings.</p>
              </TabsContent>
              <TabsContent value="settings" className="mt-2">
                <p className="text-sm">General application settings and preferences.</p>
              </TabsContent>
              <TabsContent value="alerts" className="mt-2">
                <p className="text-sm">Alert configuration and notification rules.</p>
              </TabsContent>
              <TabsContent value="security" className="mt-2">
                <p className="text-sm">Two-factor authentication and session management.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* With Cards Inside */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Cards Inside</h2>
          <p className="text-sm text-muted-foreground">Tabs containing card layouts for structured content.</p>
        </div>
        <Card>
          <CardContent>
            <Tabs defaultValue="members">
              <TabsList variant="line">
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
              </TabsList>
              <TabsContent value="members" className="mt-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card size="sm">
                    <CardHeader>
                      <CardTitle>Alice Johnson</CardTitle>
                      <CardDescription>admin@example.com</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Role: Admin</p>
                    </CardContent>
                  </Card>
                  <Card size="sm">
                    <CardHeader>
                      <CardTitle>Bob Smith</CardTitle>
                      <CardDescription>bob@example.com</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Role: Editor</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="roles" className="mt-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card size="sm">
                    <CardHeader>
                      <CardTitle>Admin</CardTitle>
                      <CardDescription>Full access to all resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">2 members</p>
                    </CardContent>
                  </Card>
                  <Card size="sm">
                    <CardHeader>
                      <CardTitle>Editor</CardTitle>
                      <CardDescription>Can edit content and manage drafts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">5 members</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* With Form */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">With Form</h2>
          <p className="text-sm text-muted-foreground">Tabs containing form inputs with action buttons.</p>
        </div>
        <Card>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://acme.com" />
                  </div>
                  <Separator />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save changes</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="billing" className="mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card">Card Number</Label>
                    <Input id="card" placeholder="**** **** **** ****" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="***" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Update billing</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
