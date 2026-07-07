/**
 * Reverse proxy for single-port development:
 *   /            → Next.js   (localhost:19951)
 *   /storybook/* → Storybook (localhost:6006)
 *   /_next/*     → Next.js   (localhost:19951)
 *   /api/*       → Next.js   (localhost:19951)
 *
 * Usage: node proxy-server.mjs
 * Then open http://localhost:8080
 */

import http from "node:http";
import httpProxy from "http-proxy";

const PORT = 8080;
const NEXT_PORT = 19951;
const STORYBOOK_PORT = 6006;

// --- Proxy instances ---
const nextProxy = httpProxy.createProxyServer({
  target: `http://localhost:${NEXT_PORT}`,
  ws: true,
});

const storybookProxy = httpProxy.createProxyServer({
  target: `http://localhost:${STORYBOOK_PORT}`,
  ws: true,
});

// --- Error handling ---
nextProxy.on("error", (err, _req, res) => {
  if (res?.writeHead) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Next.js dev server is not running. Start it with `next dev -p 19951`.");
  }
});

storybookProxy.on("error", (err, _req, res) => {
  if (res?.writeHead) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Storybook dev server is not running. Start it with `storybook dev -p 6000`.");
  }
});

// --- Route matching ---
function isStorybookPath(pathname) {
  return (
    pathname === "/iframe.html" ||
    pathname.startsWith("/storybook") ||
    pathname.startsWith("/sb-") ||
    pathname === "/runtime~main.iframe.bundle.js" ||
    pathname === "/virtual-storybook-deps-index-entry.js" ||
    pathname.startsWith("/project.json") ||
    pathname.startsWith("/stories.json") ||
    pathname.startsWith("/metadata.json") ||
    // Vite dev server absolute-path resources (Storybook v10)
    pathname.startsWith("/@vite/") ||
    pathname.startsWith("/@id/") ||
    pathname.startsWith("/@fs/") ||
    pathname.startsWith("/virtual:") ||
    pathname === "/vite-inject-mocker-entry.js" ||
    pathname.startsWith("/node_modules/") ||
    pathname.startsWith("/.storybook/") ||
    // Project source files served by Vite (not valid Next.js routes)
    pathname.startsWith("/lib/") ||
    pathname.startsWith("/hooks/") ||
    pathname.startsWith("/src/") ||
    pathname === "/app/globals.css"
  );
}

// --- HTTP server ---
const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  const pathname = url.pathname;

	  if (isStorybookPath(pathname)) {
	    // Rewrite /storybook/xxx → /xxx for Storybook, preserving query string
	    if (pathname.startsWith("/storybook")) {
	      req.url = (pathname.slice("/storybook".length) || "/") + (url.search || "");
	    }
	    storybookProxy.web(req, res);
	  } else {
	    nextProxy.web(req, res);
	  }
});

// --- WebSocket upgrade (Storybook HMR) ---
server.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  if (isStorybookPath(url.pathname)) {
    storybookProxy.ws(req, socket, head);
  } else {
    nextProxy.ws(req, socket, head);
  }
});

// --- Start ---
server.listen(PORT, () => {
  console.log(`\n🚀  Proxy running at http://localhost:${PORT}\n`);
  console.log(`    /           → Next.js   (port ${NEXT_PORT})`);
  console.log(`    /storybook  → Storybook (port ${STORYBOOK_PORT})\n`);
  console.log(`  Make sure both servers are running:\n`);
  console.log(`    npx next dev -p ${NEXT_PORT}`);
  console.log(`    npx storybook dev -p ${STORYBOOK_PORT} --no-open\n`);
});
