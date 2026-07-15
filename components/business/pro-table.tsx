"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Columns3Icon,
  ChevronDownIcon,
  GripVerticalIcon,
  MaximizeIcon,
  MinimizeIcon,
  SaveIcon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
  ChevronRightIcon,
} from "@/components/ui/icons";

import { cn } from "@/lib/utils";

export type ColumnFixed = "left" | "right" | undefined;

export type Density = "compact" | "default" | "middle";

export interface ProColumn<T = Record<string, unknown>> {
  /** Unique column key / 唯一列键 */
  key: string;
  /** Column header title / 列标题 */
  title: React.ReactNode;
  /** Data field name in the row object / 行对象中的数据字段名 */
  dataIndex?: string;
  /** Column width in pixels / 列宽（像素） */
  width?: number;
  /** Fix column to left or right / 固定列到左侧或右侧 */
  fixed?: ColumnFixed;
  /** Whether the column is visible / 列是否可见 */
  visible?: boolean;
  /** Whether the column is sortable / 列是否可排序 */
  sortable?: boolean;
  /** Whether the column is resizable / 列是否可调整宽度 */
  resizable?: boolean;
  /** Custom cell renderer / 自定义单元格渲染 */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface RowSelection {
  /** Selected row keys / 选中行的 key 数组 */
  selectedKeys?: string[];
  /** Callback when selection changes / 选中变化时的回调 */
  onChange?: (keys: string[]) => void;
  /** Whether to show the selection checkbox column / 是否显示选择复选框列 */
  showCheckbox?: boolean;
}

export interface Pagination {
  /** Current page number (0-based) / 当前页码（从 0 开始） */
  current?: number;
  /** Page size / 每页条数 */
  pageSize?: number;
  /** Total item count / 总条数 */
  total?: number;
  /** Callback when page changes / 页码变化时的回调 */
  onChange?: (page: number, pageSize: number) => void;
}

export interface SavedView {
  /** View name / 视图名称 */
  name: string;
  /** Column configuration / 列配置 */
  columns: ProColumn[];
  /** Density setting / 密度设置 */
  density: Density;
}

/** Row expand / 行展开 */
export interface ExpandableConfig<T = Record<string, unknown>> {
  /** Expanded row keys (controlled) / 受控展开 keys */
  expandedKeys?: string[];
  /** Default expanded keys / 默认展开 */
  defaultExpandedKeys?: string[];
  /** Expand change / 展开变更 */
  onExpand?: (expandedKeys: string[], row: T, expanded: boolean) => void;
  /** Expanded content renderer / 展开内容 */
  expandedRowRender: (row: T, index: number) => React.ReactNode;
  /** Whether a row can expand / 是否可展开 */
  rowExpandable?: (row: T) => boolean;
}

/** Export hook payload / 导出钩子载荷 */
export interface ProTableExportPayload<T = Record<string, unknown>> {
  columns: ProColumn<T>[];
  data: T[];
  selectedKeys?: string[];
}

export interface ProTableProps<T> extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  /** Column definitions / 列定义 */
  columns: ProColumn<T>[];
  /** Data array / 数据数组 */
  data: T[];
  /** Loading state / 加载状态 */
  loading?: boolean;
  /** Row density / 行密度 */
  density?: Density;
  /** Enable column settings panel / 启用列设置面板 */
  columnSettings?: boolean;
  /** Row selection configuration / 行选择配置 */
  rowSelection?: RowSelection;
  /** Pagination configuration / 分页配置 */
  pagination?: Pagination;
  /** Expandable rows / 行展开 */
  expandable?: ExpandableConfig<T>;
  /**
   * Export button + hook (consumer implements file download / API).
   * / 导出按钮与钩子（消费方实现下载或请求）
   */
  onExport?: (payload: ProTableExportPayload<T>) => void;
  /** Export button label / 导出按钮文案 */
  exportLabel?: React.ReactNode;
  /**
   * Enable row drag-reorder (HTML5 DnD). Calls onRowReorder(oldIndex, newIndex).
   * / 行拖拽排序
   */
  rowDraggable?: boolean;
  /** Row reorder callback / 行重排回调 */
  onRowReorder?: (oldIndex: number, newIndex: number) => void;
  /** Callback when table state changes / 表格状态变化时的回调 */
  onChange?: (params: {
    page: number;
    pageSize: number;
    columns: ProColumn<T>[];
    density: Density;
  }) => void;
  /** Callback to save the current view / 保存当前视图的回调 */
  onSaveView?: (view: SavedView) => void;
  /** Saved view configurations / 已保存的视图配置 */
  savedViews?: SavedView[];
  /** Row key field name / 行 key 字段名 */
  rowKey?: string;
}

