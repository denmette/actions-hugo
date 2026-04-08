---
id: TASK-2.3
title: Group npm tooling and test-stack update PRs in Renovate
status: To Do
assignee: []
created_date: '2026-04-07 15:03'
updated_date: '2026-04-07 15:03'
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
- [ ] #1 Tooling-major updates such as eslint, typescript-eslint, typescript, prettier, and adjacent lint plugins are grouped coherently.
- [ ] #2 Test-stack updates such as jest, ts-jest, and nock are grouped coherently.
- [ ] #3 Local workflow tooling such as husky and lint-staged is grouped coherently.
- [ ] #4 Major Node runtime baseline updates remain separate from the normal grouped maintenance PRs.
<!-- AC:END -->
