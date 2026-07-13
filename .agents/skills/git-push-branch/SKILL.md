---
name: git-push-branch
description: "Push the current branch to origin with safe defaults. Use when the user runs /push or asks to push commits. Respects pre-push hooks; never force-push main/master; never skip hooks unless the user explicitly insists."
---

# Git Push Branch

Push the current branch to `origin` safely.

## Preconditions

```bash
git status --short
git branch --show-current
git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || true
git log --oneline @{u}..HEAD 2>/dev/null || git log --oneline -5
```

- If there are uncommitted changes that belong in the push, warn and prefer `/commit` first (unless user only wants to push existing commits).
- If branch is clean and already up to date with upstream, say so and stop.

## Push

- With upstream: `git push`
- Without upstream: `git push -u origin HEAD`

## Hooks (chaos-ui)

This repo’s pre-push runs roughly:

```bash
pnpm run check && pnpm run build:pkg
```

If the hook fails:

1. Surface the full relevant error output.
2. Do not bypass with `--no-verify` unless the user explicitly requests it.
3. Suggest fixes (type/lint/build) rather than force-pushing.

## Force push

- **Never** force-push `main` or `master`.
- Force-push other branches only with explicit user authorization.
- Prefer `git push --force-with-lease` over `--force` when authorized.

## Boundaries

- Do not create tags or publish packages here.
- Do not open a PR here (use `/pr`).
- Report the remote URL/branch and any new commits pushed.
