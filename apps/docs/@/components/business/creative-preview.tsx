"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, PlayIcon } from "lucide-react";

interface CreativePreviewProps extends React.ComponentProps<typeof Card> {
  title?: string;
  type?: "image" | "video" | "text";
  src?: string;
  description?: string;
  size?: string;
  status?: string;
}

function CreativePreview({
  title = "创意素材",
  type = "image",
  src,
  description,
  size,
  status,
  className,
  ...props
}: CreativePreviewProps) {
  return (
    <Card
      data-slot="creative-preview"
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <div className="bg-muted relative flex aspect-video items-center justify-center">
        {src ? (
          <img src={src} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            {type === "video" ? (
              <PlayIcon className="size-10" />
            ) : (
              <ImageIcon className="size-10" />
            )}
            <span className="text-xs">
              {type === "video" ? "视频素材" : "图片素材"}
            </span>
          </div>
        )}
        {status && (
          <Badge className="absolute top-2 right-2 text-xs" variant="secondary">
            {status}
          </Badge>
        )}
      </div>
      <CardContent className="space-y-1 p-3">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-medium">{title}</span>
          {size && (
            <span className="text-muted-foreground ml-2 shrink-0 text-xs">
              {size}
            </span>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground truncate text-xs">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export { CreativePreview };
export type { CreativePreviewProps };
