---
id: TASK-35
title: Prevent semantic-release commits from retriggering the release workflow
status: Done
assignee: []
created_date: '2026-04-10 09:20'
updated_date: '2026-04-10 09:20'
labels:
  - release
  - ci
  - github-actions
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/release.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.releaserc.json
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ensure the release workflow does not recursively trigger itself after semantic-release creates its own release commit on `main`. The repository intends to allow the semantic-release actor to push the changelog/release commit directly, so the workflow needs an explicit guard against self-trigger loops.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The release workflow skips push events created by semantic-release release commits.
- [x] #2 Manual `workflow_dispatch` remains available.
- [x] #3 The loop-prevention logic is based on the semantic-release commit signature rather than only on a changed file path.
- [x] #4 Workflow YAML remains valid after the change.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-10: Added a job-level guard in `.github/workflows/release.yml` so push-triggered runs are skipped when the head commit message is the semantic-release release commit (`chore(release): ...`) or already marked with `[skip ci]`. This keeps the current `@semantic-release/git` and changelog-commit model compatible with the planned GitHub ruleset exception for the release actor without creating release loops.
<!-- SECTION:NOTES:END -->
