---
name: prepare-release
description: "Cut a real package release for chaos-ui: SemVer bump, CHANGELOG, release commit, push main, release:check, tag, push tag → release.yml. Default bump is patch; use minor for large feature sets; major only when breaking. Use when the user runs /release or asks to publish a version."
---

# Prepare Release (real cut by default)

`/release` **executes** a full release cut for chaos-ui unless the user asks for **plan-only** / **dry-run** / **只提案**.

## SemVer defaults

| Input (`$1` / `$ARGUMENTS`) | Bump                                                                      |
| --------------------------- | ------------------------------------------------------------------------- |
| _(empty)_ or `patch`        | **patch** (last segment +1) — default                                     |
| `minor`                     | **minor** (middle +1, patch → 0) — large feature sets / multi-issue waves |
| `major`                     | **major** — breaking API/behavior without compat path                     |
| exact `x.y.z`               | that version                                                              |

Heuristics when empty:

- **patch**: bugfixes, small non-breaking tweaks, docs that affect consumers
- **minor**: new components/features, non-breaking API additions, “大型改动” multi-file waves
- **major**: intentional breaking changes

Include issue refs (`#26`) and internal IDs (`CUI-*`) in CHANGELOG when known.

## Gather context (always first)

```bash
node -p "require('./package.json').version" 2>/dev/null || true
git describe --tags --abbrev=0 2>/dev/null || true
git log --oneline -20
git status --short
git branch --show-current
```

Read:

- `CHANGELOG.md` (top)
- `package.json` name/version
- `.github/workflows/release.yml` when present
- commits since last `release: v*` / tag for CHANGELOG bullets

If version/tag already exists, stop and report. Prefer clean worktree for the release commit (unrelated dirt: leave unstaged).

## Chaos UI pipeline (SoT = hand CHANGELOG + version tag)

1. Bump `package.json` → `X.Y.Z`
2. Insert `## [X.Y.Z] — YYYY-MM-DD` in `CHANGELOG.md` (Keep a Changelog; leave `## [Unreleased]` empty)
3. Commit: `release: vX.Y.Z - <short summary>` (intentional paths only; never `git add .`)
4. `git push origin main` (or current release branch if policy requires main)
5. Local full gate: `pnpm run release:check` (typecheck + test + check:no-bom + prepack + smoke)
6. Wait until **main CI** (`ci.yml`) is **success** for that SHA
7. `git tag vX.Y.Z` && `git push origin vX.Y.Z`
8. `release.yml` on tag:
   - tag commit on `main` + CI success for same SHA
   - `prepack` once → `pnpm publish --ignore-scripts`
   - GitHub Release body from CHANGELOG

Do **not** treat `prepublishOnly` as the full gate (it is light: `check:no-bom`). Prefer tag → Actions over local `pnpm publish`.

Changesets path is **secondary** — only if the user asks.

## Default mode: execute

When the user runs bare `/release` or `/release patch|minor|major|x.y.z` **without** dry-run language:

1. Resolve next version (default **patch**).
2. Draft CHANGELOG bullets from commits since last release tag.
3. **Write** `package.json` + `CHANGELOG.md`.
4. **Commit** release message.
5. **Push** `main` (or report if push denied).
6. Run **`pnpm run release:check`**; on failure, stop and report (do not tag).
7. Poll / check CI for the release SHA; if red, stop and report.
8. **Tag** `vX.Y.Z` and **push tag** when gates pass.
9. Report npm/Actions status if available (`gh run list` / release workflow).

Announce each step briefly as it completes. Do not print npm tokens.

### Soft confirmation

If the worktree is dirty with unrelated changes, branch is not `main`, or CI is already failing on tip: **surface that and wait** before push/tag. Otherwise proceed without an extra “apply prep?” gate.

## Plan-only mode

Only if the user says **plan-only**, **dry-run**, **只提案**, or **不要发布**:

- Output version + CHANGELOG draft + commands
- **Do not** write version files, commit, push, tag, or publish

## Boundaries

- Never print or request npm tokens / secrets.
- Never skip `release:check` or tag a red/untested commit.
- Never force-push `main` or overwrite an existing release tag.
- Stage only intentional release files for the release commit.
- Local `pnpm publish` only if Actions cannot and user explicitly asks.
