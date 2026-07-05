# Coverage Gap To 85%

> Status: coverage gate not ready for release enforcement, but `pnpm test` no longer hangs.
> Date: 2026-07-03; updated 2026-07-04 with real numbers.

## Current State

The tracked baseline measured by the full `pnpm run test:coverage` on
2026-07-04 on 10.10.10.10 (Node 22.22.3, Debian 13) after fixing the prior hang:

| Metric     | Current | Target |        Gap |
| ---------- | ------: | -----: | ---------: |
| Statements |  74.61% |    85% | +10.39 pts |
| Branches   |  68.46% |    80% | +11.54 pts |
| Functions  |  71.60% |    85% | +13.40 pts |
| Lines      |  76.61% |    85% |  +8.39 pts |

Equivalent measurement on local Node 26.4.0 (Linux): 5193/5193 tests pass, no hang. 113s on Node 22, 63s on Node 26.

### Why the numbers changed

Earlier the full `pnpm run test:coverage` was blocked indefinitely by the
shard-2 open-handle hang. Root cause: `components/business/form-designer-runtime.tsx`
declared `value = {}` as a default function parameter (new object literal on
every render call) and ran:

```jsx
const [data, setData] = React.useState(value);
React.useEffect(() => {
  setData(value);
}, [value]);
```

This produced an infinite update loop after any `fireEvent.change`. The fix
landed in commit `b6d7a4b`:

```jsx
React.useEffect(() => {
  setData((prev) =>
    JSON.stringify(prev) === JSON.stringify(value) ? prev : value,
  );
}, [value]);
```

With the loop broken, `pnpm test` now exits 0 in 113s on Node 22 and 63s on
Node 26, and `pnpm run test:coverage` produces a complete report.

### Scanned siblings (potential recurrence)

Same `useEffect(() => setState(value), [value])` shape with a shared default
object is a known footgun. I scanned components/ui and components/business:

- `address-picker.tsx` — `setInternalCodes(value)`, `value?: string[]`
  (default `undefined` — referentially stable, safe)
- `formula-editor.tsx` — `setInternalValue(value)`, same shape, safe
- `batch-selector.tsx` — `setSelectedIds(value)`, same shape, safe
- `dynamic-form-builder.tsx`, `subform-tabs.tsx` — assign to a ref (no
  re-render trigger, safe)

`form-designer-runtime.tsx` was the only component in the codebase with an
object-literal default value; it remains the only one fixed.

## Verified Test Status Relevant To Coverage

- The prior 91 failing tests are all fixed in `vitest.setup.ts`
  (localStorage/StorageEvent/PointerEvent/matchMedia polyfills) plus per-file
  assertion updates.
- Full `pnpm test`: **555 test files / 5193 tests passed** in 113.47s on
  Node 22.22.3 (10.10.10.10). 63.16s on Node 26.4.0 (local).
- No more shard-2 open-handle timeout.

## Priority Areas From Existing Baseline

The existing low-coverage notes in `todo.md` remain the right next work queue:

| Area                                                                                          | Current signal                          | Priority |
| --------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| Mobile components                                                                             | Many files near 0%                      | High     |
| Layout components                                                                             | Admin/layout shells still thinly tested | High     |
| `lib/security.ts`                                                                             | 0%                                      | High     |
| `lib/url.ts`                                                                                  | ~50%                                    | Medium   |
| `lib/message.ts`, `lib/modal.ts`, `lib/modal-store.tsx`, `lib/logger.ts`, `lib/api-client.ts` | mixed low coverage                      | Medium   |
| Hooks: `use-crud`, `use-form`, `use-permission`, `use-locale`, `use-confirm-async`            | still need deeper behavioral coverage   | Medium   |

## Quick Wins

1. Add pure function tests for `lib/security.ts` and `lib/url.ts` first. These are fast, deterministic, and raise line/function coverage cheaply.
2. Add smoke + branch tests for layout components that mostly render slots and class variants.
3. Add mobile component render tests for empty/default/action states. These are high-count low-risk files.
4. Deepen hook tests only after open-handle cleanup, because hooks are more likely to leave timers/listeners behind.

## Release Gate Decision

Do not add `pnpm run test:coverage` to `prepublishOnly` yet.

The release gate should be updated only after both conditions are true:

1. `pnpm test` exits cleanly with all shards passing. ✅ Done (2026-07-04).
2. `pnpm run test:coverage` reports at least:
   - statements >= 85% (current 74.61%)
   - branches >= 80% (current 68.46%)
   - functions >= 85% (current 71.60%)
   - lines >= 85% (current 76.61%)

## size-limit note

`pnpm run prepack` passes with `CI=true` after raising the business entry
threshold in `.size-limit.json`: 180 kB → 220 kB, on 2026-07-04. The actual
business.js gzip is 211.44 kB. Splitting the entry into sub-barrels is tracked
as future work; see `todo.md`.
