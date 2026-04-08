---
id: TASK-2.1
title: Define the repository-level Renovate policy and grouping rules
status: Done
assignee:
  - codex
created_date: '2026-04-07 15:03'
updated_date: '2026-04-08 11:12'
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
- [x] #1 A documented Renovate grouping model is defined for workflow updates, toolkit runtime majors, tooling majors, test-stack majors, and local workflow tooling.
- [x] #2 Major Node runtime baseline changes are explicitly kept separate from normal dependency maintenance groups.
- [x] #3 The intended Renovate schedule and PR-noise controls are documented clearly enough to be encoded in renovate.json.
- [x] #4 The policy aligns with the repository's linear-history and manageable-review goals.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Added the initial repository-level renovate.json baseline, including off-hours scheduling, dependency dashboard usage, rebaseWhen=behind-base-branch, a PR concurrency cap, weekly lock file maintenance, and grouped update buckets for workflow maintenance, runner images, toolkit majors, tooling updates, test-stack updates, and local workflow tooling.

2026-04-08: Major Node runtime baseline changes are explicitly kept separate from normal maintenance groups through dedicated node-runtime-major and node-runtime-maintenance rules.

2026-04-08: Validation for this subtask was repository-local: renovate.json was syntactically validated with a local JSON parse after the baseline policy file landed.
<!-- SECTION:NOTES:END -->
