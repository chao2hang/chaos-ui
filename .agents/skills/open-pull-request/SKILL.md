---
name: open-pull-request
description: "Open a GitHub pull request for the current branch using the repo PR template and gh CLI. Use when the user runs /pr or asks to create a pull request. Link issues when known; do not push force; confirm branch is on remote first."
---

# Open Pull Request

Create a PR for the current branch against the repo default base (usually `main`).

## Preconditions

```bash
git branch --show-current
git status --short
gh repo view --json nameWithOwner,defaultBranchRef -q .
gh pr view 2>/dev/null || true
```

1. Refuse if on `main`/`master` with no feature branch — ask to branch first.
2. If uncommitted work remains, warn; prefer `/commit` then `/push`.
3. Optional but recommended before first PR open: `pnpm run check:push` (full local gate; pre-push is only typecheck+lint).
4. Ensure branch is pushed (`git push -u origin HEAD` if needed, via push skill rules).
5. If a PR already exists for this branch, show its URL and stop (or update only if asked).

## Template

If present, read and follow:

- `.github/pull_request_template.md`

For chaos-ui, fill Type / Scope / Checklist honestly based on the diff.

## Title & body

- Title: conventional style when possible, e.g. `fix(layout): seed AdminSider expand for deep links`
- Body: Summary, test plan, screenshots/Storybook if UI, and issue link:
  - `Fixes #N` or `Closes #N` when the PR fully addresses the issue
  - `Refs #N` when partial

## Create

Prefer GitHub CLI:

```bash
gh pr create --title "..." --body "$(cat <<'EOF'
## Summary
...

## Test plan
- [ ] ...

Fixes #N
EOF
)"
```

Base branch: repo default unless user specifies otherwise.

Fallback: GitHub MCP `create_pull_request` with `owner`/`repo`/`head`/`base`/`title`/`body`.

## After create

- Print PR URL.
- Do not merge unless explicitly asked.
- Prefer watching CI instead of re-running the full local suite:

```bash
gh pr checks --watch
```

- CI covers tests, package smoke, storybook/docs gates, etc. Local pre-push already covered typecheck+lint.

## Boundaries

- Do not use `git add .`.
- Do not force-push to open the PR.
- Do not change PR reviewers/labels unless asked.
