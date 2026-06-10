"use client"
import * as React from "react"
import { FileUploadManager } from "@/components/business/file-upload-manager"
export default function FileUploadManagerPage() {
  const [files, setFiles] = React.useState<{ name: string; size: number; type: string; status: string }[]>([])
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">File Upload Manager</h1>
      <p className="mt-2 text-muted-foreground">Full file management with upload, preview, grid/list views, and drag-to-reorder.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <div className="max-w-xl">
          <FileUploadManager
            files={files}
            onFilesChange={setFiles}
            accept={{ "image/*": [".png", ".jpg"], "application/pdf": [".pdf"] }}
            maxFiles={5}
            maxSize={10 * 1024 * 1024}
          />
        </div>
      </section>
    </div>
  )
}
