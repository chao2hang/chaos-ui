/**
 * Reverse proxy for single-port development:
 *   /       → Next.js (localhost:3001)
 *
 * Usage: node proxy-server.mjs
 * Then open http://localhost:8080
 */

import http from "node:http";
import httpProxy from "http-proxy";

const PORT = 8080;
const NEXT_PORT = 3001;

// --- Proxy instance ---
const nextProxy = httpProxy.createProxyServer({
  target: `http://localhost:${NEXT_PORT}`,
  ws: true,
});

// --- Error handling ---
nextProxy.on("error", (err, _req, res) => {
  if (res?.writeHead) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Next.js dev server is not running. Start it with `pnpm --filter chaos-ui-docs dev:next`.");
  }
});

// --- HTTP server ---
const server = http.createServer((req, res) => {
  nextProxy.web(req, res);
});

// --- WebSocket upgrade (Next.js HMR) ---
server.on("upgrade", (req, socket, head) => {
  nextProxy.ws(req, socket, head);
});

// --- Start ---
server.listen(PORT, () => {
  console.log(`\n🚀  Proxy running at http://localhost:${PORT}\n`);
  console.log(`    /       → Next.js (port ${NEXT_PORT})\n`);
  console.log(`  Make sure the server is running:\n`);
  console.log(`    pnpm --filter chaos-ui-docs dev:next\n`);
});
