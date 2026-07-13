---
description: Create a conventional commit with intentional staging only (never git add .)
argument-hint: "[optional focus or issue ref]"
allowed-tools: Bash, Read
skills: git-commit-conventional
---

User arguments: $ARGUMENTS

Follow the **git-commit-conventional** skill.

- Inspect status/diff/log first.
- Stage only intentional paths (never `git add .` / `-A`).
- Message: `type(scope): subject` per commitlint.
- Do not push. Do not amend unless explicitly requested and safe.
