---
description: Push the current branch to origin (respects hooks; no force on main)
argument-hint: "[optional remote/branch notes]"
allowed-tools: Bash
skills: git-push-branch
---

User arguments: $ARGUMENTS

Follow the **git-push-branch** skill.

- Push current branch; set upstream if missing.
- Surface pre-push failures; do not `--no-verify` unless user insists.
- Never force-push main/master.
