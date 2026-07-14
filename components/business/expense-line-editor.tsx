"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { LineEditor } from "@/components/business/line-editor";
import type { LineEditorColumn } from "@/components/business/line-editor";
import { InputNumber } from "@/components/ui/input-number";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

/**
 * @component ExpenseLineEditor
 * @category business/bill
 * @since 0.2.0
 * @description 费用明细专版(基于 line-editor,内置摘要/金额/合计)。
 * 支持受控（传 data）与非受控（传 defaultData，组件自管 lines 状态）两种模式，
 * 非受控模式让 expense/apply 等页面不必每次手写 useState。
 * / Expense detail line editor; controlled or uncontrolled (built-in lines state).
 * @keywords expense, line, editor, detail, amount, total, uncontrolled
 * @example
 * // 非受控（推荐）：组件自管 lines
 * <ExpenseLineEditor defaultData={lines} onChange={setLines} categories={cats} />
 * // 受控：
 * <ExpenseLineEditor data={lines} onChange={setLines} categories={cats} />
 */

interface ExpenseLine {
  id?: string;
  category?: string;
  summary?: string;
  amount?: number;
  remark?: string;
  [key: string]: unknown;
}

interface CategoryOption {
  label: string;
  value: string;
}

interface ExpenseLineLabels {
  category?: string;
  selectCategory?: string;
  summary?: string;
  summaryPlaceholder?: string;
  amount?: string;
  remark?: string;
  remarkPlaceholder?: string;
  items?: string;
  total?: string;
  empty?: string;
}

interface ExpenseLineEditorProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  /**
   * Line data (controlled). Omit to use uncontrolled mode with `defaultData`.
   * / 明细数据（受控）；不传则走非受控模式（配合 defaultData）
   */
  data?: ExpenseLine[];
  /**
   * Initial line data for uncontrolled mode. / 非受控模式初始数据
   */
  defaultData?: ExpenseLine[];
  /** Data change callback / 数据变更回调 */
  onChange?: (data: ExpenseLine[]) => void;
  /** Expense category options / 费用类别选项 */
  categories?: CategoryOption[];
  /** Whether editor is read-only / 是否只读 */
  readOnly?: boolean;
  /** Minimum rows / 最少行数 */
  minRows?: number;
  /** Maximum rows / 最多行数 */
  maxRows?: number;
  /** Currency symbol / 货币符号 */
  currency?: string;
  /**
   * Override column/footer/empty copy (issue #19). Falls back to i18n / zh defaults.
   * / 覆盖列头与底栏文案
   */
  labels?: ExpenseLineLabels;
}

