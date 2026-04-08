---
id: TASK-2.2
title: Group GitHub Actions workflow update PRs in Renovate
status: In Progress
assignee:
  - codex
created_date: '2026-04-07 15:03'
updated_date: '2026-04-08 10:34'
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
- [x] #1 Renovate groups related GitHub Actions workflow updates into one or a small number of predictable PRs.
- [x] #2 CodeQL update behavior aligns with the repository plan to avoid deprecated action versions.
- [x] #3 Workflow-action majors that can reasonably be reviewed together are grouped instead of opened as separate noisy PRs.
- [x] #4 The resulting grouping is documented in the Renovate config or nearby comments.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Implementation started on branch chore/task-2-2-renovate-gha-grouping from updated main. Current workflow-related Renovate branches show isolated PRs for actions/checkout, actions/setup-node, codecov/codecov-action, actions/upload-artifact/download-artifact, runner image updates, and CodeQL updates. This subtask will refine renovate.json so those changes land in grouped workflow-maintenance PRs instead of as separate branches.

2026-04-08: Refined renovate.json so GitHub Actions workflow maintenance updates share an explicit group name and slug. The workflow-maintenance group now covers actions/checkout, actions/setup-node, actions/dependency-review-action, codecov/codecov-action, github/codeql-action, and the artifact actions. This makes CodeQL updates part of the normal workflow-maintenance review stream instead of a standalone PR.

2026-04-08: Added an explicit artifact-action-major rule so upload/download artifact major bumps stay grouped with the rest of the workflow maintenance work instead of opening isolated major-only PRs. Runner image updates remain in a separate github-actions-runner-images bucket because they are reviewed differently from action-version bumps.

2026-04-08: Validation for this subtask was repository-local: renovate.json was syntactically validated with a local JSON parse after the GitHub Actions package rules were updated.
<!-- SECTION:NOTES:END -->
