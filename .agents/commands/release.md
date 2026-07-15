---
description: Cut a real release (default patch bump; CHANGELOG + version + push + tag → release.yml)
argument-hint: "[patch|minor|major|x.y.z|plan-only]"
allowed-tools: Bash, Read, Edit, Write
skills: prepare-release
---

Target: $1
Full arguments: $ARGUMENTS

Follow the **prepare-release** skill.

Defaults:

- **Execute** a full release cut unless args/user say `plan-only` / `dry-run` / `只提案`.
- SemVer: empty → **patch** (last segment +1); `minor` for large feature waves; `major` only when breaking; or exact `x.y.z`.
- Steps: bump `package.json` + CHANGELOG → `release: vX.Y.Z - …` commit → push `main` → **`pnpm run release:check`** → wait for **main CI** green on that SHA → `git tag` + `git push origin vX.Y.Z`.
- Publish path: tag → `release.yml` (prepack once + `publish --ignore-scripts`); do not local-publish unless Actions cannot and user asks.
- Never skip `release:check` or tag a red commit; never force-push or overwrite an existing tag.
