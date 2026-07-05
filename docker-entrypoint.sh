#!/bin/sh
set -e

# ─── Graceful Shutdown ───
trap 'echo "Shutting down services..."; kill $(jobs -p) 2>/dev/null; wait; exit 0' SIGTERM SIGINT SIGQUIT

export NODE_ENV=production
cd /app/apps/docs

echo ""
echo "╔══════════════════════════════════════╗"
echo "║       Chaos UI — Docker              ║"
echo "╠══════════════════════════════════════╣"
echo "║  Proxy:     http://localhost:8080     ║"
echo "║  Next.js:   http://localhost:19951    ║"
echo "║  Storybook: http://localhost:6006     ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ─── Next.js Production Server ───
echo "► Starting Next.js (port 19951)..."
./node_modules/.bin/next start -p 19951 &
NEXT_PID=$!

# ─── Storybook Static File Server ───
echo "► Starting Storybook (port 6006)..."
serve /app/storybook-static -p 6006 --no-clipboard --cors &
SERVE_PID=$!

# ─── Reverse Proxy ───
echo "► Starting reverse proxy (port 8080)..."
node proxy-server.mjs &
PROXY_PID=$!

echo ""
echo "✓ All services started. Access at http://localhost:8080"
echo ""

# Wait for any process to exit
wait
