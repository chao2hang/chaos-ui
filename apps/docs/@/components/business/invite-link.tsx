"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, CheckIcon } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export interface InviteLinkProps {
  /** The invite URL. */
  url: string;
  /** Invite description text. */
  description?: string;
  /** Additional class names. */
  className?: string;
}

/**
 * @component InviteLink
 * @category business/marketing
 * @since 1.1.0
 * @description Invite link card with copy button / 邀请链接卡片，含复制按钮
 * @keywords invite, referral, share, link, marketing
 * @example
 * <InviteLink url="https://app.example.com/invite/abc123" description="Share with friends" />
 */
function InviteLink({ url, description, className }: InviteLinkProps) {
  const [copied, copy] = useCopyToClipboard();

  return (
    <div
      data-slot="invite-link"
      className={cn(
        "bg-card flex flex-col gap-2 rounded-lg border p-4",
        className,
      )}
    >
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
      <div className="flex gap-2">
        <Input value={url} readOnly className="flex-1 font-mono text-xs" />
        <Button
          variant="outline"
          size="sm"
          onClick={() => copy(url)}
          className="shrink-0"
        >
          {copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

export { InviteLink };
