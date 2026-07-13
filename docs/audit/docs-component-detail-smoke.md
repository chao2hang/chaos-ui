# Docs component detail smoke

Base: `http://127.0.0.1:3001`
Generated: 2026-07-12
Source: `pnpm run smoke:docs`

Total: **575** OK: **575** Bad: **0**
Avg ms: 2113 p95: 3595

Markers: HTTP status, title 404, RSC event-handler errors, parse errors, Application error, Module not found, ReferenceError/TypeError in HTML.
(Note: raw string `This page could not be found` inside RSC flight payloads is **not** treated as failure.)

All component detail pages returned HTTP 200 without known error markers.
