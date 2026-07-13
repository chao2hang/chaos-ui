---
description: Prepare a release (CHANGELOG + version plan only; no tag push or npm publish)
argument-hint: "[patch|minor|major|x.y.z]"
allowed-tools: Bash, Read
skills: prepare-release
---

Target: $1
Full arguments: $ARGUMENTS

Follow the **prepare-release** skill.

Defaults:

- Propose SemVer, CHANGELOG draft, version bump, commit message, and tag commands.
- **Do not** push tags or publish to npm unless the user explicitly authorizes each step after the proposal.
- Primary path for chaos-ui: CHANGELOG + `v*` tag → `release.yml` (not Changesets unless asked).
