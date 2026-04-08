---
id: TASK-2.2
title: Group GitHub Actions workflow update PRs in Renovate
status: To Do
assignee: []
created_date: '2026-04-07 15:03'
updated_date: '2026-04-07 15:03'
labels:
  - automation
  - renovate
  - github-actions
dependencies:
  - TASK-2.1
parent_task_id: TASK-2
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Configure Renovate so related GitHub Actions workflow updates land in grouped PRs instead of isolated single-action branches. This grouping should cover checkout/setup-node/codecov/codeql/artifact-action and runner-image style workflow maintenance updates that are typically reviewed together.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Renovate groups related GitHub Actions workflow updates into one or a small number of predictable PRs.
- [ ] #2 CodeQL update behavior aligns with the repository plan to avoid deprecated action versions.
- [ ] #3 Workflow-action majors that can reasonably be reviewed together are grouped instead of opened as separate noisy PRs.
- [ ] #4 The resulting grouping is documented in the Renovate config or nearby comments.
<!-- AC:END -->