const densityPadding: Record<Density, string> = {
  compact: "px-1 py-0.5 text-xs",
  default: "px-2 py-1.5 text-sm",
  middle: "px-3 py-2.5 text-sm",
};

const densityHeaderPadding: Record<Density, string> = {
  compact: "px-1 py-1 text-xs",
  default: "px-2 py-2 text-sm",
  middle: "px-3 py-3 text-sm",
};

/**
 * @component ProTable
 * @category business/data
 * @since 0.2.0
 * @description Enterprise data table: column settings, density, resize, fixed cols,
 * selection, saved views, **row expand**, **export hook**, **row drag-reorder** (v1.6 Wave 5).
 * / 企业级表格：列设置/密度/缩放/固定列/选择/视图；v1.6 增加行展开、导出钩子、行拖拽。
 * @keywords table, pro, enterprise, expand, export, drag, column-settings
 * @example
 * <ProTable
 *   columns={[{ key: "name", title: "Name", dataIndex: "name" }]}
 *   data={[{ id: "1", name: "Alice" }]}
 *   expandable={{ expandedRowRender: (r) => <pre>{JSON.stringify(r)}</pre> }}
 *   onExport={({ data }) => console.log(data)}
 *   rowDraggable
 *   onRowReorder={(from, to) => move(from, to)}
 * />
 */
function ProTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  density = "default",
  columnSettings = true,
  rowSelection,
  pagination,
  expandable,
  onExport,
  exportLabel = "Export",
  rowDraggable = false,
  onRowReorder,
  onChange,
  onSaveView,
  savedViews = [],
  rowKey = "id",
  className,
  ...props
}: ProTableProps<T>) {
  const [internalColumns, setInternalColumns] = React.useState<ProColumn<T>[]>(
    () =>
      columns.map((col) => ({
        ...col,
        visible: col.visible !== false,
        resizable: col.resizable !== false,
      })),
  );
  const [currentDensity, setCurrentDensity] = React.useState<Density>(density);
  const [viewName, setViewName] = React.useState("");
  const [showSaveInput, setShowSaveInput] = React.useState(false);
  const [internalExpanded, setInternalExpanded] = React.useState<string[]>(
    () => expandable?.defaultExpandedKeys ?? [],
  );
  const rowDragIndexRef = React.useRef<number | null>(null);
  const [rowDragOver, setRowDragOver] = React.useState<number | null>(null);

  React.useEffect(() => {
    setInternalColumns(
      columns.map((col) => ({
        ...col,
        visible: col.visible !== false,
        resizable: col.resizable !== false,
      })),
    );
  }, [columns]);

  React.useEffect(() => {
    setCurrentDensity(density);
  }, [density]);

  const expandedKeys = expandable?.expandedKeys ?? internalExpanded;

  const visibleColumns = React.useMemo(
    () => internalColumns.filter((col) => col.visible !== false),
    [internalColumns],
  );

  const allSelected = React.useMemo(() => {
    if (!rowSelection?.selectedKeys || data.length === 0) return false;
    return data.every((row) =>
      rowSelection.selectedKeys!.includes(String(row[rowKey])),
    );
  }, [rowSelection, data, rowKey]);

  const handleColumnVisibility = React.useCallback(
    (key: string, visible: boolean) => {
      setInternalColumns((prev) =>
        prev.map((col) => (col.key === key ? { ...col, visible } : col)),
      );
    },
    [],
  );

  const handleColumnReorder = React.useCallback(
    (oldIndex: number, newIndex: number) => {
      setInternalColumns((prev) => {
        const next = [...prev];
        const [moved] = next.splice(oldIndex, 1);
        if (moved) next.splice(newIndex, 0, moved);
        return next;
      });
    },
    [],
  );

  const handleColumnResize = React.useCallback(
    (key: string, newWidth: number) => {
      const minW = 40;
      const clamped = Math.max(minW, newWidth);
      setInternalColumns((prev) =>
        prev.map((col) => (col.key === key ? { ...col, width: clamped } : col)),
      );
    },
    [],
  );

  const handleResizeStart = React.useCallback(
    (e: React.MouseEvent, col: ProColumn<T>) => {
      if (!col.resizable) return;
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startWidth = col.width ?? 100;

      const onMove = (ev: MouseEvent) => {
        const delta = ev.clientX - startX;
        handleColumnResize(col.key, startWidth + delta);
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [handleColumnResize],
  );

  const handleSelectAll = React.useCallback(() => {
    if (!rowSelection?.onChange) return;
    if (allSelected) {
      rowSelection.onChange([]);
    } else {
      rowSelection.onChange(data.map((row) => String(row[rowKey])));
    }
  }, [rowSelection, allSelected, data, rowKey]);

  const handleSelectRow = React.useCallback(
    (key: string) => {
      if (!rowSelection?.onChange || !rowSelection.selectedKeys) return;
      const current = rowSelection.selectedKeys;
      if (current.includes(key)) {
        rowSelection.onChange(current.filter((k) => k !== key));
      } else {
        rowSelection.onChange([...current, key]);
      }
    },
    [rowSelection],
  );

  const handleDensityChange = (d: Density) => {
    setCurrentDensity(d);
    onChange?.({
      page: pagination?.current ?? 0,
      pageSize: pagination?.pageSize ?? 10,
      columns: internalColumns,
      density: d,
    });
  };

  const handleSaveView = React.useCallback(() => {
    if (!onSaveView || !viewName.trim()) return;
    onSaveView({
      name: viewName.trim(),
      columns: internalColumns as ProColumn[],
      density: currentDensity,
    });
    setViewName("");
    setShowSaveInput(false);
  }, [onSaveView, viewName, internalColumns, currentDensity]);

  const toggleExpand = React.useCallback(
    (row: T) => {
      if (!expandable) return;
      const key = String(row[rowKey]);
      if (expandable.rowExpandable && !expandable.rowExpandable(row)) return;
      const isOpen = expandedKeys.includes(key);
      const next = isOpen
        ? expandedKeys.filter((k) => k !== key)
        : [...expandedKeys, key];
      if (expandable.expandedKeys === undefined) {
        setInternalExpanded(next);
      }
      expandable.onExpand?.(next, row, !isOpen);
    },
    [expandable, expandedKeys, rowKey],
  );

  const handleExport = () => {
    const payload: ProTableExportPayload<T> = {
      columns: visibleColumns,
      data,
    };
    if (rowSelection?.selectedKeys !== undefined) {
      payload.selectedKeys = rowSelection.selectedKeys;
    }
    onExport?.(payload);
  };

  const renderCell = React.useCallback(
    (col: ProColumn<T>, row: T, index: number) => {
      const value = col.dataIndex ? row[col.dataIndex] : undefined;
      if (col.render) {
        return col.render(value, row, index);
      }
      return value != null ? String(value) : null;
    },
    [],
  );

  const total = pagination?.total ?? data.length;
  const currentPage = pagination?.current ?? 0;
  const pageSize = pagination?.pageSize ?? 10;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const leadingCols =
    (rowSelection?.showCheckbox ? 1 : 0) +
    (expandable ? 1 : 0) +
    (rowDraggable ? 1 : 0);

  return (
    <div
      data-slot="pro-table"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {/* Toolbar / table / pagination horizontal inset under CardContent flush
          (CUI-LIST-03 / #27). Inner table frame keeps rounded border. */}
      <div
        data-slot="pro-table-toolbar"
        className="flex items-center justify-between gap-2 px-[var(--card-spacing,1rem)]"
      >
        <div className="text-muted-foreground text-sm">
          {total} {total === 1 ? "record" : "records"}
        </div>
        <div className="flex items-center gap-1.5">
          {onExport ? (
            <Button
              variant="outline"
              size="sm"
              icon={<DownloadIcon />}
              onClick={handleExport}
              type="button"
            >
              {exportLabel}
            </Button>
          ) : null}
          <div className="bg-muted/50 flex items-center rounded-md p-0.5">
            <Button
              variant={currentDensity === "compact" ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => handleDensityChange("compact")}
              title="Compact"
            >
              <MinimizeIcon />
            </Button>
            <Button
              variant={currentDensity === "default" ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => handleDensityChange("default")}
              title="Default"
            >
              <ChevronDownIcon className="size-3" />
            </Button>
            <Button
              variant={currentDensity === "middle" ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => handleDensityChange("middle")}
              title="Middle"
            >
              <MaximizeIcon />
            </Button>
          </div>
          {columnSettings && (
            <ColumnSettings
              columns={internalColumns}
              onToggle={handleColumnVisibility}
              onReorder={handleColumnReorder}
              savedViews={savedViews}
              onSaveView={handleSaveView}
              viewName={viewName}
              setViewName={setViewName}
              showSaveInput={showSaveInput}
              setShowSaveInput={setShowSaveInput}
            />
          )}
        </div>
      </div>

      <div data-slot="pro-table-body" className="px-[var(--card-spacing,1rem)]">
        <div className="relative overflow-x-auto rounded-lg border">
          {loading && (
            <div className="bg-primary absolute top-0 right-0 left-0 z-10 h-0.5 animate-pulse" />
          )}
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {rowDraggable && (
                  <TableHead
                    className={cn(
                      "bg-background w-8",
                      densityHeaderPadding[currentDensity],
                    )}
                  />
                )}
                {expandable && (
                  <TableHead
                    className={cn(
                      "bg-background w-8",
                      densityHeaderPadding[currentDensity],
                    )}
                  />
                )}
                {rowSelection?.showCheckbox && (
                  <TableHead
                    className={cn(
                      "bg-background sticky left-0 z-10",
                      densityHeaderPadding[currentDensity],
                    )}
                    style={{ width: 36 }}
                  >
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                )}
                {visibleColumns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(
                      densityHeaderPadding[currentDensity],
                      col.fixed === "left" &&
                        "bg-background sticky left-0 z-10",
                      col.fixed === "right" &&
                        "bg-background sticky right-0 z-10",
                    )}
                    style={{ width: col.width }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-medium">{col.title}</span>
                      {col.resizable !== false && (
                        <div
                          className="hover:bg-primary/20 -mr-1 h-4 w-1.5 cursor-col-resize rounded"
                          onMouseDown={(e) => handleResizeStart(e, col)}
                        />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length + leadingCols}
                    className="text-muted-foreground py-8 text-center"
                  >
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => {
                  const key = String(row[rowKey]);
                  const isSelected =
                    rowSelection?.selectedKeys?.includes(key) ?? false;
                  const canExpand =
                    !!expandable &&
                    (expandable.rowExpandable
                      ? expandable.rowExpandable(row)
                      : true);
                  const isExpanded = expandedKeys.includes(key);
                  return (
                    <React.Fragment key={key}>
                      <TableRow
                        data-state={isSelected ? "selected" : undefined}
                        data-expanded={isExpanded || undefined}
                        draggable={rowDraggable}
                        onDragStart={() => {
                          if (rowDraggable) rowDragIndexRef.current = index;
                        }}
                        onDragOver={(e) => {
                          if (!rowDraggable) return;
                          e.preventDefault();
                          setRowDragOver(index);
                        }}
                        onDrop={() => {
                          if (!rowDraggable) return;
                          const from = rowDragIndexRef.current;
                          if (from != null && from !== index) {
                            onRowReorder?.(from, index);
                          }
                          rowDragIndexRef.current = null;
                          setRowDragOver(null);
                        }}
                        onDragEnd={() => {
                          rowDragIndexRef.current = null;
                          setRowDragOver(null);
                        }}
                        className={cn(
                          rowDragOver === index && "bg-muted/50",
                          rowDraggable && "cursor-grab active:cursor-grabbing",
                        )}
                      >
                        {rowDraggable && (
                          <TableCell
                            className={cn(
                              densityPadding[currentDensity],
                              "w-8 text-center",
                            )}
                          >
                            <GripVerticalIcon className="text-muted-foreground mx-auto size-3.5" />
                          </TableCell>
                        )}
                        {expandable && (
                          <TableCell
                            className={cn(
                              densityPadding[currentDensity],
                              "w-8",
                            )}
                          >
                            {canExpand ? (
                              <button
                                type="button"
                                aria-label={
                                  isExpanded ? "Collapse row" : "Expand row"
                                }
                                aria-expanded={isExpanded}
                                className="hover:bg-muted inline-flex size-6 items-center justify-center rounded"
                                onClick={() => toggleExpand(row)}
                              >
                                {isExpanded ? (
                                  <ChevronDownIcon className="size-4" />
                                ) : (
                                  <ChevronRightIcon className="size-4" />
                                )}
                              </button>
                            ) : null}
                          </TableCell>
                        )}
                        {rowSelection?.showCheckbox && (
                          <TableCell
                            className={cn(
                              "bg-background sticky left-0 z-10",
                              densityPadding[currentDensity],
                            )}
                            style={{ width: 36 }}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleSelectRow(key)}
                            />
                          </TableCell>
                        )}
                        {visibleColumns.map((col) => (
                          <TableCell
                            key={col.key}
                            className={cn(
                              densityPadding[currentDensity],
                              col.fixed === "left" &&
                                "bg-background sticky left-0 z-10",
                              col.fixed === "right" &&
                                "bg-background sticky right-0 z-10",
                            )}
                            style={{ width: col.width }}
                          >
                            {renderCell(col, row, index)}
                          </TableCell>
                        ))}
                      </TableRow>
                      {expandable && isExpanded && canExpand ? (
                        <TableRow data-slot="pro-table-expanded-row">
                          <TableCell
                            colSpan={visibleColumns.length + leadingCols}
                            className="bg-muted/20 p-3"
                          >
                            {expandable.expandedRowRender(row, index)}
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </React.Fragment>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {pagination && (
        <div
          data-slot="pro-table-pagination"
          className="flex items-center justify-between px-[var(--card-spacing,1rem)]"
        >
          <span className="text-muted-foreground text-sm">
            {currentPage * pageSize + 1}-
            {Math.min((currentPage + 1) * pageSize, total)} of {total}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 0}
              onClick={() => pagination.onChange?.(currentPage - 1, pageSize)}
            >
              Previous
            </Button>
            <span className="text-muted-foreground px-2 text-sm">
              {currentPage + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages - 1}
              onClick={() => pagination.onChange?.(currentPage + 1, pageSize)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Standalone / embedded column settings popover (exported for reuse). */
export interface ColumnSettingsProps<T = Record<string, unknown>> {
  columns: ProColumn<T>[];
  onToggle: (key: string, visible: boolean) => void;
  onReorder: (oldIndex: number, newIndex: number) => void;
  savedViews?: SavedView[];
  onSaveView?: () => void;
  viewName?: string;
  setViewName?: (v: string) => void;
  showSaveInput?: boolean;
  setShowSaveInput?: (v: boolean) => void;
  /** Trigger label / 触发器文案 */
  triggerLabel?: React.ReactNode;
}

/**
 * @component ColumnSettings
 * @category business/data
 * @since 1.6.0
 * @description Column visibility / reorder panel used by ProTable; exportable standalone.
 * / 列显示与排序面板，ProTable 内嵌，亦可独立使用。
 */
function ColumnSettings<T>({
  columns,
  onToggle,
  onReorder,
  savedViews = [],
  onSaveView,
  viewName = "",
  setViewName,
  showSaveInput = false,
  setShowSaveInput,
  triggerLabel = "Columns",
}: ColumnSettingsProps<T>) {
  const dragIndexRef = React.useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);
  const [internalSaveName, setInternalSaveName] = React.useState("");
  const [internalShowSave, setInternalShowSave] = React.useState(false);

  const name = setViewName ? viewName : internalSaveName;
  const setName = setViewName ?? setInternalSaveName;
  const showSave = setShowSaveInput ? showSaveInput : internalShowSave;
  const setShowSave = setShowSaveInput ?? setInternalShowSave;

  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDrop = (index: number) => {
    const oldIndex = dragIndexRef.current;
    if (oldIndex != null && oldIndex !== index) {
      onReorder(oldIndex, index);
    }
    dragIndexRef.current = null;
    setDragOverIndex(null);
  };

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" size="sm" icon={<Columns3Icon />} />}
      >
        {triggerLabel}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Column Settings</span>
          {onSaveView ? (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setShowSave(!showSave)}
              title="Save view"
            >
              <SaveIcon />
            </Button>
          ) : null}
        </div>

        {showSave && onSaveView ? (
          <div className="flex items-center gap-1.5 pt-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="View name..."
              className="border-input h-7 flex-1 rounded border px-2 text-xs outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveView();
              }}
            />
            <Button variant="default" size="xs" onClick={onSaveView}>
              Save
            </Button>
          </div>
        ) : null}

        {savedViews.length > 0 ? (
          <div className="border-t pt-2">
            <span className="text-muted-foreground text-xs">Saved Views</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {savedViews.map((v) => (
                <span
                  key={v.name}
                  className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs"
                >
                  {v.name}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-2 max-h-64 flex-col gap-0.5 overflow-y-auto">
          {columns.map((col, index) => {
            const visible = col.visible !== false;
            return (
              <div
                key={col.key}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverIndex(index);
                }}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => setDragOverIndex(null)}
                className={cn(
                  "hover:bg-muted flex cursor-grab items-center gap-2 rounded px-1 py-1 text-sm",
                  dragOverIndex === index && "bg-muted ring-primary ring-1",
                )}
              >
                <GripVerticalIcon className="text-muted-foreground size-3.5 shrink-0" />
                <Checkbox
                  checked={visible}
                  onCheckedChange={(checked) =>
                    onToggle(col.key, checked as boolean)
                  }
                />
                <span className="flex-1 truncate">{col.title as string}</span>
                {visible ? (
                  <EyeIcon className="text-muted-foreground size-3.5" />
                ) : (
                  <EyeOffIcon className="text-muted-foreground size-3.5" />
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { ProTable, ColumnSettings };
