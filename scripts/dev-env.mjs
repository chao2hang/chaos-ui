#!/usr/bin/env node
/**
 * 本地常驻后台开发环境管理器。
 *
 * 默认服务：pkg (tsup --watch) + docs (:3001) + storybook (:6006)
 * 状态目录：.dev/  （pid + logs，已 gitignore）
 *
 * 用法：
 *   node scripts/dev-env.mjs start [service...]
 *   node scripts/dev-env.mjs stop [service...]
 *   node scripts/dev-env.mjs restart [service...]
 *   node scripts/dev-env.mjs status [service...]
 *
 * 也可：pnpm run env:start / env:stop / env:restart / env:status
 */
import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
  openSync,
  closeSync,
} from "node:fs";
import { createConnection } from "node:net";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const root = fileURLToPath(new URL("../", import.meta.url));
const devDir = join(root, ".dev");
const logDir = join(devDir, "logs");

/** @typedef {{ name: string, label: string, command: string, args: string[], port: number | null, default: boolean }} Service */

/** @type {Record<string, Service>} */
const SERVICES = {
  pkg: {
    name: "pkg",
    label: "tsup --watch (dist rebuild)",
    command: "pnpm",
    args: ["run", "dev:pkg"],
    port: null,
    default: true,
  },
  docs: {
    name: "docs",
    label: "docs site (Next.js)",
    command: "pnpm",
    args: ["run", "dev"],
    port: 3001,
    default: true,
  },
  storybook: {
    name: "storybook",
    label: "Storybook",
    command: "pnpm",
    args: ["run", "storybook"],
    port: 6006,
    default: true,
  },
};

const DEFAULT_SERVICES = Object.values(SERVICES)
  .filter((s) => s.default)
  .map((s) => s.name);

function ensureDirs() {
  mkdirSync(logDir, { recursive: true });
}

function pidPath(name) {
  return join(devDir, `${name}.pid`);
}

function logPath(name) {
  return join(logDir, `${name}.log`);
}

function readPid(name) {
  const file = pidPath(name);
  if (!existsSync(file)) return null;
  const raw = readFileSync(file, "utf8").trim();
  const pid = Number(raw);
  return Number.isInteger(pid) && pid > 0 ? pid : null;
}

function writePid(name, pid) {
  ensureDirs();
  writeFileSync(pidPath(name), String(pid), "utf8");
}

function clearPid(name) {
  const file = pidPath(name);
  if (existsSync(file)) unlinkSync(file);
}

