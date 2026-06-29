# Lib Index — Chaos UI

> Machine-readable library utilities catalog.

## Utils

| Function | File | Since | Description |
|----------|------|-------|-------------|
| cn | utils.ts | 0.1.0 | className merge (clsx + tailwind-merge) |

## HTTP

| Function | File | Since | Description |
|----------|------|-------|-------------|
| getApiClient | api-client.ts | 0.1.0 | Axios-based API client |
| safeRequest | api-client.ts | 0.1.0 | Safe request wrapper |
| ApiError | api-client.ts | 0.1.0 | API error type |

## Auth

| Function | File | Since | Description |
|----------|------|-------|-------------|
| hasPermission | permissions.ts | 0.1.0 | Permission check |
| hasAnyPermission | permissions.ts | 0.1.0 | Any permission check |
| hasAllPermissions | permissions.ts | 0.1.0 | All permissions check |

## Format

| Function | File | Since | Description |
|----------|------|-------|-------------|
| formatDate | format.ts | 0.1.0 | Date formatting |
| formatDateTime | format.ts | 0.1.0 | DateTime formatting |
| formatRelativeTime | format.ts | 0.1.0 | Relative time formatting |
| formatCurrency | format.ts | 0.1.0 | Currency formatting |
| formatPercent | format.ts | 0.1.0 | Percentage formatting |
| formatNumber | format.ts | 0.1.0 | Number formatting |

## Logging

| Function | File | Since | Description |
|----------|------|-------|-------------|
| logger | logger.ts | 0.1.0 | Logger with levels |

## i18n

| Export | File | Since | Description |
|--------|------|-------|-------------|
| ChaosI18nProvider | i18n/index.ts | 0.1.0 | i18n Provider component |
| i18n | i18n/index.ts | 0.1.0 | i18n instance |

## Storage (0.2.0)

| Function | File | Description |
|----------|------|-------------|
| storage | storage.ts | localStorage/sessionStorage wrapper with expiry |
| sessionStorage | storage.ts | SessionStorage convenience wrapper |

## Events (0.2.0)

| Function | File | Description |
|----------|------|-------------|
| eventBus | event-bus.ts | Global event bus |
| EventBus | event-bus.ts | EventBus class |

## File (0.2.0)

| Function | File | Description |
|----------|------|-------------|
| download | download.ts | File download (Blob/URL/CSV/JSON) |

## Cookie (0.2.0)

| Function | File | Description |
|----------|------|-------------|
| cookie | cookie.ts | Cookie read/write/remove |

## URL (0.2.0)

| Function | File | Description |
|----------|------|-------------|
| url | url.ts | URL parse/stringify/query management |
