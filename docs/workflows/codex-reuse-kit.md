# Codex Reuse Kit Integration

Imported from `C:\Users\Chaos\Documents\codex-reuse-kit-2026-06-10` on 2026-06-13.

## What Was Added

- `.mcp.json`: MCP server definitions for GitHub, Context7, Exa, Memory, Playwright, and Sequential Thinking.
- `.codex/config.toml`: project-local Codex baseline with multi-agent support enabled.
- `.codex/agents/`: local read-only agent roles for exploration, review, and docs research.
- `.codex/AGENTS.md`: Codex-specific ECC notes, skill discovery, MCP guidance, and multi-agent usage notes.
- `.agents/skills/`: reusable workflow skills covering coding standards, frontend patterns, TDD, verification, security review, MCP server patterns, research, content, and related workflows.
- `.agents/plugins/marketplace.json`: local ECC plugin metadata.
- `AGENTS.md`: project-specific operating guide for Chaos UI agents.

## What Was Intentionally Not Imported

The source kit also contains environment-specific instructions for another deployment workspace, including service ports, hostnames, process commands, and test credentials. Those details were not copied into this project because Chaos UI is a local Storybook-first component library.

## Project-Specific Defaults

- `npm run storybook` starts Storybook at `http://localhost:3002`.
- `npm run dev` starts the component docs site at `http://localhost:8080`.
- Storybook is the primary component browsing surface.
- The old `/styleguide` route should not be reintroduced as the main component browser.

## Skill Usage

Use project-local skills from `.agents/skills/` when they match the task:

- `coding-standards` for general code quality rules.
- `frontend-patterns` for React, Next.js, state, and UI patterns.
- `tdd-workflow` for new features, bug fixes, and refactors.
- `verification-loop` for build, lint, typecheck, and test validation.
- `security-review` for auth, secrets, user input, external integrations, or sensitive flows.
- `mcp-server-patterns` when adding or maintaining MCP servers.
- `e2e-testing` for browser-level checks and Playwright flows.

## MCP Notes

`.mcp.json` is a portable project MCP definition. Credentials, tokens, and machine-specific overrides should live in the user's local environment or user-level Codex config, not in this repository.

The Codex TOML baseline intentionally avoids OS-specific notification commands. Add personal notification hooks in user-level config if needed.