function isAlive(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/** @returns {Promise<boolean>} */
function isPortOpen(port, host = "127.0.0.1") {
  return new Promise((resolve) => {
    const socket = createConnection({ port, host });
    const done = (ok) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(400);
    socket.once("connect", () => done(true));
    socket.once("timeout", () => done(false));
    socket.once("error", () => done(false));
  });
}

/**
 * @param {string[]} requested
 * @returns {Service[]}
 */
function resolveServices(requested) {
  if (!requested.length) {
    return DEFAULT_SERVICES.map((n) => SERVICES[n]);
  }
  const out = [];
  for (const name of requested) {
    const svc = SERVICES[name];
    if (!svc) {
      console.error(
        `Unknown service "${name}". Available: ${Object.keys(SERVICES).join(", ")}`,
      );
      process.exit(1);
    }
    out.push(svc);
  }
  return out;
}

/**
 * @param {Service} svc
 */
async function startService(svc) {
  ensureDirs();
  const existing = readPid(svc.name);
  if (existing && isAlive(existing)) {
    console.log(
      `✓ ${svc.name}: already running (pid ${existing}) — ${svc.label}`,
    );
    return;
  }
  if (existing) clearPid(svc.name);

  if (svc.port != null && (await isPortOpen(svc.port))) {
    console.log(
      `! ${svc.name}: port ${svc.port} already in use (not managed by env:*). Skip start. Use env:status.`,
    );
    return;
  }

  const logFile = logPath(svc.name);
  const fd = openSync(logFile, "a");
  const child = spawn(svc.command, svc.args, {
    cwd: root,
    detached: true,
    stdio: ["ignore", fd, fd],
    env: {
      ...process.env,
      FORCE_COLOR: process.env.FORCE_COLOR ?? "0",
    },
  });
  closeSync(fd);

  if (!child.pid) {
    console.error(`✗ ${svc.name}: failed to spawn`);
    process.exitCode = 1;
    return;
  }

  child.unref();
  writePid(svc.name, child.pid);

  // Brief settle so immediate crash surfaces in status
  await sleep(400);
  if (!isAlive(child.pid)) {
    clearPid(svc.name);
    console.error(
      `✗ ${svc.name}: exited immediately after start. See ${logFile}`,
    );
    process.exitCode = 1;
    return;
  }

  const portHint = svc.port != null ? ` → http://localhost:${svc.port}` : "";
  console.log(
    `✓ ${svc.name}: started (pid ${child.pid})${portHint} — log: ${logFile}`,
  );
}

/**
 * @param {Service} svc
 */
async function stopService(svc) {
  const pid = readPid(svc.name);
  if (!pid) {
    console.log(`· ${svc.name}: not managed (no pid file)`);
    return;
  }
  if (!isAlive(pid)) {
    clearPid(svc.name);
    console.log(`· ${svc.name}: stale pid ${pid} cleared`);
    return;
  }

  try {
    // Kill process group when possible (pnpm/node children)
    process.kill(-pid, "SIGTERM");
  } catch {
    try {
      process.kill(pid, "SIGTERM");
    } catch (err) {
      console.error(`✗ ${svc.name}: kill failed — ${err.message}`);
      process.exitCode = 1;
      return;
    }
  }

  const deadline = Date.now() + 8000;
  while (Date.now() < deadline && isAlive(pid)) {
    await sleep(150);
  }

  if (isAlive(pid)) {
    try {
      process.kill(-pid, "SIGKILL");
    } catch {
      try {
        process.kill(pid, "SIGKILL");
      } catch {
        /* ignore */
      }
    }
    await sleep(200);
  }

  clearPid(svc.name);
  if (isAlive(pid)) {
    console.error(`✗ ${svc.name}: still alive (pid ${pid})`);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${svc.name}: stopped (was pid ${pid})`);
  }
}

/**
 * @param {Service} svc
 */
async function statusService(svc) {
  const pid = readPid(svc.name);
  const managedAlive = pid != null && isAlive(pid);
  const portOpen = svc.port != null ? await isPortOpen(svc.port) : null;

  let state;
  if (managedAlive) {
    state = "running (managed)";
  } else if (pid && !managedAlive) {
    state = "stale pid";
  } else if (portOpen) {
    state = "port open (external)";
  } else {
    state = "stopped";
  }

  const pidPart = pid ? `pid=${pid}` : "pid=-";
  const portPart =
    svc.port != null
      ? `port=${svc.port}${portOpen ? " open" : " closed"}`
      : "port=-";
  const url =
    svc.port != null && (managedAlive || portOpen)
      ? ` http://localhost:${svc.port}`
      : "";
  console.log(
    `${svc.name.padEnd(10)} ${state.padEnd(22)} ${pidPart.padEnd(12)} ${portPart}${url}`,
  );
  if (existsSync(logPath(svc.name))) {
    console.log(`${"".padEnd(10)} log: ${logPath(svc.name)}`);
  }
}

function printUsage() {
  console.log(`Usage:
  node scripts/dev-env.mjs <start|stop|restart|status> [service...]

Services: ${Object.keys(SERVICES).join(", ")}
Default:  ${DEFAULT_SERVICES.join(", ")}

pnpm shortcuts:
  pnpm run env:start
  pnpm run env:stop
  pnpm run env:restart
  pnpm run env:status
`);
}

async function main() {
  const argv = process.argv.slice(2);
  // pnpm run env:start -- storybook  → argv may include "--"
  const cleaned = argv.filter((a) => a !== "--");
  const action = cleaned[0];
  const names = cleaned.slice(1);

  if (!action || ["-h", "--help", "help"].includes(action)) {
    printUsage();
    process.exit(action ? 0 : 1);
  }

  const services = resolveServices(names);

  switch (action) {
    case "start":
      for (const svc of services) {
        await startService(svc);
      }
      break;
    case "stop":
      for (const svc of services) {
        await stopService(svc);
      }
      break;
    case "restart":
      for (const svc of services) {
        await stopService(svc);
      }
      for (const svc of services) {
        await startService(svc);
      }
      break;
    case "status":
      console.log("Chaos UI dev environment");
      console.log(`root: ${root}`);
      console.log(`state: ${devDir}`);
      console.log("");
      for (const svc of services) {
        await statusService(svc);
      }
      break;
    default:
      console.error(`Unknown action: ${action}`);
      printUsage();
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
