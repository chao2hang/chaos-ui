"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BuildingIcon,
  PlusIcon,
  SearchIcon,
  FileTextIcon,
  CheckIcon,
} from "lucide-react";

/**
 * @component InvoiceTitlePicker
 * @category business
 * @since 1.2.0
 * @description 发票抬头选择器 — 卡片式多字段展示（公司名+税号+开户行+账号）、
 * 搜索、新增。适用于 M09 发票抬头选择。
 * / Invoice title picker — card-based multi-field display, search, add.
 * @keywords invoice, title, picker, fapiao, tax, company
 * @example
 * <InvoiceTitlePicker
 *   titles={[
 *     { id: "1", companyName: "美团", taxNumber: "91110000...", bankName: "招商银行", bankAccount: "6225...", address: "北京市朝阳区", phone: "010-12345678" },
 *   ]}
 *   selectedId="1"
 *   onSelect={(id) => setSelectedId(id)}
 *   onAdd={(title) => createTitle(title)}
 * />
 */

export interface InvoiceTitle {
  /** Unique ID / 唯一标识 */
  id: string;
  /** Company name / 公司名称 */
  companyName: string;
  /** Tax number / 税号 */
  taxNumber: string;
  /** Bank name / 开户行 */
  bankName?: string;
  /** Bank account / 账号 */
  bankAccount?: string;
  /** Company address / 地址 */
  address?: string;
  /** Company phone / 电话 */
  phone?: string;
  /** Whether it's the default title / 是否默认 */
  isDefault?: boolean;
}

export interface InvoiceTitlePickerProps {
  /** Available titles / 可选抬头 */
  titles: InvoiceTitle[];
  /** Selected title ID / 选中的抬头 ID */
  selectedId?: string;
  /** Select callback / 选择回调 */
  onSelect?: (id: string) => void;
  /** Add new title callback / 新增抬头回调 */
  onAdd?: (title: Omit<InvoiceTitle, "id">) => void;
  /** Allow adding new titles / 允许新增 */
  allowAdd?: boolean;
  /** Show in modal/dialog mode / 弹窗模式 */
  modal?: boolean;
  /** Extra className / 额外样式 */
  className?: string;
}

function InvoiceTitlePicker({
  titles,
  selectedId,
  onSelect,
  onAdd,
  allowAdd = true,
  className,
}: InvoiceTitlePickerProps) {
  const [query, setQuery] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState({
    companyName: "",
    taxNumber: "",
    bankName: "",
    bankAccount: "",
    address: "",
    phone: "",
  });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return titles;
    const q = query.toLowerCase();
    return titles.filter(
      (t) => t.companyName.toLowerCase().includes(q) || t.taxNumber.includes(q),
    );
  }, [titles, query]);

  const handleAdd = () => {
    if (!newTitle.companyName || !newTitle.taxNumber) return;
    onAdd?.(newTitle);
    setNewTitle({
      companyName: "",
      taxNumber: "",
      bankName: "",
      bankAccount: "",
      address: "",
      phone: "",
    });
    setShowAddForm(false);
  };

  return (
    <div
      data-slot="invoice-title-picker"
      className={cn("w-full space-y-4", className)}
    >
      {/* Search bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            type="text"
            size="sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索公司名称或税号"
            className="pl-8"
          />
        </div>
        {allowAdd && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <PlusIcon className="size-3.5" /> 新增抬头
          </Button>
        )}
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="space-y-3 rounded-lg border p-4">
          <h4 className="flex items-center gap-1.5 text-sm font-medium">
            <FileTextIcon className="size-4" /> 新增发票抬头
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground text-xs">
                公司名称 *
              </label>
              <Input
                value={newTitle.companyName}
                onChange={(e) =>
                  setNewTitle({ ...newTitle, companyName: e.target.value })
                }
                placeholder="请输入公司名称"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-xs">税号 *</label>
              <Input
                value={newTitle.taxNumber}
                onChange={(e) =>
                  setNewTitle({ ...newTitle, taxNumber: e.target.value })
                }
                placeholder="请输入税号"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-xs">开户行</label>
              <Input
                value={newTitle.bankName}
                onChange={(e) =>
                  setNewTitle({ ...newTitle, bankName: e.target.value })
                }
                placeholder="请输入开户行"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-xs">账号</label>
              <Input
                value={newTitle.bankAccount}
                onChange={(e) =>
                  setNewTitle({ ...newTitle, bankAccount: e.target.value })
                }
                placeholder="请输入银行账号"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-xs">地址</label>
              <Input
                value={newTitle.address}
                onChange={(e) =>
                  setNewTitle({ ...newTitle, address: e.target.value })
                }
                placeholder="请输入地址"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-xs">电话</label>
              <Input
                value={newTitle.phone}
                onChange={(e) =>
                  setNewTitle({ ...newTitle, phone: e.target.value })
                }
                placeholder="请输入电话"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAddForm(false)}
            >
              取消
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAdd}
              disabled={!newTitle.companyName || !newTitle.taxNumber}
            >
              确认新增
            </Button>
          </div>
        </div>
      )}

      {/* Title cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="text-muted-foreground col-span-full py-8 text-center text-sm">
            暂无发票抬头
          </div>
        ) : (
          filtered.map((title) => {
            const isSelected = selectedId === title.id;
            return (
              <div
                key={title.id}
                onClick={() => onSelect?.(title.id)}
                className={cn(
                  "cursor-pointer rounded-lg border p-3 transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 ring-primary ring-1"
                    : "border-border hover:border-primary/40 hover:bg-muted/30",
                )}
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded">
                      <BuildingIcon className="size-4" />
                    </div>
                    <div>
                      <span className="text-sm font-medium">
                        {title.companyName}
                      </span>
                      {title.isDefault && (
                        <span className="ml-1.5 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-600">
                          默认
                        </span>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <CheckIcon className="text-primary size-4 shrink-0" />
                  )}
                </div>
                <dl className="space-y-0.5 text-xs">
                  <div className="flex gap-1">
                    <dt className="text-muted-foreground shrink-0">税号:</dt>
                    <dd className="font-mono">{title.taxNumber}</dd>
                  </div>
                  {title.bankName && (
                    <div className="flex gap-1">
                      <dt className="text-muted-foreground shrink-0">
                        开户行:
                      </dt>
                      <dd>{title.bankName}</dd>
                    </div>
                  )}
                  {title.bankAccount && (
                    <div className="flex gap-1">
                      <dt className="text-muted-foreground shrink-0">账号:</dt>
                      <dd className="font-mono">{title.bankAccount}</dd>
                    </div>
                  )}
                  {title.address && (
                    <div className="flex gap-1">
                      <dt className="text-muted-foreground shrink-0">地址:</dt>
                      <dd className="truncate">{title.address}</dd>
                    </div>
                  )}
                  {title.phone && (
                    <div className="flex gap-1">
                      <dt className="text-muted-foreground shrink-0">电话:</dt>
                      <dd>{title.phone}</dd>
                    </div>
                  )}
                </dl>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export { InvoiceTitlePicker };
