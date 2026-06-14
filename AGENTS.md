# Chaos UI Agent Guide

This project is a Storybook-first React/Next.js component library for Chaos UI.

## Project Defaults

- Primary component browser: Storybook.
- Daily development command: `npm run dev` starts Storybook on port `6006`.
- Next.js app command: `npm run app:dev`.
- Prefer npm scripts in docs and examples unless a task explicitly targets another package manager.
- Do not restore the old `/styleguide` app as the main component browsing surface.
- Treat `storybook-static/` as generated output. Do not edit files in it by hand.

## Reuse Kit Assets

The project includes reusable Codex/ECC workflow assets copied from `C:\Users\Chaos\Documents\codex-reuse-kit-2026-06-10`:

- `.mcp.json` defines project MCP servers for GitHub, Context7, Exa, Memory, Playwright, and Sequential Thinking.
- `.codex/config.toml` defines the project-local Codex baseline and multi-agent roles.
- `.codex/agents/` contains local agent role configs for explorer, reviewer, and docs researcher.
- `.agents/skills/` contains reusable skills for engineering standards, frontend patterns, TDD, verification, security review, MCP server patterns, research, and related workflows.
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

- `npm run dev` starts Storybook for local review.
- `npm run build-storybook` verifies Storybook can build.
- `npm run lint` runs ESLint.
- `npx tsc --noEmit` runs TypeScript checking.
- If stale generated Next files cause type errors after route cleanup, remove `.next/` and rerun type checking.

## Git Hygiene

- Expect a dirty worktree during active component work.
- Do not revert unrelated changes.
- Do not use `git add .`; stage only intentional files.
- Review `git status --short` and `git diff` before commit or handoff.
