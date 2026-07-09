"use client";

import * as React from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  CodeIcon,
  LinkIcon,
  ImageIcon,
  PaperclipIcon,
  UndoIcon,
  RedoIcon,
  Heading1Icon,
  Heading2Icon,
  StrikethroughIcon,
  ExternalLinkIcon,
  TrashIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Switch } from "@chaos_team/chaos-ui/ui";
import { Separator } from "@chaos_team/chaos-ui/ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chaos_team/chaos-ui/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatFileSize } from "@chaos_team/chaos-ui/lib";

/**
 * @component RichTextEditor
 * @category business/form
 * @since 1.0.0
 * @description 富文本编辑器,基于 TipTap 实现,支持工具栏(加粗/斜体/标题/列表/引用/代码块)、链接、图片上传、附件上传。
 * @keywords richtext, editor, tiptap, wysiwyg
 * @example
 * <RichTextEditor value="<p>Hello</p>" onChange={setHtml} placeholder="请输入..." />
 */

interface RichTextEditorProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
  showToolbar?: boolean;
  minHeight?: number;
  onUpload?: (
    file: File,
  ) => Promise<{ url: string; name?: string; size?: number }>;
  className?: string;
}

function RichTextEditor({
  value = "",
  onChange,
  placeholder = "开始输入...",
  editable = true,
  showToolbar = true,
  minHeight = 200,
  onUpload,
  className,
  ...props
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: { HTMLAttributes: { class: "language-*" } },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary underline" },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editable,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        style: `min-height: ${minHeight}px`,
      },
    },
    immediatelyRender: false,
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
        加载编辑器...
      </div>
    );
  }

  const defaultUpload = (
    file: File,
  ): Promise<{ url: string; name: string; size: number }> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        resolve({
          url: String(ev.target?.result ?? ""),
          name: file.name,
          size: file.size,
        });
      reader.readAsDataURL(file);
    });

  return (
    <div
      data-slot="rich-text-editor"
      className={cn("rounded-md border bg-background", className)}
      {...props}
    >
      {showToolbar && editable && (
        <RichTextToolbar editor={editor} onUpload={onUpload ?? defaultUpload} />
      )}
      <div
        className="prose prose-sm max-w-none cursor-text px-3 py-2 focus:outline-none [&_.ProseMirror]:min-h-full [&_.ProseMirror]:cursor-text [&_.ProseMirror]:outline-none [&_a]:text-primary [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_img]:rounded [&_img]:max-w-full [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-6"
        style={{ minHeight }}
        onMouseDown={(e) => {
          if (editor && !editor.isFocused) {
            e.preventDefault();
            editor.commands.focus("end");
          }
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

type UploadFn = (
  file: File,
) => Promise<{ url: string; name?: string; size?: number }>;

function RichTextToolbar({
  editor,
  onUpload,
}: {
  editor: Editor;
  onUpload: UploadFn;
}) {
  const [linkOpen, setLinkOpen] = React.useState(false);
  const [imageOpen, setImageOpen] = React.useState(false);
  const [attachOpen, setAttachOpen] = React.useState(false);
  const [inserting, setInserting] = React.useState(false);
  const currentLink = editor.getAttributes("link").href as string | undefined;

  return (
    <div
      className="flex flex-wrap items-center gap-0.5 border-b p-1"
      role="toolbar"
      aria-label="富文本编辑工具栏"
    >
      <ToolButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        icon={<BoldIcon />}
        title="加粗"
      />
      <ToolButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        icon={<ItalicIcon />}
        title="斜体"
      />
      <ToolButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        icon={<StrikethroughIcon />}
        title="删除线"
      />
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive("heading", { level: 1 })}
        icon={<Heading1Icon />}
        title="标题1"
      />
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        icon={<Heading2Icon />}
        title="标题2"
      />
      <ToolButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        icon={<ListIcon />}
        title="无序列表"
      />
      <ToolButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        icon={<ListOrderedIcon />}
        title="有序列表"
      />
      <ToolButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        icon={<QuoteIcon />}
        title="引用"
      />
      <ToolButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
        icon={<CodeIcon />}
        title="代码块"
      />

      <Popover open={linkOpen} onOpenChange={setLinkOpen}>
        <PopoverTrigger
          render={
            <ToolButton
              onClick={() => setLinkOpen(true)}
              active={editor.isActive("link")}
              icon={<LinkIcon />}
              title="链接"
            />
          }
        />
        <PopoverContent className="w-80" align="start">
          <LinkPopover
            currentUrl={currentLink}
            onApply={(url, openInNew) => {
              if (url) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({
                    href: url,
                    target: openInNew ? "_blank" : null,
                    rel: openInNew ? "noopener noreferrer" : null,
                  })
                  .run();
              } else {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();
              }
              setLinkOpen(false);
            }}
            onRemove={() => {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              setLinkOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <ToolButton
        onClick={() => setImageOpen(true)}
        icon={<ImageIcon />}
        title="图片"
      />
      <ToolButton
        onClick={() => setAttachOpen(true)}
        icon={<PaperclipIcon />}
        title="附件"
      />

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={() => setImageOpen(true)}
        data-image-input
      />

      <div className="mx-1 h-4 w-px bg-muted-foreground/20" />
      <ToolButton
        onClick={() => editor.chain().focus().undo().run()}
        icon={<UndoIcon />}
        title="撤销"
      />
      <ToolButton
        onClick={() => editor.chain().focus().redo().run()}
        icon={<RedoIcon />}
        title="重做"
      />

      <ImageDialog
        open={imageOpen}
        onOpenChange={setImageOpen}
        onUpload={onUpload}
        onInsert={async (src, alt) => {
          if (src) {
            editor.chain().focus().setImage({ src, alt }).run();
          }
        }}
        inserting={inserting}
        setInserting={setInserting}
      />

      <AttachmentDialog
        open={attachOpen}
        onOpenChange={setAttachOpen}
        onUpload={onUpload}
        onInsert={(info) => {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "text",
              text: ` [${info.name}](${info.url}) `,
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: info.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  },
                },
              ],
            })
            .run();
        }}
        inserting={inserting}
        setInserting={setInserting}
      />
    </div>
  );
}

