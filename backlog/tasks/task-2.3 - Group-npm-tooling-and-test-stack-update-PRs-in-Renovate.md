---
id: TASK-2.3
title: Group npm tooling and test-stack update PRs in Renovate
status: In Progress
assignee:
  - codex
created_date: '2026-04-07 15:03'
updated_date: '2026-04-08 10:47'
labels:
  - automation
  - renovate
  - dependencies
dependencies:
  - TASK-2.1
parent_task_id: TASK-2
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Configure Renovate package rules so related npm upgrades are grouped by maintenance domain instead of opened as many overlapping PRs. At minimum, tooling majors, test-stack majors, and local workflow tooling updates should be expressed as separate groups, while major Node runtime baseline changes remain isolated.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Tooling-major updates such as eslint, typescript-eslint, typescript, prettier, and adjacent lint plugins are grouped coherently.
- [x] #2 Test-stack updates such as jest, ts-jest, and nock are grouped coherently.
- [x] #3 Local workflow tooling such as husky and lint-staged is grouped coherently.
- [x] #4 Major Node runtime baseline updates remain separate from the normal grouped maintenance PRs.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Implementation started on branch chore/task-2-3-renovate-npm-grouping from current main. Current npm-oriented Renovate branches still show separate PR families for eslint/typescript-eslint/typescript/prettier, jest/nock, husky/lint-staged, and Node baseline updates. This subtask will refine renovate.json so those updates map cleanly to the intended grouped maintenance domains.

2026-04-08: Refined renovate.json so npm maintenance groups are explicit and stable. Tooling updates now share the tooling-stack group, test updates share the test-stack group, and local developer workflow tooling shares the local-workflow-tooling group.

2026-04-08: Expanded the test-stack group to include @types/istanbul-lib-report alongside jest, ts-jest, @types/jest, and nock so coverage-related test support packages are not split into separate PRs.

2026-04-08: Added a dedicated node-runtime-maintenance rule for non-major node/@types/node updates, while keeping major Node runtime jumps isolated in node-runtime-major. This preserves the separate-review requirement for baseline runtime changes without leaving supported Node line maintenance ungrouped.

2026-04-08: Validation for this subtask was repository-local: renovate.json was syntactically validated with a local JSON parse after the npm package grouping rules were updated.
<!-- SECTION:NOTES:END -->
