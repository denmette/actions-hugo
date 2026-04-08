---
id: TASK-2
title: Add Renovate configuration for dependency maintenance
status: Done
assignee:
  - codex
created_date: '2026-04-07 08:27'
updated_date: '2026-04-08 11:12'
labels:
  - dependencies
  - automation
  - renovate
dependencies:
  - TASK-0001.04
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add Renovate to this repository so dependency update work can be proposed and managed consistently after the current modernization effort. This task should introduce a repository-level Renovate configuration file, tune it for the project's dependency and GitHub Action update patterns, and document any repository-specific grouping, scheduling, or reviewer expectations needed to keep update noise manageable. In particular, the configuration should reduce the current sprawl of isolated Renovate PRs by grouping related workflow updates, grouped tooling majors, and the future ESM-oriented toolkit migration work into predictable review units.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A renovate.json or equivalent Renovate repository configuration is added at the repository root with settings appropriate for this project.
- [x] #2 The configuration covers npm dependencies and GitHub Action version updates in a way that matches the repository's maintenance goals and review capacity.
- [x] #3 Any necessary documentation or comments explain the intended Renovate behavior for future maintainers.
- [x] #4 The configuration is validated or exercised to the extent practical within the repository workflow.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
This task was added after the initial dependency-upgrade breakdown so post-modernization maintenance automation is tracked explicitly.

2026-04-07: Existing Renovate branches in this repository showed that the current update strategy is too fragmented. The intended configuration should group related updates instead of opening many overlapping PRs. Current desired grouping buckets are:

- GitHub Actions workflow updates together: checkout/setup-node/codecov/codeql/artifact-action/runner-image changes.
- Newer GitHub Actions toolkit runtime majors together: @actions/core, @actions/exec, @actions/io, and @actions/tool-cache.
- Tooling majors together: eslint, typescript-eslint, typescript, prettier, and adjacent lint plugins where appropriate.
- Test-stack majors together: jest/ts-jest/nock family changes.
- Local workflow tooling together: husky and lint-staged.
- Keep major Node runtime baseline changes separate from normal dependency maintenance.

Planned subtasks:
- TASK-2.1 define the repository-level Renovate policy and grouping rules
- TASK-2.2 group GitHub Actions workflow update PRs
- TASK-2.3 group npm tooling and test-stack update PRs
- TASK-2.4 define handling for stale/superseded Renovate PRs and validation expectations

2026-04-08: Task completed through the combined landing of renovate.json and the related policy subtasks. The repository now has a versioned Renovate baseline covering grouped GitHub Actions maintenance updates, grouped npm maintenance updates, separate Node runtime handling, scheduling/noise controls, and documented stale-PR handling guidance.
<!-- SECTION:NOTES:END -->
