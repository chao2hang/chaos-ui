# package/

本目录只保留一个文件: `next.ts`。

历史说明: 早期 `package/*` 是 7 个空壳 re-export 文件,作为 tsup 的 entry 入口中转层。已重构为 tsup 直接指向源码 barrel(见 `tsup.config.ts`):

| 历史空壳 | 替代源 |
|---|---|
| `index.ts` | `components/ui/index.ts` |
| `ui.ts` | `components/ui/index.ts` |
| `business.ts` | `components/business/index.ts` |
| `hooks.ts` | `hooks/index.ts` |
| `lib.ts` | `lib/index.ts` |
| `ui-icons.ts` | `components/ui/icons.ts` |
| `next.ts` | 见下方 |

`next.ts` 仍保留 — 它跨 ui/business/layout 三个域聚合,是 Next.js demo 专用入口,无法收敛到单 barrel。

历史文件已归档至 `__deprecated__/`,供查阅。
