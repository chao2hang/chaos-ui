"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component PasteUpload
 * @category business/attachment
 * @since 0.7.0
 * @description 粘贴上传
 * @keywords paste, upload
 * @example
 * <PasteUpload />
 */

interface PasteUploadProps {
  onPaste?: (files: File[]) => void;
  children?: React.ReactNode;
  className?: string;
}

function PasteUpload({ className }: PasteUploadProps) {
  return (
    <div data-slot="paste-upload" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PasteUpload };
export type { PasteUploadProps };
