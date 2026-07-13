---
description: List open GitHub issues, or analyze issue N into an actionable plan (default: no code changes)
argument-hint: "[issue-number]"
allowed-tools: Bash, Read, Grep, mcp__github__get_issue, mcp__github__list_issues, mcp__github__search_issues
skills: resolve-github-issue
---

Issue number: $1
Full arguments: $ARGUMENTS

Follow the **resolve-github-issue** skill.

Defaults:

- If `$1` / `$ARGUMENTS` has **no** issue number: list **all open** issues for the current repo (triage table), then wait for a number.
- If a number is present: fetch that issue, locate related code, write a concrete fix/implementation plan.
- **Do not** edit files, commit, push, or open a PR unless the user explicitly asks to implement after the plan.

If chaos-ui project rules apply (designs board, pnpm checks), include them in single-issue plans.
