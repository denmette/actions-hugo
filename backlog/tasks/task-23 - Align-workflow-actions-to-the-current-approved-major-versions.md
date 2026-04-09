---
id: TASK-23
title: Align workflow actions to the current approved major versions
status: Done
assignee: []
created_date: '2026-04-09 10:18'
updated_date: '2026-04-09 10:20'
labels:
  - github-actions
  - dependencies
  - ci
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/test.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows/release.yml
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Align the repository workflow actions to the currently approved major versions used by the maintainer baseline. At the moment `actions/checkout` and `actions/setup-node` are already on the desired `v6` line, while `actions/upload-artifact` and `codecov/codecov-action` still need to move to the requested newer majors.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Workflow references to `actions/checkout` and `actions/setup-node` are confirmed to be on `v6`.
- [x] #2 Workflow references to `actions/upload-artifact` are upgraded to `v7` where used.
- [x] #3 Workflow references to `codecov/codecov-action` are upgraded to `v6` where used.
- [x] #4 Workflow YAML remains valid after the version alignment.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-09: Requested maintainer baseline is `actions/checkout@v6`, `actions/setup-node@v6`, `actions/upload-artifact@v7`, and `codecov/codecov-action@v6`. Repository review at task start already showed `checkout` and `setup-node` on `v6`, so the implementation work is focused on the remaining `upload-artifact` and `codecov` references.
2026-04-09: Completed by updating `.github/workflows/test.yml` from `actions/upload-artifact@v6` to `v7` and `codecov/codecov-action@v5` to `v6`. All existing `actions/checkout` and `actions/setup-node` references were already on `v6` and were verified rather than changed.
<!-- SECTION:NOTES:END -->
