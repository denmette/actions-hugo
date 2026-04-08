---
id: TASK-2.1
title: Define the repository-level Renovate policy and grouping rules
status: In Progress
assignee:
  - codex
created_date: '2026-04-07 15:03'
updated_date: '2026-04-08 10:18'
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
2026-04-08: Implementation started on branch chore/task-2-1-renovate-policy from rebased main. The repository currently has no renovate.json or equivalent config file, so this task will establish the initial policy baseline and encode the first-pass grouping/scheduling rules directly in versioned repository config.

2026-04-08: Added a first-pass renovate.json at the repository root. The policy encodes off-hours scheduling, dependency dashboard usage, rebaseWhen=behind-base-branch, a PR concurrency cap, weekly lock file maintenance, and grouped update buckets for GitHub Actions workflows, runner images, GitHub Actions toolkit runtime majors, tooling majors, test-stack updates, and local workflow tooling.

2026-04-08: Major Node runtime baseline changes are kept separate through dedicated package rules for node and @types/node major updates, rather than being folded into the normal grouped maintenance PRs.

2026-04-08: The policy is designed to reduce overlapping Renovate PRs while still preserving reviewable units that map to the repository's Backlog structure and linear-history preference.

2026-04-08: Validation for this subtask was limited to repository-local checks. renovate.json was syntactically validated with a local JSON parse, which is sufficient for the policy-definition baseline before later subtasks refine package rules and operational handling.
<!-- SECTION:NOTES:END -->
