---
id: TASK-0001
title: Modernize npm dependencies and supporting code for the Hugo action
status: In Progress
assignee: []
created_date: '2026-04-07 05:48'
updated_date: '2026-04-08 12:02'
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
1. TASK-0001.05 first: define the approved GitHub Actions toolkit migration baseline and document compatibility constraints across runtime, tests, bundling, and action metadata.
2. TASK-0001.01 next: modernize runtime dependencies and replace obsolete HTTP dependency usage according to the approved conservative CommonJS-compatible toolkit baseline.
3. TASK-0001.02 after the baseline is fixed: upgrade the TypeScript and linting toolchain to the versions needed by the chosen conservative path.
4. TASK-0001.03 after TASK-0001.02: upgrade the Jest stack and stabilize mocks/configuration against the newer runtime and tooling assumptions within the conservative path.
5. TASK-0001.04 last in the current dependency modernization sequence: regenerate lib/, refresh package-lock.json, and align CI/documentation with the final conservative dependency set.
6. TASK-2 follow-up after TASK-0001.04: add Renovate configuration for ongoing dependency and GitHub Action update automation.
7. TASK-3 follow-up after TASK-0001.04: review and clean up GitHub Actions workflows and related automation.
8. TASK-0001.06 next remaining execution slice: migrate the action to the newer ESM-oriented GitHub Actions toolkit line.
9. TASK-0001.07 after TASK-0001.06: move the repository off the deprecated ESLint 7 line once the newer toolkit/tooling baseline is in place.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-07: User chose the conservative GitHub Actions toolkit migration path for the current dependency-upgrade initiative. A separate follow-up task will track eventual migration to the newer ESM-oriented toolkit line.

2026-04-08: The conservative modernization sequence is complete through TASK-0001.04, and the maintenance follow-ups TASK-2 and TASK-3 are also complete. The initiative remains open because the remaining post-conservative modernization work is still outstanding in TASK-0001.06 (newer ESM-oriented GitHub Actions toolkit migration) and TASK-0001.07 (deprecated ESLint 7 removal).
<!-- SECTION:NOTES:END -->
