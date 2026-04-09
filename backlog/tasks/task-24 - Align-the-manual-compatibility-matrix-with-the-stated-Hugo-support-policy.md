---
id: TASK-24
title: Align the manual compatibility matrix with the stated Hugo support policy
status: To Do
assignee: []
created_date: '2026-04-09 10:29'
updated_date: '2026-04-09 10:29'
labels:
  - github-actions
  - ci
  - compatibility
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/test-action.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/backlog/tasks/task-22 - Investigate-macOS-and-Windows-404-failures-in-the-manual-action-compatibility-matrix.md
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Bring the manual compatibility matrix in `.github/workflows/test-action.yml` into line with the documented support policy. `TASK-22` states that the maintained support baseline should be `latest` plus at most one pinned Hugo release from roughly the last year, but the workflow still includes `0.61.0`, which materially predates that policy.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The compatibility matrix is updated so its pinned Hugo coverage matches the stated support window.
- [ ] #2 Any removed legacy version entries are either replaced with a current supported pinned version or explicitly documented as intentionally dropped.
- [ ] #3 `TASK-22` notes and the live workflow are no longer in conflict.
- [ ] #4 The resulting matrix still serves the manual compatibility purpose without overstating support.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Code review found that `TASK-22` is marked done and documents a support policy of `latest` plus one pinned version from roughly the last year, but `.github/workflows/test-action.yml` still tests `0.61.0`.
<!-- SECTION:NOTES:END -->
