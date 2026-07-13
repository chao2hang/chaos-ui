"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/format";

export interface UserMenuUser {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface UserMenuAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  destructive?: boolean;
  disabled?: boolean;
}

interface UserMenuProps {
  user: UserMenuUser;
  actions?: UserMenuAction[];
  showProfile?: boolean;
  showSettings?: boolean;
  onProfile?: () => void;
  onSettings?: () => void;
  onSignOut?: () => void;
  align?: "start" | "center" | "end";
  className?: string;
}

/**
 * @component UserMenu
 * @category business/ux
 * @since 0.2.0
 * @description Avatar dropdown menu with user info, profile/settings links, custom actions, and sign-out / 头像下拉菜单，包含用户信息、个人资料/设置链接、自定义操作和退出登录
 * @keywords user, menu, avatar, dropdown, profile, settings, signout
 * @example
 * <UserMenu user={currentUser} onProfile={goToProfile} onSignOut={handleSignOut} />
 */
export function UserMenu({
  user,
  actions = [],
  showProfile = true,
  showSettings = true,
  onProfile,
  onSettings,
  onSignOut,
  align = "end",
  className,
}: UserMenuProps) {
  return (
    <div data-slot="user-menu" className="inline-flex">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className={cn("rounded-full", className)}
              aria-label={`Open menu for ${user.name}`}
              data-slot="user-menu-trigger"
            />
          }
        >
          <Avatar className="size-8">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="text-xs">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm leading-none font-medium">{user.name}</p>
                {user.email && (
                  <p className="text-muted-foreground text-xs leading-none">
                    {user.email}
                  </p>
                )}
                {user.role && (
                  <p className="text-muted-foreground mt-1 text-xs leading-none">
                    {user.role}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
          {showProfile && (
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onProfile}>
                <span>个人资料</span>
              </DropdownMenuItem>
              {showSettings && (
                <DropdownMenuItem onClick={onSettings}>
                  <span>账户设置</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          )}
          {actions.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {actions.map((action, i) => (
                  <DropdownMenuItem
                    key={`${action.label}-${i}`}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    variant={action.destructive ? "destructive" : "default"}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </>
          )}
          {onSignOut && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut} variant="destructive">
                <span>退出登录</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
