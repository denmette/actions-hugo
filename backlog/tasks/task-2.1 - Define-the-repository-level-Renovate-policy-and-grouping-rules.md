---
id: TASK-2.1
title: Define the repository-level Renovate policy and grouping rules
status: To Do
assignee: []
created_date: '2026-04-07 15:03'
updated_date: '2026-04-07 15:03'
labels:
  - dependencies
  - automation
  - renovate
dependencies:
  - TASK-0001.04
parent_task_id: TASK-2
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Define the baseline Renovate policy for this repository before implementing package rules. This should cover scheduling, reviewer expectations, rebasing behavior, and the grouping model that turns the current overlapping Renovate branches into a smaller number of meaningful review units.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A documented Renovate grouping model is defined for workflow updates, toolkit runtime majors, tooling majors, test-stack majors, and local workflow tooling.
- [ ] #2 Major Node runtime baseline changes are explicitly kept separate from normal dependency maintenance groups.
- [ ] #3 The intended Renovate schedule and PR-noise controls are documented clearly enough to be encoded in renovate.json.
- [ ] #4 The policy aligns with the repository's linear-history and manageable-review goals.
<!-- AC:END -->