function ExpenseLineEditor({
  className,
  data: controlledData,
  defaultData = [],
  onChange,
  categories = [],
  readOnly = false,
  minRows = 1,
  maxRows,
  currency = "¥",
  labels,
  ...props
}: ExpenseLineEditorProps) {
  const { t } = useTranslation("ui");

  const L = React.useMemo(() => {
    return {
      category:
        labels?.category ?? t("expenseLine.category", { defaultValue: "类别" }),
      selectCategory:
        labels?.selectCategory ??
        t("expenseLine.selectCategory", { defaultValue: "选择类别" }),
      summary:
        labels?.summary ?? t("expenseLine.summary", { defaultValue: "摘要" }),
      summaryPlaceholder:
        labels?.summaryPlaceholder ??
        t("expenseLine.summaryPlaceholder", { defaultValue: "请输入摘要" }),
      amount:
        labels?.amount ??
        t("expenseLine.amount", {
          currency,
          defaultValue: `金额（${currency}）`,
        }),
      remark:
        labels?.remark ?? t("expenseLine.remark", { defaultValue: "备注" }),
      remarkPlaceholder:
        labels?.remarkPlaceholder ??
        t("expenseLine.remarkPlaceholder", { defaultValue: "选填" }),
      empty:
        labels?.empty ??
        t("expenseLine.empty", { defaultValue: "暂无费用明细" }),
    };
  }, [labels, t, currency]);

  // Uncontrolled mode: manage lines internally so consumers (expense/apply
  // pages) don't need to wire useState themselves.
  const isControlled = controlledData !== undefined;
  const [internalData, setInternalData] =
    React.useState<ExpenseLine[]>(defaultData);
  const data = isControlled ? controlledData : internalData;
  // @ts-expect-error skeleton column types — will be fixed when fully implemented
  const columns: LineEditorColumn[] = React.useMemo(
    () => [
      ...(categories.length > 0
        ? [
            {
              key: "category",
              title: L.category,
              width: 150,
              editable: !readOnly,
              renderEditor: (
                value: unknown,
                _row: Record<string, unknown>,
                _index: number,
                onCellChange: (v: unknown) => void,
              ) => (
                <NativeSelect
                  size="sm"
                  className="w-full"
                  value={String(value ?? "")}
                  onChange={(e) => onCellChange(e.target.value)}
                  options={[
                    { value: "", label: L.selectCategory },
                    ...categories.map((cat) => ({
                      value: cat.value,
                      label: cat.label,
                    })),
                  ]}
                />
              ),
              render: (value: unknown) => {
                const cat = categories.find((c) => c.value === value);
                return cat?.label ?? (value as React.ReactNode) ?? "—";
              },
            } satisfies LineEditorColumn,
          ]
        : []),
      {
        key: "summary",
        title: L.summary,
        editable: !readOnly,
        renderEditor: (value, _row, _index, onCellChange) => (
          <Input
            value={String(value ?? "")}
            onChange={(e) => onCellChange(e.target.value)}
            placeholder={L.summaryPlaceholder}
            className="h-8"
          />
        ),
        render: (value) => value ?? "—",
      },
      {
        key: "amount",
        title: L.amount,
        width: 140,
        editable: !readOnly,
        renderEditor: (value, _row, _index, onCellChange) => (
          <InputNumber
            value={value as number}
            onChange={(v) => onCellChange(v ?? 0)}
            min={0}
            precision={2}
            size="sm"
            className="w-full"
          />
        ),
        render: (value) =>
          value != null ? `${currency}${Number(value).toFixed(2)}` : "—",
      },
      {
        key: "remark",
        title: L.remark,
        editable: !readOnly,
        renderEditor: (value, _row, _index, onCellChange) => (
          <Input
            value={String(value ?? "")}
            onChange={(e) => onCellChange(e.target.value)}
            placeholder={L.remarkPlaceholder}
            className="h-8"
          />
        ),
      },
    ],
    [categories, readOnly, currency, L],
  );

  const handleChange = (newData: Record<string, unknown>[]) => {
    const next = newData as ExpenseLine[];
    if (!isControlled) setInternalData(next);
    onChange?.(next);
  };

  const totalAmount = data.reduce(
    (sum, row) => sum + Number(row.amount ?? 0),
    0,
  );

  const itemsText =
    labels?.items ??
    t("expenseLine.items", {
      count: data.length,
      defaultValue: `${data.length} 行`,
    });
  const totalText =
    labels?.total ??
    t("expenseLine.total", {
      currency,
      amount: totalAmount.toFixed(2),
      defaultValue: `合计：${currency}${totalAmount.toFixed(2)}`,
    });

  const footer = (
    <td colSpan={columns.length + 1} className="px-3 py-2 text-right">
      <span className="text-muted-foreground mr-6">{itemsText}</span>
      <span className="text-base font-semibold">{totalText}</span>
    </td>
  );

  return (
    <div
      data-slot="expense-line-editor"
      className={cn("w-full", className)}
      {...props}
    >
      <LineEditor
        columns={columns}
        data={data}
        onChange={handleChange}
        readOnly={readOnly}
        minRows={minRows}
        maxRows={maxRows}
        footer={footer}
        emptyText={L.empty}
      />
    </div>
  );
}

export { ExpenseLineEditor };
export type {
  ExpenseLineEditorProps,
  ExpenseLine,
  CategoryOption,
  ExpenseLineLabels,
};
