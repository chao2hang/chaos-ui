import * as React from "react"
import { CameraIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { initials } from "@/lib/format"

export interface ProfileHeaderUser {
  name: string
  email?: string
  avatar?: string
  bio?: string
  role?: string
  location?: string
}

interface ProfileHeaderProps extends React.ComponentProps<"div"> {
  user: ProfileHeaderUser
  stats?: Array<{ label: string; value: string | number }>
  actions?: React.ReactNode
  onAvatarUpload?: (file: File) => void
  coverColor?: string
  className?: string
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
  return (
    <div data-slot="profile-header" className={cn("overflow-hidden rounded-md border bg-card", className)} {...props}>
      <div className="h-32 w-full" style={{ backgroundColor: coverColor }} />
      <div className="relative px-6 pb-4">
        <div className="-mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end">
            <div className="relative">
              <Avatar className="size-24 border-4 border-background">
                {user.avatar && <AvatarImage src={user.avatar} />}
                <AvatarFallback className="text-2xl">{initials(user.name)}</AvatarFallback>
              </Avatar>
              {onAvatarUpload && (
                <label
                  className="absolute right-0 bottom-0 flex size-8 cursor-pointer items-center justify-center rounded-full border bg-background text-muted-foreground hover:text-foreground"
                  aria-label="更换头像"
                >
                  <CameraIcon className="size-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) onAvatarUpload(f)
                    }}
                  />
                </label>
              )}
            </div>
            <div className="space-y-1 sm:pb-2">
              <h1 className="text-xl font-semibold">{user.name}</h1>
              {user.role && <p className="text-sm text-muted-foreground">{user.role}</p>}
              {user.bio && <p className="max-w-md text-sm">{user.bio}</p>}
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {user.email && <span>{user.email}</span>}
                {user.location && <span>· {user.location}</span>}
              </div>
            </div>
          </div>
          {actions && <div className="flex gap-2 sm:pb-2">{actions}</div>}
        </div>
        {stats.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-lg font-semibold tabular-nums">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface ProfileFormProps extends React.ComponentProps<"form"> {
  fields: Array<{ name: string; label: string; defaultValue?: string; placeholder?: string; type?: string }>
  onSubmit?: (values: Record<string, string>) => void
  submitLabel?: string
}

export function ProfileForm({ fields, onSubmit, submitLabel = "保存", className, ...props }: ProfileFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const values: Record<string, string> = {}
    fields.forEach((f) => {
      values[f.name] = String(fd.get(f.name) ?? "")
    })
    onSubmit?.(values)
  }
  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)} {...props}>
      {fields.map((f) => (
        <div key={f.name} className="space-y-1.5">
          <Label htmlFor={f.name}>{f.label}</Label>
          <Input id={f.name} name={f.name} defaultValue={f.defaultValue} placeholder={f.placeholder} type={f.type ?? "text"} />
        </div>
      ))}
      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}
