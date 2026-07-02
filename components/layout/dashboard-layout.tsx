"use client";

import * as React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui";
import { Separator } from "@/components/ui";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { Avatar, AvatarFallback } from "@/components/ui";
import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  PackageIcon,
  TruckIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
} from "@/components/ui/icons";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboardIcon, href: "#", isActive: true },
  { title: "Orders", icon: ShoppingCartIcon, href: "#" },
  { title: "Products", icon: PackageIcon, href: "#" },
  { title: "Suppliers", icon: TruckIcon, href: "#" },
  { title: "Settings", icon: SettingsIcon, href: "#" },
];

/**
 * @component DashboardLayout
 * @category layout/admin
 * @since 0.2.0
 * @description Full dashboard shell with collapsible sidebar navigation, breadcrumb header, search/notification actions, and user avatar footer / 完整仪表板外壳，包含可折叠侧栏导航、面包屑头部、搜索/通知操作和用户头像页脚
 * @keywords dashboard, layout, sidebar, navigation, breadcrumb, admin
 * @example
 * <DashboardLayout title="Orders">
 *   <OrderTable />
 * </DashboardLayout>
 */
function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <SidebarProvider data-slot="dashboard-layout">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-sm font-bold">
              A
            </div>
            <span className="text-lg font-semibold">Acme</span>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      {...(item.isActive !== undefined
                        ? { isActive: item.isActive }
                        : {})}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="flex items-center gap-2 px-2 py-1">
            <Avatar className="size-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-muted-foreground text-xs">
                john@acme.com
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {title && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon-sm">
              <SearchIcon />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <BellIcon />
            </Button>
          </div>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export { DashboardLayout };
