---
id: TASK-0001
title: Modernize npm dependencies and supporting code for the Hugo action
status: To Do
assignee: []
created_date: '2026-04-07 05:48'
updated_date: '2026-04-07 06:02'
labels:
  - dependencies
  - maintenance
  - typescript
dependencies: []
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package-lock.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/action.yml
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update the repository's outdated npm dependencies in a controlled way, with small deliverable tasks that keep the GitHub Action working on the current Node 20.10+ baseline. The work should cover dependency version bumps, code cleanup needed by newer packages, and regeneration of committed build artifacts and metadata where required. This initiative is anchored by the current dependency set in package.json/package-lock.json and the action entrypoints under src/.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Outdated runtime, toolchain, and test dependencies are addressed through scoped child tasks rather than one large upgrade task.
- [ ] #2 Each child task includes enough repository context for an independent agent to execute it without prior conversation history.
- [ ] #3 Task dependencies reflect the safest execution order for landing the upgrade work incrementally.
- [ ] #4 The parent task can be considered done once all child tasks are done and the repository remains buildable and testable on the declared Node/npm versions.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Upgrade initiative breakdown:
1. TASK-0001.01 owned by codex first: modernize runtime dependencies and replace deprecated fetch usage.
2. TASK-0001.02 next: upgrade the TypeScript and linting toolchain.
3. TASK-0001.03 after TASK-0001.02: upgrade the Jest stack and stabilize mocks against the newer tooling baseline.
4. TASK-0001.04 last: regenerate lib/, refresh package-lock.json, and align CI/documentation with the final dependency set.
<!-- SECTION:PLAN:END -->
