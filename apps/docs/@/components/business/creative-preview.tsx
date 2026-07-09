import {
  BellIcon,
  ImageIcon,
  MailIcon,
  MessageSquareIcon,
  SmartphoneIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import type { ComponentType } from "react";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

export type CreativePreviewMode = "email" | "push" | "social" | "ad";
export type CreativePreviewViewport = "desktop" | "mobile";

export interface CreativePreviewProps {
  mode: CreativePreviewMode;
  viewport?: CreativePreviewViewport;
  title: string;
  eyebrow?: string;
  body?: string;
  imageUrl?: string;
  cta?: string;
  from?: string;
  className?: string;
}

const modeIcons: Record<
  CreativePreviewMode,
  ComponentType<{ className?: string }>
> = {
  email: MailIcon,
  push: BellIcon,
  social: MessageSquareIcon,
  ad: ImageIcon,
};

/**
 * @component CreativePreview
 * @category business/ux
 * @since 0.2.0
 * @description Preview creative content across email, push, social, and ad channels with desktop/mobile viewport switching / 跨渠道创意内容预览，支持邮件、推送、社交和广告模式及桌面/移动端视口切换
 * @keywords creative, preview, email, push, social, ad, viewport
 * @example
 * <CreativePreview mode="email" title="Welcome Email" body="Hello world" />
 */
export function CreativePreview({
  mode,
  viewport = "desktop",
  title,
  eyebrow,
  body,
  imageUrl,
  cta,
  from = "Chaos Marketing",
  className,
}: CreativePreviewProps) {
  const Icon = modeIcons[mode];

  return (
    <Card data-slot="creative-preview" className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4" />
          Creative preview
          <Badge variant="outline">{mode}</Badge>
          <Badge variant="secondary">{viewport}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs key={viewport} defaultValue={viewport}>
          <TabsList>
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">
              <SmartphoneIcon />
              Mobile
            </TabsTrigger>
          </TabsList>
          {(["desktop", "mobile"] as const).map((item) => (
            <TabsContent key={item} value={item}>
              <div
                className={cn(
                  "bg-background mx-auto rounded-xl border p-4 shadow-xs",
                  item === "mobile" ? "max-w-[360px]" : "max-w-2xl",
                )}
              >
                {mode === "email" && (
                  <EmailFrame
                    from={from}
                    title={title}
                    {...(body !== undefined ? { body } : {})}
                    {...(imageUrl !== undefined ? { imageUrl } : {})}
                    {...(cta !== undefined ? { cta } : {})}
                  />
                )}
                {mode === "push" && (
                  <PushFrame
                    title={title}
                    {...(body !== undefined ? { body } : {})}
                  />
                )}
                {mode === "social" && (
                  <SocialFrame
                    from={from}
                    title={title}
                    {...(body !== undefined ? { body } : {})}
                    {...(imageUrl !== undefined ? { imageUrl } : {})}
                  />
                )}
                {mode === "ad" && (
                  <AdFrame
                    title={title}
                    {...(eyebrow !== undefined ? { eyebrow } : {})}
                    {...(body !== undefined ? { body } : {})}
                    {...(imageUrl !== undefined ? { imageUrl } : {})}
                    {...(cta !== undefined ? { cta } : {})}
                  />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function MediaBlock({ imageUrl }: { imageUrl?: string }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        className="aspect-video w-full rounded-lg object-cover"
      />
    );
  }
  return (
    <div className="bg-muted text-muted-foreground flex aspect-video w-full items-center justify-center rounded-lg">
      <ImageIcon className="size-8" />
    </div>
  );
}

function EmailFrame({
  from,
  title,
  body,
  imageUrl,
  cta,
}: {
  from: string;
  title: string;
  body?: string;
  imageUrl?: string;
  cta?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="text-muted-foreground border-b pb-3 text-xs">
        From: {from}
      </div>
      <MediaBlock {...(imageUrl !== undefined ? { imageUrl } : {})} />
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        {body && <p className="text-muted-foreground mt-2 text-sm">{body}</p>}
      </div>
      {cta && (
        <div className="bg-primary text-primary-foreground inline-flex rounded-md px-3 py-2 text-sm">
          {cta}
        </div>
      )}
    </div>
  );
}

function PushFrame({ title, body }: { title: string; body?: string }) {
  return (
    <div className="bg-muted/30 rounded-xl border p-3">
      <div className="text-sm font-medium">{title}</div>
      {body && <div className="text-muted-foreground mt-1 text-sm">{body}</div>}
    </div>
  );
}

function SocialFrame({
  from,
  title,
  body,
  imageUrl,
}: {
  from: string;
  title: string;
  body?: string;
  imageUrl?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="bg-primary/15 size-8 rounded-full" />
        {from}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        {body && <p className="text-muted-foreground mt-1 text-sm">{body}</p>}
      </div>
      <MediaBlock {...(imageUrl !== undefined ? { imageUrl } : {})} />
    </div>
  );
}

function AdFrame({
  eyebrow,
  title,
  body,
  imageUrl,
  cta,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  imageUrl?: string;
  cta?: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
      <MediaBlock {...(imageUrl !== undefined ? { imageUrl } : {})} />
      <div className="flex flex-col justify-center">
        {eyebrow && (
          <div className="text-muted-foreground text-xs font-medium uppercase">
            {eyebrow}
          </div>
        )}
        <h3 className="mt-1 text-xl font-semibold">{title}</h3>
        {body && <p className="text-muted-foreground mt-2 text-sm">{body}</p>}
        {cta && (
          <div className="bg-primary text-primary-foreground mt-4 inline-flex w-fit rounded-md px-3 py-2 text-sm">
            {cta}
          </div>
        )}
      </div>
    </div>
  );
}
