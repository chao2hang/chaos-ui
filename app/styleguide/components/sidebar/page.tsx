"use client"
import * as React from "react"
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarFooter, SidebarSeparator } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LayoutDashboardIcon, ShoppingCartIcon, PackageIcon, SettingsIcon, UsersIcon, BarChart3Icon } from "lucide-react"
const nav = [
  { title: "Dashboard", icon: LayoutDashboardIcon, active: true },
  { title: "Orders", icon: ShoppingCartIcon },
  { title: "Products", icon: PackageIcon },
  { title: "Customers", icon: UsersIcon },
  { title: "Analytics", icon: BarChart3Icon },
]
export default function SidebarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Sidebar</h1>
      <p className="mt-2 text-muted-foreground">Primary navigation sidebar with collapsible groups.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Full Sidebar</h2>
        <div className="overflow-hidden rounded-lg border">
          <SidebarProvider defaultOpen>
            <div className="flex h-[500px]">
              <Sidebar>
                <SidebarHeader>
                  <div className="flex items-center gap-2 px-2 py-1">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">C</div>
                    <span className="font-semibold">Chaos UI</span>
                  </div>
                </SidebarHeader>
                <SidebarSeparator />
                <SidebarContent>
                  <SidebarGroup><SidebarGroupLabel>Platform</SidebarGroupLabel><SidebarGroupContent>
                    <SidebarMenu>{nav.map((item) => (
                      <SidebarMenuItem key={item.title}><SidebarMenuButton isActive={item.active} tooltip={item.title}><item.icon /><span>{item.title}</span></SidebarMenuButton></SidebarMenuItem>
                    ))}</SidebarMenu>
                  </SidebarGroupContent></SidebarGroup>
                </SidebarContent>
                <SidebarSeparator />
                <SidebarFooter>
                  <div className="flex items-center gap-2 px-2 py-1">
                    <Avatar className="size-8"><AvatarFallback>JD</AvatarFallback></Avatar>
                    <div className="flex flex-col"><span className="text-sm font-medium">John Doe</span><span className="text-xs text-muted-foreground">john@acme.com</span></div>
                  </div>
                </SidebarFooter>
              </Sidebar>
              <SidebarInset>
                <div className="flex h-14 items-center gap-2 border-b px-4"><SidebarTrigger /><Separator orientation="vertical" className="mr-2 h-4" /><span className="text-sm text-muted-foreground">Main content area</span></div>
                <div className="flex-1 p-6"><p className="text-muted-foreground">The sidebar is fully collapsible.</p></div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </section>
    </div>
  )
}
