"use client"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"

export default function AvatarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Avatar</h1>
      <p className="mt-2 text-muted-foreground">
        User avatar component with image, fallback, badges, and group display.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Image</h2>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
            <AvatarFallback>NJ</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Fallback</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          When no image is available, initials are displayed as a fallback.
        </p>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>ML</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>ZQ</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Sizes</h2>
        <div className="flex items-end gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">sm (24px)</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar>
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">default (32px)</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar size="lg">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">lg (40px)</span>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With Badge</h2>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
            <AvatarBadge />
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>LG</AvatarFallback>
            <AvatarBadge />
          </Avatar>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Avatar Group</h2>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Default size</p>
            <AvatarGroup>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+3</AvatarGroupCount>
            </AvatarGroup>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Small size</p>
            <AvatarGroup>
              <Avatar size="sm">
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+5</AvatarGroupCount>
            </AvatarGroup>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Large size</p>
            <AvatarGroup>
              <Avatar size="lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>
        </div>
      </section>
    </div>
  )
}
