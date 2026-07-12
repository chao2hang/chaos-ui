# Form details baseline

Generated: 2026-07-12

Source: `pnpm run check:form-details -- --write docs/audit/form-details-baseline.md`

## Summary

| Metric                     | Count |
| -------------------------- | ----: |
| Scanned component files    |   580 |
| Files with bare `<select>` |     9 |
| Bare select tags           |    10 |
| Bare without exception     |     0 |
| Bare with exception        |     9 |
| h-9 hand-style suspects    |     0 |
| NativeSelect consumers     |    16 |

## Bare `<select>` (R1)

| File                                          | Count | Exception |
| --------------------------------------------- | ----: | --------- |
| `components/business/dashboard-designer.tsx`  |     2 | yes       |
| `components/business/editable-tree-table.tsx` |     1 | yes       |
| `components/business/report-builder.tsx`      |     1 | yes       |
| `components/ui/audio-player.tsx`              |     1 | yes       |
| `components/ui/editable-descriptions.tsx`     |     1 | yes       |
| `components/ui/editable-table.tsx`            |     1 | yes       |
| `components/ui/help-desk.tsx`                 |     1 | yes       |
| `components/ui/phone-input.tsx`               |     1 | yes       |
| `components/ui/spreadsheet-editor.tsx`        |     1 | yes       |

## h-9 hand-style suspects (R2)

| File | Hits |
| ---- | ---: |

## Notes

- Plan: `designs/2026-07-12_组件细节一致性检查与整改_设计计划.md`
- Exception marker: `// native-select-exception: <reason>`
- P0 targets: form-dialog, filter-bar, stock-transfer-dialog, meeting-room-booking, multi-currency-input, order-line-editor, expense-line-editor
