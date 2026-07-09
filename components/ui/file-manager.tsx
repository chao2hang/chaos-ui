"use client";

import * as React from "react";
import {
  FolderIcon,
  FolderOpenIcon,
  FileIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  ImageIcon,
  SearchIcon,
  UploadIcon,
  Trash2Icon,
  Grid3X3Icon,
  ListIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MoreVerticalIcon,
  XIcon,
  HomeIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FileNode {
  /** Unique id / 唯一标识 */
  id: string;
  /** Node name / 名称 */
  name: string;
  /** Node type / 类型 */
  type: "folder" | "file";
  /** File extension (for files) / 文件扩展名 */
  extension?: string;
  /** File size in bytes / 文件大小 */
  size?: number;
  /** Last modified ISO string / 最后修改时间 */
  modifiedAt?: string;
  /** Children (for folders) / 子节点 */
  children?: FileNode[];
  /** Whether node is selectable / 是否可选 */
  selectable?: boolean;
}

type ViewMode = "list" | "grid";

interface FileManagerProps {
  /** File tree data / 文件树数据 */
  data: FileNode[];
  /** Current selected folder ID / 当前选中文件夹 */
  currentFolderId?: string;
  /** Default current folder / 默认当前文件夹 */
  defaultFolderId?: string;
  /** View mode / 视图模式 */
  viewMode?: ViewMode;
  /** Default view mode / 默认视图模式 */
  defaultViewMode?: ViewMode;
  /** Called when current folder changes / 文件夹变更回调 */
  onFolderChange?: (folderId: string, breadcrumb: FileNode[]) => void;
  /** Called when a file is clicked/double-clicked / 文件点击回调 */
  onFileClick?: (file: FileNode) => void;
  /** Called when a file is double-clicked / 文件双击回调 */
  onFileDoubleClick?: (file: FileNode) => void;
  /** Called when delete is requested / 删除回调 */
  onDelete?: (nodes: FileNode[]) => void;
  /** Called when upload is triggered / 上传回调 */
  onUpload?: () => void;
  /** Called when view mode changes / 视图模式变更 */
  onViewModeChange?: (mode: ViewMode) => void;
  /** Show sidebar (folder tree) / 是否显示侧边栏 */
  showSidebar?: boolean;
  /** Show toolbar actions / 是否显示工具栏 */
  showToolbar?: boolean;
  /** Sidebar width / 侧边栏宽度 */
  sidebarWidth?: number;
  /** Additional class / 额外类名 */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findNodeById(nodes: FileNode[], id: string): FileNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

function getBreadcrumbs(nodes: FileNode[], targetId: string): FileNode[] {
  const result: FileNode[] = [];
  const walk = (list: FileNode[], path: FileNode[]): boolean => {
    for (const node of list) {
      const newPath = [...path, node];
      if (node.id === targetId) {
        result.push(...newPath);
        return true;
      }
      if (node.children && walk(node.children, newPath)) {
        return true;
      }
    }
    return false;
  };
  walk(nodes, []);
  return result;
}

function formatFileSize(bytes: number | undefined): string {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getFileIcon(node: FileNode, isOpen?: boolean): React.ReactNode {
  if (node.type === "folder") {
    return isOpen ? (
      <FolderOpenIcon className="size-5 text-amber-500" />
    ) : (
      <FolderIcon className="size-5 text-amber-500" />
    );
  }

  const ext = node.extension?.toLowerCase();
  if (ext === "xlsx" || ext === "xls" || ext === "csv")
    return <FileSpreadsheetIcon className="size-5 text-green-600" />;
  if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif" || ext === "svg" || ext === "webp")
    return <ImageIcon className="size-5 text-purple-500" />;
  if (ext === "docx" || ext === "doc" || ext === "pdf" || ext === "txt" || ext === "md")
    return <FileTextIcon className="size-5 text-blue-500" />;
  return <FileIcon className="size-5 text-muted-foreground" />;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function FileManager({
  data,
  currentFolderId: controlledFolder,
  defaultFolderId,
  viewMode: controlledView,
  defaultViewMode = "list",
  onFolderChange,
  onFileClick,
  onFileDoubleClick,
  onDelete,
  onUpload,
  onViewModeChange,
  showSidebar = true,
  showToolbar = true,
  sidebarWidth = 220,
  className,
}: FileManagerProps) {
  // Folder state
  const [internalFolder, setInternalFolder] = React.useState<string>(
    defaultFolderId ?? (data[0]?.type === "folder" ? data[0].id : "root"),
  );
  const currentFolderId = controlledFolder ?? internalFolder;

  // View state
  const [internalView, setInternalView] = React.useState<ViewMode>(defaultViewMode);
  const view = controlledView ?? internalView;

  // Search
  const [searchQuery, setSearchQuery] = React.useState("");

  // Selection
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  // Expanded folders in sidebar
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set(data.map((n) => n.id)),
  );

  const updateFolder = (id: string) => {
    if (!controlledFolder) setInternalFolder(id);
    const crumbs = getBreadcrumbs(data, id);
    onFolderChange?.(id, crumbs);
  };

  const updateView = (v: ViewMode) => {
    if (!controlledView) setInternalView(v);
    onViewModeChange?.(v);
  };

  // Breadcrumbs
  const breadcrumbs = React.useMemo(
    () => getBreadcrumbs(data, currentFolderId),
    [data, currentFolderId],
  );

  // Current folder node
  const currentFolder = React.useMemo(
    () => findNodeById(data, currentFolderId),
    [data, currentFolderId],
  );

  // Visible items (files + folders in current folder)
  const visibleItems = React.useMemo(() => {
    let items = currentFolder?.children ?? [];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (n) => n.name.toLowerCase().includes(q) || n.extension?.toLowerCase().includes(q),
      );
    }

    // Sort: folders first, then files, both alphabetically
    return [...items].sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [currentFolder, searchQuery]);

  // Toggle selection
  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // Handle delete
  const handleDelete = () => {
    const targets = visibleItems.filter((n) => selectedIds.has(n.id));
    onDelete?.(targets);
    setSelectedIds(new Set());
  };

  // Sidebar tree renderer
  const renderSidebarNode = (node: FileNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedFolders.has(node.id);
    const isActive = currentFolderId === node.id;
    const hasChildren = node.type === "folder" && node.children && node.children.length > 0;

    return (
      <div key={node.id}>
        <button
          type="button"
          onClick={() => {
            if (node.type === "folder") {
              updateFolder(node.id);
              if (hasChildren) {
                setExpandedFolders((prev) => {
                  const next = new Set(prev);
                  if (next.has(node.id)) next.delete(node.id);
                  else next.add(node.id);
                  return next;
                });
              }
            }
          }}
          className={cn(
            "flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-sm transition-colors",
            isActive && "bg-accent font-medium text-accent-foreground",
            !isActive && "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
          )}
          style={{ paddingLeft: depth * 16 + 8 }}
        >
          {/* Expand/Collapse toggle */}
          {hasChildren ? (
            <span className="flex size-4 shrink-0 items-center justify-center">
              {isExpanded ? (
                <ChevronDownIcon className="size-3" />
              ) : (
                <ChevronRightIcon className="size-3" />
              )}
            </span>
          ) : (
            <span className="w-4 shrink-0" />
          )}

          {getFileIcon(node, isActive)}
          <span className="truncate">{node.name}</span>
        </button>

        {/* Children */}
        {hasChildren && isExpanded && node.children?.map((child) => renderSidebarNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <div
      data-slot="file-manager"
      className={cn("flex h-[500px] overflow-hidden rounded-lg border bg-background", className)}
    >
      {/* Sidebar */}
      {showSidebar && (
        <div
          className="shrink-0 overflow-auto border-r bg-muted/20"
          style={{ width: sidebarWidth }}
        >
          <div className="sticky top-0 border-b bg-muted/30 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">目录</span>
          </div>
          <div className="p-1.5">
            {data.map((node) => renderSidebarNode(node))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        {showToolbar && (
          <div className="flex shrink-0 items-center gap-1 border-b bg-muted/30 px-3 py-1.5">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-0.5 text-xs">
              <button
                type="button"
                onClick={() => {
                  // Navigate to root (first top-level folder)
                  const root = data.find((n) => n.type === "folder");
                  if (root) updateFolder(root.id);
                }}
                className="rounded p-0.5 text-muted-foreground hover:text-foreground"
              >
                <HomeIcon className="size-3.5" />
              </button>
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={crumb.id}>
                  <span className="text-muted-foreground/40">/</span>
                  <button
                    type="button"
                    onClick={() => updateFolder(crumb.id)}
                    className={cn(
                      "truncate rounded px-0.5 hover:text-foreground",
                      i === breadcrumbs.length - 1
                        ? "font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {crumb.name}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              {/* Search */}
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索..."
                  className={cn(
                    "h-7 w-36 rounded-md border border-input bg-transparent pl-6 pr-6 text-xs",
                    "outline-none focus-visible:border-ring",
                  )}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <XIcon className="size-3" />
                  </button>
                )}
              </div>

              {/* View toggle */}
              <div className="ml-1 flex rounded border border-input">
                <button
                  type="button"
                  onClick={() => updateView("list")}
                  className={cn(
                    "rounded-l p-1 transition-colors",
                    view === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <ListIcon className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => updateView("grid")}
                  className={cn(
                    "rounded-r border-l border-input p-1 transition-colors",
                    view === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Grid3X3Icon className="size-3.5" />
                </button>
              </div>

              {/* Upload */}
              {onUpload && (
                <button
                  type="button"
                  onClick={onUpload}
                  className="ml-1 rounded p-1 text-muted-foreground hover:text-foreground"
                  title="上传"
                >
                  <UploadIcon className="size-3.5" />
                </button>
              )}

              {/* Delete */}
              {selectedIds.size > 0 && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="ml-1 rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                  title={`删除 ${selectedIds.size} 项`}
                >
                  <Trash2Icon className="size-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* File list header (list view) */}
        {view === "list" && (
          <div className="flex shrink-0 items-center border-b bg-muted/20 px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <div className="w-6" />
            <div className="flex-1">名称</div>
            <div className="w-20 text-right">大小</div>
            <div className="w-24 text-right">修改时间</div>
            <div className="w-8" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto p-1">
          {visibleItems.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              {searchQuery ? "无匹配结果" : "此文件夹为空"}
            </div>
          ) : view === "list" ? (
            /* === List View === */
            <div>
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.type === "folder") {
                      updateFolder(item.id);
                    } else {
                      onFileClick?.(item);
                    }
                  }}
                  onDoubleClick={() => {
                    if (item.type === "folder") {
                      updateFolder(item.id);
                    } else {
                      onFileDoubleClick?.(item);
                    }
                  }}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    selectedIds.has(item.id) && "bg-accent",
                    !selectedIds.has(item.id) && "hover:bg-muted/50",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    disabled={item.selectable === false}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleSelect(item.id);
                    }}
                    className="size-3.5 shrink-0 rounded"
                  />
                  {getFileIcon(item)}
                  <span className="flex-1 truncate">{item.name}</span>
                  <span className="w-20 text-right text-xs text-muted-foreground">
                    {formatFileSize(item.size)}
                  </span>
                  <span className="w-24 text-right text-xs text-muted-foreground">
                    {formatDate(item.modifiedAt)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(item.id);
                    }}
                    className="rounded p-0.5 text-muted-foreground/40 hover:text-foreground"
                  >
                    <MoreVerticalIcon className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* === Grid View === */
            <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2 p-2">
              {visibleItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.type === "folder") {
                      updateFolder(item.id);
                    } else {
                      onFileClick?.(item);
                    }
                  }}
                  onDoubleClick={() => {
                    if (item.type === "folder") {
                      updateFolder(item.id);
                    } else {
                      onFileDoubleClick?.(item);
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg p-3 text-center transition-colors",
                    selectedIds.has(item.id) && "bg-accent ring-1 ring-primary/30",
                    !selectedIds.has(item.id) && "hover:bg-muted/50",
                  )}
                >
                  {getFileIcon(item)}
                  <span className="w-full truncate text-xs">{item.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {item.type === "folder" ? "文件夹" : item.extension?.toUpperCase() ?? "—"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex shrink-0 items-center border-t bg-muted/20 px-3 py-1 text-[10px] text-muted-foreground">
          <span>{visibleItems.length} 项</span>
          {selectedIds.size > 0 && (
            <span className="ml-2">已选择 {selectedIds.size} 项</span>
          )}
          <span className="ml-auto">
            {view === "list" ? "列表视图" : "网格视图"}
          </span>
        </div>
      </div>
    </div>
  );
}

export { FileManager };
export type { FileManagerProps, FileNode, ViewMode };  
