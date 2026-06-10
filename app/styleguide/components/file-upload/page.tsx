"use client"
import * as React from "react"
import { FileUpload, FileList } from "@/components/ui/file-upload"
export default function FileUploadPage() {
  const [files, setFiles] = React.useState<{ name: string; size: number; type: string; status: string }[]>([])
  const handleDrop = (newFiles: File[]) => setFiles((prev) => [...prev, ...newFiles.map((f) => ({ name: f.name, size: f.size, type: f.type, status: "success" }))])
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">File Upload</h1>
      <p className="mt-2 text-muted-foreground">Drag and drop file upload area.</p>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Basic</h2>
        <div className="max-w-lg"><FileUpload onDrop={handleDrop} /></div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">With File List</h2>
        <div className="max-w-lg space-y-4">
          <FileUpload onDrop={handleDrop} accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif"] }} maxFiles={3} maxSize={5 * 1024 * 1024} />
          {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles((prev) => prev.filter((_, j) => j !== i))} />}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Disabled</h2>
        <div className="max-w-lg"><FileUpload onDrop={() => {}} disabled /></div>
      </section>
    </div>
  )
}
