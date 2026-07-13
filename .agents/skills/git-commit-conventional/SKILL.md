---
name: git-commit-conventional
description: "Create a conventional git commit with intentional staging only. Use when the user runs /commit, asks to commit changes, or needs a commit message that matches commitlint. Never use git add .; never amend unless explicitly requested and safe."
---

# Git Commit (Conventional)

Create **one** focused commit using Conventional Commits.

## Preconditions

Run and read:

```bash
git status --short
git diff
git diff --cached
git log --oneline -10
git branch --show-current
```

If there is nothing to commit, say so and stop.
If the worktree has unrelated dirty files, stage only the files for this change.

## Message format

```text
type(scope): subject
```

Allowed types (chaos-ui / commitlint):

`feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`

Also used in this repo for releases: `release: vX.Y.Z - summary` (when preparing a release commit).

Rules:

- Subject ≤ 100 characters; Chinese subjects are OK.
- Prefer an accurate `scope` (component or area), e.g. `fix(layout): …`.
- Reference issues when relevant: `(#9)` in subject or body.
- Body optional; use for why/impact, not file laundry lists.

## Staging

- **Never** run `git add .` or `git add -A`.
- Stage explicit paths: `git add -- path1 path2`.
- Do not stage secrets, `.env`, build artifacts, or unrelated user files.
- Review `git diff --cached` before committing.

## Commit

Use a HEREDOC for the message:

```bash
git commit -m "$(cat <<'EOF'
type(scope): subject

Optional body.

EOF
)"
```

Then show `git status --short` after the commit.

## Amend

Only if the user explicitly asks **and**:

- HEAD was created by you in this session, and
- commit is not already pushed,

otherwise create a new commit.

## Boundaries

- Do not push.
- Do not modify git config.
- Do not revert unrelated changes.
- If pre-commit hooks fail, fix the underlying issue or report the hook output; do not `--no-verify` unless the user explicitly demands it.
