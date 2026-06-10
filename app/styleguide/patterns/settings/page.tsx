"use client"
import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"


export default function SettingsPatternPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Settings Pattern</h1>
      <p className="mt-2 text-muted-foreground">Settings page with tabbed navigation and form sections.</p>
      <section className="mt-8">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card><CardHeader><CardTitle>Profile</CardTitle><CardDescription>Manage your public profile information.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5"><Label>First Name</Label><Input defaultValue="John" /></div>
                  <div className="space-y-1.5"><Label>Last Name</Label><Input defaultValue="Doe" /></div>
                </div>
                <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="john@acme.com" /></div>
                <div className="space-y-1.5"><Label>Bio</Label><Input defaultValue="Full-stack developer" /></div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card><CardHeader><CardTitle>Security</CardTitle><CardDescription>Manage your security settings.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><div><Label>Two-factor authentication</Label><p className="text-xs text-muted-foreground">Add extra security to your account.</p></div><Switch /></div>
                <div className="border-t my-2" />
                <div className="flex items-center justify-between"><div><Label>Session timeout</Label><p className="text-xs text-muted-foreground">Auto-logout after inactivity.</p></div><Switch defaultChecked /></div>
                <Button variant="outline">Change Password</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card><CardHeader><CardTitle>Notifications</CardTitle><CardDescription>Configure notification preferences.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><div><Label>Email notifications</Label><p className="text-xs text-muted-foreground">Receive email updates.</p></div><Switch defaultChecked /></div>
                <div className="border-t my-2" />
                <div className="flex items-center justify-between"><div><Label>Push notifications</Label><p className="text-xs text-muted-foreground">Browser push notifications.</p></div><Switch /></div>
                <div className="border-t my-2" />
                <div className="flex items-center justify-between"><div><Label>Marketing emails</Label><p className="text-xs text-muted-foreground">Product updates and offers.</p></div><Switch /></div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