function LinkPopover({
  currentUrl,
  onApply,
  onRemove,
}: {
  currentUrl: string | undefined;
  onApply: (url: string, openInNew: boolean) => void;
  onRemove: () => void;
}) {
  const [url, setUrl] = React.useState("");
  const [openInNew, setOpenInNew] = React.useState(false);
  const isEdit = !!currentUrl;
  const isValid = url === "" || /^https?:\/\/|mailto:|tel:|\//.test(url);

  return (
    <div className="space-y-3" key={currentUrl ?? "new"}>
      <div className="space-y-1.5">
        <Label htmlFor="link-url" className="text-xs">
          链接地址
        </Label>
        <Input
          id="link-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={isEdit ? currentUrl : "https://example.com"}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onApply(url || currentUrl || "", openInNew);
            }
          }}
        />
        {!isValid && <p className="text-xs text-destructive">请输入有效的 URL</p>}
      </div>

      <label className="flex items-center gap-2 text-xs">
        <Switch checked={openInNew} onCheckedChange={setOpenInNew} />
        <span>在新窗口打开</span>
      </label>

      <Separator />

      <div className="flex items-center justify-between">
        {isEdit && (
          <Button variant="ghost" size="xs" onClick={onRemove}>
            <TrashIcon />
            移除链接
          </Button>
        )}
        <div className="ml-auto flex gap-1">
          {isEdit && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onApply(currentUrl ?? "", openInNew)}
            >
              取消
            </Button>
          )}
          <Button
            size="xs"
            disabled={!isValid}
            onClick={() => onApply(url, openInNew)}
          >
            {isEdit ? "更新" : "插入"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ImageDialog({
  open,
  onOpenChange,
  onUpload,
  onInsert,
  inserting,
  setInserting,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: UploadFn;
  onInsert: (src: string, alt: string) => void | Promise<void>;
  inserting: boolean;
  setInserting: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <ImageDialogContent
          onOpenChange={onOpenChange}
          onUpload={onUpload}
          onInsert={onInsert}
          inserting={inserting}
          setInserting={setInserting}
        />
      )}
    </Dialog>
  );
}

