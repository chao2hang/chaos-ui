---
description: Open a GitHub PR for the current branch using the repo PR template
argument-hint: "[optional issue number or title hint]"
allowed-tools: Bash, Read, mcp__github__create_pull_request, mcp__github__list_pull_requests
skills: open-pull-request
---

User arguments: $ARGUMENTS

Follow the **open-pull-request** skill.

- Ensure branch is pushed; use PR template when present.
- Link `Fixes #N` / `Refs #N` when an issue is known from `$ARGUMENTS` or context.
- Print the PR URL; do not merge.
