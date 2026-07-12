# Viewport height layout audit (2026-07-12)

Issue class (sample: EmbedLayout on docs): **fixed viewport height** (`h-screen` / `h-dvh` / hard `100vh`) inside a **bounded preview host** → nested scroll, “broken” preview, or chrome stuck to the browser viewport (`position: fixed`).

## Rule of thumb

| Intent                                          | Prefer                                                         |
| ----------------------------------------------- | -------------------------------------------------------------- |
| Fill iframe / card / drawer / docs preview host | `h-full min-h-0` (+ host sets height)                          |
| True browser full-page shell                    | page root / `className="h-svh"` / `min-h-svh` on host          |
| Optional full-page empty/loading                | prop flag (`fullPage`) → `min-h-svh` / dedicated `PageLoading` |

Do **not** default embed/chat/sidebar/admin shells to `h-dvh`/`h-screen` if they are commonly nested in docs or cards.

## Fixed this pass

| Component                                                                  | Was                      | Now                                           |
| -------------------------------------------------------------------------- | ------------------------ | --------------------------------------------- |
| `EmbedLayout`                                                              | `h-screen`               | `h-full min-h-0`                              |
| `ChatLayout`                                                               | `h-dvh`                  | `h-full min-h-0`                              |
| `ImmersiveLayout`                                                          | `h-dvh` + `fixed` chrome | `h-full min-h-0` + `absolute` chrome          |
| `SidebarProvider` (`sidebar.tsx`)                                          | `h-dvh`                  | `h-full min-h-0`                              |
| `AdminShell` / `AppShell` / `PublicLayout` / `BlankLayout` / `ErrorLayout` | `min-h-screen`           | `h-full min-h-0`                              |
| `AuthLayout`                                                               | `min-h-svh`              | `h-full min-h-0`                              |
| `MobileAuthLayout` / `MobileDashboardLayout`                               | `min-h-screen`           | `h-full min-h-0`                              |
| `FullPageLoader` wrapper                                                   | `min-h-screen`           | `h-full min-h-0`                              |
| `async-task-center` ScrollArea                                             | `h-[calc(100vh-8rem)]`   | `h-full max-h-[min(32rem,calc(100dvh-8rem))]` |

Stories for page shells got host-height decorators (`h-[70vh] min-h-[420px]`). ChatShell stories use `h-[560px]` instead of `h-screen`.

## Intentional leftovers

| File                    | Note                                     |
| ----------------------- | ---------------------------------------- |
| `PageLoading`           | opt-in viewport fallback via `min-h-dvh` |
| `EmptyState` `fullPage` | opt-in `min-h-svh`                       |

App roots that want full viewport must set height on an ancestor (`h-svh` / full viewport chain).

## Checks

```bash
rg -n --glob '*.tsx' --glob '!**/*.test.tsx' \
  '\bh-screen\b|\bh-dvh\b|\bmin-h-screen\b|\bmin-h-dvh\b|\bmin-h-svh\b|\bh-svh\b|100vh' \
  components

pnpm exec vitest run \
  components/layout/embed-layout.test.tsx \
  components/layout/chat-layout.test.tsx \
  components/layout/immersive-layout.test.tsx \
  components/layout/blank-layout.test.tsx \
  components/layout/error-layout.test.tsx \
  components/ui/sidebar.test.tsx
```

Related: `docs/audit/docs-component-detail-smoke.md` (575/575 HTTP 200 after MDX live-embed cleanup).
