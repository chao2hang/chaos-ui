import * as React from "react";
import {
  BriefcaseIcon,
  BuildingIcon,
  CameraIcon,
  MailIcon,
  MapPinIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Separator } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";
import { initials } from "@chaos_team/chaos-ui/lib";

export interface ProfileHeaderUser {
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  role?: string;
  department?: string;
  location?: string;
}

interface ProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  user: ProfileHeaderUser;
  stats?: Array<{ label: string; value: string | number }>;
  actions?: React.ReactNode;
  onAvatarUpload?: (file: File) => void;
  /** @default "var(--brand-200)" */
  coverColor?: string;
}

export function ProfileHeader({
  user,
  stats = [],
  actions,
  onAvatarUpload,
  coverColor = "var(--brand-200)",
  className,
  ...props
}: ProfileHeaderProps) {
  const hasMeta = Boolean(user.role || user.department);
  const hasDetails = Boolean(user.bio || user.email || user.location);
  const hasStats = stats.length > 0;

  return (
    <div
      data-slot="profile-header"
      className={cn(
        "bg-card text-card-foreground overflow-hidden rounded-lg border",
        className,
      )}
      {...props}
    >
      <div
        data-slot="profile-header-cover"
        className="h-32 w-full"
        style={{ backgroundColor: coverColor }}
        aria-hidden="true"
      />
      <div className="relative px-6 pb-6">
        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
            <div className="relative shrink-0">
              <Avatar className="border-card size-24 border-4">
                {user.avatar && (
                  <AvatarImage src={user.avatar} alt={user.name} />
                )}
                <AvatarFallback className="text-2xl">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
              {onAvatarUpload && (
                <label
                  className={cn(
                    "bg-card text-muted-foreground absolute right-0 bottom-0 flex size-8 cursor-pointer items-center justify-center rounded-full border",
                    "hover:text-foreground focus-within:ring-ring transition-colors focus-within:ring-2 focus-within:ring-offset-2",
                  )}
                >
                  <span className="sr-only">更换头像</span>
                  <CameraIcon className="size-4" aria-hidden="true" />
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onAvatarUpload(f);
                    }}
                  />
                </label>
              )}
            </div>
            <div className="space-y-1.5 sm:pt-12">
              <h1 className="pt-1 text-xl leading-tight font-semibold">
                {user.name}
              </h1>
              {hasMeta && (
                <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  {user.role && (
                    <span className="inline-flex items-center gap-1">
                      <BriefcaseIcon className="size-3.5" aria-hidden="true" />
                      {user.role}
                    </span>
                  )}
                  {user.role && user.department && (
                    <span className="text-border" aria-hidden="true">
                      |
                    </span>
                  )}
                  {user.department && (
                    <span className="inline-flex items-center gap-1">
                      <BuildingIcon className="size-3.5" aria-hidden="true" />
                      {user.department}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          {actions && <div className="flex gap-2 sm:pt-12">{actions}</div>}
        </div>

        {hasDetails && (
          <>
            <Separator className="mt-5" />
            <div className="mt-4 space-y-3">
              {user.bio && (
                <p className="text-foreground max-w-2xl text-sm leading-relaxed">
                  {user.bio}
                </p>
              )}
              {(user.email || user.location) && (
                <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  {user.email && (
                    <a
                      href={`mailto:${user.email}`}
                      className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
                    >
                      <MailIcon className="size-3.5" aria-hidden="true" />
                      {user.email}
                    </a>
                  )}
                  {user.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPinIcon className="size-3.5" aria-hidden="true" />
                      {user.location}
                    </span>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {hasStats && (
          <>
            <Separator className="mt-5" />
            <dl
              data-slot="profile-header-stats"
              className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <dt className="text-muted-foreground text-xs">{s.label}</dt>
                  <dd className="mt-0.5 text-lg font-semibold tabular-nums">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>
    </div>
  );
}

interface ProfileFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  fields: Array<{
    name: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
    type?: string;
  }>;
  onSubmit?: (values: Record<string, string>) => void;
  /** @default "保存" */
  submitLabel?: string;
}

export function ProfileForm({
  fields = [],
  onSubmit,
  submitLabel = "保存",
  className,
  ...props
}: ProfileFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    fields.forEach((f) => {
      values[f.name] = String(fd.get(f.name) ?? "");
    });
    onSubmit?.(values);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      {...props}
    >
      {fields.map((f) => (
        <div key={f.name} className="space-y-1.5">
          <Label htmlFor={f.name}>{f.label}</Label>
          <Input
            id={f.name}
            name={f.name}
            defaultValue={f.defaultValue}
            placeholder={f.placeholder}
            type={f.type ?? "text"}
          />
        </div>
      ))}
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
