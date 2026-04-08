---
id: TASK-2.4
title: Define how to handle stale and superseded Renovate PRs
status: To Do
assignee: []
created_date: '2026-04-07 15:03'
updated_date: '2026-04-07 15:03'
labels:
  - automation
  - renovate
  - maintenance
dependencies:
  - TASK-2.1
parent_task_id: TASK-2
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Define the repository approach for stale and superseded Renovate PRs that no longer match the desired grouping strategy. This should cover when to close obsolete intermediate PRs, when to preserve majors as standalone work, and how to validate the resulting Renovate behavior after the new configuration lands.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The repository has explicit guidance for closing stale or superseded Renovate PRs created under the older fragmented strategy.
- [ ] #2 Standalone major changes that should remain isolated, such as a Node runtime baseline jump, are called out explicitly.
- [ ] #3 The task defines how the new Renovate configuration will be validated or smoke-tested after landing.
- [ ] #4 The stale-PR handling approach is documented clearly enough for future maintainers to follow consistently.
<!-- AC:END -->
