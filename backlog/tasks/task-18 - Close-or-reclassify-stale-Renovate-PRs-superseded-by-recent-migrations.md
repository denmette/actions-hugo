---
id: TASK-18
title: Close or reclassify stale Renovate PRs superseded by recent migrations
status: Done
assignee: []
created_date: '2026-04-08 16:25'
updated_date: '2026-04-08 16:52'
labels:
  - dependencies
  - renovate
  - maintenance
documentation:
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/renovate.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/package.json
  - /Users/macs/Coding/Personal/github-actions/actions-hugo/.github/workflows
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Review the currently open Renovate PRs and close or reclassify the ones that are already satisfied, obsolete, or no longer relevant after the repository's recent toolkit, Vitest, and grouped-maintenance migrations. This task turns the Renovate queue back into meaningful pending work instead of historical noise.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Renovate PRs that are already satisfied by current repository state are identified and closed.
- [x] #2 Renovate PRs made obsolete by the Vitest migration or other completed work are identified and closed or superseded.
- [x] #3 Remaining open Renovate PRs map cleanly to real backlog tasks or grouped maintenance domains.
- [x] #4 The resulting Renovate queue is materially smaller and easier to reason about.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-04-08: Several Renovate suggestions are already satisfied or partially obsolete: `@actions/core/io/exec/tool-cache` are already on the requested major line; `lint-staged -> v16` is already satisfied; `typescript-eslint -> v8` is already satisfied; and `jest -> v30`, `nock -> v14`, and `eslint-plugin-jest -> v29` should be re-evaluated in light of the new Vitest-based test stack.
2026-04-08: This task is the operational follow-up to the earlier Renovate grouping policy work, which defined how stale and superseded PR families should be handled in principle.
2026-04-08: Current repository state already satisfies these prior Renovate families and they should be closed as stale/superseded where still open: `@actions/core -> v3`, `@actions/exec -> v3`, `@actions/io -> v3`, `@actions/tool-cache -> v4`, `actions/checkout -> v6`, `actions/setup-node -> v6`, `actions/upload-artifact -> v6`, `lint-staged -> v16`, and `typescript-eslint (monorepo) -> v8`.
2026-04-08: The Vitest migration makes these old test-stack Renovate suggestions obsolete or in need of reclassification rather than direct merge: `jest (monorepo) -> v30`, `nock -> v14`, and `eslint-plugin-jest -> v29`. They are superseded by the current `vitest`-based setup and should be closed unless repurposed into broader test-runner follow-up work.
2026-04-08: These suggestions remain meaningful open work and should map to explicit backlog tasks instead of ad hoc Renovate merges: Node 24/runtime transition work -> TASK-13/TASK-19, `eslint -> v10` and `prettier -> v3` -> TASK-15, `typescript -> v6` -> TASK-16, `husky -> v9` -> TASK-17, and `standard-version` replacement -> TASK-4.
2026-04-08: `codecov/codecov-action -> v6` should not be merged blindly because current upstream public releases still show `v5.5.1` as latest. Treat any `v6` Renovate suggestion as needing source verification before acting.
2026-04-08: Validation for this task is repository-state inspection rather than code execution: reviewed `package.json`, workflow action versions, and existing backlog task mapping to produce a deterministic close/keep/reclassify plan.
<!-- SECTION:NOTES:END -->
