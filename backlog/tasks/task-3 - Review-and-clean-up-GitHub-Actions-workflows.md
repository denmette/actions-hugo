---
id: TASK-3
title: Review and clean up GitHub Actions workflows
status: To Do
assignee: []
created_date: '2026-04-07 08:28'
updated_date: '2026-04-07 08:28'
labels:
  - github-actions
  - ci
  - maintenance
dependencies:
  - TASK-0001.04
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Inspect the repository's GitHub Actions workflows and related action metadata to clean up outdated configuration, remove unnecessary complexity, and confirm the automation still matches the project's supported Node runtime and dependency-maintenance direction. This task should cover workflow YAML under .github/workflows and any closely related action or release automation that may need adjustment after the dependency modernization work.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Existing GitHub Actions workflows are reviewed for outdated versions, unnecessary steps, and configuration drift against the current repository baseline.
- [ ] #2 Workflow cleanup changes are applied where needed without altering intended release or test coverage.
- [ ] #3 Any required updates to action metadata, workflow documentation, or repository guidance are included in the same task.
- [ ] #4 The resulting workflows are validated to the extent practical through local inspection and repository checks.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
This task was added after the initial dependency-upgrade breakdown so workflow cleanup and review are tracked explicitly.
<!-- SECTION:NOTES:END -->
