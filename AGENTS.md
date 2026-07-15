# Chaos UI Agent Guide

This project is a Storybook-first React/Next.js component library for Chaos UI.

## Project Defaults

- Primary component browser: Storybook.
- Daily development command: `pnpm run dev:all` starts tsup --watch + docs site on port `3001` (component source changes auto-rebuild and hot-reload).
- Docs-only development: `pnpm run dev` starts just the docs site.
- Next.js app command: `npm run app:dev`.
- Prefer npm scripts in docs and examples unless a task explicitly targets another package manager.
- Do not restore the old `/styleguide` app as the main component browsing surface.
- Treat `storybook-static/` as generated output. Do not edit files in it by hand.

## Reuse Kit Assets

The project includes reusable Codex/ECC workflow assets copied from `C:\Users\Chaos\Documents\codex-reuse-kit-2026-06-10`:

- `.mcp.json` defines project MCP servers for GitHub, Context7, Exa, Memory, Playwright, and Sequential Thinking.
- `.codex/config.toml` defines the project-local Codex baseline and multi-agent roles.
- `.codex/agents/` contains local agent role configs for explorer, reviewer, and docs researcher.
- `.agents/skills/` contains reusable skills for engineering standards, frontend patterns, TDD, verification, security review, MCP server patterns, research, issue/commit/release workflows, and related workflows.
- `.agents/commands/` defines project slash commands (`/iss`, `/commit`, `/push`, `/pr`, `/release`).
- `.agents/plugins/marketplace.json` records the local ECC plugin metadata.

Keep environment-specific notes, credentials, production hostnames, and machine-only secrets out of this repository.

## CodeGraph

This project has a CodeGraph MCP server (`codegraph_*` tools) configured. CodeGraph is a tree-sitter-parsed knowledge graph of symbols, edges, and files.

Use CodeGraph for structural questions:

- `codegraph_search` for symbol lookup.
- `codegraph_callers` and `codegraph_callees` for call relationships.
- `codegraph_impact` before refactors.
- `codegraph_node` for a focused symbol body.
- `codegraph_explore` for focused source context across related symbols.
- `codegraph_files` for indexed file layout.

Use native search such as `rg` for literal text queries, comments, docs, and exact strings.

## Engineering Standards

- Prefer small focused files and named exports.
- Preserve existing component APIs unless the task explicitly requests a breaking change.
- Use `@/` imports for project-local source.
- Keep UI implementation in `components/ui`, business components in `components/business`, layout components in `components/layout`, and Storybook stories under `src`.
- For Storybook stories, use `Meta` and `StoryObj` from `@storybook/react`, include `tags: ["autodocs"]`, and cover meaningful variants plus at least one interaction state when relevant.
- Do not hardcode secrets, credentials, or production-only URLs.
- Before finishing significant changes, run the narrowest reliable verification first, then broader checks when feasible.

## Verification Commands

- `npm run dev` starts the docs site (Next.js) on port `3001`.
- `npm run storybook` starts Storybook independently on port `3002`.
- `npm run build-storybook` verifies Storybook can build.
- `npm run lint` runs ESLint.
- `npx tsc --noEmit` runs TypeScript checking.
- If stale generated Next files cause type errors after route cleanup, remove `.next/` and rerun type checking.

## Design Workflow（设计看板规范）

所有功能设计、重构方案必须先产出计划 `.md` 文件，存放在 `designs/` 目录下。**状态由文件内 YAML frontmatter 标记，文件不移动。**

```
未执行 ──→ 工作中 ──→ 待审核 ──→ 完成
  ↑                                  │
  └──────── 需修改/补充 ←────────────┘
```

### 状态变更两步走

1. 改文件 frontmatter 中的 `status` 字段
2. 更新 `INDEX.md` 看板中对应的链接位置

### Frontmatter 字段

```yaml
---
status: 工作中 # 未执行 | 工作中 | 待审核 | 完成
created: 2026-07-08
updated: 2026-07-08
---
```

### 执行约定