function ImageDialogContent({
  onOpenChange,
  onUpload,
  onInsert,
  inserting,
  setInserting,
}: {
  onOpenChange: (open: boolean) => void;
  onUpload: UploadFn;
  onInsert: (src: string, alt: string) => void | Promise<void>;
  inserting: boolean;
  setInserting: (v: boolean) => void;
}) {
  const [tab, setTab] = React.useState<"upload" | "url">("upload");
  const [url, setUrl] = React.useState("");
  const [alt, setAlt] = React.useState("");
  const [preview, setPreview] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("请选择图片文件");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("文件大小不能超过 10MB");
      return;
    }
    setError(null);
    setFileName(file.name);
    setInserting(true);
    try {
      const result = await onUpload(file);
      setPreview(result.url);
      if (!alt) setAlt(file.name.replace(/\.[^.]+$/, ""));
    } catch {
      setError("上传失败");
    } finally {
      setInserting(false);
    }
  };

  const handleInsert = async () => {
    const src = tab === "upload" ? preview : url;
    if (!src) {
      setError(tab === "upload" ? "请先上传图片" : "请输入图片 URL");
      return;
    }
    await onInsert(src, alt);
    onOpenChange(false);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>插入图片</DialogTitle>
        <DialogDescription>从本地上传或使用在线图片链接</DialogDescription>
      </DialogHeader>

      <div className="flex gap-1 border-b">
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={cn(
            "border-b-2 px-3 py-1.5 text-sm transition-colors",
            tab === "upload"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          上传
        </button>
        <button
          type="button"
          onClick={() => setTab("url")}
          className={cn(
            "border-b-2 px-3 py-1.5 text-sm transition-colors",
            tab === "url"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          链接
        </button>
      </div>

      {tab === "upload" ? (
        <div className="space-y-3">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files?.[0];
              if (f) handleFile(f);
            }}
            onClick={() => fileRef.current?.click()}
            className={cn(
              "flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-muted/20 text-sm text-muted-foreground transition-colors",
              dragOver && "border-primary bg-primary/5 text-primary",
              !dragOver && "hover:border-primary/50",
            )}
          >
            {preview ? (
              <img
                src={preview}
                alt={alt}
                className="max-h-full max-w-full rounded object-contain"
              />
            ) : (
              <>
                <ImageIcon className="size-8" />
                <span>点击或拖拽图片到此处</span>
                <span className="text-xs text-muted-foreground">
                  支持 PNG / JPG / GIF / WebP · 最大 10MB
                </span>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </div>
          {fileName && !preview && inserting && (
            <p className="text-xs text-muted-foreground">
              正在上传 {fileName}...
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-1.5">
          <Label htmlFor="img-url">图片 URL</Label>
          <Input
            id="img-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.png"
          />
          {url && (
            <div className="mt-2 flex aspect-video items-center justify-center overflow-hidden rounded-md border bg-muted/20">
              <img
                src={url}
                alt="preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="img-alt">替代文本（Alt）</Label>
        <Input
          id="img-alt"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="图片描述（用于无障碍）"
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          取消
        </Button>
        <Button onClick={handleInsert} disabled={inserting}>
          {inserting ? "上传中..." : "插入"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function AttachmentDialog({
  open,
  onOpenChange,
  onUpload,
  onInsert,
  inserting,
  setInserting,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: UploadFn;
  onInsert: (info: { url: string; name: string; size?: number }) => void;
  inserting: boolean;
  setInserting: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <AttachmentDialogContent
          onOpenChange={onOpenChange}
          onUpload={onUpload}
          onInsert={onInsert}
          inserting={inserting}
          setInserting={setInserting}
        />
      )}
    </Dialog>
  );
}

function AttachmentDialogContent({
  onOpenChange,
  onUpload,
  onInsert,
  inserting,
  setInserting,
}: {
  onOpenChange: (open: boolean) => void;
  onUpload: UploadFn;
  onInsert: (info: { url: string; name: string; size?: number }) => void;
  inserting: boolean;
  setInserting: (v: boolean) => void;
}) {
  const [files, setFiles] = React.useState<
    Array<{ file: File; url?: string; error?: string }>
  >([]);
  const [dragOver, setDragOver] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const addFiles = async (incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    setFiles((prev) => [...prev, ...arr.map((f) => ({ file: f }))]);
    for (const f of arr) {
      if (f.size > 50 * 1024 * 1024) {
        setFiles((prev) =>
          prev.map((entry) =>
            entry.file === f ? { ...entry, error: "超过 50MB" } : entry,
          ),
        );
        continue;
      }
      setInserting(true);
      try {
        const result = await onUpload(f);
        setFiles((prev) =>
          prev.map((entry) =>
            entry.file === f ? { ...entry, url: result.url } : entry,
          ),
        );
      } catch {
        setFiles((prev) =>
          prev.map((entry) =>
            entry.file === f ? { ...entry, error: "上传失败" } : entry,
          ),
        );
      } finally {
        setInserting(false);
      }
    }
  };

  const removeFile = (file: File) => {
    setFiles((prev) => prev.filter((e) => e.file !== file));
  };

  const handleInsert = () => {
    const ready = files.filter((f) => f.url && !f.error);
    ready.forEach((entry) => {
      onInsert({
        url: entry.url!,
        name: entry.file.name,
        size: entry.file.size,
      });
    });
    onOpenChange(false);
  };

  const allReady =
    files.length > 0 && files.every((f) => (f.url || f.error) && !inserting);
  const readyCount = files.filter((f) => f.url && !f.error).length;

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>插入附件</DialogTitle>
        <DialogDescription>
          支持 PDF、文档、压缩包等任意文件
        </DialogDescription>
      </DialogHeader>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        onClick={() => fileRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-muted/20 px-4 py-6 text-sm text-muted-foreground transition-colors",
          dragOver && "border-primary bg-primary/5 text-primary",
          !dragOver && "hover:border-primary/50",
        )}
      >
        <PaperclipIcon className="size-6" />
        <span>点击或拖拽文件到此处</span>
        <span className="text-xs">支持任意类型 · 单个文件最大 50MB</span>
        <input
          ref={fileRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
          }}
        />
      </div>

      {files.length > 0 && (
        <div className="max-h-60 space-y-1 overflow-y-auto rounded-md border bg-muted/20 p-2">
          {files.map((entry) => (
            <div
              key={entry.file.name + entry.file.size}
              className="flex items-center gap-2 rounded bg-background px-2 py-1.5 text-xs"
            >
              <PaperclipIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium">{entry.file.name}</div>
                <div className="text-muted-foreground">
                  {formatFileSize(entry.file.size)}
                </div>
              </div>
              {entry.error ? (
                <span className="text-destructive">{entry.error}</span>
              ) : entry.url ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                  title="预览"
                >
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              ) : (
                <span className="text-muted-foreground">上传中...</span>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(entry.file);
                }}
                aria-label="移除"
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
        </div>
      )}

      <DialogFooter>
        <span className="mr-auto text-xs text-muted-foreground">
          {readyCount > 0 ? `将插入 ${readyCount} 个附件` : "请添加文件"}
        </span>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          取消
        </Button>
        <Button onClick={handleInsert} disabled={!allReady || readyCount === 0}>
          {inserting ? "上传中..." : "插入"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function ToolButton({
  onClick,
  active,
  icon,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={onClick}
      className={cn(active && "bg-accent text-accent-foreground")}
      title={title}
      aria-label={title}
    >
      {icon}
    </Button>
  );
}

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
export type { RichTextEditorProps };