- 没有计划文档 = 不能开始开发
- 从 `designs/_模板_设计计划.md` 复制创建新计划
- 文件命名：`YYYY-MM-DD_功能名称_设计计划.md`
- 逐项完成、逐项标注（`- [x]`），全部完成后才能改状态为待审核
- 审核不通过 → 在原文档追加修改说明，改状态为未执行
- 看板总览在 `INDEX.md`，详细流程见 `designs/README.md`

## Slash commands

Project commands live in `.agents/commands/` and mount skills under `.agents/skills/`. A matching copy may also exist under `~/.agents/` for cross-project use (user scope wins when names collide).

| Command                                 | Default behavior                                                                                                                                                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/iss` or `/iss <n>`                    | No number → list **all open** issues; with `n` → analyze `#n` and **plan only** (no edits until you ask to implement)                                                                                               |
| `/commit`                               | Conventional commit; intentional staging only (never `git add .`)                                                                                                                                                   |
| `/push`                                 | Push current branch; pre-push fast gate only (`typecheck` + `lint`); no force on `main`                                                                                                                             |
| `/pr`                                   | Open PR from current branch using `.github/pull_request_template.md`                                                                                                                                                |
| `/release [patch\|minor\|major\|x.y.z]` | **Real cut by default**: patch bump (empty args); minor for large waves; CHANGELOG + version commit → push main → `release:check` → tag push → `release.yml` → **close shipped issues**. `plan-only` to draft only. |

### Issue lifecycle（必须遵守）

**处理完成就必须关闭对应 GitHub issue** — 不是可选项。

- **Done when shipped**: after the fix is on `main` and (for library releases) published / tagged as intended, **close every issue fully resolved by that work**.
- Prefer `gh issue close N --comment "…"` with version/commit/PR links; one comment is enough.
- Do this as the last step of `/release` (issues listed in the release CHANGELOG / commits), or immediately after a non-release fix lands if no release is planned.
- **Do not** leave resolved issues open waiting for the user to close them.
- Plan-only `/iss` stays open (analysis only). Partial work → leave open or comment progress; do not close early.

Typical delivery flow after an approved plan:

```text
/iss 9  →  implement (when asked)  →  /commit  →  /push  →  /pr  →  merge/checks
       →  /release (if library cut)  →  close #9 with release note
```

Quality gates (do not run all of these on every push):

| Gate                 | When                             | Command                                                     |
| -------------------- | -------------------------------- | ----------------------------------------------------------- |
| Pre-push (husky)     | every `git push`                 | `typecheck` + `lint` (fast)                                 |
| Before PR (optional) | opening/updating a PR            | `pnpm run check:push` (`check` + `build:pkg`)               |
| PR / main CI         | after PR or push to main/develop | GitHub Actions `ci.yml` — watch with `gh pr checks --watch` |
| Release              | `/release` before tag            | `pnpm run release:check` + main CI green on release SHA     |

Release flow (chaos-ui):

```text
/release            # default patch; /release minor for large feature sets
  → bump package.json + CHANGELOG
  → commit: release: vX.Y.Z - …
  → push main
  → pnpm run release:check   # local full gate (typecheck+test+prepack+smoke)
  → wait main CI green for that SHA
  → tag vX.Y.Z  →  push tag
  → release.yml: require CI green → prepack once → publish --ignore-scripts
  → GitHub Release body from CHANGELOG
  → close all issues fully shipped in this cut (comment: version + SHA + release URL)
```

- Full quality gate is **local** (`release:check`) + **main CI**, not inside `prepublishOnly`.
- `prepublishOnly` is intentionally light (`check:no-bom`); do not publish from a dirty tree with `pnpm publish` as the primary path.
- Project agent/MCP baselines that should stay on GitHub: `.agents/`, `.codex/`, `.mcp.json`, `AGENTS.md` (no secrets / no `.zcode/plans/`).

## Git Hygiene

- Expect a dirty worktree during active component work.
- Do not revert unrelated changes.
- Do not use `git add .`; stage only intentional files.
- Review `git status --short` and `git diff` before commit or handoff.
